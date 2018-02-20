import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class InfoBox extends Component {
    constructor() {
        super();
        this.state = {
            sortByToggle: false,
            sortByList:[],
        }
    }
    componentDidMount() {
        console.log('InfoBox props: ', this.props)
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

    sortBy(property) {
        // THIS IS NOT WORKING CORRECTLY  sort reoders the original arr.
        // thinking i need to store a list of the info to display on state
        // send that to the renderer
        // then sortBy while take the list stored change the order then set state.
        console.log(' sort by clicked', property)
        let newOrder = []
        this.props.dataList.sort((a, b) => {
            let textA = a.class_name.toUpperCase();
            let textB = b.class_name.toUpperCase();
            return (this.state.sortByToggle ? (textA > textB) : (textA < textB))
        })
        this.setState({
            sortByToggle: !this.state.sortByToggle
        })
    }

    test() {
        console.log('test clicked')
    }

    displayInfo(displaySwitch) {
        let list = []
        switch (displaySwitch) {
            case 'classes':
                list = this.props.dataList.map((x, i) => {
                    let averageClass = ((this.averageTests(x.students) + this.averageAssignments(x.students)) / 2).toFixed(1);
                    return (
                        <Link key={i} to={'/class/' + x.class_id} style={{ textDecoration: 'none' }}>
                            <div className='InfoBoxContainer'>
                                <h4>{x.class_name}</h4>
                                <h4>{this.averageTests(x.students)}</h4>
                                <h4>{this.averageAssignments(x.students)}</h4>
                                <h4>{averageClass}</h4>
                            </div>
                        </Link>
                    )
                })
                console.log('list: ', list)
                return list;
            default:
                return console.log('display info defaulted')
        }
    }

    render() {
        let headerButtons = this.props.sortByButtons.map((x, i) => {
            return (
                <div key={i}><h3 onClick={() => this.sortBy(x.property)}>{x.name}</h3></div>
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