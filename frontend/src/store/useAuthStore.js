import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isLoggingIn: false,
    isSigningUp: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers:[],

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
        set({ isSigningUp: true, })
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUser: res.data })
            toast.success("Account Created Sucessfully")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in signup Store", error.message)
        } finally {
            set({ isSigningUp: false, })
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true, })
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res.data })
            toast.success("Logged In Sucessfully")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in login Store", error.message)
        } finally {
            set({ isLoggingIn: false, })
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
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/updateProfile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("error in update profile:", error);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

}))




