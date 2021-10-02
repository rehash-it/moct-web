import { randomID } from "../components/utility/general"
/** 
 *  message: {
        type: String,
        required: true
    },
    sender: String,
    reciever: String,
    admin_id: String,
    user_name: String,
    admin_name: String,
    user_id: String,
    created_at: {
        type: Date,
        default: Date.now
    }
*/
export const createMessage = (message, sender, reciever, admin_id, user_id, admin_name, user_name, forced) => ({
    id: randomID(),
    message,
    reciever,
    sender,
    admin_id,
    user_id,
    admin_name,
    user_name,
    forced: forced ? true : false
})
export const connectUserName = (userid, username) => ({ userid, username, admin_id: '', admin_name: '' })