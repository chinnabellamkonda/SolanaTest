import { Connection } from '@solana/web3.js';

async function getMinimumBalanceForRentExemption(connection: Connection, dataSize: number): Promise<void> {
  try {
    // Fetch the minimum balance required for rent exemption for the specified account size
    const minBalance = await connection.getMinimumBalanceForRentExemption(dataSize);
    
    console.log(`Minimum Balance for Rent Exemption (data size: ${dataSize}): ${minBalance} lamports`);
  } catch (error) {
    throw new Error(`Error fetching minimum balance for rent exemption: ${error}`);
  }
}

(async () => {
  // Connect to the Solana mainnet-beta cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Example: Fetch the minimum balance for rent exemption for an account size of 100 bytes
  const dataSize = 100;
  try {
    await getMinimumBalanceForRentExemption(connection, dataSize);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
