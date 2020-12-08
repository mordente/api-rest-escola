import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      res.json(novoUser);
    }catch(e) {
      return res.status(400).json({errors: e.errors.map((err) => err.message)});
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    }catch(e) {
      return res.json(null);
    }
  }

  async retrieve(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      return res.json(user);
    }catch(e) {
      return res.json(null);
    }
  }

  async update (req, res) {
    try {
      if(!req.params.id) {
        return res.status(400).json({
          errors: ['ID Não enviado.']
        });
      }

      const user = await User.findByPk(req.params.id);

      if(!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.']
        })
      }

      await User.update(req.body, {
        where: {id: req.params.id},
      }).then(async () => {
        const novosDados = await User.findByPk(req.params.id);
          return res.json(novosDados);
      })
    }catch(e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      }
      );
    }
  }

  async delete(req, res) {
    try {
      if(!req.params.id) {
        return res.status(400).json({
          errors: ['ID Não enviado.']
        })
      }

      const userDeleted = await User.findByPk(req.params.id);

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
