import { Connection } from '@solana/web3.js';

(async () => {
  // Connect to the Solana local cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  try {
    // Fetch the recent blockhash
    const recentBlockhash = await connection.getRecentBlockhashAndContext();

    console.log('Recent Blockhash:', recentBlockhash.value.blockhash);
    console.log('Recent Blockhash Context:', recentBlockhash.context);
  } catch (error) {
    console.error('Error fetching recent blockhash:', error);
  }
})();

