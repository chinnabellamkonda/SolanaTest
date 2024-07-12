import { Connection, Transaction, PublicKey } from '@solana/web3.js';

(async () => {
  // Connect to the Solana mainnet-beta cluster
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  try {
    // Fetch the transaction count
    const transactionCount = await connection.getTransactionCount();

    if (transactionCount) {
      console.log('Transaction count:', transactionCount);
    } else {
      console.log('Transaction not found');
    }
  } catch (error) {
    console.error('Error fetching transaction:', error);
  }
})();
