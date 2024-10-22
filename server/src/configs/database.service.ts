// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv"; 

// Global Variables
export const collections: { 
    user?: mongoDB.Collection
} = {}

let client: mongoDB.MongoClient;

// Initialize Connection
export async function connectToDatabase () {
    dotenv.config();
    client = new mongoDB.MongoClient((process.env.__MONGO_URI__) ? process.env.__MONGO_URI__: "");
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.__MONGO_DB_NAME__);
   
    const userCollection: mongoDB.Collection = db.collection("user");
 
    collections.user = userCollection;
       
    console.log(`Successfully connected to database: ${db.databaseName}`);
 }

 // Close Connection
export async function closeDatabaseConnection() {
    try {
        if (client) {
            await client.close();
            console.log('Database connection closed successfully');
        }
    } catch (error) {
        console.error('Error closing database connection:', error);
        throw error;
    }
}