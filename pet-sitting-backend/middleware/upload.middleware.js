import multer from 'multer';
import path from 'path';
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, "..", 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'UPLOADS_DIR'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  }
});


export const UPLOADS_DIR = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {

    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only images are allowed'), false);
    }
    cb(null, true);
  }
});
