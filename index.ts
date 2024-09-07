import { getSlots } from "./functions/getSlots";
import { writeSlotData } from "./slotData/dataManipulation";
import { sendToStorageProofs } from "./functions/sendToStorageProofs";

export async function startProofProcess(
  orderId: string,
  recipientAddress: string,
  assetAmountOut: string,
  blockNumber: number
) {
  // gather the slot mappings
  const slots = getSlots(orderId, recipientAddress, assetAmountOut);

  // save the data to be used once the proof is generated
  writeSlotData(slots, blockNumber);

  // send the slots to be proven with the storage proofs api
  await sendToStorageProofs(slots, blockNumber);
}
