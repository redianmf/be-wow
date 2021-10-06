const { users, profiles } = require('../../models');

exports.editProfile = async (req, res) => {
    const {...data} = req.body;
    const {id} = req.params;

    try {
    const profileData = {
        ...data,
        profileImage: process.env.IMG_PATH + req.file.filename,
    }

    await profiles.update(profileData, {
        where: {
            user_id: id,
        },
    });

    const newProfile = await profiles.findOne({
        where: {
            user_id: id,
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
        include: [{
            model: users,
                as: 'users',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'email', 'password', 'role',]
                }
        }]
      });
  
      res.send({
        status: 'success',
        data : {
           newProfile,
        }
    });
  
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
};

exports.getProfile = async (req, res) => {
    const {id} = req.params;

    try {
    const profile = await profiles.findOne({
        where: {
            user_id: id,
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'user_id'],
        },
        include: [{
            model: users,
                as: 'users',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'fullName', 'password', 'role',]
                }
        }]
    });
  
      res.send({
        status: 'success',
        data : {
           profile,
        }
    });
  
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
};