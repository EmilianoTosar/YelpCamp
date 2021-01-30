
const mongoose = require('mongoose'),
        Review = require('./review'),
	  { Schema }  = mongoose;

const imageSchema = new Schema({
		url: String,
		filename: String
});

imageSchema.virtual('thumbnail').get(function() {
	return this.url.replace('/upload', '/upload/w_200')
})

const opts = { toJSON: { virtuals: true } };

const campgroundSchema = new Schema ({
	title: String,
	images: [imageSchema],
	geometry: {
		type: {
			type: String,
			enum: ['Point'],
			required: true
		},
		coordinates: {
			type: [Number],
			required: true
		}
	},
	description: String,
	price: Number,
	location: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: "Review"
   		}
	]
}, opts);

campgroundSchema.virtual('properties.popUpMarkup').get(function() {
	return `
	<strong><a href='/campgrounds/${this._id}'>${this.title}</a></strong>
	<p>${this.description.substring(0, 20)}...</p>`
})

campgroundSchema.post('findOneAndDelete', async function (doc) {
	if(doc){
		await Review.remove({ _id: { $in: doc.reviews } })
	}
})


module.exports = mongoose.model('Campground', campgroundSchema);