const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let bannerSchema = new Schema(
    {

        banner_id :{
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
       required: 'Added_by required',
       },

       edited_by :{
           type : Number,
           required: 'editedby required', 
           
       },


       banner_type : {
        type: String,
        required: true,
        
      },
      banner_url :{
        type:String,
        required:true,
      },
      banner_name: {
        type: String,
        required: true,
      },
      banner_image:{
       type : String,
       required: 'required',
      },
      banner_image_app:{
        type : String,
       required: 'required',  
        
            },
      isListed: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
);
  
  let Banner = mongoose.model("Banner", bannerSchema);
  
  module.exports = Banner;


