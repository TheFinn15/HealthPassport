const express = require('express');
const userController = require('../controllers/User.controller');
const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  await userController.userController.getUsers(req, res);
});

router.get('/:id', async (req, res) => {
  await userController.userController.getUserById(req, res, req.params.id);
});

router.post('/', async (req, res) => {
  await userController.userController.createUser(req, res);
});

router.put('/:id', async (req, res) => {
  await userController.userController.editUser(req, res, req.params.id);
});

router.delete('/:id', async (req, res) => {
  await userController.userController.deleteUser(req, res, req.params.id);
});


module.exports = router;
