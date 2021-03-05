#创建 Genesis,设置 NFT 最大供应量为 3.
./nft-cmd genesis --network test --genesis_txid a6b27e661ef04af07af43580035d7433243b2df4f0220459892114d2e8be949a --genesis_index 0 --total_supply 3

执行结果：https://test.whatsonchain.com/tx/54928a2d8878432fcf529e73943f23aecae9a3887975516aa30b093b6580030e

#发行第 1 个 NFT
./nft-cmd issue --network test --genesis_txid a6b27e661ef04af07af43580035d7433243b2df4f0220459892114d2e8be949a --genesis_index 0 --token_id 0 --pre_txid a6b27e661ef04af07af43580035d7433243b2df4f0220459892114d2e8be949a --pre_index 0 --spend_txid 54928a2d8878432fcf529e73943f23aecae9a3887975516aa30b093b6580030e --spend_index 0 --addr myoWPDxR6RJYn16NSi5KSut9zwYTadkLTu

执行结果：https://test.whatsonchain.com/tx/229ac198a0e7612eaa832518957c1f30c22254a7e956c2772a687863fcb3d117

#发行第 2 个 NFT
./nft-cmd issue --network test --genesis_txid a6b27e661ef04af07af43580035d7433243b2df4f0220459892114d2e8be949a --genesis_index 0 --token_id 1 --pre_txid 54928a2d8878432fcf529e73943f23aecae9a3887975516aa30b093b6580030e --pre_index 0 --spend_txid 229ac198a0e7612eaa832518957c1f30c22254a7e956c2772a687863fcb3d117 --spend_index 0 --addr myoWPDxR6RJYn16NSi5KSut9zwYTadkLTu

执行结果：https://test.whatsonchain.com/tx/d6d446fb2cc2077c75294e3ee3b59025f483674df5eb37c9a9137893e1eb0e21

#发行第 3 个 NFT
./nft-cmd issue --network test --genesis_txid a6b27e661ef04af07af43580035d7433243b2df4f0220459892114d2e8be949a --genesis_index 0 --token_id 2 --pre_txid 229ac198a0e7612eaa832518957c1f30c22254a7e956c2772a687863fcb3d117 --pre_index 0 --spend_txid d6d446fb2cc2077c75294e3ee3b59025f483674df5eb37c9a9137893e1eb0e21 --spend_index 0 --addr myoWPDxR6RJYn16NSi5KSut9zwYTadkLTu

执行结果：https://test.whatsonchain.com/tx/c5f084984be5f141cf30d1184a8ccf322a70ebec8a2eb8c6b85f3a9c8b4b80a5

#发行第 4 个 NFT
./nft-cmd issue --network test --genesis_txid a6b27e661ef04af07af43580035d7433243b2df4f0220459892114d2e8be949a --genesis_index 0 --token_id 3 --pre_txid d6d446fb2cc2077c75294e3ee3b59025f483674df5eb37c9a9137893e1eb0e21 --pre_index 0 --spend_txid c5f084984be5f141cf30d1184a8ccf322a70ebec8a2eb8c6b85f3a9c8b4b80a5 --spend_index 0 --addr myoWPDxR6RJYn16NSi5KSut9zwYTadkLTu

执行失败：合约验证失败，因为已经达到了最大供应量

#将第 1 个 NFT 从 myoWPDxR6RJYn16NSi5KSut9zwYTadkLTu 转移到地址 msAbhAgwADoxpzGyRwCvgTjSRHWS94CaqR
（需要提供 myoWPDxR6RJYn16NSi5KSut9zwYTadkLTu 的私钥）
./nft-cmd transfer --network test --genesis_txid a6b27e661ef04af07af43580035d7433243b2df4f0220459892114d2e8be949a --genesis_index 0 --token_id 1 --pre_txid 54928a2d8878432fcf529e73943f23aecae9a3887975516aa30b093b6580030e --pre_index 0 --spend_txid 229ac198a0e7612eaa832518957c1f30c22254a7e956c2772a687863fcb3d117 --spend_index 1 --addr msAbhAgwADoxpzGyRwCvgTjSRHWS94CaqR --wif cUNVX4UkKabCKQbn7jxbKRvyR4eLfG8hW2wmTRc94fbXT6b22RSP

执行结果：https://test.whatsonchain.com/tx/cf9c12f3ebacb9f0cb2dd1b78d29613b8edadfae76c5ee240df915c2b0f78182
