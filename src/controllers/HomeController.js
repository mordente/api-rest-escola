import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    try {
      const novoAluno = await Aluno.create({
        nome: 'Pedro',
        sobrenome: 'Montano',
        email: 'pedrinho@gmail.com',
        idade: 31,
        peso: 71.5,
        altura: 1.24
      })
      res.json(novoAluno);
    }catch(e) {
      console.log(e);
    }
  }
}


export default new HomeController();
