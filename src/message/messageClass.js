export class messageClass {
    constructor(message, user_id, admin_id) {
        this.message = message
        this.user_id = user_id
        this.admin_id = admin_id
    }
    firstMessage = () => this.message[0]
    isFirstMessage = id => this.firstMessage() ? this.firstMessage().id === id : false
    userMessage = () => this.message.filter(m => this.user_id === m.user_id && this.admin_id === m.admin_id)
    adminMessage = () => this.message.filter(m => this.admin_id === m.admin_id && this.user_id === m.user_id)
    lastMessage = () => {
        let length = (this.message.length) - 1
        let mess = this.message[length]
        return mess
    }
    lastMessage_id = () => this.lastMessage() ? this.lastMessage().id : ''
}