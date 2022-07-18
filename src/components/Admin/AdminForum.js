import { Container } from '@material-ui/core';
import React, { useState } from 'react'
import CreateForum from './Forum/CreateForum';
import Forum from './Forum/Forum';
import ForumMenu from './Forum/ForumMenu';
import LiveForum from './Forum/LiveForum';
import PastForum from './Forum/PastForum';

function AdminForum({ socket, comments, setForum, forum }) {
    const [tab, setTab] = useState('past')
    return (
        <Container maxWidth="lg" style={{margin: "1rem auto" }}>
            <ForumMenu tab={tab} setTab={setTab} />
            {
                tab === 'live' ?
                    <LiveForum
                        socket={socket}
                        setTab={setTab}
                        setForum={setForum}
                    /> :
                    tab === 'past' ?
                        <PastForum socket={socket} setForum={setForum} setTab={setTab} /> :
                        tab === 'new' ?
                            <CreateForum
                                setForum={setForum}
                                setTab={setTab}
                                socket={socket}
                            /> :
                            tab === 'forum' ?
                                <Forum
                                    socket={socket}
                                    Forum={forum}
                                    comments={comments}
                                    setForum={setForum}
                                    setTab={setTab}
                                    Tab={tab}
                                /> :
                                ''
            }
        </Container>
    )
}

export default AdminForum
