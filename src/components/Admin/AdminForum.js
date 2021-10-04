import React, { useState } from 'react'
import CreateForum from './Forum/CreateForum';
import Forum from './Forum/Forum';
import ForumMenu from './Forum/ForumMenu';
import LiveForum from './Forum/LiveForum';
import PastForum from './Forum/PastForum';

function AdminForum({ socket, comments }) {
    const [tab, setTab] = useState('past')
    const [forum, setForum] = useState('')
    return (
        <div className="container my-4 ml-4">
            <ForumMenu tab={tab} setTab={setTab} />
            {
                tab === 'live' ?
                    <LiveForum socket={socket} setTab={setTab} /> :
                    tab === 'past' ?
                        <PastForum socket={socket} /> :
                        tab === 'new' ?
                            <CreateForum
                                setForum={setForum}
                                setTab={setTab}
                            /> :
                            tab === 'forum' ?
                                <Forum
                                    socket={socket}
                                    Forum={forum}
                                    comments={comments}
                                /> :
                                <p></p>
            }
        </div>
    )
}

export default AdminForum
