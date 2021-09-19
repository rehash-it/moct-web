import { randomID } from "../components/utility/general"

export const createMessage = (message, sender, reciever) => ({
    id: randomID(),
    message,
    reciever,
    sender,
    date: Date.now()
})
export const connectUserName = (userid, username) => ({ userid, username, admin_id: '', admin_name: '' })