import { Injectable } from "@nestjs/common";
import { Client, Storage, ID } from "appwrite"; // Ensure ID is imported
@Injectable()
export class StorageService {
    
    upload(songId : number ,file : Express.Multer.File) {
        const client = new Client()
        .setEndpoint(process.env.STOREAGE_PATH)
        .setProject(process.env.STOREAGE_PROJECTID);
        const storage = new Storage(client); // Use 'this' to make it a class property
        const appwriteFile = new File([file.buffer], file.originalname, {
            type: file.mimetype,
            lastModified: Date.now()
        });
        const promise = storage.createFile(
            process.env.STOREAGE_BUCKED,
            songId.toString(),
            appwriteFile
        );

        promise.then(response => {
            console.log("Upload successful:", response);
            return true
        }).catch(error => {
            console.error("Upload failed:", error);
            // Additional error handling can go here
            return false
        });
    }
    async downloadUrl(id : number){
        const client = new Client();

        const storage = new Storage(client);

        client
            .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
            .setProject('66f4c6a60037118cbadb') // Your project ID;

        const result = storage.getFileDownload('66f4cd030026ca9d790f', id.toString());
        return result
    }
}
