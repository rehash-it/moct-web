import React, { useEffect, useState } from 'react';
import { fecthArchives, newArchives } from './Archives/action';
import NewArchives from './Archives/NewArchives';
import SavedArchives from './Archives/SavedArchives';

const Adminarchives = () => {
    const [Newarchives, setNewArchives] = useState({
        data: [],
        loading: true,
        error: false
    })
    const fetchNewArchives = () => newArchives(setNewArchives)
    useEffect(() => newArchives(setNewArchives), [])
    const [savedArchives, setSavedArchives] = useState({
        data: [],
        loading: true,
        error: false
    })
    const fetchSavedArchives = () => fecthArchives(setSavedArchives)
    useEffect(() => fecthArchives(setSavedArchives), [])
    return (
        <div className="container my-4 ml-5">
            <NewArchives
                fetchNewArchives={fetchNewArchives}
                fetchSavedArchives={fetchSavedArchives}
                newArchives={Newarchives}
            />
            <SavedArchives
                fetch={fetchSavedArchives}
                savedArchives={savedArchives}
            />
        </div>
    );
}

export default Adminarchives;
