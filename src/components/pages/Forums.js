import React, { useContext } from 'react'
import { withRouter } from 'react-router'
import ForumUserMenu from '../Forum/ForumUserMenu'
import LiveUserForum from '../Forum/LiveUserForum'
import Footer from '../layouts/Footer'
import Navbar from '../layouts/navbar'
import styles from '../../styles/titlebar.module.css'
import { Box } from '@material-ui/core'
import { LanguageContext } from '../../context/context'

function Forums({ location, history }) {
    const {t} = useContext(LanguageContext)
    return (
        <>
            <Navbar />
            <Box paddingX={10} paddingY={2} className={styles.titlebar} height={200} display="flex" alignItems="end">
                <h1 style={{color: '#fff'}}>{t('Forums')}</h1>
            </Box>
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
