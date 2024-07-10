import { Connection, PublicKey, BlockhashAndFeeCalculator } from '@solana/web3.js';

async function getParsedBlock(connection: Connection, slot: number): Promise<void> {
  try {
    // Fetch the block
    const blockhash = await connection.getRecentBlockhash('confirmed');
    const block = await connection.getBlock(slot, 'confirmed');

    if (!block) {
      throw new Error(`Block at slot ${slot} not found`);
    }

    // Log block details
    console.log(`Block Slot: ${block.blockhash}`);
    console.log(`Previous Blockhash: ${block.previousBlockhash}`);
    console.log(`Parent Slot: ${block.parentSlot}`);
    console.log(`Transactions: ${block.transactions.length}`);
    console.log(`Timestamp: ${new Date(block.blockTime).toLocaleString()}`);
    console.log(`Blockhash: ${blockhash.blockhash}`);
    console.log(`FeeCalculator: ${blockhash}`);

  } catch (error) {
    console.error('Error fetching or parsing block:', error);
  }
}

(async () => {
  // Connect to the Solana local cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Example: Slot number of the block to fetch (replace with actual slot)
  const slot = 64603;

  // Fetch and parse the block
  try {
    await getParsedBlock(connection, slot);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
