import { Connection, Transaction, PublicKey } from '@solana/web3.js';

(async () => {
  // Connect to the Solana mainnet-beta cluster
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  // Example transaction signature (replace with your own)
  const transactionSignature = '4QV3nLZy8Z6oWynP7CuKV4XJwbCSiy3wzzSs2HRL5SrvrBqN4cxHGHPkBYeR2sQ5XPisFvPpEcthAynynvyu7YWp';

  try {
    // Fetch the transaction details
    const transaction = await connection.getTransaction(transactionSignature);

    if (transaction) {
      console.log('Transaction:', transaction);
    } else {
      console.log('Transaction not found');
    }
  } catch (error) {
    console.error('Error fetching transaction:', error);
  }
})();
