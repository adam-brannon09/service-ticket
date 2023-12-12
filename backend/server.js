const express = require('express');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 8000;
const app = express();

app.get('/', (req, res) => {
    res.send('API is running...');
}
);





app.listen(PORT, () => console.log(`Server running on port ${PORT}`));