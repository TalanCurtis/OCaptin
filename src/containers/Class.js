import React, { Component } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom'


class Class extends Component {
    constructor() {
        super();
        this.state = {
            students: [],
            assignments: [],
            tests: []
        }
    }

    componentDidMount() {
        // Hit database for class info (students, assignment, tests)
        // Then populate state lists with data
        let class_id = this.props.location.pathname.split('/').pop()
        axios.get('/api/class/' + class_id).then(res => {
            console.log(res.data)
            let tests = res.data[1].filter(x => (x.kind === 'test'))
            let assignments = res.data[1].filter(x => (x.kind === 'assignment'))
            this.setState({
                students: res.data[0],
                assignments: assignments,
                tests: tests
            })
        })
    }
    render() {
        let tests = this.state.tests.map((test, i) => {
            return (
                <div key={i}><Link to={'/test/' + test.id}>{test.description}</Link></div>
            )
        })
        let assignments = this.state.assignments.map((assignment, i) => {
            return (
                <div key={i}><Link to={'/assignment/' + assignment.id}>{assignment.description}</Link></div>
            )
        })
        let students = this.state.students.map((student, i) => {
            return (
                <div key={i}><Link to={'/student/' + student.id}>{student.first_name}</Link></div>
            )
        })
        return (
            <div className='Class'>
                <Header pageTitle='Class' />
                {'---------tests-------'}
                <div>
                    {tests}
                </div>
                {'-------Assignments---------'}
                <div>
                    {assignments}
                </div>
                {'-------students---------'}
                <div>
                    {students}
                </div>
            </div>
        )
    }
}

export default Class;