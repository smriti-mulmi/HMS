const mongoose = require('mongoose'); 

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDB connected'); 
    })
    .catch(err => console.error('Error:', err));