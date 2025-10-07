import { Client, Databases, Account, Storage, Users } from "node-appwrite";

// Admin Client
const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT) // project ID
    .setKey(process.env.NEXT_APPWRITE_KEY); // secret API key

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
    get users() {
      return new Users(client); // Add Users service
    },
  };
};

const createSessionClient = async (session) => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT); // project ID

  if (session) {
    client.setSession(session);
  }

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
};

export { createAdminClient, createSessionClient };
