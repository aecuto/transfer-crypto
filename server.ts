import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://1rpc.io/sepolia");

async function sendEther(
  recipientAddress: string,
  amountInEther: string,
  privateKey: string
) {
  const wallet = new ethers.Wallet(privateKey, provider);

  try {
    // Create a transaction object
    const tx = {
      to: recipientAddress,
      value: ethers.parseEther(amountInEther), // Convert ETH to Wei
    };

    // Send the transaction
    const transaction = await wallet.sendTransaction(tx);
    console.log("Transaction sent! Hash:", transaction.hash);

    // Wait for the transaction to be mined
    const receipt = await transaction.wait();
    console.log("Transaction confirmed in block", receipt?.blockNumber);
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}

async function checkBalance(walletAddress: string) {
  try {
    // Get the balance in Wei
    const balanceWei = await provider.getBalance(walletAddress);

    // Convert balance from Wei to Ether
    const balanceEther = ethers.formatEther(balanceWei);

    console.log(`Balance of ${walletAddress}: ${balanceEther} ETH`);
  } catch (error) {
    console.error("Error checking balance:", error);
  }
}

const server = async () => {
  let mnemonic =
    "floor web uphold garment poet crater menu spoil assume snow crop frown scout flee portion lawsuit clump scale helmet pilot victory memory arch camp";
  let wallet = ethers.Wallet.fromPhrase(mnemonic);

  console.log(wallet);

  await checkBalance(wallet.address);

  const recipient = "0xDbe59d4941bdaE9A867D95c4Fc10c7c9fa0018f4";
  const amountInEther = "0.001";
  await sendEther(recipient, amountInEther, wallet.privateKey);
};

server();
