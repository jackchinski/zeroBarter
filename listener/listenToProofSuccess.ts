// simple program for listening to smart contract events
import { ethers } from "ethers";
import { env } from "bun";
import { escrowABI, escrowAddress } from "../ABI/escrowABI";

// infura rpc provider
const provider = new ethers.JsonRpcProvider(env.ETHEREUM_SEPOLIA_RPC_URL);

async function main() {
  const contract = new ethers.Contract(escrowAddress, escrowABI, provider);

  contract.on("ProofSuccess", (orderId) => {
    console.log("**********************************");
    console.log(`* Proof Success *`);
    console.log("**********************************");
    console.log(`OrderId: ${orderId}`);
  });
  // after the order is picked up here, it is assumed that a MM is going to fulfill the order, which
  // will trigger the proof generation system

  console.log("Listening for proof success on the escrow contract...");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});

// bun escrowReceivedSlots.ts
