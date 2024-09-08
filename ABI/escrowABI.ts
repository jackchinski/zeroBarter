export const escrowAddress = "0x0849abc219cdd4ada52ce136b3ef59db3b5abf4a";
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
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "orderId",
          type: "uint256",
        },
      ],
      name: "ProofSuccess",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bytes32",
          name: "orderId",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "recipientAddress",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "assetTypeIn",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "assetAmountIn",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "assetTypeOut",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "assetAmountOut",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "mmAddress",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "fee",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "blockNumber",
          type: "uint256",
        },
      ],
      name: "SlotsReceived",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bytes32",
          name: "orderIdValue",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "recipientAddressValue",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "assetTypeInValue",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "assetAmountInValue",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "assetTypeOutValue",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "assetAmountOutValue",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "mmAddressSlotValue",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "feeValue",
          type: "bytes32",
        },
      ],
      name: "ValuesReceived",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "mmAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_orderId",
          type: "uint256",
        },
      ],
      name: "WithdrawSuccess",
      type: "event",
    },
    {
      inputs: [],
      name: "FACTS_REGISTRY_ADDRESS",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "TRANSACTION_RECEIPT_ADDRESS",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "orderIdSlot",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "recipientAddressSlot",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "assetTypeInSlot",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "assetAmountInSlot",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "assetTypeOutSlot",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "assetAmountOutSlot",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "mmAddressSlot",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "feeSlot",
          type: "bytes32",
        },
        {
          internalType: "uint256",
          name: "blockNumber",
          type: "uint256",
        },
      ],
      name: "getValuesFromSlots",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_orderId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_assetTypeIn",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_assetTypeOut",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_assetAmountOut",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_mmAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_fee",
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
