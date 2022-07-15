import { withRouter } from 'react-router'
import ForumUserMenu from '../Forum/ForumUserMenu'
import LiveUserForum from '../Forum/LiveUserForum'
import { TitleBar } from '../layouts/titlebar'

function Forums({ location, history }) {
    return (
        <>
            <TitleBar text="Forums" />
            <div className="container">
                <ForumUserMenu tab={location.pathname} push={history.push} />

                <div className="row">
                    <LiveUserForum push={history.push} />
                </div>

            </div>
        </>
    )
}

export default withRouter(Forums)
