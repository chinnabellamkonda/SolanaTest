import { Connection, PublicKey } from '@solana/web3.js';

async function getTransactionsByAddresses(addresses: string[]) {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  try {
    // Convert addresses to PublicKeys
    const publicKeys = addresses.map(address => new PublicKey(address));

    // Fetch recent transaction signatures involving the specified addresses
    const signatures = await Promise.all(
      publicKeys.map(async (publicKey) => {
        const sigs = await connection.getConfirmedSignaturesForAddress2(publicKey, {
          limit: 10, // Number of signatures to fetch per address
        });
        return sigs;
      })
    );


    // Flatten signatures array
    const allSignatures = signatures.flat();

    // Fetch transactions for each signature
    const transactions = await Promise.all(
      allSignatures.map(async (signature) => {
        try {
          const transaction = await connection.getConfirmedTransaction(signature.signature);
          return transaction;
        } catch (error) {
          console.error('Error fetching transaction:', error);
          return null;
        }
      })
    );

    console.log('Transactions:', transactions.filter(Boolean)); // Filter out null values

  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
}

// Replace with the actual addresses you want to query
const addresses = [ "9mLs5EGBtCfEEV1wFuRAZwmyVQes7zTSqbvUbi25FD7P"  ]

getTransactionsByAddresses(addresses).catch((err) => {
  console.error('Error fetching transactions:', err);
});
