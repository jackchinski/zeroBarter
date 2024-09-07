// basic RFG messaging system, between a recipient and MM

import { Server, Socket } from "socket.io";

const io = new Server(3000);

// custom socket to check for the 
interface CustomSocket extends Socket {
  isMarketMaker?: boolean; 
}

io.on("connection", (socket: CustomSocket) => {
  console.log("A client connected:", socket.id);

  // check if they are a MM
  socket.on("isMarketMaker", () => {
    socket.isMarketMaker = true;
    console.log(`Market maker connected: ${socket.id}`);
  });

  // listen for order requests
  socket.on("tradeRequest", (tradeRequest) => {
    console.log("Received trade request from user:", tradeRequest);

    // broadcast the trade request to all connected MMs
    io.sockets.sockets.forEach((s: CustomSocket) => {
      if (s.isMarketMaker) {
        s.emit("tradeRequest", tradeRequest);
      }
    });
  });

  // listen for MM quotes
  socket.on("tradeQuote", (quote) => {
    console.log("Received quote from MM: ", quote);

    // send the quote to the recipient
    socket.broadcast.emit("tradeQuote", quote);

    socket.on("disconnect", () => {
      console.log("Client disconnected: ", socket.id);
    });
  });
});

console.log("Socket.IO running on server http://localhost:3000/");
