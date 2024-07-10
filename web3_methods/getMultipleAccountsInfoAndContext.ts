import { Connection, PublicKey } from '@solana/web3.js';

async function getMultipleAccountsInfoAndContext(connection: Connection, publicKeys: PublicKey[]): Promise<void> {
  try {
    // Fetch information about multiple accounts and the context
    const { context, value: accountsInfo } = await connection.getMultipleAccountsInfoAndContext(publicKeys);
    
    console.log(`Context Slot: ${context.slot}`);
    
    accountsInfo.forEach((accountInfo, index) => {
      if (accountInfo) {
        console.log(`Account ${index + 1}:`, {
          lamports: accountInfo.lamports,
          owner: accountInfo.owner.toBase58(),
          data: accountInfo.data.toString(),
          executable: accountInfo.executable,
          rentEpoch: accountInfo.rentEpoch,
        });
      } else {
        console.log(`Account ${index + 1}: Not found`);
      }
    });
  } catch (error) {
    throw new Error(`Error fetching multiple accounts info and context: ${error}`);
  }
}

(async () => {
  // Connect to the Solana local cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Example: Public keys of accounts to fetch
  const publicKeys = [
    new PublicKey('CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN'),
    new PublicKey('BboRhx7L6PNq5nLmPcrNMgPkmgUZtPumLb62sKq88wmu'),
    new PublicKey('3pof3d9r3i7K7KHQcHATjsrRzbaphYXEvHeW1xYv8q76')
  ];

  // Fetch information about the specified accounts and context
  try {
    await getMultipleAccountsInfoAndContext(connection, publicKeys);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
