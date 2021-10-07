import { faBroadcastTower, faCircle, faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Lazyload from 'react-lazyload'
import { getComments, getForums } from '../Admin/Forum/actions'
import DataLoading from '../layouts/DataLoading'
import ErrorLoading from '../layouts/ErrorLoading'
import { SpinnerLoading } from '../layouts/Loading'

function LiveUserForum({ push }) {
    const [state, setState] = useState({
        loading: true,
        error: false,
        data: []
    })
    const [comments, setComment] = useState([])

    /**setdata */
    useEffect(() => getForums(setState, 'live'), [])

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
        push('/forum/' + forum._id)
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
                                <Lazyload height={200} placeholder={<SpinnerLoading />}>
                                    <div className="card">
                                        <div className="card-header text-dark">
                                            <FontAwesomeIcon icon={faCircle} className='mx-2 text-success' />
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
                                </Lazyload>
                            </div>
                        ) :
                        <div className="col-lg-12">
                            <h4 className="text-center text-danger">
                                No live forums yet!
                            </h4>
                        </div>
            }
        </div>
    )
}

export default LiveUserForum
