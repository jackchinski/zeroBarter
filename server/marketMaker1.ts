import { io as Client } from "socket.io-client";
import { env } from "bun";
import { ethers } from "ethers";
import { escrowABI, escrowAddress } from "../ABI/escrowABI";

// CHEAP MM
const socket = Client("http://localhost:3000");

// console.log(env.ETHEREUM_SEPOLIA_RPC_URL);

const provider = new ethers.JsonRpcProvider(env.ETHEREUM_SEPOLIA_RPC_URL);

// say that this is a MM
socket.emit("isMarketMaker");

// simulate generating a quote with a a fee

function generateQuote(tradeRequest) {
  const feeAmount = parseFloat((Math.random() * (0.0005 - 0.0001) + 0.0001).toFixed(4)); // random fee
  return {
    ...tradeRequest,
    mmAddress: `${env.MM_ADDRESS}`,
    marketmakerId: socket.id,
    fee: feeAmount,
    assetAmountOut: parseFloat((tradeRequest.assetAmountOut - feeAmount).toFixed(18)),
  };
}

socket.on("tradeRequest", (tradeRequest) => {
  console.log("Received trade request: ", tradeRequest);

  // generate a quote and send it to the server after a small delay

  setTimeout(() => {
    const quote = generateQuote(tradeRequest);
    console.log("Sending quote: ", quote);
    socket.emit("tradeQuote", quote);
  }, 3000);
});

async function listenForFundsLockedNotification() {
  console.log("[MM1]: Listening for events emitted by Escrow on Sepolia Testnet");

  const contract = new ethers.Contract(escrowAddress, escrowABI, provider);

  contract.on(
    "FundsLockedNotification",
    async (orderId, recipientAddress, assetTypeIn, assetAmountIn, assetTypeOut, assetAmountOut, mmAddress, fee) => {
      if (mmAddress == "0x3814f9F424874860ffCD9f70f0D4B74b81e791E8") {
        // only log the events that matter to this MM
        console.log("********************************************");
        console.log("* Escrow: Recipient has locked their funds *");
        console.log("********************************************");
        console.log("orderInfo:");
        console.log("------------");
        console.log("orderId:", orderId.toString());
        console.log("Recipient address:", recipientAddress);
        console.log("Asset Type In:", assetTypeIn.toString());
        console.log(
          "Asset Amount In:",
          assetAmountIn.toString(),
          "which in ETH is:",
          ethers.formatEther(assetAmountIn)
        );
        console.log("Asset Type Out:", assetTypeOut.toString());
        console.log(
          "Asset Amount Out:",
          assetAmountOut.toString(),
          "which in ETH is:",
          ethers.formatEther(assetAmountOut)
        );
        console.log("mmAddress:", mmAddress);
        console.log("Fee:", fee.toString(), "which in ETH is:", ethers.formatEther(fee));
      }
    }
  );
}

listenForFundsLockedNotification();
