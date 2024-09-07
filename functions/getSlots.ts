import { solidityPackedKeccak256 } from "ethers";

const transferMappingSlot = 0;

export function getSlots(orderId: string, recipientAddress: string, assetAmountOut: string) {
  const transfersMappingKey = solidityPackedKeccak256(
    ["uint256", "address", "uint256"],
    [orderId, recipientAddress, assetAmountOut]
  );

  const baseStorageSlot = solidityPackedKeccak256(["uint256", "uint256"], [transfersMappingKey, transferMappingSlot]);

  const orderIdSlot = baseStorageSlot;
  const recipientAddressSlot = "0x" + (BigInt(baseStorageSlot) + 1n).toString(16);
  const assetTypeInSlot = "0x" + (BigInt(baseStorageSlot) + 2n).toString(16);
  const assetAmountInSlot = "0x" + (BigInt(baseStorageSlot) + 3n).toString(16);
  const assetTypeOutSlot = "0x" + (BigInt(baseStorageSlot) + 4n).toString(16);
  const assetAmountOutSlot = "0x" + (BigInt(baseStorageSlot) + 5n).toString(16);
  const mmAddressSlot = "0x" + (BigInt(baseStorageSlot) + 6n).toString(16);
  const feeSlot = "0x" + (BigInt(baseStorageSlot) + 7n).toString(16);

  console.log("[GET SLOTS]", {
    transfersMappingKey,
    transferMappingSlot,
    orderIdSlot,
    recipientAddressSlot,
    assetTypeInSlot,
    assetAmountInSlot,
    assetTypeOutSlot,
    assetAmountOutSlot,
    mmAddressSlot,
    feeSlot,
  });

  return {
    orderIdSlot,
    recipientAddressSlot,
    assetTypeInSlot,
    assetAmountInSlot,
    assetTypeOutSlot,
    assetAmountOutSlot,
    mmAddressSlot,
    feeSlot,
  };
}
