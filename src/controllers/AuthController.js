import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../schemas/User';

import authConfig from '../config/auth';

class AuthController {
  async register(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().required().email(),
      password: Yup.string().required(),
      name: Yup.string().required(),
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'A validação dos campos falhou. Verifique se está tudo preenchido.' });
    }

    const { email, password, name } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: 'O e-mail informado já foi utilizado.' });
    }

    const user = await User.create({ email, password, name });

    return res.json(user);
  }

  async session(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'A validação dos campos falhou. Verifique se está tudo preenchido.' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'O usuário especificado não existe.' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'A senha informada está incorreta.' });
    }

    const { id, name } = user;

    return res.json({
      user: { id, email, name },
      token: jwt.sign({ id }, authConfig.secret, { expiresIn: '30d' }),
    });
  }
}

export default new AuthController();
