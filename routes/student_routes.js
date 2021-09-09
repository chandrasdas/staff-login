const express = require('express');
const student_controller = require('../controllers/student_controller');

const router = express.Router();

//router.get('/create', blogController.blog_create_get);
//router.post('/', blogController.blog_create_post);
//router.delete('/:id', blogController.blog_delete);

router.post('/search', student_controller.student_search);
router.get('/', student_controller.student_index);
router.get('/details/:id', student_controller.student_details);


module.exports = router;