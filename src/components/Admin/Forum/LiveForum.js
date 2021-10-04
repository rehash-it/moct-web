import React, { useState } from 'react'

function LiveForum({ socket, setTab }) {

    return (
        <div className="row">
            <div className="col-lg-4">

            </div>
            <div className="col-lg-8">
                <button className="btn btn-raise" onClick={() => setTab('new')}>
                    create new forum
                </button>
            </div>
        </div>
    )
}

export default LiveForum
