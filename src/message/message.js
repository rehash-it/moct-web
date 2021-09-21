import { randomID } from "../components/utility/general"

export const createMessage = (message, sender, reciever, admin_id, user_id) => ({
    id: randomID(),
    message,
    reciever,
    sender,
    date: Date.now(),
    admin_id,
    user_id
})
export const connectUserName = (userid, username) => ({ userid, username, admin_id: '', admin_name: '' })