import React from 'react'

function ForumMenu({ setTab, tab }) {
    return (
        <div className="row">
            <div className="col-lg-4">
                <button
                    className={tab === 'past' ? 'btn btn-raise' : ''}
                    onClick={e => setTab('past')}>
                    closed forums
                </button>
            </div>
            <div className="col-lg-4">
                <button
                    className={tab === 'live' ? 'btn btn-raise' : ''}
                    onClick={e => setTab('live')}>
                    Live forum
                </button>

            </div>
            <div className="col-lg-4">
                <button
                    className={tab === 'new' ? 'btn btn-raise' : ''}
                    onClick={e => setTab('new')}>
                    Create Forum
                </button>

            </div>
        </div>
    )
}

export default ForumMenu
