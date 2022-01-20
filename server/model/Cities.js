const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let citiesSchema = new Schema(
    {
        id: {
        type: Number,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      state_id: {
        type:  Number,
        required: true,
      },
      
    },
    { timestamps: true ,collection: 'cities'}
  );
  let cities = mongoose.model("cities", citiesSchema);

  module.exports = cities; 