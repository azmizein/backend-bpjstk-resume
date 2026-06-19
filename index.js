const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const resumeRoutes = require('./routes/resumeRoutes');

dotenv.config();

const app = express();

app.use(cors());
// Increase payload limit for base64 images
app.use(express.json({ limit: '50mb' }));

app.use('/', resumeRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
