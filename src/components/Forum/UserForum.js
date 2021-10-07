import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { BiUserVoice } from 'react-icons/bi'
import { withRouter } from 'react-router'
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo'
import Navbar from '../layouts/navbar'
import ErrorLoading from '../layouts/ErrorLoading'
import Footer from '../layouts/Footer'
import { DotLoading } from '../layouts/Loading'
import { tellDate } from '../utility/Date'
import { getForum } from './action'
import Comments from './Comments'
import ForumUserMenu from './ForumUserMenu'

function UserForum({ location, history, match }) {
    const [state, setState] = useState({
        loading: true,
        error: false,
        data: ''
    })
    const { data: Forum } = state
    useEffect(() => getForum(match.params.id, setState), [match.params.id])
    return (
        <>
            <Navbar />
            {state.loading ?
                <DotLoading /> :
                state.error ?
                    <ErrorLoading /> :
                    <div className="container mt-3">
                        <ForumUserMenu tab={location.pathname} push={history.push} />
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card text-center">
                                    <div className="card-header ">
                                        <h2 className='text-dark'>
                                            {Forum.title}
                                        </h2>
                                        {
                                            Forum.need_comment ?
                                                Forum.status === 'live' ?
                                                    <p className="float-right text-dark">
                                                        <FontAwesomeIcon icon={faCircle} className='text-success mx-2' />
                                                        The forum is live {Forum.need_comment ? 'you can participate by commenting' : ''}
                                                    </p> :
                                                    <p className="float-right text-dark">

                                                        The forum is closed <ReactTimeAgo date={Forum.closed_at} />   <br />
                                                        {tellDate(Forum.closed_at)}
                                                    </p> : ''
                                        }
                                        <hr />
                                    </div>
                                    <div className="card-body text-dark">
                                        <BiUserVoice className='mx-2' />
                                        <p className="indent text-dark h5" style={{ textAlign: 'justify' }}>
                                            {Forum.description}
                                        </p>

                                    </div>

                                </div>
                            </div>
                            {
                                Forum.need_comment ?
                                    <Comments Forum={Forum} /> :
                                    <div className="col-lg-6 my-auto">
                                        <div className="card">
                                            <div className="card-body">
                                                <h2 className="text-center text-dark">
                                                    Comments are turned off
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div >
                    </div>
            }
            <Footer />
        </>
    )
}

export default withRouter(UserForum)
