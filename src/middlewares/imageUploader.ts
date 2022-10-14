import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: "uploads/profile",
  filename: function (req, file, cb) {
    const uniqueSuffix = Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
export const imageUploader = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /png|jpg|jpeg/;
    const extname = supportedImage.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = supportedImage.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});