import React from 'react'

function ForumUserMenu({ push, tab }) {
    return (
        <div className="row">
            <div className="col-sm-4 col-md-6 col-lg-6">
                <button
                    className={tab === '/forums' ? 'btn btn-raise' : ''}
                    onClick={e => push('/forums')}>
                    Live forum
                </button>

            </div>
            <div className="col-sm-4 col-md-6 col-lg-6">
                <button
                    className={tab === '/closedForums' ? 'btn btn-raise' : ''}
                    onClick={e => push('/closedForums')}>
                    closed forums
                </button>
            </div>

        </div>
    )
}

export default ForumUserMenu
