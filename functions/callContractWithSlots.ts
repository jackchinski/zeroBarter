import { ethers } from "ethers";
import { env } from "bun";
import { escrowABI, escrowAddress } from "../ABI/escrowABI";
import { getSlots } from "./getSlots";
import { clearSlotData } from "../slotData/dataManipulation";

const mmPrivateKey = env.MM_PRIVATE_KEY;
const sepoliaRpcUrl = env.ETHEREUM_SEPOLIA_RPC_URL;

if (!mmPrivateKey || !sepoliaRpcUrl) {
  throw new Error("[RELAY SLOTS TO ESCROW]: Private key or Sepolia RPC is not defined");
}

export async function callContractWithSlots(slots: ReturnType<typeof getSlots>, blockNumber: number) {
  const provider = new ethers.JsonRpcProvider(sepoliaRpcUrl);
  const wallet = new ethers.Wallet(mmPrivateKey as string, provider);
  const escrowContract = new ethers.Contract(escrowAddress, escrowABI, wallet);

  try {
    console.log("slots", slots);
    console.log("blockNumber", blockNumber);
    // sending the slots to the smart contract function which will get the slot values
    const tx = await escrowContract.getValuesFromSlots(
      slots.orderIdSlot,
      slots.recipientAddressSlot,
      slots.assetTypeInSlot,
      slots.assetAmountInSlot,
      slots.assetTypeOutSlot,
      slots.assetAmountOutSlot,
      slots.mmAddressSlot,
      slots.feeSlot,
      blockNumber
    );
    clearSlotData();
  } catch (error) {
    console.error("[RELAY SLOTS TO ESCROW]: Error calling Escrow contract", error);
  }
}

// let slots = {
//   "orderIdSlot": "0x14d320aa7bf33c2cbdd133fb31556512abafe87cf320d9d39a394531dc048841",
    // "recipientAddressSlot": "0x14d320aa7bf33c2cbdd133fb31556512abafe87cf320d9d39a394531dc048842",
    // "assetTypeInSlot": "0x14d320aa7bf33c2cbdd133fb31556512abafe87cf320d9d39a394531dc048843",
    // "assetAmountInSlot": "0x14d320aa7bf33c2cbdd133fb31556512abafe87cf320d9d39a394531dc048844",
    // "assetTypeOutSlot": "0x14d320aa7bf33c2cbdd133fb31556512abafe87cf320d9d39a394531dc048845",
    // "assetAmountOutSlot": "0x14d320aa7bf33c2cbdd133fb31556512abafe87cf320d9d39a394531dc048846",
    // "mmAddressSlot": "0x14d320aa7bf33c2cbdd133fb31556512abafe87cf320d9d39a394531dc048847",
    // "feeSlot": "0x14d320aa7bf33c2cbdd133fb31556512abafe87cf320d9d39a394531dc048848"
// };

// let blockNumber = 111;
// callContractWithSlots(slots, blockNumber);
