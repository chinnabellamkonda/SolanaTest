import { Connection, Transaction, PublicKey } from '@solana/web3.js';

async function getNounceInfo(connection: Connection): Promise<string> {
  try {
    const pubKey = new PublicKey("BboRhx7L6PNq5nLmPcrNMgPkmgUZtPumLb62sKq88wmu");
    // Fetch the recent nounce
    const { nounce } = await connection.getNonceAndContext(pubKey);
    
    console.log(`Recent Nonce account info: ${nounce}`);
    console.log(`Recent Nonce context: ${nounce.context}`);
    return nounce;
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
