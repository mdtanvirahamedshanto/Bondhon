import { v2 as cloudinary } from 'cloudinary';
import { CONFIG } from '@/constants/config';

if (CONFIG.CLOUDINARY_CLOUD_NAME && CONFIG.CLOUDINARY_API_KEY) {
  cloudinary.config({
    cloud_name: CONFIG.CLOUDINARY_CLOUD_NAME,
    api_key: CONFIG.CLOUDINARY_API_KEY,
    api_secret: CONFIG.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export async function uploadImageToCloudinary(fileBuffer: Buffer, folder: string = 'bondhon'): Promise<string> {
  if (CONFIG.CLOUDINARY_CLOUD_NAME === 'placeholder_cloud') {
    // Return a beautiful simulation image url for high fidelity demo if keys aren't set
    return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80';
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || '');
      }
    );
    uploadStream.end(fileBuffer);
  });
}
