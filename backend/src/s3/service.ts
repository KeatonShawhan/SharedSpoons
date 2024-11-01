import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { S3 } from 'aws-sdk';
import { pool } from '../db';

export class S3Service {
  private s3: S3;
  private bucketName: string;

  constructor() {
    this.s3 = new AWS.S3({
      region: process.env.AWS_REGION, // Your AWS region
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    this.bucketName = process.env.S3_BUCKET_NAME!;
  }

  public async uploadFile(file: Express.Multer.File): Promise< string | undefined > {
    const fileExtension = file.originalname.split('.').pop();
    const key = `${uuidv4()}.${fileExtension}`;

    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    try {
      await this.s3.upload(params).promise();
      const s3key = key;

      return  s3key;   
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw new Error('Could not upload file');
      return undefined;
    }
  }

  public async getFileLink(s3key: string): Promise< string | undefined > {
    try {
      const signedUrl = this.s3.getSignedUrl('getObject', {
        Bucket: this.bucketName,
        Key: s3key,
        Expires: 28800 // URL expires in 1 hour
      });

      return signedUrl;
    }
    catch (error) {
      console.error('Error getting signed URL:', error);
      return undefined;
    }
  }
}