import React from 'react'

function ForumMenu({ setTab, tab }) {
    return (
        <div className="row">
            <div className="col-lg-6">
                <button
                    className={tab === 'past' ? 'btn btn-raise' : ''}
                    onClick={e => setTab('past')}>
                    Past forums
                </button>
            </div>
            <div className="col-lg-6">
                <button
                    className={tab === 'live' || tab === 'new' || tab === 'forum' ? 'btn btn-raise' : ''}
                    onClick={e => setTab('live')}>
                    Live forum
                </button>

            </div>
        </div>
    )
}

export default ForumMenu
