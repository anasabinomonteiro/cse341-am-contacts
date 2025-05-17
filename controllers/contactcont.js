const db = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const contactCollection = () => db.getDb().collection('contacts');

// Get all contacts
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await contactCollection().find({}).toArray();
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching contacts - Internal Error', error: err });
    }
};

// Get a contact by ID
exports.getContactById = async (req, res) => {
    const idParam = req.params.id;

    if (!ObjectId.isValid(idParam)) {
        return res.status(400).json({ message: 'Invalid contact ID' });
    }

    try {
        const id = new ObjectId(String(idParam));
        const contact = await contactCollection().findOne({ _id: id });

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(contact);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching contact - Internal Error', error: err });
    }
};

// Create a new contact
exports.createContact = async (req, res) => {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({ message: 'You need to fill all fields!' });
    }

    try {
        const result = await contactCollection().insertOne({
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday: new Date(birthday),
        });
        res.status(201).json({ message: 'Contact created successfully', id: result.insertedId });
    } catch (err) {
        res.status(500).json({ message: 'Error creating contact - Internal Error', error: err });
    }
};


// Update a contact by ID
exports.updateContact = async (req, res) => {
    const idParam = req.params.id;
    if (!ObjectId.isValid(idParam)) {
        return res.status(400).json({ message: 'Invalid contact ID' });
    }

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({ message: 'You need to fill all fields!' });
    }
    try {
        const id = new ObjectId(String(idParam));
        const result = await contactCollection().updateOne(
            { _id: id },
            {
                $set: {
                    firstName,
                    lastName,
                    email,
                    favoriteColor,
                    birthday: new Date(birthday),
                },
            }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(204).send(); // No content to send back
    } catch (err) {
        res.status(500).json({ message: 'Error updating contact - Internal Error', error: err });
    }
};

// Delete a contact by ID
exports.deleteContact = async (req, res) => {
    const idParam = req.params.id;
    if (!ObjectId.isValid(idParam)) {
        return res.status(400).json({ message: 'Invalid contact ID' });
    }

    try {
        const id = new ObjectId(String(idParam));
        const result = await contactCollection().deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Error deleting contact - Internal Error', error: err });
    }
};
