import { Connection, PublicKey, AccountInfo } from '@solana/web3.js';

// Custom type for parsed account data
interface ParsedAccountInfo {
  pubkey: string;
  lamports: number;
  owner: string;
  data: any;
  executable: boolean;
  rentEpoch: number;
}

async function getMultipleParsedAccounts(connection: Connection, publicKeys: PublicKey[]): Promise<ParsedAccountInfo[]> {
  try {
    // Fetch information about multiple accounts
    const accountsInfo = await connection.getMultipleAccountsInfo(publicKeys);
    
    // Parse account information
    const parsedAccountsInfo: ParsedAccountInfo[] = accountsInfo.map((accountInfo, index) => {
      if (accountInfo) {
        return {
          pubkey: publicKeys[index].toBase58(),
          lamports: accountInfo.lamports,
          owner: accountInfo.owner.toBase58(),
          data: accountInfo.data.toString(), // You can customize this parsing as needed
          executable: accountInfo.executable,
          rentEpoch: accountInfo.rentEpoch,
        };
      } else {
        throw new Error(`Account ${index + 1}: Not found`);
      }
    });

    return parsedAccountsInfo;
  } catch (error) {
    throw new Error(`Error fetching multiple parsed accounts info: ${error}`);
  }
}

(async () => {
  // Connect to the Solana mainnet-beta cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Example: Public keys of accounts to fetch
  const publicKeys = [
    new PublicKey('BboRhx7L6PNq5nLmPcrNMgPkmgUZtPumLb62sKq88wmu') 
    ];

  // Fetch and parse information about the specified accounts
  try {
    const parsedAccountsInfo = await getMultipleParsedAccounts(connection, publicKeys);
    parsedAccountsInfo.forEach((accountInfo, index) => {
      console.log(`Account ${index + 1}:`, accountInfo);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
