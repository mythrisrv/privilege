const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let unitSchema = new Schema(
    {

        unitId :{
            type: Number,
        
            unique: true,
            
            
       },
       ip :{
           type: String,
           
           
       },
       status :{
           type: Number,
           default:1, //ON
           required: 'Status required'
           
       },
       added_by :{
       type : Number,
       default:1,
      //  required: 'Added_by required',
       },

       edited_by :{
           type : Number,
           default:1,
          //  required: 'editedby required', 
           
       },


       default_unit: {
        type: String,
        required: true,
        
      },
      product_sub_unit: {
        type: String,
        required: true,
      },
      sub_unit_value: {
        type: String,
        required: true,
      },
     
      isListed: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
);
  
  let Unit = mongoose.model("Unit", unitSchema);
  
  module.exports = Unit;

