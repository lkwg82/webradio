
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function StationRemovalModal(props) {
    const { name, cancel, remove, show } = props;
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Favorit entfernen
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>
                    &quot;{name}&quot; entfernen?
                </h4>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={cancel}>Abbrechen</Button>
                <Button variant="warning" onClick={remove}>Bestätigen</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default StationRemovalModal;