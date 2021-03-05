class Utils {
  static getErrorString(error) {
    if (!error) {
      return "";
    }
    if (typeof error == "object") {
      var str = JSON.stringify(error, Object.getOwnPropertyNames(error), 2);
      return str;
    } else {
      return error.toString();
    }
  }

  static isNull(val) {
    if (typeof val == "undefined" || val == null || val == "undefined") {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = {
  Utils,
};
