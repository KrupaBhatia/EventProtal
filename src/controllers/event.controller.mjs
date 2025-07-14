import db from '../models/index.js'; 
import { DateTime } from 'luxon';

const { Event, User, Category } = db; 


export const createEvent = async (req, res) => {
    try {
      const { title, description, categoryId, publishAt } = req.body;
      const createdBy = req.user.id;
  
    
      const photoPaths = req.files.map(file => file.path); 

      console.log(title , description , categoryId , publishAt , photoPaths , "14");
      const event = await Event.create({
        title,
        description,
        categoryId,
        publishAt,
        photos: photoPaths,
        createdBy
      });
  
      res.status(201).json({ message: 'Event created', event });
    } catch (error) {
      console.error('Create Event Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };





export const getEvents = async (req, res) => {
  try {
    const timezone = req.query.timezone || 'UTC';
    const now = DateTime.now().setZone(timezone);


    console.log('Event associations:', Object.keys(Event.associations)); 

    const events = await Event.findAll({
        where: { isDeleted: false },
        include: [
          {
            model: User,
            as: 'user', 
            attributes: ['id', 'username'],
          },
          {
            model: Category,
            as: 'category', 
            attributes: ['id', 'name'],
          },
        ],
      });

      const formattedEvents = events.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        createdBy: event.user?.username || null,
        category: event.category?.name || null,
        photos: event.photos,
        publishAt: DateTime.fromJSDate(event.publishAt).setZone(timezone).toFormat('yyyy-MM-dd HH:mm:ss'),
        isPublished: DateTime.fromJSDate(event.publishAt).setZone(timezone) <= now,
      }));

    res.status(200).json({ events: formattedEvents });
  } catch (error) {
    console.error('Get Events Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    const { type } = req.query; 
  
    try {
      const event = await db.Event.findByPk(id);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      if (type === 'hard') {
        await event.destroy();
        return res.status(200).json({ message: 'Event permanently deleted' });
      } else {
        event.isDeleted = true;
        await event.save();
        return res.status(200).json({ message: 'Event soft-deleted successfully' });
      }
    } catch (err) {
      console.error('Delete event error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };