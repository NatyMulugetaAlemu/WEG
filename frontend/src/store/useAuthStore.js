import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isLoggingIn: false,
    isSigningUp:false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/checkAuth")
            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in checkAuth Store", error.message)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false, })
        }
    },

    signup: async (data) => {
        try {
            set({ isLoading: true, })
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUser: res.data })
            toast.success("Account Created Sucessfully")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in signup Store", error.message)
            set({ authUser: null })
        } finally {
            set({ isLoading: false, })
        }
    },

    login: async (data) => {
        try {
            set({ isLoading: true, })
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res.data })
            toast.success("Logged In Sucessfully")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in signup Store", error.message)
            set({ authUser:res.data})
        } finally {
            set({ isLoading: false, })
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.post("/auth/logout")
            set({ authUser: null })
            toast.success("Logged Out Sucessfully")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in login Store", error.message)
        } 
    },
}))




