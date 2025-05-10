// Connect to MongoDb Database and  create a contact route
const router = require('express').Router();
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        await client.db('admin').command({ ping: 1 });
        console.log('Connected to MongoDB suceessfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

// Connect to the database made before using the routes
run().catch(console.dir);

//Route to get all contacts
router.get('/', async (req, res) => {
    try {
        const database = client.db('cse341am');
        const collection = database.collection('contacts');
        const contacts = await collection.find({}).toArray();
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Error fetching contacts - Internal Error' });
    }
});

//Route to get a contact by id
router.get('/:id', async (req, res) => {
    try {
        const database = client.db('cse341am');
        const collection = database.collection('contacts');
        const contactId = req.params.id;

        if (!ObjectId.isValid(contactId)) {
            return res.status(404).json({ error: 'Contact Id invalid' });
        }

        const query = { _id: new ObjectId(contactId) };
        const contact = await collection.findOne(query);

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.json(contact);
    } catch (error) {
        console.error('Error fetching contact Id:', error);
        res.status(500).json({ error: 'Error fetching contactId - Internal Error' });
    }
});

//Route to create a contact
router.post('/', async (req, res) => {
    try {
        const database = client.db('cse341am');
        const collection = database.collection('contacts');
        const newContact = req.body;

        if (!newContact.firstName || !newContact.lastName || !newContact.email || !newContact.favoriteColor || !newContact.birthday) {
            return res.status(400).json({ error: 'You need to fill all fields!' });
        }

        // Convert birthday to a Date object
        try {
            newContact.birthday = new Date(newContact.birthday);
        } catch (error) {
            return res.status(400).json({ error: 'Invalid date format for birthday. Use YYYY-MM-DD' });
        }

        const result = await collection.insertOne(newContact);
        res.status(201).json({ message: 'Contact created successfully', contactId: result.insertedId });
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ error: 'Error creating contact.' });
    }
});

//Route to update a contact
router.put('/:id', async (req, res) => {
    try {
        const database = client.db('cse341am');
        const collection = database.collection('contacts');
        const contactId = req.params.id;
        const updatedContact = req.body;

        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Contact Id invalid' });
        }

        // Validation for updated fields
        if (updatedContact.birthday) {
            try {
                updatedContact.birthday = new Date(updatedContact.birthday);
            } catch (error) {
                return res.status(400).json({ error: 'Invalid date format for birthday. Use YYYY-MM-DD' });
            }
        }

        const filter = { _id: new ObjectId(contactId) };
        const updateDoc = {
            $set: updatedContact,
        };

        const result = await collection.updateOne(filter, updateDoc);
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.json({ message: 'Contact updated successfully', modifiedCount: result.modifiedCount });
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ error: 'Error updating contact - Internal Error' });
    }
});

//Route to delete a contact
router.delete('/:id', async (req, res) => {
    try {
        const database = client.db('cse341am');
        const collection = database.collection('contacts');
        const contactId = req.params.id;

        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Contact Id invalid' });
        }

        const query = { _id: new ObjectId(contactId) };
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            return res.status(400).json({ error: 'Contact not found' });
        }

        res.json({ message: 'Contact deleted successfully', deletedCount: result.deletedCount });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ error: 'Error deleting contact - Internal Error' });
    }
});

module.exports = router;

