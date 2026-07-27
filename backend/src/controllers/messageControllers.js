import Message from "../models/message.model.js"
import User from "../models/user.model.js"

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


export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const LoggedInUserId = req.user._id
        const messages = await Message.find({
            $or: [
                { senderId: LoggedInUserId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: LoggedInUserId }
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getUsers4Sidebarcontroller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const sendMessages = async (req, res) => {
    try {
        const { text, image } = req.body
        const { id: userToChatId } = req.params
        const LoggedInUserId = req.user._id

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_Url
        }

        const newMessage = new Message({
            userToChatId,
            LoggedInUserId,
            text,
            image: imageUrl,
        })

        await newMessage.save()

        res.status(200).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessages controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}