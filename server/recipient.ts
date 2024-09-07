import { io as Client } from "socket.io-client";

const socket = Client("http://localhost:3000");

let orderId = 1;

const tradeRequest = {
  orderId: orderId,
  recipientAddress: "0x2F02dE1E2F3010E3BDBe2B05bc07701C8044e801",
  mmAddress: "",
  assetTypeIn: "SepoliaETH", // can be any arbitrary token or even digital asset
  amountIn: 0.001,
  assetTypeOut: "SepoliaETH",
  assetAmountOut: 0.001,
};

console.log("Sending trade request: ", tradeRequest);
socket.emit("tradeRequest", tradeRequest);

// listen for multiple quotes from MMs
socket.on("tradeQuote", (quote) => {
  console.log("Received trade quote: ", quote);
});
