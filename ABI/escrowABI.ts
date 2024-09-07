export const escrowAddress = "0xca03df4513a01ff8f0d9e9bad402da03121f3b03";
export const escrowABI = JSON.parse(
  JSON.stringify([
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "orderId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "recipientAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "assetTypeIn",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "assetAmountIn",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "assetTypeOut",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "assetAmountOut",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "mmAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "fee",
          type: "uint256",
        },
      ],
      name: "FundsLockedNotification",
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
          internalType: "uint256",
          name: "assetTypeIn",
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
      ],
      name: "lockFunds",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "orders",
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
          internalType: "enum Escrow.OrderStatus",
          name: "status",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ])
);
