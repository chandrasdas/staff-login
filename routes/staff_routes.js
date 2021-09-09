const express = require('express');
const staff_controller = require('../controllers/staff_controller');

const router = express.Router();

router.get('/', staff_controller.staff_index);
// router.get('/:id', blogController.blog_details);


module.exports = router;