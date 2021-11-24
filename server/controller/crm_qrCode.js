let models = require("../model");
let moment = require("moment");
const qr=require("qrcode")
const pdf=require("pdfkit")
const fs=require("fs")

createQrcode=(req)=>{
  /*
  const createPDF = (filenames) => {

    const doc = new pdf 
  
    doc.pipe(fs.createWriteStream(`${filenames}.pdf`))
  
    doc.text('Your Tickets').fontSize(25)
  
  
    doc.image("./public/Qrcodes/"+filenames+".jpg", {
      fit: [250, 300],
      align: 'center',
      valign: 'center'
    });
   
  
    doc.end()
  
  }
 
let start=req.body.Start
let end=req.body.End;
const filename=[]
for(let i=start;i<=end;i++){
  let names="qrcode-"+i;
 
  filename.push(names)

}
console.log(filename)
function generateQrcode(filenames){
qr.toFile("./public/Qrcodes/"+filenames+".jpg","abcd").then(qr => {      
  
  createPDF(filenames)
})

}
filename.forEach(element => {
  console.log(element)
  generateQrcode(element)
});*/
var ip = req.ip;
const format2 = "YYYY-MM-DD"
var date2 = new Date();
date = moment(date2).format(format2);
time = moment(date2).format("HH:mm A");
console.log(req.user);
return new Promise(async (resolve, reject) => {

try{
  let qrCode=new models.Qrcode({
    qrcode_ip:ip,
    qrcode_status:0,
    qrcode_addedby:req.user._id,
    
    qrcode_date:date,
    qrcode_time:time,
    qrcode_localbody_id:req.body.localbody._id,
    qrcode_start:req.body.start,
    qrcode_end:req.body.end,
  })
  qrCode=await qrCode.save();
  resolve(qrCode)

}catch(err){
  console.log(err);
      reject({
      message: err.message,
      });

}

})



};

getQrcodeList = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let qrcode = await models.Qrcode.find({
        qrcode_status: 0,
      }).populate("qrcode_localbody_id","localbody_name -_id")
      .populate("qrcode_addedby","username -_id")
      .sort({createdAt:-1})
        

       resolve(qrcode);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};




module.exports={
  createQrcode,
  getQrcodeList,
}