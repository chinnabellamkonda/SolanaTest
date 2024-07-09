import { Connection } from '@solana/web3.js';

(async () => {
  // Connect to the Solana local cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  try {
    // Fetch the recent blockhash
    const recentBlockhash = await connection.getRecentBlockhash();

    console.log('Recent Blockhash OBJ:', recentBlockhash);
    console.log('Recent Blockhash:', recentBlockhash.blockhash);
  } catch (error) {
    console.error('Error fetching Recent blockhash:', error);
  }
})();

