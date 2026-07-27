import Message from "../models/message.model,js"

export const getUsers4Sidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getUsers4Sidebarcontroller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}