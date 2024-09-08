#!/usr/bin/env bash

# Load environment variables
source .env && \

# Call the transferTo function of the contract
cast send \
    $ESCROW_ADDRESS \
    "transferTo(uint256,address,uint256,uint256,uint256,uint256)" \
    4 \  # orderId
    $RECIPIENT_ADDRESS \  # recipientAddress
    3 \  # assetTypeIn
    1000000000000000 \  # assetAmountIn (1 ether in wei)
    3 \  # assetTypeOut
    100000000000000 \  # fee (0.0001 ether in wei)
    --value 900000000000000 \  # msg.value (0.0009 ether in wei)
    --rpc-url $ETHEREUM_SEPOLIA_RPC_URL \
    --private-key $MM_PRIVATE_KEY


#cast send $TRANSACTION_RECEIPT_ADDRESS "transferTo(uint256,address,uint256,uint256,uint256,uint256)" 4 $RECIPIENT_ADDRESS 3 1000000000000000 3 100000000000000 --value 900000000000000 --rpc-url $ETHEREUM_SEPOLIA_RPC_URL --private-key $MM_PRIVATE_KEY