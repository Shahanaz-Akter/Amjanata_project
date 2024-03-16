// Multer configuration
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/front_assets/new_images/");
    },
    filename: function (req, file, cb) {
        const name = Date.now() + "_" + file.originalname;
        cb(null, name);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
