let models = require("../model");
let moment = require("moment");
//const qr = require("qrcode");
//const pdf=require("pdfkit")
const fs = require('fs');



/*createQrcode=(req)=>{
  
  const createPDF = (filenames) => {

    const doc = new pdf 
  
    doc.pipe(fs.createWriteStream(`${filenames}.pdf`))
  
    doc.text('Your Tickets').fontSize(25)
    
  
   /* doc.image("./public/Qrcodes/"+filenames+".jpg", {
      fit: [250, 300],
      align: 'center',
      valign: 'center'
    });
    doc.image("./public/uploads/waste_images/string.jpg", {
      fit: [250, 300],
      align: 'center',
      valign: 'center'
    })
    doc.image("./public/uploads/waste_images/strings.jpg", {
      fit: [250, 300],
      align: 'center',
      valign: 'center'
    })
   
  
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
});
/*var ip = req.ip;
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
createQrcode=(req)=> {
  try {
  let fontNormal = 'Helvetica';
  let fontBold = 'Helvetica-Bold'
  let pdfDoc = new pdf;
  let fileName = './public/files/sample2.pdf';
  let image1 = './public/Qrcodes/qrcode-1.jpg';
  let image2 = './public/Qrcodes/qrcode-2.jpg';
  let image3 = './public/uploads/customer_images/test-applelogo.png';
  let sampleText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  let stream = fs.createWriteStream(fileName);
  pdfDoc.pipe(stream);


 let array=[image1,image2,image3]
 var x,y;
 y=50 ;
 while(y <= 450) { 
  y += 50; 
  
  x=50;
  while(x<= 450) {
    array.forEach((ele)=>{
  pdfDoc.image(ele, x, y, { width: 50, height: 50, align: "justify" })
  x+=50;
})
  };
}

 

 


  
  pdfDoc.end();
  console.log("pdf generate successfully");
  } catch (error) {
  console.log("Error occurred", error);
  }
  let start=req.body.Start
let end=req.body.End;
const filename=[]
for(let i=start;i<=end;i++){
  let names="qrcodes-"+i;
 
  filename.push(names)

}
console.log(filename)
filename.forEach(element => {
  console.log(element)
  generateQrcode(element)
});
function generateQrcode(filenames){
  let array=[]
  qr.toString('http://www.google.com', function (err, string) {
    if (err) throw err
    array.push(string)
  })
  console.log(array)

}
  

  }*/
  createQrcode=(req)=>{
    var ip = req.ip;
const format2 = "YYYY-MM-DD"
var date2 = new Date();
date = moment(date2).format(format2);
time = moment(date2).format("HH:mm");
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