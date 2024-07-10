import { Connection, Transaction, PublicKey } from '@solana/web3.js';

async function getNounceInfo(connection: Connection): Promise<string> {
  try {
    const pubKey = new PublicKey("BboRhx7L6PNq5nLmPcrNMgPkmgUZtPumLb62sKq88wmu");
    // Fetch the recent blockhash
    const { nounce } = await connection.getNonce(pubKey);
    
    console.log(`Recent Blockhash (Nonce): ${blockhash}`);
    return blockhash;
  } catch (error) {
    throw new Error(`Error fetching recent blockhash: ${error}`);
  }
}

(async () => {
  // Connect to the Solana local cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Fetch the recent blockhash (nonce)
  try {
    await getNounceInfo(connection);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
