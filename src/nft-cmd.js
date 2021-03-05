#!/usr/bin/env node
const program = require("commander");
program
  .version("1.0.0", "-v, --version")
  .usage("[command] [args]")
  .command("genesis", "创建Genesis")
  .command("issue", "发行新的NFT")
  .command("transfer", "将NFT所有权转移给他人")
  .parse(process.argv);
