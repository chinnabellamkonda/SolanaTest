import { Connection, Keypair, Transaction, SystemProgram } from '@solana/web3.js';

(async () => {
  // Connect to the Solana mainnet-beta cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Generate a random keypair for the sake of example
  const keypair = Keypair.generate();

  // Fetch a recent blockhash
  const { blockhash } = await connection.getRecentBlockhash();

  // Create a simple transaction
  const transaction = new Transaction({
    recentBlockhash: blockhash,
    feePayer: keypair.publicKey,
  }).add(
    SystemProgram.transfer({
      fromPubkey: keypair.publicKey,
      toPubkey: keypair.publicKey,
      lamports: 1,
    })
  );

  // Get the message from the transaction
  const message = transaction.compileMessage();

  try {
    // Fetch the fee for the message
    const fee = await connection.getFeeForMessage(message);

    console.log('Fee for Message:', fee);
  } catch (error) {
    console.error('Error fetching fee for message:', error);
  }
})();
