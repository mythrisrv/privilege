const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let stateSchema = new Schema(
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
      country_id: {
        type: Number,
        
      },
      state_id_wrt_tax: {
        type: Number,
        
      },
      
    },
    { timestamps: true ,collection: 'states'}
  );
  let state = mongoose.model("states", stateSchema);

  module.exports = state; 