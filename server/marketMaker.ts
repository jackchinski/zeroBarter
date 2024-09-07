import { io as Client } from "socket.io-client";

const socket = Client('http://localhost:3000');

// say that this is a MM
socket.emit("isMarketMaker");

// simulate generating a quote with a a fee

function generateQuote(tradeRequest) {
  const feePercentage = Math.random() * 5;
  return {
    ...tradeRequest,
    marketmakerId: socket.id,
    fee: feePercentage.toFixed(2) + "%",
  };
}

socket.on("tradeRequest", (tradeRequest) => {
  console.log("Received trade request: ", tradeRequest);

  // generate a quote and send it to the server
  const quote = generateQuote(tradeRequest);
  console.log("Sending quote: ", quote);
  socket.emit("tradeQuote", quote);
});
