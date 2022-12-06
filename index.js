const express = require('express');
const fileUpload = require('express-fileupload');
var fs = require('fs');
const app = express();
const port = 3000;

// Use the express-fileupload middleware
// app.use(fileUpload());

app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.send('Hello World!!');
});

app.post('/upload',(req,res)=>{
    // console.log(req.files);

    // // All good
    // res.sendStatus(200);

    // Get the file that was set to our field named "image"
    const { image } = req.files;

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

    // If does not have image mime type prevent from uploading
    //if (/^image/.test(image.mimetype)) return res.sendStatus(400);
    
    // Move the uploaded image to our upload folder
    const dirName = __dirname + '/upload/';

    if (!fs.existsSync(dirName)){
        fs.mkdirSync(dirName);
    }

    image.mv(dirName + image.name);

    // All good
    res.sendStatus(200);
});

app.listen(port,()=>{
    console.log(`Application running on port ${port}`);
});