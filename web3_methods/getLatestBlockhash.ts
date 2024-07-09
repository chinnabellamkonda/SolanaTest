import { Connection } from '@solana/web3.js';

(async () => {
  // Connect to the Solana local cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  try {
    // Fetch the latest blockhash
    const latestBlockhash = await connection.getLatestBlockhash();

    console.log('Latest Blockhash OBJ:', latestBlockhash);
    console.log('Latest Blockhash:', latestBlockhash.blockhash);
  } catch (error) {
    console.error('Error fetching latest blockhash:', error);
  }
})();

