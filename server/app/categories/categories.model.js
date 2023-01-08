const mongoose = require("mongoose");

const { ObjectId, Number } = mongoose.Schema.Types;

const CategoriesSchema = new mongoose.Schema(
  {
    // user: {
    //     type: ObjectId,
    //     ref: "User",
    // },
    sites: [
      {
        site: {
        type: ObjectId,
        ref: "Sites",        
        },
        _id: false,
      }
    ],
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("Categories", CategoriesSchema, 'organizer-categories');

