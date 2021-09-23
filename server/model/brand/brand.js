const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let brandSchema = new Schema(
    {

        brandId :{
            type: Number,
        
            unique: true,
            
            
       },
       ip :{
           type: String,
           
           
       },
       status :{
           type: Number,
           default:1, //ON
          //  required: 'Status required'
           
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


    
    premiumbrand : {
        type: String,
        required: true,
        
      },
      brandname_ml :{
        type:String,
        // required:true,
      },
      brandpriority: {
        type: String,
        // required: true,
      },
      premiumbrand:{
       type : String,
      //  required: 'required',
      },
      brandlogo:{
        type : String,
      //  required: 'required',  
        
            },
      webbannerimage:{
        type : String,
        // required: 'required',  
         },

      appbannerimage:{
      type : String,
      //  required: 'required',  
        },
        brandactive : {
          type: Number,
          default: 0, //closed state
        },
        
    
    appbannerimage : {
        type: String,
        
    },
    brandactive : {
        type: Number,
        default: 0, //closed state
    }
    
})

let Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;