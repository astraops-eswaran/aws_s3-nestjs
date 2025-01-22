import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

@Injectable()
export class FileService {

  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_REGION'),  
  })

  constructor(private readonly configService: ConfigService) {}

  async upload(fileName: string, file:Buffer){
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.getOrThrow('AWS_S3_BUCKET_NAME'),
        Key:fileName,
        Body:file,
      })
    );
    return { message: 'File uploaded successfully' };
  }

  async getFile(fileName: string){
    const command = new GetObjectCommand({
      Bucket: this.configService.getOrThrow('AWS_S3_BUCKET_NAME'),
      Key: fileName,
    });

    const response = await this.s3Client.send(command);
    return { message: 'File retrieved successfully', file: response.Body };
  }

  async downloadFile(fileName: string){
    const command = new GetObjectCommand({
      Bucket: this.configService.getOrThrow('AWS_S3_BUCKET_NAME'),
      Key: fileName,
    });

    const response = await this.s3Client.send(command);
    return { message: 'File downloaded successfully', file: response.Body };
  }

  async deleteFile(fileName: string){
    const command = new DeleteObjectCommand({
      Bucket: this.configService.getOrThrow('AWS_S3_BUCKET_NAME'),
      Key: fileName,
    });

    await this.s3Client.send(command);
    return { message: 'File deleted successfully' };
  }
}
