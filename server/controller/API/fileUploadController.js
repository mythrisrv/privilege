const express = require('express');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const {
    getMaxListeners
} = require('process');

let fileSizes = [60,150,300,600,1200];
const CustomerImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/customer_images');
    },
    filename: function (req, file, cb) {
        cb(null, 'test-' + file.originalname)
    }
});


const fileFilter = (req, file, cb) => {
    // console.log("=======file in filter======", file);
    // reject file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg' || file.mimetype === 'image/svg+xml') {
        cb(null, true)
    } else {
        cb(null, false)
        // return cb(new Error('Only images are allowed'))
    }
}
const svgfileFilter = (req, file, cb) => {
    // reject file
    if (file.mimetype === 'image/svg' || file.mimetype === 'image/svg+xml') {
        cb(null, true)
    } else {
        cb(null, false)
        // return cb(new Error('Only images are allowed'))
    }
}
const uploadCustomerImage = multer({
    storage: CustomerImageStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
const uploadCustomerSingleImage = (req, res, next) => {
    try {
        if (req.file) {
            const file = req.file;
            // console.log("=====REQ.FILE IN UPLOAD======", file);     
            let sh = sharp(`${req.file.destination}/${req.file.filename}`);
            if (file.mimetype === 'image/svg') {
                console.log('svg not processed with sharp');
                for (let index = 0; index < fileSizes.length; index++) {
                    sh.toFile(`${req.file.destination}/customer_image_${fileSizes[index]}x${fileSizes[index]}/${req.file.filename}`, function (err, info) {
                        console.log("info", info);
                        if (err) {
                            console.log('error in image optimization', err);
                            return;
                        }
                    });

                }
            } else {
                if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
                    sh = sh.jpeg({
                        quality: 70
                    });
                } else if (file.mimetype === 'image/png') {
                    sh = sh.png({
                        quality: 70
                    });
                }
                for (let index = 0; index < fileSizes.length; index++) {
                    sh = sh.resize(fileSizes[index], fileSizes[index])
                    sh.toFile(`${req.file.destination}/customer_image_${fileSizes[index]}x${fileSizes[index]}/${req.file.filename}`, function (err, info) {
                        console.log("info", info);
                        console.log("saved file size: ", fileSizes[index]);
                        if (err) {
                            console.log('error in image optimization', err);
                            return;
                        }
                    });
                }
            }
            return res.json({
                message: "File Uploaded Successfully",
                status: "success",
                file: req.file
            }).status(201)

        } else {
            return res.json({
                message: "File Uploaded Failed",
                status: "failed",
                file: req.file
            }).status(400)
        }

    } catch (error) {
        res.status(400).send(error.message);
    }

}


module.exports = {
    uploadCustomerImage,
    uploadCustomerSingleImage,
    
};

