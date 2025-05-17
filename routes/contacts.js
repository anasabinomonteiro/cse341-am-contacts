const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactcont');

/**
 * @swagger
 * /contacts:
 *  get:
 *  summary: Get all contacts
 *  tags:
 *  - Contacts
 *  responses:
 *  200:
 *  description: A list of contacts
 */
router.get('/', contactsController.getAllContacts);

/**
 * @swagger
 * /contacts/{id}:
 *  get:
 *  summary: Get a contact by ID
 *  tags:
 *  - Contacts
 *  parameters:
 *  - name: id
 *    in: path
 *    required: true
 *    description: The ID of the contact to retrieve
 *    schema:
 *      type: string
 *  responses:
 *  200:
 *  description: A contact object
 *  404:    
 *  description: Contact not found
 */
router.get('/:id', contactsController.getContactById);

/**
 * @swagger
 * /contacts:
 *  post:
 *  summary: Create a new contact
 *  tags:
 *  - Contacts
 *  requestBody:
 *  required: true
 *  content:
 *  application/json:
 *  schema:
 *   type: object
 *  required:
 *  - firstName
 *  - lastName
 *  - email
 *  - favoriteColor
 *  - birthday
 *  properties:
 *  firstName:
 *   type: string
 *  lastName
 *  type: string
 *  email
 *  type: string
 *  favoriteColor
 *  type: string
 *  birthday
 *  type: string
 *  format: date
 *  responses:
 *  201:
 *  description: Contact created successfully
 *  400:
 * description: Invalid request body
 *  500:
 * description: Internal server error
 */
router.post('/', contactsController.createContact);

/** 
 * @swagger
 * /contacts/{id}:
 *  put:    
 * summary: Update a contact by ID
 * tags:
 * - Contacts
 * parameters:
 * - name: id
 *  in: path
 * required: true
 *  description: The ID of the contact to update
 * schema:  
 *  type: string
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 *  type: object
 *  required:
 * - firstName
 * - lastName
 * - email
 * - favoriteColor
 * - birthday
 * properties:
 * firstName:
 *  type: string
 * lastName:
 * type: string
 * email:
 * type: string
 * favoriteColor:
 * type: string
 * birthday:
 * type: string
 * format: date
 * responses:
 * 200:
 * description: Contact updated successfully
 * 404:
 * description: Contact not found
 */
router.put('/:id', contactsController.updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *  delete:
 * summary: Delete a contact by ID
 * tags:
 * - Contacts
 * parameters:
 *  - name: id
 *   in: path
 *  required: true
 * description: The ID of the contact to delete
 * schema:
 *  type: string
 * responses:
 * 200:
 * description: Contact deleted successfully
 * 404:
 * description: Contact not found
 */
router.delete('/:id', contactsController.deleteContact);

module.exports = router;