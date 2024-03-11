import { Account, Client, ID } from "appwrite"
import config from "../config/config"

class AuthService{
    client=new Client().setEndpoint(config.appWriteUrl).setProject(config.appWriteProjectId)
    account;

    constructor(){
        this.account=new Account(this.client)
    }

    async createUser({email,password,userName}){
           return await this.account.create(ID.unique(),email,password,userName)
    }

    async loginUser({email,password}){
        await this.account.createEmailPasswordSession(email,password)
    }

    async getCurrentStateOfUser(){
        return await this.account.get()
    }

    async logout(){
        try{
            return await this.account.deleteSessions()
        }
        catch(error){
            return error
        }
    }

}

const authService=new AuthService()

export default authService