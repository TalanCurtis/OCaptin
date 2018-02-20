import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
//import InfoBox from '../components/InfoBox'

class Class extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
    }

    averageTest(){

    }

    render() {
       // let classInfo = this.props.classes.find(x => x.class_id === (this.props.location.pathname.split('/').pop()) * 1)
        //let tests = classInfo.assignments.filter((x) => x.kind === 'test')
       
        // let tests = classInfo.assignments.map((x, i) => {
        //     if (x.kind === 'test') {
        //         return (
        //             <div key={i}>
        //                 <span className='ClassesInfo'>
        //                     <h3>{x.desc} </h3>
        //                 </span>
        //             </div>
        //         )
        //     }
        // })
        // generate lists
        // let tests = this.state.tests.map((test, i) => {
        //     return (
        //         <div key={i}><Link to={'/test/' + test.id}>{test.description}</Link></div>
        //     )
        // })
        // let assignments = this.state.assignments.map((assignment, i) => {
        //     return (
        //         <div key={i}><Link to={'/assignment/' + assignment.id}>{assignment.description}</Link></div>
        //     )
        // })
        // let students = this.state.students.map((student, i) => {
        //     return (
        //         <div key={i}><Link to={'/student/' + student.id}>{student.first_name}</Link></div>
        //     )
        // })
        
        return (
            <div className='Class'>
                <Header pageTitle='Class' />
                {/* <InfoBox name='Test' list={tests} propsToDisplay={['desc', 'max']}/> */}
                class comp
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Class);