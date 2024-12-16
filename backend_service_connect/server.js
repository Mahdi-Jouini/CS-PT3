const express = require('express');
const cors = require('cors');
const db = require('./models/index.js');
const categoriesRoutes = require('./routes/categoriesRoutes.js');
const servicesRoutes = require('./routes/servicesRoutes.js');
const providerRoutes = require('./routes/providerRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const authRoutes = require('./routes/authRoutes');
const verifyAuth = require('./middlewares/verifyAuth');

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected!');
    await db.sequelize.sync({ alter: true });
  } catch (err) {
    console.error('Database connection failed:', err);
  }
})();

app.use('/categories', categoriesRoutes);
app.use('/services', servicesRoutes);
app.use('/providers', providerRoutes)
app.use('/reservations', reservationRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Home Services API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
