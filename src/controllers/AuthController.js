import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../schemas/User';
import Avatar from '../schemas/Avatar';
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

    const {
      email, password, name,
    } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: 'O e-mail informado já foi utilizado.' });
    }

    const avatar = await Avatar.findOne({});

    const user = await User.create({
      email, password, name, avatar: avatar._id,
    });

    return res.json({
      id: user._id,
      email,
      name: user.name,
      token: jwt.sign({ id: user._id }, authConfig.secret, { expiresIn: '30d' }),
    });
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

    return res.json({
      id: user._id,
      email,
      name: user.name,
      token: jwt.sign({ id: user._id }, authConfig.secret, { expiresIn: '30d' }),
    });
  }

  async avatars(req, res) {
    const avatars = await Avatar.find({}).select('name url');
    res.json(avatars);
  }

  async profile(req, res) {
    const user = await User.findById(req.userId);
    await user.populate('avatar').execPopulate();
    await user.populate('schedule').execPopulate();
    res.json(user);
  }

  async updateProfile(req, res) {
    const schema = Yup.object().shape({
      password: Yup.string().required(),
      name: Yup.string().required(),
      avatarId: Yup.string(),
      scheduleId: Yup.string().nullable(),
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'A validação dos campos falhou. Verifique se está tudo preenchido.' });
    }

    const {
      password, name, avatarId, scheduleId,
    } = req.body;

    let avatar = null;
    if (avatarId) {
      avatar = new mongoose.Types.ObjectId(avatarId);
    }

    let schedule = null;
    if (scheduleId) {
      schedule = new mongoose.Types.ObjectId(scheduleId);
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(400).json({ error: 'O usuário atual não existe. Provalmente foi excluído.' });
    }

    user.password = password;
    user.name = name;
    user.avatar = avatar;
    user.schedule = schedule;
    user.save();
    await user.populate('avatar').execPopulate();
    await user.populate('schedule').execPopulate();

    return res.json(user);
  }

  async updateProfileSchedule(req, res) {
    const schema = Yup.object().shape({
      scheduleId: Yup.string().nullable(),
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'A validação dos campos falhou. Verifique se está tudo preenchido.' });
    }

    const { scheduleId } = req.body;

    let schedule = null;
    if (scheduleId) {
      schedule = new mongoose.Types.ObjectId(scheduleId);
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(400).json({ error: 'O usuário atual não existe. Provalmente foi excluído.' });
    }

    user.schedule = schedule;
    user.save();
    await user.populate('avatar').execPopulate();
    await user.populate('schedule').execPopulate();

    return res.json(user);
  }
}

export default new AuthController();
