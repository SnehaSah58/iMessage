// to upload , receive files/image/video and prepare it for backend.

import multer from "multer";

const MAX_FILE_SIZE = 25*1024*1024;

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req,file,cb) => { // cb-> callback
        const isImage = file.mimetype.startsWith("image/");
        const isVideo = file.mimetype.startsWith("video/");

        if (isImage && !isVideo){
            cb(new Error("Only image and video uploads are allowed"));
            return;
        }
        cb(null, true);
    },
});
