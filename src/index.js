const express=require("express")
const multer = require("multer"); // Add this line to import multer
const app= express()
const path=require("path")
const hbs=require("hbs")
const { User, Admin, Face } = require("./mongodb");
const templatePath=path.join(__dirname,'../templates')
const storage = multer.memoryStorage(); // Store image in memory as Buffer
const upload = multer({ storage: storage });
app.use(express.json())
app.set("view engine","hbs")
app.set("views", templatePath)
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("front_page")
})
app.get("/student-login",(req,res)=>{
    res.render("student-login")
})
app.get("/admin-login",(req,res)=>{
    res.render("admin-login")
})
app.get("/add_student", (req, res) => {
    res.render("add_student");  
});

app.get("/notes_upload", (req, res) => {
    res.render("notes_upload"); 
});

app.get("/Upload_lectures", (req, res) => {
    res.render("upload_lectures"); 
});

app.get("/upload_DPP", (req, res) => {
    res.render("upload_DPP"); 
});

app.get("/update_routine", (req, res) => {
    res.render("update_routine"); 
});

app.get("/classroom_message", (req, res) => {
    res.render("classroom_message"); 
});

app.get("/admin_attendence", (req, res) => {
    res.render("admin_attendence") 
});
app.get('/lecture_watch', (req, res) => {
    res.render("lecture_watch")
});

app.get('/download_DPP', (req, res) => {
    res.render("download_DPP")
});

app.get('/student_attendence', (req, res) => {
    res.render("student_attendence")
});

app.get('/student_routine', (req, res) => {
    res.render("student_routine")
});
app.get('/front_page',(req,res)=>{
    res.render("front_page")
})
app.get('/classroom',(req,res)=>{
    res.render("classroom")
})
app.get('/chatbot',(req,res)=>{
    res.render("chatbot")
})
app.get('/notes_download',(req,res)=>{
    res.render("notes_download")
})
app.get("/upload-face", (req, res) => {
    res.render("upload_face"); // Render the form to upload name and image
});
app.get("/fire_alert", (req, res) => {
    res.render("fire_alert"); 
});
app.get("/resources", (req, res) => {
    res.render("resources"); 
});
app.post("/upload-face", upload.single("image"), async (req, res) => {
    try {
      const { name } = req.body;
      const image = req.file.buffer; // Get image buffer from multer
  
      // Create new Face document
      const newFace = new Face({ name, image });
      await newFace.save();
  
      res.send("Image and name uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).send("Failed to upload image");
    }
  });


app.post("/student-login",async(req,res)=>{
    const data = Object.assign({}, req.body)
    console.log(data) 
    try {
        const check = await User.findOne({ name: req.body.name });

        if (!check) {
            // No user found with the provided name, redirect to the front page
            res.redirect("front_page");
        } else if (check.password === req.body.password) {
            // Valid user and password, render the classroom
            res.render("classroom", { userName: check.name });
        } else {
            // Password does not match, render the login page with an error message
            res.render("student-login", { message: 'Wrong Password' });
        }

    } catch (error) {
        console.error("Error during login:", error);
        res.redirect('front_page');
    }
})

app.post("/admin-login",async(req,res)=>{
    console.log(req.body);
    /*try{
        const check=await Admin.findOne({name:req.body.name})
        if (check && check.password === req.body.password) {
            res.render("admin_classroom", { adminName: check.name });        
        } 
        else{
            res.render('admin-login', { message: 'Wrong Password' });
        }

    }
    catch{
        res.redirect('front_page');
    }*/
        try {
            const check = await Admin.findOne({ name: req.body.name });
    
            if (!check) {
                // No user found with the provided name, redirect to the front page
                res.redirect("front_page");
            } else if (check.password === req.body.password) {
                // Valid user and password, render the classroom
                res.render("admin_classroom", { adminName: check.name });
            } else {
                // Password does not match, render the login page with an error message
                res.render("admin-login", { message: 'Wrong Password' });
            }
    
        } catch (error) {
            console.error("Error during login:", error);
            res.redirect('front_page');
        }
})
app.listen(4000,()=>{
    console.log("Connection Established")
})