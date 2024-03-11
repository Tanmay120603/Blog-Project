import { Client, ID,Storage } from "appwrite";
import config from "../config/config";

class StorageService{
    client=new Client().setEndpoint(config.appWriteUrl).setProject(config.appWriteProjectId)
    storage;

    constructor(){
        this.storage=new Storage(this.client)
    }

    async uploadFile(file){
        const data=await this.storage.createFile(config.appWriteBucketId,ID.unique(),file)
        return data
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(config.appWriteBucketId,fileId)
    }

    async deleteFile(fileId){
        try{
        return await this.storage.deleteFile(config.appWriteBucketId,fileId)
        }
        catch(error){
            return error
        }
    }

    async updateFile({file,fileId}){
        try{
            return await this.storage.updateFile(config.appWriteBucketId,fileId,file)
        }
        catch(error){
            return error
        }
    }

}

const storageService=new StorageService()

export default storageService