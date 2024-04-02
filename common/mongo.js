const mongoose = require('mongoose');

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const getMongoURL = () => {
    if (process.env.MONGO_USER && process.env.MONGO_PASS) {
        return `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
    } else {
        return `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
    }
}


const connectToMongoDB = async () => {
    try {
        await mongoose.connect(getMongoURL(), mongoOptions);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
};

module.exports = connectToMongoDB;