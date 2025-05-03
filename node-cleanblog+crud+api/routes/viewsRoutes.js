const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/viewsController');

router.get('/', viewsController.getHome);
router.get('/about', viewsController.getAbout);

module.exports = router;