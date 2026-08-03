import { create } from "zustand"
import { axiosInstance } from "../lib/axios"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isLoading: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/checkAuth")
            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in check auth Store", error.message)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false, })
        }
    }
}))