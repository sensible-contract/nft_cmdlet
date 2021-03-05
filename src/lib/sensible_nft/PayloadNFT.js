const { num2bin, Ripemd160, Sha256, toHex } = require("scryptlib");
const { DataLen8 } = require("./ScriptHelper");
const ISSUE = "00";
const TRANSFER = "01";
const SWAP = "02";
const SELL = "03";

/**
 * PayloadNFT
 */
class PayloadNFT {
  /**
   * 解析、构造NFT合约的数据部分
   *
   * @constructor
   *
   * @param {Object} params
   * @param {String=} params.scriptCode 合约代码部分
   * @param {string} params.dataType 数据类型，1字节
   * @param {Ripemd160} params.ownerPkh 所属人
   * @param {number} params.totalSupply 发行总量
   * @param {number} params.tokenId tokenId
   * @param {Sha256=} params.codeWithGenesisPartHashSwap 在和Token合约进行swap时，指定Token合约的code前缀部分
   * @param {number=} params.tokenAmountSwap 在和Token合约进行swap时，要求的token数量
   * @param {number=} params.satoshiAmountSell 在出售NFT时，要求的bsv数量
   */
  constructor({
    scriptCode,
    dataType,
    ownerPkh,
    totalSupply,
    tokenId,
    codeWithGenesisPartHashSwap,
    tokenAmountSwap,
    satoshiAmountSell,
  }) {
    this.dataType = dataType;
    this.ownerPkh = ownerPkh;
    this.totalSupply = totalSupply;
    this.tokenId = tokenId;
    this.codeWithGenesisPartHashSwap = codeWithGenesisPartHashSwap;
    this.tokenAmountSwap = tokenAmountSwap;
    this.satoshiAmountSell = satoshiAmountSell;
  }

  dump() {
    let payload = "";
    if (this.dataType == SWAP) {
      payload =
        toHex(this.ownerPkh) +
        num2bin(this.tokenId, DataLen8) +
        toHex(this.codeWithGenesisPartHashSwap) +
        num2bin(this.tokenAmountSwap, DataLen8) +
        this.dataType;
    } else if (this.dataType == SELL) {
      payload =
        toHex(this.ownerPkh) +
        num2bin(this.tokenId, DataLen8) +
        num2bin(this.satoshiAmountSell, DataLen8) +
        this.dataType;
    } else {
      payload =
        toHex(this.ownerPkh) +
        num2bin(this.totalSupply, DataLen8) +
        num2bin(this.tokenId, DataLen8) +
        this.dataType;
    }
    return payload;
  }
}

module.exports = {
  ISSUE,
  TRANSFER,
  SWAP,
  SELL,
  PayloadNFT,
};
