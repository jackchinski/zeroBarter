#!/usr/bin/env bash

# Load environment variables
source .env && \

# Call the lockFunds function of the Escrow smart contract
cast send \
    $ESCROW_ADDRESS \
    "lockFunds(uint256,uint256,uint256,uint256,address,uint256)" \
    1 \  # orderId
    3 \  # assetTypeIn
    3 \  # assetTypeOut
    900000000000000 \  # assetAmountOut (0.0009 ether in wei)
    $MM_ADDRESS \  # Market Maker address
    100000000000000 \  # fee (0.0001 ether in wei)
    --value 1000000000000000 \  # msg.value (0.001 ether in wei)
    --rpc-url "$ETHEREUM_SEPOLIA_RPC_URL" \
    --private-key "$RECIPIENT_PRIVATE_KEY"

# UPDATE THE ORDER NUMBER AS NEEDED
#cast send $ESCROW_ADDRESS "lockFunds(uint256,uint256,uint256,uint256,address,uint256)" 7 3 3 900000000000000 $MM_ADDRESS 100000000000000 --value 1000000000000000 --rpc-url $ETHEREUM_SEPOLIA_RPC_URL --private-key $RECIPIENT_PRIVATE_KEY
#
    