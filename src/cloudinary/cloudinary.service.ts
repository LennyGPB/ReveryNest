import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImageFromUrl(url: string): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(url, {
        folder: 'revery_files', // Dossier dans lequel les images seront stockées
        resource_type: 'image',
      });
      return result.secure_url; // L'URL permanente à stocker en base
    } catch (error) {
      console.error('Erreur Cloudinary:', error);
      throw new Error("Échec de l'upload vers Cloudinary");
    }
  }
}