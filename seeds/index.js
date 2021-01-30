const  mongoose                = require("mongoose"),
       cities                  = require('./cities'),
       { places, descriptors } = require('./seedHelpers'),
       Campground              = require("../models/campground"),
       Review                  = require("../models/review");

mongoose.connect('mongodb://localhost:27017/yelp_camp1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
		//Remove all campgrounds
		await Campground.deleteMany({});
    	//add a few campgrounds
    	for(let i = 0; i < 300; i++) {
            const random1000 = Math.floor(Math.random() * 1000);
            const price = Math.floor(Math.random() * 20) + 10;
    		    const camp = new Campground ({
                author: '5ff9f1c07a929463a0eec27e',
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                title: `${sample(descriptors)} ${sample(places)}`, 
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
                price,
                geometry: { 
                  type: 'Point', 
                  coordinates: [
                    cities[random1000].longitude, 
                    cities[random1000].latitude
                  ] 
                },
                images: [
                  {
                    url: 'https://res.cloudinary.com/dj06fooxe/image/upload/v1611331258/YelpCamp/y09ewdljvw38hrpslaxw.jpg',
                    filename: 'YelpCamp/ivlxy0kobcnfv9iwobin'
                  },
                  {
                    url: 'https://res.cloudinary.com/dj06fooxe/image/upload/v1611331258/YelpCamp/ivlxy0kobcnfv9iwobin.jpg',
                    filename: 'YelpCamp/y09ewdljvw38hrpslaxw'
                  }
                ]
            })
            await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})