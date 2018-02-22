import React from 'react';
import Modal from 'react-modal';

const EditModal = (props) => {
    Modal.setAppElement('body');

    return (
        <Modal
            isOpen={!!props.selectedItem}
            onRequestClose={props.cancelSelectedItem}
            contentLabel='Edit Item'
            closeTimeoutMS={200}
            className='EditModal'
        >
            {(props.selectedItemInfo[0] === 'tests') ?
                <div>
                    <div>
                        <h3>Title: {props.selectedItemInfo[2]}</h3>
                        <input type="text" />
                    </div>
                    <div>
                        <h3>MaxScore: {props.selectedItemInfo[3]}</h3>
                        <input type="number" />
                    </div>
                </div>
                : null}

            <button onClick={props.cancelSelectedItem}>Cancel</button>
            <button onClick={props.cancelSelectedItem}>Accept</button>
        </Modal>
    )
}

export default EditModal;