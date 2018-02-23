import React, { Component } from 'react';
import Modal from 'react-modal';
// import axios from 'axios';
import { connect } from 'react-redux';
import { editAssignment } from '../ducks/reducers/users';

class EditModal extends Component {
    constructor(props) {
        Modal.setAppElement('body');
        super(props);
        this.state = {
            inputName: undefined,
            inputScore: undefined,
            inputScoreMax: undefined,
        }
    }

    handleOnChange(title, value) {
        this.setState({
            [title]: value
        })
    }

    handleAccept(selectedItem) {
        //console.log('accept clicked', selectedItem)
        let updatedItem={}
        switch (selectedItem.type) {
            case 'tests':
                console.log(' update selected Item', selectedItem)
                updatedItem = {
                    name: this.state.inputName,
                    scoreMax: this.state.inputScoreMax
                }
                // get updated info
                updatedItem = Object.assign({}, selectedItem, updatedItem)
                console.log(' update updated Item', updatedItem)

                // sending to reducer
                this.props.editAssignment(updatedItem)
                // Update redux store

                // close modal
                this.props.cancelSelectedItem()
                break;
            case 'assignments':
                console.log(' update selected Item', selectedItem)
                updatedItem = {
                    name: this.state.inputName,
                    scoreMax: this.state.inputScoreMax
                }
                // get updated info
                updatedItem = Object.assign({}, selectedItem, updatedItem)
                console.log(' update updated Item', updatedItem)

                // sending to reducer
                this.props.editAssignment(updatedItem)
                // Update redux store

                // close modal
                this.props.cancelSelectedItem()
                break;

            default:
                return 'handle accept in edit modal defaulted';
        }
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
                            <input title='inputName' type="text" onChange={(e) => (this.handleOnChange(e.target.title, e.target.value))} />
                        </div>
                        <div>
                            <h3>Max Score: {this.props.selectedItemInfo.scoreMax}</h3>
                            <input title='inputScoreMax' type="number" onChange={(e) => (this.handleOnChange(e.target.title, e.target.value * 1))} />
                        </div>
                        <div>
                            <button onClick={this.props.cancelSelectedItem}>Cancel</button>
                            <button onClick={() => this.handleAccept(this.props.selectedItemInfo)}>Accept</button>
                        </div>
                    </div>
                );
            case 'assignments':
                return (
                    <div>
                        <h2>Edit</h2>
                        <h3>{this.props.selectedItemInfo.name}</h3>
                        <div>
                            <h3>Name: {this.props.selectedItemInfo.name}</h3>
                            <input title='inputName' type="text" onChange={(e) => (this.handleOnChange(e.target.title, e.target.value))} />
                        </div>
                        <div>
                            <h3>Max Score: {this.props.selectedItemInfo.scoreMax}</h3>
                            <input title='inputScoreMax' type="number" onChange={(e) => (this.handleOnChange(e.target.title, e.target.value * 1))} />
                        </div>
                        <div>
                            <button onClick={this.props.cancelSelectedItem}>Cancel</button>
                            <button onClick={() => this.handleAccept(this.props.selectedItemInfo)}>Accept</button>
                        </div>
                    </div>
                );

            default:
                return 'edit modal display switch defaulted';
        }
    }

    render() {
        // console.log('modal props: ',this.props)
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

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, { editAssignment: editAssignment })(EditModal);