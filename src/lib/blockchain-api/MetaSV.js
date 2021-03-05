const { Net } = require("../net");
const { API_NET } = require("./common");
class MetaSV {
  constructor(apiNet) {
    if (apiNet == API_NET.MAIN) {
      this.serverBase = "https://apiv2.metasv.com";
    } else {
      throw "MetaSV do not support other network";
    }
  }

  async getUnspents(address) {
    let _res = await Net.httpGet(
      `${this.serverBase}/address/${address}/utxo`,
      {}
    );
    let ret = _res.map((v) => {
      return {
        txId: v.txid,
        satoshis: v.value,
        outputIndex: v.outIndex,
      };
    });
    return ret;
  }

  async getRawTxData(txid) {
    let _res = await Net.httpGet(`${this.serverBase}/tx/${txid}/raw`, {});
    return _res.hex;
  }

  async broadcast(hex) {
    let _res = await Net.httpPost(`${this.serverBase}/tx/broadcast`, {
      hex,
    });
    return _res.txid;
  }
}

module.exports = {
  MetaSV,
};
