import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { callContractWithSlots } from "../functions/callContractWithSlots";
import { readSlotData, clearSlotData, isSlotDataFilled, SlotData } from "../slotData/dataManipulation";

const app = express();
const port = 3000;

app.use(bodyParser.json());

async function handleWebhook(req: Request, res: Response): Promise<void> {
  console.log("Webhook received:", req.body);
  if (req.body.status === "DONE") {
    console.log("[SERVER]: got the correct webhook");
    try {
      const slotData = readSlotData();
      if (isSlotDataFilled(slotData)) {
        await processFilledSlotData(slotData, res);
      } else {
        sendBadRequestResponse(res, "No matching process state found");
      }
    } catch (error) {
      handleError(error, res);
    }
  } else {
    sendSuccessResponse(res, "Webhook received");
  }
}

async function processFilledSlotData(slotData: SlotData, res: Response): Promise<void> {
  const { slots, blockNumber } = slotData;
  await callContractWithSlots(slots, blockNumber);
  sendSuccessResponse(res, "Webhook received");
  console.log("[SERVER]: Successfully called the contract with slots");
}

function sendSuccessResponse(res: Response, message: string): void {
  res.status(200).send(message);
}

function sendBadRequestResponse(res: Response, message: string): void {
  res.status(400).send(message);
}

function handleError(error: any, res: Response): void {
  console.error("Error processing webhook:", error);
  res.status(500).send("Internal Server Error");
}

app.post("/webhook", async (req: Request, res: Response) => {
  await handleWebhook(req, res);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
