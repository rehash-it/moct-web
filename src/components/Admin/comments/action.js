export const Donothing = () => { }
export const addComments = (socket, comment) => {
    try {
        if (socket ? true : false) {
            socket.emit('addComment', comment)
        }
    }
    catch (err) {
        console.log(err)
    }
}
export const DeleteComments = (socket, comment) => {
    try {
        if (socket ? true : false) {
            socket.emit('delComment', comment)
        }
    }
    catch (err) {
        console.log(err)
    }
}
export class commentsClass {
    constructor(comment) {
        this.comment = comment
    }
    last_comment = () => this.comment[(this.comment.length - 1)]
    last_comment_id = () => this.last_comment() ? this.last_comment()._id : ''
}