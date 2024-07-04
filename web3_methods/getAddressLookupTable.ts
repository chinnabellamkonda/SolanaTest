import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

// Replace with the actual address of your Solana node (or local node)
const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

// Replace with the public key of the Address Lookup Table account
const lookupTableAddress = new PublicKey("BBN3eSHv7X6egbnDTQYWih3YuFBDMvDtYdEAJTg9agYP");

async function getLookupTableEntries(): Promise<Record<string, string> | null> {
  try {
    const lookupTableAccount = await connection.getAddressLookupTable(lookupTableAddress);

    if (!lookupTableAccount.value) {
      console.warn("Address Lookup Table not found:", lookupTableAddress.toString());
      return null;
    }

    // Extract entries from the lookup table data
    const entries: Record<string, string> = {};
    for (const entry of lookupTableAccount.value.state.addresses) {
      entries[entry.toBase58()] = entry.data.toString("utf-8"); // Assuming data is a string
    }

    return entries;
  } catch (error) {
    console.error("Error fetching address lookup table:", error);
    return null;
  }
}

// Example usage
(async () => {
  const entries = await getLookupTableEntries();

  if (entries) {
    console.log(`Lookup Table Entries: ${JSON.stringify(entries)}`);
    for (const key in entries) {
      console.log(`${key}: ${entries[key]}`);
    }
  } else {
    console.log("Failed to retrieve lookup table entries.");
  }
})();
