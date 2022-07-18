import { Container } from '@material-ui/core'
import { withRouter } from 'react-router'
import ForumUserMenu from '../Forum/ForumUserMenu'
import LiveUserForum from '../Forum/LiveUserForum'
import { TitleBar } from '../layouts/titlebar'

function Forums({ location, history }) {
    return (
        <>
            <TitleBar text="Forums" />
            <Container maxWidth="lg" style={{margin: "1rem auto"}}>
                <ForumUserMenu tab={location.pathname} push={history.push} />
                <div className="row">
                    <LiveUserForum push={history.push} />
                </div>

            </Container>
        </>
    )
}

export default withRouter(Forums)
