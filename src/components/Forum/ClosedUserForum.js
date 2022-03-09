import { faBroadcastTower, faComment, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { removeDuplicates } from '../../utility/array'
import { getComments, getForums } from '../Admin/Forum/actions'
import DataLoading from '../layouts/DataLoading'
import ErrorLoading from '../layouts/ErrorLoading'
import Footer from '../layouts/Footer'
import { SpinnerLoading } from '../layouts/Loading'
import NavBar from '../layouts/navbar'
import ForumUserMenu from './ForumUserMenu'

function ClosedUserForum({ location, history }) {
    const [state, setState] = useState({
        loading: true,
        error: false,
        data: [],
        catagory: []
    })
    const [comments, setComment] = useState([])

    /**setdata */
    useEffect(() => getForums(setState, 'closed'), [])

    /**comments length */
    useEffect(() => {
        const getComm = async () => {
            let commLengthUnResolved = state.data.map(async d => {
                let commentLength = await getComments(d._id)
                return { id: d._id, comments: commentLength.length }
            })
            let commLengthResolved = await Promise.all(commLengthUnResolved)
            setComment(commLengthResolved)
        }
        getComm()
    }, [state.data])

    /**setForum */
    const Forum = forum => {
        sessionStorage.removeItem('forum_id')
        sessionStorage.setItem('forum_id', forum._id)
        history.push('/forum/' + forum._id)
    }

    /**get comment length*/
    const getComment = forum_id => {
        let find = comments.find(c => c.id === forum_id)
        return find ? find.comments : 0
    }
    const chageCatagory = type => state.catagory.filter(d => d.type === type)
    const handleCatagory = type => setState(s => ({ ...s, data: type === 'All' ? s.data : chageCatagory(type) }))
    return (
        <>
            <NavBar />
            {state.loading ?
                <DataLoading /> :
                state.error ?
                    <ErrorLoading /> :
                    <div className="container" style={{ minHeight: '100vh' }}>
                        <ForumUserMenu tab={location.pathname} push={history.push} />
                        <div className="row" >

                            {
                                state.data.length ?
                                    <div className="col-lg-7" style={{ display: 'inline-flex' }}>
                                        catagory:
                                        <select name="" id="" className='mx-3' onChange={e => handleCatagory(e.target.value)}>
                                            <option value="All" className='mx-2'>All</option>
                                            {state.catagory.map(c =>
                                                <option value={c.type} className='mx-2'>{c.type}</option>
                                            )}
                                        </select>
                                    </div> :
                                    ''
                            }
                            {
                                state.data.length ?
                                    state.data.map(l =>
                                        <div className="col-lg-6 my-3" key={l._id}>
                                            <lazyload height={200} placeholder={<SpinnerLoading />}>
                                                <div className="card">
                                                    <div className="card-header text-dark">
                                                        <FontAwesomeIcon icon={faUsers} className='mx-2 text-success' />
                                                        {l.title}

                                                    </div>
                                                    <div className="card-body text-dark">
                                                        <FontAwesomeIcon icon={faBroadcastTower} className='mx-2' />
                                                        {l.description.length < 200 ? l.description : l.description.slice(0, 200) + '...'}
                                                    </div>
                                                    <div className="card-footer text-dark" style={{ display: 'inline-flex' }}>
                                                        <FontAwesomeIcon icon={faComment} className='mx-2' />
                                                        {getComment(l._id)} comments
                                                        <button className="btn btn-raise float-right" onClick={() => Forum(l)}>
                                                            show forum
                                                        </button>
                                                    </div>
                                                </div>
                                            </lazyload>
                                        </div>
                                    )
                                    :
                                    <div className="col-lg-12 mt-4">
                                        <h4 className="text-center text-danger">
                                            No Closed forums yet!
                                        </h4>
                                    </div>

                            }
                        </div>
                    </div>
            }
            <Footer />
        </>
    )
}

export default withRouter(ClosedUserForum)
