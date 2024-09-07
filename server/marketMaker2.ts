import { io as Client } from "socket.io-client";

const socket = Client("http://localhost:3000");

// GREEDY MM 

// say that this is a MM
socket.emit("isMarketMaker");

// simulate generating a quote with a a fee

function generateQuote(tradeRequest) {
  const feeAmount = parseFloat((Math.random() * (0.0009 - 0.0005) + 0.0005).toFixed(4)); // random fee between 0.0005 and 0.0009
  return {
    ...tradeRequest,
    mmAddress: "0x3814f9F424874860ffCD9f70f0D4B74b81e791E8",
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