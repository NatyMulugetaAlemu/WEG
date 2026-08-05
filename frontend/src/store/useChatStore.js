import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

export const useChatStore=create((set,get)=>({
       messages:[],
       users:[],
       selectedUser:null,
       isUsersLoading:false,
       isMessagesLoading:false,


       getUsers:async()=>{
        set({isUsersLoading:true})
        try {
            
        } catch (error) {
            
        }finally{
             set({isUsersLoading:false})
        }
       }

}))