export const Donothing = () => { }
export const addComments = (socket, comment) => {
    try {
        if (socket ? true : false) {
            socket.emit('addComment', { ...comment })
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
    find_comment = id => this.comment.find(c => c._id === id)
    last_comment = () => this.comment[(this.comment.length - 1)]
    last_comment_id = () => this.last_comment() ? this.last_comment()._id : '';
    comments = () => {
        let Comments = this.comment.map(c => {
            return {
                _id: c._id,
                key: c._id,
                title: `${c.user_name} <p className="indent">${c.comment}</p>`,
                reply: c.reply,
                reply_id: c.reply ? c.reply_id : '',
                children: null
            }
        })
        let map = {}, node, res = [], i;
        for (i = 0; i < Comments.length; i += 1) {
            map[Comments[i]._id] = i;
            Comments[i].children = [];
        };
        for (i = 0; i < Comments.length; i += 1) {
            node = Comments[i];
            if (node.reply) {
                Comments[map[node.reply_id]].children.push(node);
            }
            else {
                res.push(node);
            };
        };
        return res
    }
    reply_commnets = () => this.comment.filter(c => c.reply)

}
/**
 *
 *
 *
 */
export const motion = {
    motionName: 'node-motion',
    motionAppear: false,
    onAppearStart: () => ({ height: 0 }),
    onAppearActive: node => ({ height: node.scrollHeight }),
    onLeaveStart: node => ({ height: node.offsetHeight }),
    onLeaveActive: () => ({ height: 0 }),
};