// simple program for listening to smart contract events
import { ethers } from "ethers";
import { env } from "bun";
import { escrowABI, escrowAddress } from "../ABI/escrowABI";

// infura rpc provider
const provider = new ethers.JsonRpcProvider(env.ETHEREUM_SEPOLIA_RPC_URL);

async function main() {
  const contract = new ethers.Contract(escrowAddress, escrowABI, provider);

  contract.on("WithdrawSuccess", (mmAddress, _orderId) => {
    console.log("**********************************");
    console.log(`* WITHDRAW SUCCESS *`);
    console.log("**********************************");
    console.log(`Order ID: ${_orderId}`);
    console.log(`mmAddress: ${mmAddress}`);
  });
  // after the order is picked up here, it is assumed that a MM is going to fulfill the order, which
  // will trigger the proof generation system

  console.log("Listening for withdraw success on escrow...");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});

