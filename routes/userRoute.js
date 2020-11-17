const express = require('express');
const router = express.Router();
const userController = require('/app/controllers/userController');

router.post('/', userController.post);
router.post('/register/:id', userController.register);
router.get('/', userController.get);
router.get('/:id', userController.getById);
router.put('/:id', userController.put);
router.delete('/:id', userController.delete);

module.exports = router;