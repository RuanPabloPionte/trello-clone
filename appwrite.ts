import { Client, ID, Databases, Storage, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLUC_APPWRITE_PROJECT_ID!);

const accout = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, accout, databases, storage, ID };
