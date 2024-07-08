import { Connection, Transaction, PublicKey } from '@solana/web3.js';

(async () => {
  // Connect to the Solana mainnet-beta cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Example transaction signature (replace with your own)
  const transactionSignature = '5LuPDbRMofPx18KAkeEKqMsdsG2mWj93h6mzHrQmmqvofkLsCSvS5VMDJj7n3Pw4j7jMjCXE3nwEFzHqMkrxHUDq';

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
