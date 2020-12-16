import Aluno from '../models/Aluno';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll();
    return res.json(alunos);
  }

  async store (req, res) {
    try {
      const novoAluno = await Aluno.create(req.body);
      return res.json(novoAluno)
    } catch(e) {
      res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }

  }

  async retrieve(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(401).json({
          errors: ['ID não enviado.']
        })
      }

      const aluno = await Aluno.findByPk(id);

      if(!aluno) {
        return res.status(401).json({
          errors: ['Aluno não encontrado.']
        });
      }
      return res.json(aluno);
    }catch(e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(401).json({
          errors: ['ID não enviado.']
        })
      }

      const alunoDeletado = await Aluno.findByPk(id);

      if(!alunoDeletado) {
        return res.status(401).json({
          errors: ['Aluno não encontrado.']
        })
      }

      alunoDeletado.destroy();
      return res.json(alunoDeletado);
    }catch(e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(401).json({
          errors: ['ID não enviado']
        });
      }

      const aluno = await Aluno.findByPk(id);

      if(!aluno) {
        return res.status(401).json({
          errors: ['Aluno não encontrado.']
        });
      }

      await Aluno.update(req.body, {where: {
        id: id
      }}).then(async () => {
        const novosDados = await Aluno.findByPk(id);
          return res.json(novosDados);
      })
    }catch(e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }

}


export default new AlunoController();
