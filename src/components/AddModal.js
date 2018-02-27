import React, { Component } from 'react';
import Modal from 'react-modal';
// import axios from 'axios';
import { connect } from 'react-redux';
import { addAssignment } from '../ducks/reducers/users';

class EditModal extends Component {
    constructor(props) {
        Modal.setAppElement('body');
        super(props);
        this.state = {
            inputName: undefined,
            inputScoreMax: undefined,
        }
    }

    handleOnChange(title, value) {
        this.setState({
            [title]: value
        })
    }

    handleAdd(type){
        let body = {}
        switch (type) {
            case 'test':
                console.log(' add new test')
                body = {
                    description: this.state.inputName,
                    max_score: this.state.inputScoreMax,
                    kind: 'test',
                    due_date: '10/22/2016',
                    class_id: this.props.classId
                }
                console.log('this is the body to add', body)
                this.props.addAssignment(body)
                break;
        
            default:
                return console.log('handle add defaulted');
        }
    }


    render() {
        // console.log('modal props: ',this.props)
        return (
            <Modal
                isOpen={!!this.props.displayAddAssignmentModal}
                onRequestClose={'this.props.cancelSelectedItem'}
                contentLabel='Add Assignment'
                closeTimeoutMS={200}
                className='EditModal'
            >
            add Modal 
            <div>
                <h4>Test Name</h4>
                <input title='inputName' type="text" onChange={(e) => (this.handleOnChange(e.target.title, e.target.value))}/>
            </div>
            <div>
                <h4>Max Score</h4>
                <input title='inputScoreMax' type="number" onChange={(e) => (this.handleOnChange(e.target.title, e.target.value))}/>
            </div>
            <button onClick={this.props.cancleAddAssignment}>Cancel</button>
            <button onClick={()=>this.handleAdd('test')}>Add</button>
            </Modal>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, { addAssignment: addAssignment })(EditModal);