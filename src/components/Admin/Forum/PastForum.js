import { faBroadcastTower, faComment, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import DataLoading from '../../layouts/DataLoading'
import ErrorLoading from '../../layouts/ErrorLoading'
import { Donothing } from '../comments/action'
import { getComments, getForums } from './actions'
import LazyLoad from 'react-lazyload';
import { SpinnerLoading } from '../../layouts/Loading'
import DeleteForum from './DeleteForum'
function PastForum({ socket, setTab, setForum }) {
    const [state, setState] = useState({
        loading: true,
        error: false,
        data: []
    })
    const [comments, setComment] = useState([])

    const fetch = () => getForums(setState, 'closed')
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
        setForum(forum)
        socket ? socket.emit('getComment', forum._id) : Donothing()
        setTab('forum')
    }

    /**get comment length*/
    const getComment = forum_id => {
        let find = comments.find(c => c.id === forum_id)
        return find ? find.comments : 0
    }
    return (
        <div className="row">
            {state.loading ?
                <DataLoading /> :
                state.error ?
                    <ErrorLoading /> :
                    state.data.length ?
                        state.data.map(l =>
                            <div className="col-lg-6 my-3" key={l._id}>
                                <LazyLoad height={200} placeholder={<SpinnerLoading />}>
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
                                            <DeleteForum forum={l} fetch={fetch} />
                                        </div>
                                    </div>
                                </LazyLoad>
                            </div>
                        ) :
                        <div className="col-lg-12 mt-4">
                            <h4 className="text-center text-danger">
                                No Closed forums yet!
                            </h4>
                        </div>
            }
        </div>
    )
}

export default PastForum
