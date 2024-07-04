import { Connection } from '@solana/web3.js';

(async () => {
  // Connect to the local cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Get the block production information
  const blockProduction = await connection.getBlockProduction();

  if (blockProduction) {
    console.log('Block Production Information:', blockProduction);
  } else {
    console.log('Failed to fetch block production information.');
  }
})();
