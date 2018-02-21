import React, {Component}from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';

class ClassStudent extends Component{
    log(){
        console.log('log state: ', this.state)
        console.log('log props: ', this.props)
    }
    //props.match.params access to student_id and class_id
    render(){
        let classInfo = this.props.classes.find(x => x.class_id === (this.props.match.params.class_id * 1))
        let studentInfo = classInfo.students.find(x => x.student_id === (this.props.match.params.student_id * 1))
        return(
            <div className='ClassStudent'> 
                <Header pageTitle={`${classInfo.class_name}: ${studentInfo.first_name} ${studentInfo.last_name}`}/>
                <button onClick={()=>this.log()}>Log</button>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(ClassStudent);