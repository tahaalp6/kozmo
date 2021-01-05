const multer = require('multer');
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

var imgName = new Boolean(false);

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mine type");
    if (isValid) {
      error = null;
    }
    cb(null, "../talyasuproject/src/assets/images/products");
  },
  filename: (req, file, cb) => {
    

    const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name);
    
    Product.findOne({ img: name },
      (err, pro) => {
        if (!pro)
          imgName = false;
        else
          imgName = true;
        
      });
    console.log(imgName);
    if (imgName) {
      console.log('founded it');

    }

  }
});

const upload = multer({ storage: storage });

var result;


// if(imgName){
//   console.log('nothing uploaded');
//   result = upload.single();
// }
  
// else{
//   console.log('uploaded');
//   result = upload.single("img");
// }

module.exports = upload.single("img");;
