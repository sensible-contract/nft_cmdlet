#!/usr/bin/env node
const program = require("commander");
const moment = require("moment");
const { bsv } = require("scryptlib");
const { API_NET, BlockChainApi } = require("./lib/blockchain-api");
const { Logger } = require("./lib/logger");
const { NFT } = require("./lib/sensible_nft/NFT");
const { PayloadNFT, TRANSFER } = require("./lib/sensible_nft/PayloadNFT");
const { ScriptHelper } = require("./lib/sensible_nft/ScriptHelper");
const { Utils } = require("./util/Utils");
const path = require("path");
const config = require("../config");
Logger.replaceConsole({
  name: `${moment().format("YYYY-MM-DD")}/${moment().format(
    "YYYY-MM-DDTHH:mm:ss"
  )}_transfer.log`,
  level: "debug",
  appenders: ["console", "file"],
  path: "logs",
});
const _ = require("lodash");

function getProgramOption() {
  const optionSettings = [
    { name: "network", alias: "net", desc: "当前使用的网络 (main/test)" },
    {
      name: "genesis_txid",
      alias: "genesisOutpointTxId",
      desc: "genesis txid",
    },
    {
      name: "genesis_index",
      alias: "genesisOutpointIdx",
      desc: "genesis index",
    },
    { name: "token_id", alias: "currTokenId", desc: "tokenId" },
    { name: "pre_txid", alias: "preUtxoTxId", desc: "溯源utxo" },
    { name: "pre_index", alias: "preUtxoOutputIndex", desc: "溯源ouput序号" },
    { name: "spend_txid", alias: "spendByTxId", desc: "需要花费的utxo" },
    {
      name: "spend_index",
      alias: "spendByOutputIndex",
      desc: "需要花费的output的序号",
    },
    { name: "addr", alias: "receiverAddress", desc: "接收的地址" },
    { name: "wif", alias: "senderWif", desc: "发送者的WIF" },
  ];
  let _res = program;
  optionSettings.forEach((v) => {
    _res = _res.option(`--${v.name} <${v.alias}>`, v.desc);
  });
  _res.parse(process.argv);
  for (let i = 0; i < optionSettings.length; i++) {
    let v = optionSettings[i];
    if (Utils.isNull(program[v.name])) {
      throw `option ${v.name} is needed`;
    }
  }
  return {
    network: program.network,
    genesisOutpointTxId: program.genesis_txid,
    genesisOutpointIdx: parseInt(program.genesis_index),
    currTokenId: parseInt(program.token_id),
    preUtxoTxId: program.pre_txid,
    preUtxoOutputIndex: parseInt(program.pre_index),
    spendByTxId: program.spend_txid,
    spendByOutputIndex: parseInt(program.spend_index),
    receiverAddress: program.addr,
    senderWif: program.wif,
  };
}

(async () => {
  try {
    const options = getProgramOption();
    const cfg = config[options.network];
    const privateKey = new bsv.PrivateKey.fromWIF(cfg.wif);
    ScriptHelper.prepare(
      new BlockChainApi(
        cfg.apiTarget,
        options.network == "main" ? API_NET.MAIN : API_NET.TEST
      ),
      privateKey,
      cfg.issueSatoshis,
      cfg.transferSatoshis,
      cfg.fee,
      path.join(__dirname, "../contract_scrypts"),
      path.join(__dirname, "../contract_jsons")
    );
    const nft = new NFT(true);
    nft.setTxGenesisPart({
      prevTxId: options.genesisOutpointTxId,
      outputIndex: options.genesisOutpointIdx,
    });

    const senderPrivKey = new bsv.PrivateKey.fromWIF(options.senderWif);
    const senderPk = bsv.PublicKey.fromPrivateKey(senderPrivKey);
    const senderPkh = bsv.crypto.Hash.sha256ripemd160(senderPk.toBuffer());
    const address = bsv.Address.fromString(
      options.receiverAddress,
      options.network == "main" ? "livenet" : "testnet"
    );
    const receiver1Pkh = address.hashBuffer;

    let preUtxoTxHex = await ScriptHelper.blockChainApi.getRawTxData(
      options.preUtxoTxId
    );
    let spendByTxHex = await ScriptHelper.blockChainApi.getRawTxData(
      options.spendByTxId
    );

    let spendDataPartHex = ScriptHelper.getDataPart(
      spendByTxHex,
      options.spendByOutputIndex
    );

    let totalSupply = parseInt(
      ScriptHelper.reverseEndian(spendDataPartHex.slice(40, 40 + 16)),
      16
    );

    const opreturnData = new bsv.Script.buildSafeDataOut(
      JSON.stringify({
        name: "NFT-EXAMPLE",
        desc: `TRANSFER. TOKENID ${options.currTokenId}`,
        issuer: "sensible-nft-cmd",
      })
    );

    ////////////////
    // 创建并解锁transfer
    let txTransferPl = new PayloadNFT({
      dataType: TRANSFER,
      ownerPkh: senderPkh,
      tokenId: options.currTokenId,
      totalSupply: totalSupply,
    });

    let txTransfer = await nft.makeTxTransfer(
      {
        prevTxId: options.spendByTxId,
        outputIndex: options.spendByOutputIndex,
        pl: _.cloneDeep(txTransferPl),
      },
      {
        outputOwnerPkh: receiver1Pkh,
        outputTokenId: options.currTokenId,
        changeAddress: ScriptHelper.dummyAddress,
        opreturnData,
      }
    );

    // unlock
    let verifyData = await nft.unlockTxTransfer(
      {
        tx: txTransfer,
        pl: _.cloneDeep(txTransferPl),
        outputOwnerPkh: receiver1Pkh,
        changePkh: ScriptHelper.dummyPkh,
        opreturnData,
      },
      {
        privKeyTransfer: senderPrivKey,
        inputOwnerPk: senderPk,
      },
      {
        index: options.preUtxoOutputIndex,
        txId: options.preUtxoTxId,
        txHex: preUtxoTxHex,
        byTxId: options.spendByTxId,
        byTxHex: spendByTxHex,
      }
    );
    // console.log(txTransfer);
    // console.log("transfer txhex: ", txTransfer);
    // txTransfer.fee(Math.ceil(txTransfer._estimateSize() * FEEB));
    let txid = await ScriptHelper.sendTx(txTransfer);

    console.log(`Succeeded on [${program.network}] txid: ${txid}`);
  } catch (error) {
    console.error(
      "Executed Failed",
      "\n[COMMAND]",
      program.rawArgs.join(" "),
      "\n[ERROR]",
      error
    );
  }
})();
