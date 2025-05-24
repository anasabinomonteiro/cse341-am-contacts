const Contact = require('../models/validate');

// Get all contacts
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching contacts - Internal Error', error: err });
    }
};

// Get a contact by ID
exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(contact);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching contact or invalid ID', error: err });
    }
};

// Create a new contact
exports.createContact = async (req, res) => {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({ message: 'You need to fill all fields!' });
    }

    try {
        const contact = new Contact({
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday: new Date(birthday),
        });
        const savedContact = await contact.save();
        res.status(201).json({ message: 'Contact created successfully', id: savedContact._id });
    } catch (err) {
        res.status(500).json({ message: 'Error creating contact', error: err });
    }
};


// Update a contact by ID
exports.updateContact = async (req, res) => {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({ message: 'You need to fill all fields!' });
    }

    try {
        const result = await Contact.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, email, favoriteColor, birthday: new Date(birthday) },
            { new: true }
        );
        if (!result) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(204).send(); // No content to send back
    } catch (err) {
        res.status(500).json({ message: 'Error updating contact', error: err });
    }
};

// Delete a contact by ID
exports.deleteContact = async (req, res) => {
    try {
        const result = await Contact.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Error deleting contact', error: err });
    }
};
