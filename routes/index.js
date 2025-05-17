const router = require('express').Router();

/**
 * @swagger
 * /:
 * get:
 * summary: Welcome to the home page
 * description: This is the home page of the API.
 * responses:
 * 200:
 * description: success
 * content:
 * text/plain:
 * schema:
 * type: string
 * example: Welcome to the home page!   
 */
router.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

module.exports = router;