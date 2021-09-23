const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let taxSchema = new Schema(
    {

        taxId :{
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
       required: 'Added_by required',
       },

       edited_by :{
           type : Number,
           default:1,
           required: 'editedby required', 
           
       },


       tax_slab_type: {
        type: String,
        required: true,
        
      },
      tax_slab_name: {
        type: String,
        required: true,
      },
      tax_slab_percentage: {
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
  
  let Tax = mongoose.model("Tax", taxSchema);
  
  module.exports = Tax;

