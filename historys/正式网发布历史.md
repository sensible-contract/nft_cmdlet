#创建 Genesis,设置 NFT 最大供应量为 3.
./nft-cmd genesis --network main --genesis_txid 7108f03e26ed715a38209998a6a0f656740efbda588219e468838d3d0426f0b2 --genesis_index 0 --total_supply 3

执行结果：https://whatsonchain.com/tx/b600475e046ccaff625d361a5b512af940c82d7fbd4950bae330929f52c6a0c8

#发行第 1 个 NFT
./nft-cmd issue --network main --genesis_txid 7108f03e26ed715a38209998a6a0f656740efbda588219e468838d3d0426f0b2 --genesis_index 0 --token_id 0 --pre_txid 7108f03e26ed715a38209998a6a0f656740efbda588219e468838d3d0426f0b2 --pre_index 0 --spend_txid b600475e046ccaff625d361a5b512af940c82d7fbd4950bae330929f52c6a0c8 --spend_index 0 --addr 18EhBqWoUgtajTsVqZ6t41k72oB4KknD8z

执行结果：https://whatsonchain.com/tx/a10ce54afa9d78b44e7c5219b28b7e2dea97f02def97e4fa0e8ff091019df0f3

#发行第 2 个 NFT
./nft-cmd issue --network main --genesis_txid 7108f03e26ed715a38209998a6a0f656740efbda588219e468838d3d0426f0b2 --genesis_index 0 --token_id 1 --pre_txid b600475e046ccaff625d361a5b512af940c82d7fbd4950bae330929f52c6a0c8 --pre_index 0 --spend_txid a10ce54afa9d78b44e7c5219b28b7e2dea97f02def97e4fa0e8ff091019df0f3 --spend_index 0 --addr 18EhBqWoUgtajTsVqZ6t41k72oB4KknD8z

执行结果：https://whatsonchain.com/tx/0c65dce66ee695f5984704b7069c34b174ef1c860ab07826d3dd393200be4dfb

#发行第 3 个 NFT
./nft-cmd issue --network main --genesis_txid 7108f03e26ed715a38209998a6a0f656740efbda588219e468838d3d0426f0b2 --genesis_index 0 --token_id 2 --pre_txid a10ce54afa9d78b44e7c5219b28b7e2dea97f02def97e4fa0e8ff091019df0f3 --pre_index 0 --spend_txid 0c65dce66ee695f5984704b7069c34b174ef1c860ab07826d3dd393200be4dfb --spend_index 0 --addr 18EhBqWoUgtajTsVqZ6t41k72oB4KknD8z

执行结果：https://whatsonchain.com/tx/d080b0fdc9393adf9dcea6cb8d2d327314395a7eb5f89a9e7e63c78bbeb8511d

#发行第 4 个 NFT
./nft-cmd issue --network main --genesis_txid 7108f03e26ed715a38209998a6a0f656740efbda588219e468838d3d0426f0b2 --genesis_index 0 --token_id 3 --pre_txid 0c65dce66ee695f5984704b7069c34b174ef1c860ab07826d3dd393200be4dfb --pre_index 0 --spend_txid d080b0fdc9393adf9dcea6cb8d2d327314395a7eb5f89a9e7e63c78bbeb8511d --spend_index 0 --addr 18EhBqWoUgtajTsVqZ6t41k72oB4KknD8z

执行失败：合约验证失败，因为已经达到了最大供应量

#将第 1 个 NFT 从 18EhBqWoUgtajTsVqZ6t41k72oB4KknD8z 转移到地址 1AhocRe3NSgGKGXnNMkKXSLTWEV7Xr9t3k
（需要提供 18EhBqWoUgtajTsVqZ6t41k72oB4KknD8z 的私钥）
./nft-cmd transfer --network main --genesis_txid 7108f03e26ed715a38209998a6a0f656740efbda588219e468838d3d0426f0b2 --genesis_index 0 --token_id 1 --pre_txid b600475e046ccaff625d361a5b512af940c82d7fbd4950bae330929f52c6a0c8 --pre_index 0 --spend_txid a10ce54afa9d78b44e7c5219b28b7e2dea97f02def97e4fa0e8ff091019df0f3 --spend_index 1 --addr 1AhocRe3NSgGKGXnNMkKXSLTWEV7Xr9t3k --wif L1YYXtGsAGmiKPjmAnYdLiyUYgzvyRJktx2jFfhjW5qh8ByLPQVm

执行结果：https://whatsonchain.com/tx/45e30910773eadac84bd5ada5dce77f86dc1d5c345032635081576009b58f1f5
