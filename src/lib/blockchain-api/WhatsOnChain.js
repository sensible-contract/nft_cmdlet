const { Net } = require("../net");
const { API_NET } = require("./common");
class WhatsOnChain {
  constructor(apiNet) {
    if (apiNet == API_NET.MAIN) {
      this.serverBase = "https://api.whatsonchain.com/v1/bsv/main";
    } else {
      this.serverBase = "https://api.whatsonchain.com/v1/bsv/test";
    }
  }

  async getUnspents(address) {
    let _res = await Net.httpGet(
      `${this.serverBase}/address/${address}/unspent`,
      {}
    );
    let ret = _res.map((v) => {
      return {
        txId: v.tx_hash,
        satoshis: v.value,
        outputIndex: v.tx_pos,
      };
    });
    return ret;
  }

  async getRawTxData(txid) {
    let _res = await Net.httpGet(`${this.serverBase}/tx/${txid}/hex`, {});
    return _res;
  }

  async broadcast(hex) {
    let _res = await Net.httpPost(`${this.serverBase}/tx/raw`, {
      txhex: hex,
    });
    return _res;
  }
}

module.exports = {
  WhatsOnChain,
};
