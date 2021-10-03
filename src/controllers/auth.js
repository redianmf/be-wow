const { users } = require('../../models');

const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
   
      const data = req.body;
  
      const schema = Joi.object({
        email: Joi.string().min(7).email().required(),
        password: Joi.string().min(7).required(),
        fullName: Joi.string().min(2).required(),    
        role: Joi.string().required(),
      });
  
      const { error } = schema.validate(data);
  
      if (error) {
        return res.status(400).send({
          stasus: 'error',
          message: error.details[0].message,
        });
      }
    try {
        const isUserExist = await users.findOne({
            where: {
              email: data.email,
            }
          });

        if(isUserExist){
            return res.send({
                status: 'failed',
                message: 'Please use another email address',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(data.password, salt);

        const regUser = await users.create({
            email: data.email,
            password: encryptedPassword,
            fullName: data.fullName,
            role: data.role,
        });

        const dataToken = {
          id: regUser.id,
        };
        const token = jwt.sign(dataToken, process.env.SECRET_KEY);
  
        res.send({
        status: 'success',
        data: {
          'user': {
              'email': regUser.email,
              token,
          }
        },
         });

    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
  };

exports.login = async (req, res) => {
   
    const data = req.body;

    const schema = Joi.object({
      email: Joi.string().min(7).email().required(),
      password: Joi.string().min(7).required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).send({
        stasus: 'error',
        message: error.details[0].message,
      });
    }
  try {
      const existedUser = await users.findOne({
          where: {
            email: data.email,
          },
          attributes: {
            exclude: ['createdAt','updatedAt']
          },
        });

      const isValid = await bcrypt.compare(req.body.password, existedUser.password);

      if(!isValid){
          return res.send({
              status: 'failed',
              message: 'Email and password did not match',
          });
      }

      const dataToken = {
        id: existedUser.id,
      };
      const token = jwt.sign(dataToken, process.env.SECRET_KEY);

      res.send({
      status: 'success',
      data: {
        'user': {
            'email': existedUser.email,
            token,
        }
      },
       });

  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const {id} = req.params;  
  const data = req.body;

  const schema = Joi.object({
    password: Joi.string().min(7).required(),
  });

  const { error } = schema.validate(data);

  if (error) {
    return res.status(400).send({
      stasus: 'error',
      message: error.details[0].message,
    });
  }
try {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(data.password, salt);

    const updateData = {
      password: encryptedPassword,
    }

    await users.update(updateData, {
      where: {
          id,
        },
    });

    // const dataToken = {
    //   id,
    // };
    // const token = jwt.sign(dataToken, process.env.SECRET_KEY);

    res.send({
    status: 'success',
    data: {
      'user': {
          id,
          // token,
      }
    },
     });

} catch (error) {
  console.log(error);
  res.send({
    status: 'failed',
    message: 'Server Error',
  });
}
};