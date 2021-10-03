// Controllers
const { users } = require('../../models');

exports.getUsers = async (req, res) => {
  try {
    const allUsers = await users.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'role'],
      },
    });

    res.send({
      status: 'success',
      data : {users : allUsers}
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.deleteUser = async (req,res) => {
  try {
    const { id } = req.params;
    
    await users.destroy({
      where:{
        id,
      },
    });

    res.send({
      status: 'success',
      data : {
        id,
      }
    });
    
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
}
