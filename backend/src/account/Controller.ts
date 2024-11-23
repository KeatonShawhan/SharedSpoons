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
  @Put('/update')
public async updateAccount(
    @FormField() updateRequest: string,
    @UploadedFile() file: Express.Multer.File,
    @Request() request: express.Request
): Promise<{ message: string, updatedRequest?: UpdateAccountRequest }> {
    try {
        if (!request.user) {
            this.setStatus(401);
            console.error('Unauthorized user');
            return { message: 'Unauthorized user' };
        }

        const updateRequestJson: UpdateAccountRequest = JSON.parse(updateRequest);

        if (updateRequestJson.username && updateRequestJson.username.trim().length === 0) {
            this.setStatus(400);
            console.error('Username cannot be empty');
            return { message: 'Username cannot be empty' };
        }

        // Check if username is available if updated
        if (updateRequestJson.username && updateRequestJson.username.trim().length > 0) {
            const usernameAvailable = await AccountService.usernameAvailable(updateRequestJson.username, request.user.id);
            if (!usernameAvailable) {
                this.setStatus(400);
                console.error('Username already in use');
                return { message: 'Username already in use' };
            }
        }

        let updatedAccount: UpdateAccountRequest | null;

        if (file) {
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif'];
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

            // Update user data with the S3 key
            updatedAccount = await AccountService.updateUserAccount(request.user.id, updateRequestJson, s3key);
            console.log("controller updatedAccount: ", updatedAccount);
        } else {
            updatedAccount = await AccountService.updateUserAccount(request.user.id, updateRequestJson);
        }

        if (updatedAccount?.profilePicture !== undefined) {
            updatedAccount.profilePicture = await this.s3Service.getFileLink(updatedAccount?.profilePicture);
            console.log("controller updatedAccount with filelink: ", updatedAccount);
        }

        if (!updatedAccount) {
            this.setStatus(400);
            console.error('Failed to update account');
            return { message: 'Failed to update account' };
        }

        this.setStatus(200);
        return { 
            message: 'Account updated successfully',
            updatedRequest: updatedAccount
        };
    } catch (error) {
        this.setStatus(500);
        console.error('Error in account update route:', error);
        return { message: 'Failed to update account' };
    }
}
}