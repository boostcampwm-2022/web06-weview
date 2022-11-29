import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';

@Injectable()
export class NcpObjectStorage {
  private objectStorage: S3;

  constructor(private configService: ConfigService) {
    const endpoint = 'https://kr.object.ncloudstorage.com';
    const region = 'kr-standard';
    const accessKey = configService.get('NCP_ACCESS_KEY');
    const secretKey = configService.get('NCP_SECRET_KEY');

    this.objectStorage = new S3({
      endpoint,
      region,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
      signatureVersion: 'v4',
    });
  }

  createPresignedPost() {
    const presigned = this.objectStorage.createPresignedPost({
      Bucket: 'weview-image-dev',
      Fields: {
        Key:
          new Date().toISOString().replace(/[^0-9TZ]/g, '') +
          randomUUID() +
          '.jpeg',
        ACL: 'public-read',
      },
      Expires: this.configService.get<number>('NCP_UPLOAD_EXPIRES'),
      Conditions: [
        [
          'content-length-range',
          0,
          this.configService.get<number>('NCP_UPLOAD_IMAGE_SIZE'),
        ],
        ['eq', '$Content-Type', 'image/jpeg'],
      ],
    });

    return presigned;
  }
}
