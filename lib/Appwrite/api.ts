'use server'
import { NewUser, Update } from "@/Types";
import { createSessionClient,createAdminClient } from "./Config";
import {ID} from 'node-appwrite'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { parseStringify } from "@/lib/utils";

export async function createUserAccount(user:NewUser){ 
  try {
    const {account} = await createAdminClient()
    const promise = await account.create( ID.unique(), user.Email, user.Password,user.Name)
    const session = await account.createEmailPasswordSession(user.Email,user.Password);
  
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(promise)
  
  } catch (error) {
    console.log(error)
  }   
}
export async function signInAccount(Email:string,Password:string){ 
  try {
    const {account} = await createAdminClient()
    const promise = await account.createEmailPasswordSession(Email,Password);
  
    return parseStringify(promise)
  } catch (error) {
    console.log(error)
  }   
}
export async function createAccountRecovery(Email:string){ 
  try {
    const {account} = await createAdminClient()
    const promise = await account.createRecovery(Email , 'http://localhost:3000/updatedetails/details')
    return parseStringify(promise)
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
export async function getLoggedInUser(){ 
  try {
    const {account} = await createSessionClient()
    
    return await account.get()
  } catch (error) {
    console.log(error)
  }   
}
export async function LogOutUser(){ 
  try {
    const {account} = await createSessionClient()
    cookies().delete('appwrite-session')
    await account.deleteSession(parseStringify('current'))
    
  } catch (error) {
    console.log(error)
  }   
}
