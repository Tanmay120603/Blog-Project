import {Client,Databases, Query} from "appwrite"
import config from "../config/config"

class DataBaseSerivce{
     client=new Client().setEndpoint(config.appWriteUrl).setProject(config.appWriteProjectId)
     databases;

     constructor(){
        this.databases=new Databases(this.client)
     }

     async createPost(slug,{userId,title,content,status,featuredImage}){
            return await this.databases.createDocument(config.appWriteDatabaseId,config.appWriteCollectionId,slug,{userId,title,content,status,featuredImage})
     }

     async deletePost(slug){
        try{
            return await this.databases.deleteDocument(config.appWriteDatabaseId,config.appWriteCollectionId,slug)
        }
        catch(error){
            return error
        }
     }

     async updatePost(slug,{title,content,status,featuredImage}){
        try{
           return await this.databases.updateDocument(config.appWriteDatabaseId,config.appWriteCollectionId,slug,{title,content,status,featuredImage})
        }
        catch(error){
            return error
        }
     }

     async getIndividualPost(slug){
        try{
            return await this.databases.getDocument(config.appWriteDatabaseId,config.appWriteCollectionId,slug)
        }
        catch(error){
            return error
        }
     }

     async getAllPosts(){
        // return await this.databases.listDocuments(config.appWriteDatabaseId,config.appWriteCollectionId,[Query.equal("status","active")])
        return await this.databases.listDocuments(config.appWriteDatabaseId,config.appWriteCollectionId)
     }
}

const databases=new DataBaseSerivce()

export default databases