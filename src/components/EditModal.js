import React from 'react';
import Modal from 'react-modal';

const EditModal = (props) => {
    Modal.setAppElement('body');
    return (
        <Modal
        isOpen={!!props.selectedItem}
        onRequestClose={props.cancelSelectedItem}
        contentLabel='Edit Item'
        >
            <h3>Edit </h3>

            <button onClick={props.cancelSelectedItem}>Cancel</button>
        </Modal>
    )
}

export default EditModal;