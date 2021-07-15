import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const ModalLayout = ({ size, btnColor, buttonLabel, className, Title, BodyElement, functions }) => {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color={btnColor} onClick={toggle}>
                {buttonLabel}
            </Button>
            <Modal isOpen={modal} toggle={toggle} className={className} size={size}>
                <ModalHeader toggle={toggle} className='text-dark'>
                    {Title}
                </ModalHeader>
                <ModalBody>
                    <BodyElement functions={{ functions, toggle }} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalLayout
