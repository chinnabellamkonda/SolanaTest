import { Connection } from '@solana/web3.js';

(async () => {
  // Connect to the Solana local cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  try {
    // Fetch the first available block
    const firstAvailableBlock = await connection.getFirstAvailableBlock();

    console.log('First Available Block:', firstAvailableBlock);
  } catch (error) {
    console.error('Error fetching first available block:', error);
  }
})();
