import axios from "axios";
import { env } from "bun";
import { getSlots } from "./getSlots";
import { transactionReceiptAddress } from "../ABI/transactionReceiptABI";

let storageProofsQueryId = "";

export async function sendToStorageProofs(slots: ReturnType<typeof getSlots>, blockNumber: number) {
  const ngrokUrl = env.NGROK_URL + "/webhook";

  console.log("[NGROK URL]: " + ngrokUrl);

  const herodotusQuery = {
    destinationChainId: "11155111",
    fee: "0",
    data: {
      "11155111": {
        [`block:${blockNumber}`]: {
          accounts: {
            [transactionReceiptAddress]: {
              slots: [
                slots.orderIdSlot,
                slots.recipientAddressSlot,
                slots.assetTypeInSlot,
                slots.assetAmountInSlot,
                slots.assetTypeOutSlot,
                slots.assetAmountOutSlot,
                slots.mmAddressSlot,
                slots.feeSlot,
              ],
            },
          },
        },
      },
    },
    webhook: {
      url: ngrokUrl,
      headers: {
        "Content-Type": "application/json",
      },
    },
  };

  console.log("Storage Proofs Query", herodotusQuery);

  if (!storageProofsQueryId) {
    const resp = await axios
      .post<{ internalId: string }>("https://api.herodotus.cloud/submit-batch-query", herodotusQuery, {
        params: {
          apiKey: env.STORAGE_PROOFS_API_KEY,
        },
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });

    storageProofsQueryId = resp.data.internalId;
  }

  console.log("Storage Proofs Query ID:", storageProofsQueryId);
  const url = `https://dashboard.herodotus.dev/explorer/query/${storageProofsQueryId}`;
  const clicableLink = `\x1b]8;;${url}\x1b\\${url}\x1b]8;;\x1b\\`;
  console.log(`See the status of the query here: ${clicableLink}`);
}
