// To upload file on cloud storage.

import ImageKit, { toFile } from "@imagekit/nodejs";

const imagekit = new ImageKit({ privateKey: process.env.IMAGEKIT_PRIVATE_KEY })  // creating obj

export function hasImageKitConfig() {
    return Boolean(process.env.IMAGEKIT_PRIVATE_KEY);
}


// creating safe filename taki integrated rhe
function createFilename(originalName = "upload") {
    const safeName = originalName.replace(/[^-zA-Z0-9._-]/g, "_");
    return `chat-${Date.now()}-${safeName}`;
}


/** 
 * Upload image or video to Imagekit
 * @see https://imagekit.io/docs/api-reference/upload-file/upload-file 
*/


export async function uploadChatMedia(file) {
    const fileName = createFilename(file.originalName);

    const result = await imagekit.files.upload({
        file: await toFile(file.buffer, fileName, { type: file.mimetype }),
        fileName,
        folder: "/chat",
    });
    return result.url;
   
}

//export { uploadChatMedia, hasImagekitConfig }; // to use in any files