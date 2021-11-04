const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '617cb5ba1e3c9dc1e373fa2b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Somewhere where is not where you are now.',
            price,
            geometry: {
              type: 'Point',
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
            ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dj1kjkzsp/image/upload/v1635912474/YelpCamp/zx0t4a8m5y0hd4mbnp3g.jpg',
                  filename: 'YelpCamp/zx0t4a8m5y0hd4mbnp3g',
                },
                {
                  url: 'https://res.cloudinary.com/dj1kjkzsp/image/upload/v1635912479/YelpCamp/y5ge3ohhhjupri50prhn.jpg',
                  filename: 'YelpCamp/y5ge3ohhhjupri50prhn',
                }
              ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});