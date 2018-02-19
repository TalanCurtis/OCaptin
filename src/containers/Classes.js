import React, { Component } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import OrganizeBy from '../components/OrganizeBy';


class Classes extends Component {
    constructor() {
        super();
        this.state = {
            toggle: true,
            classes: [],
            assignments: [],
            average: [],
            test: []
        }
        this.handleOrganizeBy = this.handleOrganizeBy.bind(this)
    }
    componentDidMount() {
        this.setState({
            classes: this.props.classes
        })
    }

    handleOrganizeBy(stateArray, order) {
        // reused variable in swtich
        let tog = this.state.toggle
        let newOrder = []
        switch (order) {
            case 'alpha':
                newOrder = this.state[stateArray].sort(function (a, b) {
                    let textA = a.class_name.toUpperCase();
                    let textB = b.class_name.toUpperCase();
                    return (tog ? (textA > textB) : (textA < textB))
                })
                this.setState({
                    [stateArray]: newOrder,
                    toggle: !this.state.toggle
                })
                break;
            case 'numeric':
                newOrder = this.state[stateArray].sort(function (a, b) {
                    return (tog ? (a > b) : (a < b))
                })
                this.setState({
                    [stateArray]: newOrder,
                    toggle: !this.state.toggle
                })
                break;
            default:
                console.log('incorrect input', stateArray, order)
                break;
        }
    }

    averageTests(students) {
        let testScores = 0
        let amountOfTests = 0

        for (let i in students) {
            for (let j in students[i].marks) {
                if (students[i].marks[j].kind === 'test') {
                    amountOfTests++
                    let percent = (students[i].marks[j].score / students[i].marks[j].score_max) * 100
                    testScores += percent
                }
            }
        }

        //let total = Math.floor((testScores / amountOfTests))
        let total = (testScores / amountOfTests).toFixed(1)*1
        return total
    }

    averageAssignments(students) {
        let assignmentScores = 0
        let amountOfAssignments = 0
        for (let i in students) {
            for (let j in students[i].marks) {
                if (students[i].marks[j].kind === 'assignment') {
                    amountOfAssignments++
                    let percent = (students[i].marks[j].score / students[i].marks[j].score_max) * 100
                    assignmentScores += percent
                }
            }
        }
        //let total = Math.floor((assignmentScores / amountOfAssignments))
        let total = (assignmentScores / amountOfAssignments).toFixed(1)*1
        return total
    }
    // TODO averageAttendace

    render() {
        console.log('props on classes: ', this.props)
        // Create the list of classes and display their stats
        let classes = this.props.classes.map((x, i) => {
            let averageClass = ((this.averageTests(x.students) + this.averageAssignments(x.students)) /2).toFixed(1);
            return (
                <div key={i}>
                    <Link to={'/class/' + x.class_id}  style={{ textDecoration: 'none' }}>
                        <span className='ClassesInfo'>
                            <h3>
                                {x.class_name}
                            </h3>
                            {averageClass < 65 ?
                                <h3 style={{ 'color': 'red' }}> {averageClass}</h3>
                                :
                                <h3>{averageClass}</h3>
                            }
                            {this.averageTests(x.students) < 65 ?
                                <h3 style={{ 'color': 'red' }}>{this.averageTests(x.students)}</h3> :
                                <h3>{this.averageTests(x.students)}</h3>}
                            {this.averageAssignments(x.students) < 65 ?
                                <h3 style={{ 'color': 'red' }}>{this.averageAssignments(x.students)}</h3> :
                                <h3>{this.averageAssignments(x.students)}</h3>}
                            {'-'}
                        </span>
                    </Link>
                </div>
            )
        })
        return (
            <div className='Classes' >
                <Header pageTitle='Classes' />
                <OrganizeBy
                    handleOrganizeBy={this.handleOrganizeBy}
                    buttons={[
                        { name: 'Classes', stateArray: 'classes', order: 'alpha' },
                        { name: 'Average', stateArray: 'avererage', order: 'numeric' },
                        { name: 'Tests', stateArray: 'tests', order: 'numeric' },
                        { name: 'Assignments', stateArray: 'assignments', order: 'numeric' },
                        { name: 'Attendace', stateArray: 'attendance', order: 'numeric' }
                    ]} />
                <div>
                    {classes}
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Classes);