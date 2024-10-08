export const transactionReceiptAddress = "0x22d00d607f88f04300fe3b972fcc0c9764d40057";
export const transactionReceiptABI = JSON.parse(
  JSON.stringify([
    {
      anonymous: false,
      inputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "orderId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "recipientAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "assetTypeIn",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "assetAmountIn",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "assetTypeOut",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "assetAmountOut",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "mmAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "fee",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "isUsed",
              type: "bool",
            },
          ],
          indexed: false,
          internalType: "struct TransactionReceipt.TransactionInfo",
          name: "transactionInfo",
          type: "tuple",
        },
      ],
      name: "MMTransferHappened",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "orderId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "recipientAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "assetTypeIn",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "assetAmountIn",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "assetTypeOut",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "fee",
          type: "uint256",
        },
      ],
      name: "transferTo",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      name: "transactions",
      outputs: [
        {
          internalType: "uint256",
          name: "orderId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "recipientAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "assetTypeIn",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "assetAmountIn",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "assetTypeOut",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "assetAmountOut",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "mmAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "fee",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "isUsed",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ])
);
