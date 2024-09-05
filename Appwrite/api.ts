'use server'
import { NewUser, Update } from "@/Types";
import { createSessionClient,createAdminClient } from "./Config";
import {ID} from 'appwrite'

export async function createUserAccount(user:NewUser){ 
  try {
    const {account} = await createAdminClient()
    const promise = await account.create( ID.unique(), user.Email, user.Password,user.Name
    )
    return promise
  } catch (error) {
    console.log(error)
  }   
}
export async function signInAccount(Email:string,Password:string){ 
  try {
    const {account} = await createAdminClient()
    const promise = await account.createEmailPasswordSession(Email,Password)
    return promise
  } catch (error) {
    console.log(error)
  }   
}
export async function createAccountRecovery(Email:string){ 
  try {
    const {account} = await createAdminClient()
    const promise = await account.createRecovery(Email , 'http://localhost:3000/updatedetails/details')
    return promise
  } catch (error) {
    console.log(error)
  }   
}
export async function createAccountUpdate(ID:string, secret:string, password:string){ 
  try {
    const {account} = await createAdminClient()
    const promise = await account.updateRecovery(ID, secret, password)
    return promise
  } catch (error) {
    console.log(error)
  }   
}
