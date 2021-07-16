import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { host } from '../../../config/config';
import { getHeaders } from '../../../config/headers';
import { DotLoading } from './../../layouts/Loading';
function DeleteBids({ bid, fetch }) {
    const [modal, setModal] = useState(false);
    const [save, setSave] = useState({
        process: '',
        error: '',
        success: ''
    })
    useEffect(() => setSave({ process: '', error: '', success: '' }), [modal])
    const toggle = () => setModal(!modal);
    const deleteVacancy = async () => {
        try {
            setSave({ process: 'Deleting...', error: '', success: '' })
            const del = await axios.delete(host + 'bid/' + bid._id, getHeaders())
            if (del.status === 200) {
                setSave({ process: '', error: '', success: 'Deleted successfully' })
                setTimeout(() => fetch(), 1000)
            }
            else {
                setSave({ process: '', error: 'can not delete data internal server error', success: '' })
            }
        }
        catch (err) {
            console.log(err)
            setSave({ process: '', error: 'can not save data internal server error', success: '' })

        }


    }
    return (
        <div>
            <button className="btn btn-danger mx-2" onClick={toggle}>
                <FontAwesomeIcon icon={faTrash} className='mx-2' />
                Delete
            </button>
            <Modal isOpen={modal} toggle={toggle} size='md' style={{ paddingTop: 200 }}>
                <ModalHeader toggle={toggle} className='text-dark'>
                    Delete Bid
                </ModalHeader>
                <ModalBody>
                    <p className="text-dark">

                        Are you sure to delete this bid
                    </p>
                    {save.process ?
                        <div className="d-flex justify-content-center">
                            <DotLoading />
                            <p className='text-dark'>{save.process}</p>

                        </div> :
                        <p></p>
                    }

                    <p className="text-center text-success">
                        {save.success}
                    </p>
                    <p className="text-center text-danger">
                        {save.error}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={deleteVacancy}>
                        Delete vacancy
                    </Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default DeleteBids
