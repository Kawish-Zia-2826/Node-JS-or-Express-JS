const express = require('express');
const router = express.Router();
const multer  = require('multer')
const path = require('path');
const fs  = require('fs');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})
function fileFilter (req, file, cb) {
if(file.mimetype === 'image/' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Only .png and .jpg format allowed!'), false)
  }

}
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
 })
const User = require('../modules/module');

router.get('/', async (req, res) => {
    try {
       const search  = req.query.search ||'';
       const page = req.query.page || 1;
       const limit = parseInt(req.query.limit) || 5;
       const skip = (page -1)* limit
       const query = {
        $or:[
            {first_name:{$regex:search,$options:'i'}},
            {last_name:{$regex:search,$options:'i'}}
        ]
       }
       const total = await User.countDocuments(query);
       const totalPages = Math.ceil(total / limit);
        const users = await User.find(query).skip(skip).limit(limit);
        res.status(200).json({
            users,
            total,
            totalPages,
            currentPage: page,
             limit,
             users

        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.get('/:id', async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
        if(!users) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(201).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', upload.single('profile_pic'), async(req, res) => {
try {
//   const user  = await User.create(req.body);
const user  = new User(req.body)
if(req.file){
user.profile_pic = req.file.filename; // Store the file path in the profile_pic field
await user.save();
res.status(201).json(user);
}

} catch (error) {
  res.status(500).json({ message: error.message });
}


});


router.put('/:id',upload.single('profile_pic'), async (req, res) => {
    try {
        // Check if the user exists
        const existingUser = await User.findById(req.params.id);
        if (!existingUser) {
            if(req.file.filename){
                 const filePath = path.join(__dirname, '../uploads', req.file.filename);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    } else {
                        console.log('Old file deleted successfully');
                    }
                });
            }


            return res.status(404).json({ message: 'User not found' });
        }
        // If a new file is uploaded, delete the old file
        if (req.file) {
            // Delete the old profile picture file if it exists
            if (existingUser.profile_pic) {
                const filePath = path.join(__dirname, '../uploads', existingUser.profile_pic);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    } else {
                        console.log('Old file deleted successfully');
                    }
                });
            }
            // Update the profile_pic field with the new file name
            req.body.profile_pic = req.file.filename;

        }

         const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
             
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) { 
        res.status(500).json({ message: err.message });
    }
}
);



router.delete('/:id', async (req, res) => {
    try {
        
        const user = await User.findByIdAndDelete(req.params.id);
        if(user.profile_pic){
            const filePath = path.join(path.join(__dirname, "../uploads",
    user.profile_pic
));
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted successfully');
                    console.log(user.profile_pic)
                }
            });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);
 
module.exports = router;