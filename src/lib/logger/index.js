const { configure, getLogger } = require("log4js");

class Logger {
  static replaceConsole(opts) {
    const logger = new Logger(opts);
    console.debug = (...args) => {
      logger.debug(...args);
    };

    console.log = (...args) => {
      logger.log(...args);
    };

    console.info = (...args) => {
      logger.info(...args);
    };

    console.warn = (...args) => {
      logger.warn(...args);
    };

    console.error = (...args) => {
      logger.error(...args);
    };
    return logger;
  }

  constructor(opts) {
    opts = opts || {};
    let programName = opts.name || "out";
    let level = opts.level || "debug";
    let appenders = opts.appenders || ["console", "file"];
    let logPath = opts.path || __dirname + "/../../logs";

    configure({
      appenders: {
        console: {
          //记录器1:输出到控制台
          type: "console",
        },
        file: {
          //记录器2：输出到文件
          type: "file",
          filename: `${logPath}/${programName}`, //文件目录，当目录文件或文件夹不存在时，会自动创建
          // maxLogSize : 20971520,//文件最大存储空间（byte），当文件内容超过文件存储空间会自动生成一个文件test.log.1的序列自增长的文件
          alwaysIncludePattern: true, //（默认为false） - 将模式包含在当前日志文件的名称以及备份中
          daysToKeep: 10, //时间文件 保存多少天，距离当前天daysToKeep以前的log将被删除
          compress: true, //（默认为false） - 在滚动期间压缩备份文件（备份文件将具有.gz扩展名）
          pattern: "yyyy-MM-dd-hh.log", //（可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
          encoding: "utf-8", //default "utf-8"，文件的编码
        },
      },
      categories: {
        default: { appenders: appenders, level: level }, //默认log类型，输出到控制台 log文件 log日期文件 且登记大于info即可
      },
    });

    this.logger = getLogger(programName);

    if (level === "debug") {
      this.enableDebug = true;
      this.enableInfo = true;
      this.enableWarn = true;
      this.enableError = true;
    } else if (level === "info") {
      this.enableDebug = false;
      this.enableInfo = true;
      this.enableWarn = true;
      this.enableError = true;
    } else if (level === "warn") {
      this.enableDebug = false;
      this.enableInfo = false;
      this.enableWarn = true;
      this.enableError = true;
    } else if (level === "error") {
      this.enableDebug = false;
      this.enableInfo = false;
      this.enableWarn = false;
      this.enableError = true;
    }
  }

  debug(...args) {
    if (!this.enableDebug) return;
    this.logger.debug(...args);
  }

  log(...args) {
    if (!this.enableInfo) return;
    this.logger.info(...args);
  }

  info(...args) {
    if (!this.enableInfo) return;
    this.logger.info(...args);
  }

  warn(...args) {
    if (!this.enableWarn) return;
    this.logger.warn(...args);
  }

  error(...args) {
    if (!this.enableError) return;
    this.logger.error(...args);
  }
}

module.exports = {
  Logger,
};
