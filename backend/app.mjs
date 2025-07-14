import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/auth.routes.mjs';
import eventRoutes from './src/routes/events.routes.mjs';
import adminRoutes from './src/routes/admin.routes.mjs';
import categoryRoutes from './src/routes/category.routes.mjs';


const app = express();

app.use(express.json());
app.use(cors());

app.post('/test', (req, res) => {
  console.log('Request received at /test');
  console.log('Request body:', req.body);
  res.send('Postman is working!');
});

app.use('/api/auth', authRoutes);

app.use('/api/events', eventRoutes);


app.use('/api/admin', adminRoutes);


app.use('/api/categories', categoryRoutes);




export default app;
