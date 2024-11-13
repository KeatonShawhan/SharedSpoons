import {
    Controller,
    Route,
    Security,
    Put,
    // Path
    Request,
    Body,
    UploadedFile
  } from "tsoa";
  import { AccountService } from "./service";
  import { S3Service } from '../s3/service';
  import { UpdateAccountRequest } from "./index";
  import * as express from 'express';

@Security('jwt', ['member'])
@Route("account")
export class AccountController extends Controller {
  
  private s3Service = new S3Service();
  @Put("/update")
  public async updateAccount(
    @Body() updateRequest: UpdateAccountRequest,
    @UploadedFile() file: Express.Multer.File,
    @Request() request: express.Request
): Promise<{ message: string }> {
    try {
        if (!request.user) {
            this.setStatus(401);
            console.error('Unauthorized user');
            return { message: 'Unauthorized user' };
        }

        if (updateRequest.username){
            const usernameAvailable = await AccountService.usernameAvailable(updateRequest.username);
            if (!usernameAvailable) {
                this.setStatus(400);
                console.error('Username already in use');
                return { message: 'Username already in use' };
            }
        }


        if (file) {
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedMimeTypes.includes(file.mimetype)) {
                this.setStatus(400);
                console.error('Invalid file type');
                return { message: 'Invalid file type' };
            }

            const s3key = await this.s3Service.uploadFile(file);
            if (s3key === undefined) {
                this.setStatus(400);
                console.error('Could not upload file');
                return { message: 'Could not upload file' };
            }

            updateRequest.profilePicture = s3key;
        }

        const userId = request.user.id;
        const updatedAccount = await AccountService.updateUserAccount(userId, updateRequest);

        if (!updatedAccount) {
            this.setStatus(400);
            console.error('Failed to update account');
            return { message: 'Failed to update account' };
        }

        this.setStatus(200);
        return { message: 'Account updated successfully' };
    } catch (error) {
        this.setStatus(500);
        console.error('Error in account update route:', error);
        return { message: 'Failed to update account' };
    }
}
}