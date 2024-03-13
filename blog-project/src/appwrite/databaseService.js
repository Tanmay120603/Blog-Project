import {Client,Databases} from "appwrite"
import config from "../config/config"

class DataBaseSerivce{
     client=new Client().setEndpoint(config.appWriteUrl).setProject(config.appWriteProjectId)
     databases;

     constructor(){
        this.databases=new Databases(this.client)
     }

     async createPost(data){
            const [slug,{userId,title,content,status,featuredImage}]=data
            return await this.databases.createDocument(config.appWriteDatabaseId,config.appWriteCollectionId,slug,{userId,title,content,status,featuredImage})
     }

     async deletePost(slug){
            return await this.databases.deleteDocument(config.appWriteDatabaseId,config.appWriteCollectionId,slug)
     }

     async updatePost(data){
           const [slug,{userId,title,content,status,featuredImage}]=data
           return await this.databases.updateDocument(config.appWriteDatabaseId,config.appWriteCollectionId,slug,{title,content,status,featuredImage,userId})
     }

     async getIndividualPost(slug){
        return await this.databases.getDocument(config.appWriteDatabaseId,config.appWriteCollectionId,slug)
     }

     async getAllPosts(){
        // return await this.databases.listDocuments(config.appWriteDatabaseId,config.appWriteCollectionId,[Query.equal("status","active")])
        return await this.databases.listDocuments(config.appWriteDatabaseId,config.appWriteCollectionId)
     }
}

const databases=new DataBaseSerivce()

export default databases