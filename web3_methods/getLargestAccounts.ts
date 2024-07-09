import { Connection } from '@solana/web3.js';

async function getLargestAccounts(connection: Connection, limit: number): Promise<any[]> {
  try {
    // Fetch the largest accounts
    const largestAccounts = await connection.getLargestAccounts({ limit });

    return largestAccounts;
  } catch (error) {
    throw new Error(`Error fetching largest accounts: ${error}`);
  }
}

(async () => {
  // Connect to the Solana mainnet-beta cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Example: Fetch the top 10 largest accounts
  const limit = 10;

  try {
    const largestAccounts = await getLargestAccounts(connection, limit);
    console.log('Top', limit, 'Largest Accounts:', largestAccounts);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
