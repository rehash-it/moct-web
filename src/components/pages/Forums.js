import React from 'react'
import { withRouter } from 'react-router'
import ForumUserMenu from '../Forum/ForumUserMenu'
import LiveUserForum from '../Forum/LiveUserForum'
import Footer from '../layouts/Footer'
import Navbar from '../layouts/navbar'
function Forums({ location, history }) {

    return (
        <>
            <Navbar />
            <div className="container">
                <ForumUserMenu tab={location.pathname} push={history.push} />

                <div className="row">
                    <LiveUserForum push={history.push} />
                </div>

            </div>
            <Footer />
        </>
    )
}

export default withRouter(Forums)
