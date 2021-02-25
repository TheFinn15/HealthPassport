const users = require('../models/User.model');

class userController {
  async getCurrentUser(req, res) {
    res.send();
  }
  async getUsers(req, res) {
    res.send(await users.userModel.findAll());
  }
  async getUserById(req, res, id) {
    const user = await users.userModel.findByPk(id);
    res.send(user !== null ? user : 'User not exists');
  }
  async createUser(req, res) {
    const userInfo = req.body;
    try {
      let newUsers = await users.userModel.create({
        fullName: userInfo['fullName'],
        phone: userInfo['phone'],
        email: userInfo['email']
      });

      await users.userModel.sync();

      res.send(newUsers);
    } catch (e) {
      res.status(400);
      res.send(e);
    }
  }
  async editUser(req, res, id) {
    const curUser = await users.userModel.findByPk(id);
    const newData = req.body;
    if (curUser !== null) {

      if (newData['fullName'] !== undefined) curUser.fullName = newData['fullName'];
      if (newData['email'] !== undefined) curUser.email = newData['email'];
      if (newData['phone'] !== undefined) curUser.phone = newData['phone'];

      await curUser.save();

      res.send(curUser)
    } else {
      res.send('User not exists');
    }
  }
  async deleteUser(req, res, id) {
    const curUser = await users.userModel.findByPk(id);
    if (curUser !== null) {
      await curUser.destroy();

      res.send('User was deleted');
    } else {
      res.send('User not exists');
    }
  }
}


module.exports.userController = new userController();
