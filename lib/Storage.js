import cloudinary from 'cloudinary';
import multer from 'multer';
import { Readable } from 'stream';

cloudinary.v2.config({
  cloud_name: 'djknvzync',
  api_key: "569228811476594",
  api_secret: "di4UhIUKiZ1QnmpSQLdKU8I9Oko",
});


export const upload = multer({
    storage: multer.memoryStorage(),
  });
  


  export const runMiddleware = (req, res, fn) => {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        resolve(result);
      });
    });
  };
  


  export async function uploadToCloudinary(fileBuffer) {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      });
  
      const readable = new Readable();
      readable._read = () => {};
      readable.push(fileBuffer);
      readable.push(null);
      readable.pipe(stream);
    });
  }













export const uploadToStorage = async (file) => {
  try {
    const uploadPromise = new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        {
          folder: 'portfolios',
          resource_type: 'auto',
          transformation: {
            quality: 'auto:good',
            fetch_format: 'auto',
          },
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      );

      const fs = require('fs');
      const readStream = fs.createReadStream(file.filepath);
      readStream.pipe(stream);
    });

    const imageUrl = await uploadPromise;
    return imageUrl;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Failed to upload image');
  }
};