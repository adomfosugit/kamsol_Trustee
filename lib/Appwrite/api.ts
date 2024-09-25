'use server'
import { NewUser, Update } from "@/Types";
import { createSessionClient,createAdminClient } from "./Config";
import {ID, Query} from 'node-appwrite'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { parseStringify } from "@/lib/utils";
// Authentication 
const {NEXT_DATABASE_ID, NEXT_PROPERTY_COLLECTION_ID} = process.env
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
    cookies().set("appwrite-session", promise.secret, {
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
    return parseStringify(promise)
  } catch (error) {
    console.log(error)
  }   
}
export async function getLoggedInUser(){ 
  try {
    const {account} = await createSessionClient()
    const user =  await account.get()
    return parseStringify(user)
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
// Database 
export async function getPropertyData(){
  try {
    const { database } = await createAdminClient()
    const propertyData = await database.listDocuments(
        NEXT_DATABASE_ID!,
        NEXT_PROPERTY_COLLECTION_ID!,
        [Query.select(['Name','Price','$id','Images']),Query.limit(1)]
      
    )
    if(!propertyData) throw new Error
    return propertyData.documents
  } catch (error) {
    
  }
}
// Database 
export async function getBlogPropertyData(blogid:string){
  try {
    const { database } = await createAdminClient()
    const propertyData = await database.getDocument(
      NEXT_DATABASE_ID!,
      NEXT_PROPERTY_COLLECTION_ID!,
      blogid)
    return propertyData
  } catch (error) {
    
  }
}
// Messaging Email
export async function sendTermsConditions( content:string , userId:string ){
  try {
    const { messages } = await createAdminClient()
    const termsMessage = await messages.createEmail(
      ID.unique(),
      'Investment Plan ',
      content,
      [],[userId],[],[],[],[], false,true
      
    )
    return termsMessage
  } catch (error) {
    
  }
}