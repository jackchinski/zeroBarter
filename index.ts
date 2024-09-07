import { getSlots } from "./functions/getSlots";
import { writeSlotData } from "./slotData/dataManipulation";

export async function startProofProcess(
  orderId: string,
  recipientAddress: string,
  assetAmountOut: string,
  blockNumber: number
) {
  // gather the slot mappings
  const slots = getSlots(orderId, recipientAddress, assetAmountOut);

  writeSlotData(slots, blockNumber);
}
