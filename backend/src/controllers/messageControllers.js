import User from "../models/user.model.js"
import Message from "../models/message.model.js"

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
    try {
        const { id: userToChatId } = req.params
        const loggedInUserId = req.user._id

        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId, recieverId: userToChatId },
                { senderId: userToChatId, recieverId: loggedInUserId },
            ]
        })

        res.status(200).json(messages)

    } catch (error) {
        console.log("Error in getUsers4SideBar controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const sendMessage = async () => {
    try {
        const { text, image } = req.body
        const { id: userToChatId } = req.params
        const loggedInUserId = req.user._id

        let imageUrl
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl: uploadResponse.secure_url
        }

        const message = new Message({
            loggedInUserId,
            userToChatId,
            text,
            image: imageUrl
        })

        await message.save()
        res.status(201).json(message);
    } catch (error) {
        console.log("Error in getUsers4SideBar controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}