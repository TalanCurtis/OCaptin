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
        console.log('InfoBox props: ', this.props)
        this.makeStateList()
        console.log('state: ', this.state)
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

    makeStateList() {
        let newList = this.props.dataList.map((x, i) => {
            let average = ((this.averageTests(x.students) + this.averageAssignments(x.students)) / 2).toFixed(1);
            return {
                name: x.class_name,
                tests: this.averageTests(x.students),
                assignments: this.averageAssignments(x.students),
                average: average,
                class_id: x.class_id

            }
        })
        this.setState({ list: newList })
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
                return console.log('alpha', newOrder)
            case 'numeric':
                newOrder = this.state.list.slice().sort((a, b) => {
                    let textA = a[key];
                    let textB = b[key];
                    return (this.state.sortByToggle ? (textA > textB) : (textA < textB))
                })
                this.setState({ list: newOrder, sortByToggle: !this.state.sortByToggle })
                return console.log('numeric', newOrder)

            default:
                return console.log('sort by switch defaulted')
        }
    }

    test() {
        console.log('test clicked', this.state)
    }

    displayInfo(displaySwitch) {
        let list = []
        switch (displaySwitch) {
            case 'classes':
                // list = this.props.dataList.map((x, i) => {
                //     let average = ((this.averageTests(x.students) + this.averageAssignments(x.students)) / 2).toFixed(1);
                //     return (
                //         <Link key={i} to={'/class/' + x.class_id} style={{ textDecoration: 'none' }}>
                //             <div className='InfoBoxContainer'>
                //                 <h4>{x.class_name}</h4>
                //                 <h4>{this.averageTests(x.students)}</h4>
                //                 <h4>{this.averageAssignments(x.students)}</h4>
                //                 <h4>{average}</h4>
                //             </div>
                //         </Link>
                //     )
                // })
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
        // let info = this.state.list.map((x, i) => {
        //     return (
        //         <Link key={i} to={'/class/' + x.class_id} style={{ textDecoration: 'none' }}>
        //             <div className='InfoBoxContainer'>
        //                 <h4>{x.name}</h4>
        //                 <h4>{x.tests}</h4>
        //                 <h4>{x.assignments}</h4>
        //                 <h4>{x.average}</h4>
        //             </div>
        //         </Link>
        //     )
        // })
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