import { Connection } from '@solana/web3.js';

async function getMinimumLedgerSlot(connection: Connection): Promise<void> {
  try {
    // Fetch the minimum ledger slot
    const minSlot = await connection.getMinimumLedgerSlot();
    
    console.log(`Minimum Ledger Slot: ${minSlot}`);
  } catch (error) {
    throw new Error(`Error fetching minimum ledger slot: ${error}`);
  }
}

(async () => {
  // Connect to the Solana local cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Fetch the minimum ledger slot
  try {
    await getMinimumLedgerSlot(connection);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
