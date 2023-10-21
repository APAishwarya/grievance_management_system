const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const multer=require('multer')
const fs = require('fs')
const ExifParser = require('exif-parser')
const {UserModel,FormModel}=require('./models/User')
const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/GMS");

const NodeGeocoder = require('node-geocoder')
const geocoderOptions = {
    provider:'openstreetmap'
}
const geocoder=  NodeGeocoder(geocoderOptions)


app.post('/login',(req,res)=>{
    const{email,password}=req.body;
    UserModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("the password is incorrect")
                
            }
        }else{
            res.json("No record existed")
        }
    })
})
app.post('/', (req, res) => {
    const { email } = req.body;

    UserModel.findOne({ email: email })
        .then(existingUser => {
            if (existingUser) {
                res.json("UserExists");
            } else {
                UserModel.create(req.body);
                
            }
        })
        .then(users=>res.json(users))
        .catch(err=>res.json(err))
    })

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/'); // Folder where files will be stored
        },
        filename: function (req, file, cb) {
          // Use a unique filename, for example, a timestamp
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, uniqueSuffix + '-' + file.originalname);
        },
      });

      const upload = multer({storage:storage})
      
app.post('/form',upload.single('complaintFile'), (req, res) => {
    const { complaintText, date, department } = req.body;
    const file = req.file;
    const fileData = fs.readFileSync(file.path)
    const buffer = new Buffer.from(fileData)

    const exifData = ExifParser.create(fileData)
    const exifResult = exifData.parse()
   const latitude = exifResult.tags.GPSLatitude
   const longitude = exifResult.tags.GPSLongitude

   geocoder.reverse({lat:latitude,lon:longitude})
   .then((result)=>{
    const city = result[0].city||'Unknown'
    const location = latitude+','+longitude+','+city

    FormModel.create({ complaintText, date, department, file: buffer, location })
     .then(complaints=>res.json(complaints))
     .catch(err=>res.json(err))
})
.catch(err => res.json(err))

})   
        
app.listen(3001,()=>{
    console.log("server is running")
})





