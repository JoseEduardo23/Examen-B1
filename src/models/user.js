
import bcrypt from 'bcrypt';

import dotenv from 'dotenv'


dotenv.config()

const userModel = {

    async registerUserModel(newUser){
        const url = process.env.URL_BDD_USERS
        const peticion = await fetch(url,{
            method:"POST",
            body:JSON.stringify(newUser),
            headers:{'Content-Type':"application/json"}
        })
        const data = await peticion.json()
        return data
    }

    ,

    async loginUserModel(username,password){
        const url = process.env.URL_BDD_USERS
        const peticion = await fetch(url)
        const users = await peticion.json()
        const user = users.find(user => user.username === username)
        if(!user){
            return {error:"Username o password bad"}
        }
        const passwordMatch = await bcrypt.compare(password,user.password)
        if (user && passwordMatch){
            return user
        }
        else{
            return {error:"Username o password bad"}
        }
    }

    ,


    async getuserbyIDModel(userID){
        const peticion = await fetch (`${process.env.URL_BDD_USERS}${userID}`)
        const data = await peticion.json()
        return data
    }

    ,

    async getAllUserModel(){
        const peticion = await fetch(process.env.URL_BDD_USERS)
        const user = await peticion.json()
        return user
    }

    ,

    async deletauserModel(userID){
        const url = (`${process.env.URL_BDD_USERS}${userID}`)
        const peticion = await fetch(url,{
            method:"DELETE"
        })
        const data = await peticion.json()
        return data
    }

    ,

    async updateuserModel(userID){
        const url = (`${process.env.URL_BDD_USERS}${userID}`)
        const peticion = await fetch(url,{
            method:"PUT",
            body:JSON.stringify(this.updateuserModel),
            headers:{'Content-Type':"application/json"}
        })
        const data = await peticion.json()
        return data
    }
}

export default userModel