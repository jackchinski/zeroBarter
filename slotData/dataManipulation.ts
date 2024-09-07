import { readFileSync, writeFileSync } from "fs";
import path from "path";

interface Slots {
  orderIdSlot: string;
  recipientAddressSlot: string;
  assetTypeInSlot: string;
  assetAmountInSlot: string;
  assetTypeOutSlot: string;
  assetAmountOutSlot: string;
  mmAddressSlot: string;
  feeSlot: string;
}

export interface SlotData {
  slots: Slots;
  blockNumber: number;
}

const dataFilePath = path.resolve(__dirname, "slotState.json");

export function readSlotData(): SlotData {
  const rawData = readFileSync(dataFilePath, "utf-8");
  return JSON.parse(rawData) as SlotData;
}

export function writeSlotData(slots: Slots, blockNumber: number): void {
  const updatedData: SlotData = { slots, blockNumber };
  writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2), "utf-8");
}

export function clearSlotData(): void {
  const clearedData: SlotData = {
    slots: {
      orderIdSlot: "",
      recipientAddressSlot: "",
      assetTypeInSlot: "",
      assetAmountInSlot: "",
      assetTypeOutSlot: "",
      assetAmountOutSlot: "",
      mmAddressSlot: "",
      feeSlot: "",
    },
    blockNumber: 0,
  };
  writeFileSync(dataFilePath, JSON.stringify(clearedData, null, 2), "utf-8");
}

export function isSlotDataClear(): boolean {
  const data = readSlotData();
  const { slots, blockNumber } = data;
  return (
    !slots.orderIdSlot &&
    !slots.recipientAddressSlot &&
    !slots.assetTypeInSlot &&
    !slots.assetAmountInSlot &&
    blockNumber === 0
  );
}

export function isSlotDataFilled(data: SlotData): boolean {
  const { slots, blockNumber } = data;
  return (
    !!slots.orderIdSlot &&
    !!slots.recipientAddressSlot &&
    !!slots.assetTypeInSlot &&
    !!slots.assetAmountInSlot &&
    blockNumber !== 0
  );
}

// Example usage
// console.log("Initial Data:", readSlotData());

// clearSlotData();
// console.log("After Clear:", readSlotData());

// console.log("Is Data Clear?", isSlotDataClear());

// let x = {
//   slots: {
//     orderIdSlot: "123",
//     recipientAddressSlot: "123",
//     assetTypeInSlot: "123",
//     assetAmountInSlot: "123",
//     assetTypeOutSlot: "123",
//     assetAmountOutSlot: "123",
//     mmAddressSlot: "123",
//     feeSlot: "123",
//   },
//   blockNumber: 2,
// };

// writeSlotData(x.slots, x.blockNumber);
// console.log(isSlotDataFilled(x));
