import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class InfoBox extends Component {
    constructor() {
        super();
        this.state = {
            sortByToggle: false,
            list: []
        }
    }
    componentDidMount() {
        this.makeStateList(this.props.displaySwitch)
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
        let total = (testScores / amountOfTests).toFixed(1) * 1
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
        let total = (assignmentScores / amountOfAssignments).toFixed(1) * 1
        return total
    }

    makeStateList(displaySwitch) {
        // makeStateList creates a list to populate state off of what info we want the infoBox to display
        let newList = []
        switch (displaySwitch) {
            case 'classes':
                newList = this.props.dataList.map((x, i) => {
                    let average = ((this.averageTests(x.students) + this.averageAssignments(x.students)) / 2).toFixed(1);
                    return {
                        name: x.class_name,
                        tests: this.averageTests(x.students),
                        assignments: this.averageAssignments(x.students),
                        average: average,
                        class_id: x.class_id

                    }
                })
                // alphabetizing base list
                newList.sort((a, b) => {
                    let textA = a.name.toUpperCase();
                    let textB = b.name.toUpperCase();
                    return (textA > textB)
                })
                this.setState({ list: newList })
                break;
            case 'tests':
                console.log('tests props:', this.props)
                newList = this.props.dataList.filter((x) => x.kind === 'test')
                newList = newList.map((x, i) => {
                    return {
                        name: x.desc,
                        max_score: x.max,
                        assignment_id: x.id,
                        date_due: x.dateDue
                    }
                })
                // alphabetizing base list
                // newList.sort((a, b) => {
                //     let textA = a.name.toUpperCase();
                //     let textB = b.name.toUpperCase();
                //     return (textA > textB)
                // })
                this.setState({ list: newList })
                break;
            default:
                return console.log('makeStateList defaulted');
        }

    }

    sortBy(key, kind) {
        // sortBy takes in the state 'key' you want to reorder and  'kind' numerc and alpha.
        let newOrder = []
        switch (kind) {
            case 'alpha':
                newOrder = this.state.list.slice().sort((a, b) => {
                    let textA = a[key].toUpperCase();
                    let textB = b[key].toUpperCase();
                    return (this.state.sortByToggle ? (textA > textB) : (textA < textB))
                })
                this.setState({ list: newOrder, sortByToggle: !this.state.sortByToggle })
                break;
            case 'numeric':
                newOrder = this.state.list.slice().sort((a, b) => {
                    let textA = a[key];
                    let textB = b[key];
                    return (this.state.sortByToggle ? (textA > textB) : (textA < textB))
                })
                this.setState({ list: newOrder, sortByToggle: !this.state.sortByToggle })
                break;

            default:
                return console.log('sort by switch defaulted')
        }
    }

    test() {
        console.log('test clicked', this.state)
    }

    displayInfo(displaySwitch) {
        // DisplayInfo changes what info is displayed based off displaySwitch this.props
        let list = []
        switch (displaySwitch) {
            case 'classes':
                list = this.state.list.map((x, i) => {
                    return (
                        <Link key={i} to={'/class/' + x.class_id} style={{ textDecoration: 'none' }}>
                            <div className='InfoBoxContainer'>
                                <h4>{x.name}</h4>
                                <h4>{x.tests}</h4>
                                <h4>{x.assignments}</h4>
                                <h4>{x.average}</h4>
                            </div>
                        </Link>
                    )
                })
                return list;
            case 'tests':
                list = this.state.list.map((x, i) => {
                    return (
                        <div key={i} className='InfoBoxContainer'>
                            <h4>{x.name}</h4>
                            <h4>{x.max_score}</h4>
                            <h4>{x.date_due}</h4>
                        </div>
                    )
                })
                return list;
            default:
                return console.log('display info defaulted')
        }
    }

    render() {
        let headerButtons = this.props.sortByButtons.map((x, i) => {
            return (
                <div key={i}><h3 onClick={() => this.sortBy(x.key, x.kind)}>{x.name}</h3></div>
            )
        })
        let info = this.displayInfo(this.props.displaySwitch)
        return (
            <div className='InfoBox'>
                <div className='InfoBoxHeader'>
                    {headerButtons}
                </div>
                <div>{info}</div>
                <button onClick={() => this.test()}>testprops</button>
            </div>
        )
    }
}

export default InfoBox;