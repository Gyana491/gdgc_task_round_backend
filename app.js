const express = require('express');
const dotenv = require('dotenv');
const listingRoutes = require('./routes/listing');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/listing', listingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 