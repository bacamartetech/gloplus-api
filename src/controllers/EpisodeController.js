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
}

export default new EpisodeController();
