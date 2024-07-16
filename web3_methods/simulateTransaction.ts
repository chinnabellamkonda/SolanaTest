import { Connection, Keypair, PublicKey, SystemProgram, Transaction, TransactionInstruction, simulateTransaction } from '@solana/web3.js';

// Establish connection to the Solana cluster
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

async function simulateSolanaTransaction(sender: Keypair, recipientPubkey: PublicKey, amount: number) {
  try {
    // Fetch recent blockhash (required for transaction construction)
    const { blockhash } = await connection.getRecentBlockhash();

    // Example: Create a transaction instruction to transfer SOL
    const transactionInstruction = SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: recipientPubkey,
      lamports: amount, // Amount in lamports (1 SOL = 1,000,000,000 lamports)
    });

    // Example: Create a transaction with the instruction
    const transaction = new Transaction().add(transactionInstruction);

    // Simulate the transaction to check validity
    const simulatedTransaction = await simulateTransaction(connection, transaction, [sender]);

    // Check if the transaction simulation succeeded
    if (simulatedTransaction.err) {
      console.error('Transaction simulation failed:', simulatedTransaction.err);
    } else {
      console.log('Transaction simulation succeeded');
      // Proceed with sending the transaction if simulation was successful
      // const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);
      // console.log('Transaction confirmed with signature:', signature);
    }
  } catch (error) {
    console.error('Error simulating transaction:', error);
  }
}

async function main() {
  // Generate a new keypair for the sender account
  const senderKeypair = Keypair.generate();

  // Generate a new keypair for the recipient account (for example purposes)
  const recipientKeypair = Keypair.generate();
  const recipientPubkey = recipientKeypair.publicKey;

  // Airdrop SOL to the sender account to cover transaction fees
  await connection.requestAirdrop(senderKeypair.publicKey, 10 * 1000000000); // Request 10 SOL

  // Simulate a transaction to fund the recipient account using the sender's keypair
  const lamportsToTransfer = 5 * 1000000000; // 5 SOL in lamports
  await simulateSolanaTransaction(senderKeypair, recipientPubkey, lamportsToTransfer);
  console.log('Transaction simulation complete.');

  // Print out the sender and recipient public keys for reference
  console.log('Sender public key:', senderKeypair.publicKey.toBase58());
  console.log('Recipient public key:', recipientPubkey.toBase58());
}

main().catch((error) => {
  console.error('Error simulating transaction:', error);
});
