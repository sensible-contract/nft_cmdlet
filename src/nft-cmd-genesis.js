#!/usr/bin/env node
const program = require("commander");
const moment = require("moment");
const { bsv } = require("scryptlib");
const { API_NET, BlockChainApi } = require("./lib/blockchain-api");
const { Logger } = require("./lib/logger");
const { NFT } = require("./lib/sensible_nft/NFT");
const { ScriptHelper } = require("./lib/sensible_nft/ScriptHelper");
const { Utils } = require("./util/Utils");
const path = require("path");
const config = require("../config");
Logger.replaceConsole({
  name: `${moment().format("YYYY-MM-DD")}/${moment().format(
    "YYYY-MM-DDTHH:mm:ss"
  )}_genesis.log`,
  level: "debug",
  appenders: ["console", "file"],
  path: "logs",
});

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
    {
      name: "total_supply",
      alias: "totalSupply",
      desc: "NFT的总供应量",
    },
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
    totalSupply: parseInt(program.total_supply),
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
      cfg.fee
    );
    const nft = new NFT(true);
    nft.setTxGenesisPart({
      prevTxId: options.genesisOutpointTxId,
      outputIndex: options.genesisOutpointIdx,
    });

    const issuerPrivKey = new bsv.PrivateKey.fromWIF(privateKey.toWIF());
    const issuerPk = bsv.PublicKey.fromPrivateKey(issuerPrivKey);
    const issuerPkh = bsv.crypto.Hash.sha256ripemd160(issuerPk.toBuffer());

    const currTokenId = 0;

    const opreturnData = new bsv.Script.buildSafeDataOut(
      JSON.stringify({
        name: "NFT-EXAMPLE",
        desc: `GENESIS. TOTAL SUPPLY:${options.totalSupply}`,
        issuer: "sensible-nft-cmd",
      })
    );
    let txGenesis = await nft.makeTxGenesis({
      prevTxId: options.genesisOutpointTxId,
      outputIssuerPkh: issuerPkh,
      outputTokenId: currTokenId,
      totalSupply: options.totalSupply,
      opreturnData,
    });
    txGenesis.sign(privateKey);
    // console.log(txGenesis);
    let txid = await ScriptHelper.sendTx(txGenesis);
    // console.log(txGenesis.serialize());
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
