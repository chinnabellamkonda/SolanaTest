import { Connection, PublicKey, AccountInfo } from '@solana/web3.js';

// Custom type for parsed account data
interface ParsedAccountInfo {
  pubkey: string;
  lamports: number;
  owner: string;
  data: any; // Replace 'any' with the specific data structure type
  executable: boolean;
  rentEpoch: number;
}

async function getParsedAccountInfo(connection: Connection, publicKey: PublicKey): Promise<ParsedAccountInfo | null> {
  try {
    // Fetch the account info
    const accountInfo = await connection.getAccountInfo(publicKey, 'confirmed');

    if (accountInfo === null) {
      throw new Error(`Account ${publicKey.toBase58()} does not exist`);
    }

    // Parse account information
    const parsedAccountInfo: ParsedAccountInfo = {
      pubkey: publicKey.toBase58(),
      lamports: accountInfo.lamports,
      owner: accountInfo.owner.toBase58(),
      data: accountInfo.data, // Adjust parsing based on the account's data structure
      executable: accountInfo.executable,
      rentEpoch: accountInfo.rentEpoch,
    };

    return parsedAccountInfo;
  } catch (error) {
    console.error('Error fetching or parsing account info:', error);
    return null;
  }
}

(async () => {
  // Connect to the Solana mainnet-beta cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Example: Public key of the account to fetch
  const publicKey = new PublicKey('BboRhx7L6PNq5nLmPcrNMgPkmgUZtPumLb62sKq88wmu');

  // Fetch and parse account information
  try {
    const parsedAccountInfo = await getParsedAccountInfo(connection, publicKey);
    if (parsedAccountInfo) {
      console.log('Parsed Account Info:', parsedAccountInfo);
    } else {
      console.log('Account not found or error occurred');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
