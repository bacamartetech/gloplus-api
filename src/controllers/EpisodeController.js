import * as Yup from 'yup';
import mongoose from 'mongoose';
import Episode from '../schemas/Episode';
import Interaction from '../schemas/Interaction';

class EpisodeController {
  async getEpisode(req, res) {
    const episode = await Episode.findById(req.params.id);
    let currentUserInteraction = await Interaction.findOne({
      episode: episode._id,
      user: new mongoose.Types.ObjectId(req.userId),
    });

    if (!currentUserInteraction) {
      currentUserInteraction = {
        like: false,
        score: null,
        review: null,
      };
    }

    return res.json({
      episode,
      currentUserInteraction,
    });
  }

  async updateCurrentUserInteraction(req, res) {
    const schema = Yup.object().shape({
      like: Yup.boolean().required(),
      score: Yup.number(),
      review: Yup.string(),
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'A validação dos campos falhou. Verifique se os dados do objeto estão corretos.' });
    }

    const episode = await Episode.findById(req.params.id);
    let currentUserInteraction = await Interaction.findOne({
      episode: episode._id,
      user: new mongoose.Types.ObjectId(req.userId),
    });

    if (!currentUserInteraction) {
      currentUserInteraction = await Interaction.create({
        episode: episode._id,
        user: new mongoose.Types.ObjectId(req.userId),
        like: false,
        score: null,
        review: null,
      });
    }

    const { like, score, review } = req.body;
    currentUserInteraction.like = like;
    currentUserInteraction.score = score;
    currentUserInteraction.review = review;
    currentUserInteraction.save();

    res.json(currentUserInteraction);
  }
}

export default new EpisodeController();
