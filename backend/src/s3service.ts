import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { S3 } from 'aws-sdk';
import { pool } from './db';

export class S3Service {
  private s3: S3;
  private bucketName: string;

  constructor() {
    this.s3 = new AWS.S3({
      region: 'us-east-2', // Your AWS region
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    this.bucketName = process.env.AWS_BUCKET_NAME!;
  }

  public async uploadFile(file: Express.Multer.File, caption: string): Promise<string> {
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
      const s3URL = `https://${this.bucketName}.s3.amazonaws.com/${key}`;

      const imageInsert = {
        imageUrl: s3URL, 
        caption: caption // Use the provided caption
      };

      const insertQuery = `INSERT INTO image (data) VALUES ($1) RETURNING *`;
      const query = {
          text: insertQuery,
          values: [JSON.stringify(imageInsert)],
      };
      const { rows } = await pool.query(query);

      // Return the image URL and caption for confirmation
      return `Image uploaded successfully: ${rows[0].data.imageUrl}`;
      
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw new Error('Could not upload file');
    }
  }

  public async getFile(imageId: string): Promise<{ imageUrl: string; caption: string }> {
    const selectQuery = `SELECT data FROM image WHERE id = $1`; // Adjusted to select the JSONB column
    const query = {
        text: selectQuery,
        values: [imageId],
    };
    const { rows } = await pool.query(query);

    if (!rows[0]) {
      throw new Error('Image not found');
    }

    const { imageUrl, caption } = JSON.parse(rows[0].data); // Parse the JSONB data

    return {
      imageUrl: imageUrl,
      caption: caption,
    };
  }
}

// // s3Service.ts
// import AWS from 'aws-sdk';
// import { v4 as uuidv4 } from 'uuid';
// import { S3 } from 'aws-sdk';
// import { pool } from './db';

// export class S3Service {
//   private s3: S3;
//   private bucketName: string;

//   constructor() {
//     this.s3 = new AWS.S3({
//       region: 'us-east-2', // Your AWS region
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     });
//     this.bucketName = process.env.AWS_BUCKET_NAME!;
//   }

//   public async uploadFile(file: Express.Multer.File): Promise<string> {
//     const fileExtension = file.originalname.split('.').pop();
//     const key = `${uuidv4()}.${fileExtension}`;

//     const params = {
//       Bucket: this.bucketName,
//       Key: key,
//       Body: file.buffer,
//       ContentType: file.mimetype,
//     };

//     try {
//       await this.s3.upload(params).promise();
//       let s3URL = `https://${this.bucketName}.s3.amazonaws.com/${key}`

//       let imageInsert = {
//         imageUrl: s3URL, 
//         caption: 'new pic'
//       };

//       const insertQuery = `INSERT INTO image (data) VALUES ($1) RETURNING *`;
//       const query = {
//           text: insertQuery,
//           values: [JSON.stringify(imageInsert)],
//       };
//       const { rows } = await pool.query(query);


//       return `rows[0]`;

      
//     } catch (error) {
//       console.error('Error uploading file to S3:', error);
//       throw new Error('Could not upload file');
//     }

    
//   }

//   public async getFile(imageId: string): Promise<{ imageUrl: string; caption: string }> {
//     const insertQuery = `SELECT * FROM image WHERE id = $1`;
//     const query = {
//         text: insertQuery,
//         values: [imageId],
//     };
//     const { rows } = await pool.query(query);

//     if (!rows[0]) {
//       throw new Error('Image not found');
//     }

//     return {
//       imageUrl: rows[0].imageUrl,
//       caption: rows[0].caption,
//     };
//   }
// }