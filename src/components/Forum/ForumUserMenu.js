import { Box, Button } from '@material-ui/core'
import React from 'react'

function ForumUserMenu({ push, tab }) {
    return (
        <Box style={{display: 'flex', justifyContent: 'space-evenly', marginBottom: 8}}>
            <div className="col-sm-4 col-md-6 col-lg-6">
                <Button
                    color="primary"
                    variant={tab=== '/forums' ? 'contained' : 'outlined'}
                    onClick={e => push('/forums')}>
                    Live forum
                </Button>

            </div>
            <div className="col-sm-4 col-md-6 col-lg-6">
                <Button
                    color="primary"
                    variant={tab=== '/closedForums' ? 'contained' : 'outlined'}
                    onClick={e => push('/closedForums')}>
                    closed forums
                </Button>
            </div>

        </Box>
    )
}

export default ForumUserMenu
