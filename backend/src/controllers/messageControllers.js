import User from "../models/user.model"

export const getUsers4SideBar = async () => {
    try {
        const loggedInUserId = req.user._id
        const fulteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
        res.status(200).josn(filteredUsers)
    } catch (error) {
        console.log("Error in getUsers4SideBar controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const getMessages = async () => {

}

export const getUsers4SideBar = async () => {

}