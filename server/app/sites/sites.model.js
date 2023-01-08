const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId, Number } = mongoose.Schema.Types;

const SitesSchema = new Schema({
  categoryId: {
    type: ObjectId,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  bookmarks: [
    {
      link: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      }
    }
  ]
  
});
mongoose.model("Sites", SitesSchema, "organizer-sites");