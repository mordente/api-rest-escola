import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O campo nome deve ter entre 3 e 255 caracteres.'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'O email já existe',
        },
        validate: {
          isEmail: {
            msg: 'Insira um e-mail válido.'
          }
        }
      },

      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },

      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 255],
            msg: 'A senha precisa ter entre 6 e 255 caracteres.'
          }
        },
      },
    }, {
      sequelize,
    });

    this.addHook('beforeCreate', async (user) => {
        user.password_hash = await bcryptjs.hash(user.password, 8);
    })

    this.addHook('beforeUpdate', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });



    return this;
  }
}
