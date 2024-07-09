import { Connection } from '@solana/web3.js';

(async () => {
  // Connect to the Solana local cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  try {
    // Fetch the latest blockhash
    const latestBlockhash = await connection.getLatestBlockhashAndContext();

    console.log('Latest Blockhash:', latestBlockhash.value.blockhash);
    console.log('Latest Blockhash Context:', latestBlockhash.context);
  } catch (error) {
    console.error('Error fetching latest blockhash:', error);
  }
})();

