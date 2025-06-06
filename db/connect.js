// const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

async function connectToDb() {
    try {
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB using Mongoose successfully');
    } catch (err) {
        console.error('❌ Error connecting to MongoDB:', err);
        throw err;
    }
}

module.exports = { connectToDb };


// Code until week 02:
// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri);

// let db;

// async function connectToDb() {
//     try {
//         await client.connect();
//         db = client.db('cse341am');
//         console.log('Connected to MongoDB successfully');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//         throw error; // Rethrow the error to be handled by the caller
//     }
// }

// function getDb() {
//     if (!db) {
//         throw new Error('Database not initialized. Call connectToDb first.');
//     }
//     return db;
// }

