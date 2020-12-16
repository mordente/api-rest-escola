import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      res.json({id, nome, email});
    }catch(e) {
      return res.status(400).json({errors: e.errors.map((err) => err.message)});
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({attributes: ['id', 'nome', 'email']});
      return res.json(users);
    }catch(e) {
      return res.json(null);
    }
  }

  async retrieve(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      const {id, nome, email} = user;
      return res.json({id, nome, email});
    }catch(e) {
      return res.json(null);
    }
  }

  async update (req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if(!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.']
        })
      }

      await User.update(req.body, {
        where: {id: req.userId},
      }).then(async () => {
        const novosDados = await User.findByPk(req.userId);
        const {id, nome, email} = novosDados;
          return res.json({id, nome, email});
      })
    }catch(e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      }
      );
    }
  }

  async delete(req, res) {
    try {
      const userDeleted = await User.findByPk(req.userId);

      if(!userDeleted) {
        return res.status(400).json({
          errors: ['Usuário não existe.']
        })
      }

      userDeleted.destroy();
      return res.json(userDeleted);

    }catch(e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }
}



export default new UserController();
