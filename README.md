# sensible-nft-cmd

## 主要用法

Usage: nft-cmd [command] [args]

Options:

    -v, --version  output the version number
    -h, --help     output usage information

Commands:

    genesis        创建Genesis定义NFT
    issue          发行NFT
    transfer       将NFT所有权转移给他人
    help [cmd]     display help for [cmd]

## 创建 Genesis 定义 NFT

Usage: nft-cmd genesis [options]

Options:

    --network <net>                       当前使用的网络 (main/test)
    --genesis_txid <genesisOutpointTxId>  genesis txid
    --genesis_index <genesisOutpointIdx>  genesis index
    --total_supply <totalSupply>          NFT的总供应量
    -h, --help                            output usage information

例子

```
 ./nft-cmd  genesis --network test --genesis_txid e240bf78203c53769d392a914a9cd72ada00c8fbdcd23279463909806afdbe0f --genesis_index 1

```

## 发行

Usage: nft-cmd issue [options]

Options:

    --network <net>                       当前使用的网络 (main/test)
    --genesis_txid <genesisOutpointTxId>  genesis txid
    --genesis_index <genesisOutpointIdx>  genesis index
    --token_id <currTokenId>              tokenId
    --pre_txid <preUtxoTxId>              溯源utxo
    --pre_index <preUtxoOutputIndex>      溯源ouput序号
    --spend_txid <spendByTxId>            需要花费的utxo
    --spend_index <spendByOutputIndex>    需要花费的output的序号
    --addr <receiverAddress>              接收的地址
    -h, --help                            output usage information

```
 ./nft-cmd issue --network test --genesis_txid e240bf78203c53769d392a914a9cd72ada00c8fbdcd23279463909806afdbe0f --genesis_index 1 --token_id 0 --pre_txid  e240bf78203c53769d392a914a9cd72ada00c8fbdcd23279463909806afdbe0f --pre_index 1 --spend_txid b9f2683d3d70d810bf2b236b8b2052537edcf343e57e4ed34e7cd2612bffd1fa --spend_index 0 --addr msnDKWi9WWSyfQNtrNHoksnLehrNU3QXcQ

```

## 转移

Usage: nft-cmd transfer [options]

Options:

    --network <net>                       当前使用的网络 (main/test)
    --genesis_txid <genesisOutpointTxId>  genesis txid
    --genesis_index <genesisOutpointIdx>  genesis index
    --token_id <currTokenId>              tokenId
    --pre_txid <preUtxoTxId>              溯源utxo
    --pre_index <preUtxoOutputIndex>      溯源ouput序号
    --spend_txid <spendByTxId>            需要花费的utxo
    --spend_index <spendByOutputIndex>    需要花费的output的序号
    --addr <receiverAddress>              接收的地址
    --wif <senderWif>                     发送者的WIF
    -h, --help                            output usage information

例子

```
./nft-cmd transfer --network test  --genesis_txid e240bf78203c53769d392a914a9cd72ada00c8fbdcd23279463909806afdbe0f --genesis_index 1 --token_id 1 --pre_txid  b9f2683d3d70d810bf2b236b8b2052537edcf343e57e4ed34e7cd2612bffd1fa --pre_index 0 --spend_txid 3e1273f4a81b003ad4d12c823819facf5ed3743b91c333bdbd45598f56f652da --spend_index 1 --addr msnDKWi9WWSyfQNtrNHoksnLehrNU3QXcQ --wif cSGvgj2CEM6W3A71pa5tEVG1PK83SkCbUnjxyk3KvAfrpeXiMVq5

```
