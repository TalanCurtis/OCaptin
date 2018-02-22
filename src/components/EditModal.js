import React, { Component } from 'react';
import Modal from 'react-modal';

class EditModal extends Component {
    constructor(props) {
        Modal.setAppElement('body');
        super(props);
        this.state = {
            inputName: 'name',
            inputScore: 20,
            inputScoreMax: 90,
        }
    }

    handleOnChange(title, value) {
        this.setState({
            [title]:value
        })
    }

    displaySwitch(switchVal) {
        switch (switchVal) {
            case 'tests':
                return (
                    <div>
                        <h2>Edit</h2>
                        <h3>{this.props.selectedItemInfo.name}</h3>
                        <div>
                            <h3>Name: {this.props.selectedItemInfo.name}</h3>
                            <input title='inputName' type="text" onChange={(e)=>(this.handleOnChange(e.target.title, e.target.value))}/>
                        </div>
                        <div>
                            <h3>Max Score: {this.props.selectedItemInfo.scoreMax}</h3>
                            <input title='inputScoreMax' type="number" onChange={(e)=>(this.handleOnChange(e.target.title, e.target.value))}/>
                        </div>
                        <div>
                            <button onClick={this.props.cancelSelectedItem}>Cancel</button>
                            <button onClick={this.props.cancelSelectedItem}>Accept</button>
                        </div>
                    </div>
                );

            default:
                return 'edit modal display switch defaulted';
        }
    }

    render() {
        return (
            <Modal
                isOpen={!!this.props.selectedItem}
                onRequestClose={this.props.cancelSelectedItem}
                contentLabel='Edit Item'
                closeTimeoutMS={200}
                className='EditModal'
            >
                {this.displaySwitch(this.props.selectedItemInfo.type)}

            </Modal>
        )
    }
}



export default EditModal;