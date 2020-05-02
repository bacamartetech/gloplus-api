import Schedule from '../schemas/Schedule';
import Episode from '../schemas/Episode';

class ScheduleController {
  async listSchedules(req, res) {
    const schedules = await Schedule.find({}).select('group title url');
    res.json(schedules);
  }

  async getSchedule(req, res) {
    const { id } = req.params;
    const schedule = await Schedule.findById(id);
    res.json(schedule);
  }

  async getEpisodesByScheduleAndDate(req, res) {
    const { id, date } = req.params;
    const schedule = await Schedule.findById(id);
    const episodes = await Episode.find({
      schedule: schedule._id,
      date,
    }).sort('order');
    res.json(episodes);
  }
}

export default new ScheduleController();
