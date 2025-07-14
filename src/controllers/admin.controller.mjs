import db from '../../config/sequelize.js';
import { DateTime } from 'luxon';

const { Event } = db;

export const getAllEventsWithStatus = async (req, res) => {
  try {
    const { status = 'all', timezone = 'UTC' } = req.query;

    const now = DateTime.now().setZone(timezone).toJSDate();

    const where = {
      isDeleted: false
    };

    if (status === 'published') {
      where.publishAt = { [db.Sequelize.Op.lte]: now };
    } else if (status === 'unpublished') {
      where.publishAt = { [db.Sequelize.Op.gt]: now };
    }

    const events = await Event.findAll({
      where,
      order: [['publishAt', 'DESC']]
    });

    res.status(200).json({ events });
  } catch (err) {
    console.error('Error fetching admin events:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
