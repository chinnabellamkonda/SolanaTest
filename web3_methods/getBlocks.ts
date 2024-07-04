import { Connection } from '@solana/web3.js';

(async () => {
  // Connect to the mainnet-beta cluster
  const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

  // Define the range of slots to fetch blocks for
  const startSlot = 39334;
  const endSlot = 39339;

  // Get the blocks within the specified range
  const blocks = await connection.getBlocks(startSlot, endSlot);

  if (blocks) {
    console.log(`Blocks from slot ${startSlot} to ${endSlot}:`, blocks);
  } else {
    console.log('Failed to fetch blocks.');
  }
})();
