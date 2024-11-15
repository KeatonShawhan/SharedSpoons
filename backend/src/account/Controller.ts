import {
    Controller,
    Route,
    Security,
    Put,
    // Path
    Request,
    FormField,
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
    @FormField() updateRequest: string,
    @UploadedFile() file: Express.Multer.File,
    @Request() request: express.Request
): Promise<{ message: string }> {
    try {
        if (!request.user) {
            this.setStatus(401);
            console.error('Unauthorized user');
            return { message: 'Unauthorized user' };
        }
        const updateRequestJson: UpdateAccountRequest = JSON.parse(updateRequest);

        if (updateRequestJson.username){
            console.log(updateRequestJson.username);
            const usernameAvailable = await AccountService.usernameAvailable(updateRequestJson.username);
            if (!usernameAvailable) {
                this.setStatus(400);
                console.error('Username already in use');
                return { message: 'Username already in use' };
            }
        }

        let updatedAccount: boolean;

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
            updatedAccount = await AccountService.updateUserAccount(request.user.id, updateRequestJson, s3key);
        } else{
            updatedAccount = await AccountService.updateUserAccount(request.user.id, updateRequestJson)
        }

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