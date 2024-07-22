import { Connection, SendOptions, Keypair, Transaction, SystemProgram, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

// Replace with your connection endpoint (e.g. devnet, mainnet-beta)
const connection = new Connection('http://localhost:8899', "confirmed");

const sender = airdropBal(connection)

// Generate a new keypair for the receiver
const receiver = Keypair.generate();


// Fetch the recent blockhash
  const { blockhash } = await connection.getRecentBlockhash();

  // Create a transaction
  const transaction = new Transaction({
    recentBlockhash: blockhash, // Set the recent blockhash
    feePayer: sender.publicKey, // Set the fee payer
  }).add(
    SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: receiver.publicKey,
      lamports: 1 * LAMPORTS_PER_SOL, // Amount in lamports (1 SOL = 1,000,000,000 lamports)
    })
  );
// Sign the transaction with the sender's keypair
const signers = [sender, sender];
const signature = await connection.sendTransaction(transaction, signers);

console.log("signature======", signature)


// Serialize the transaction
const serializedTransaction = await transaction.serialize();

console.log("serializedTransaction======", serializedTransaction)

// Convert the serialized transaction to a base64 string
const base64Transaction = await serializedTransaction.toString('base64');

console.log("serializedTransaction======", base64Transaction)

// Optional options (e.g., skipPreFlight)
const options: SendOptions = {};

async function sendSignedTransaction() {
  try {
    const txid = await connection.sendEncodedTransaction(base64Transaction, options);
    console.log("Transaction sent:", txid);
  } catch (error) {
    if (error.name === 'SendTransactionError') {
      // If SendTransactionError, fetch and log transaction logs
      const logs = await connection.getLogs(error.txId);
      console.error('SendTransactionError:', error.message);
      console.error('Transaction Logs:', logs);
    } else {
      // Handle other errors
      console.error('Error:', error.message);
    }
  }
}

async function airdropBal(connection: Connection) {
  try {
    // Generate a new keypair for the sender (or load an existing one)
    const sender = Keypair.generate();
    await connection.requestAirdrop(sender.publicKey, 10 * LAMPORTS_PER_SOL);
    const bal = await connection.getBalance(sender.publicKey)
    console.log("balance===", bal)
    return sender;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

sendSignedTransaction();
