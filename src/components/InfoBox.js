import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditModal from '../components/EditModal';

class InfoBox extends Component {
    constructor() {
        super();
        this.state = {
            sortByToggle: false,
            list: [],
            selectedItem: false,
            selectedItemInfo:[]
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

    studentAverageTests(assignments) {
        let assignmentScores = 0
        let amountOfAssignments = 0
        for (let i in assignments) {
            if (assignments[i].kind === 'test') {
                amountOfAssignments++
                let percent = (assignments[i].score / assignments[i].score_max) * 100
                assignmentScores += percent
            }
        }
        let total = (assignmentScores / amountOfAssignments).toFixed(1) * 1
        return total
    }

    studentAverageAssignments(assignments) {
        let assignmentScores = 0
        let amountOfAssignments = 0
        for (let i in assignments) {
            if (assignments[i].kind === 'assignment') {
                amountOfAssignments++
                let percent = (assignments[i].score / assignments[i].score_max) * 100
                assignmentScores += percent
            }
        }
        let total = (assignmentScores / amountOfAssignments).toFixed(1) * 1
        return total
    }


    sortBy(key, kind) {
        // sortBy takes in the state 'key' you want to reorder and  'kind' numerc and alpha.
        console.log('sort by: ', key, kind)
        let newOrder = []
        switch (kind) {
            case 'alpha':
                newOrder = this.state.list.slice().sort((a, b) => {
                    let textA = a[key].toLowerCase();
                    let textB = b[key].toLowerCase();
                    // return (this.state.sortByToggle ? (textA > textB) : (textA < textB))
                    if (this.state.sortByToggle) {
                        if (textA > textB) { return -1 }
                        if (textA < textB) { return 1 }
                    } else {
                        if (textA > textB) { return 1 }
                        if (textA < textB) { return -1 }
                    }
                    return 0;
                })
                this.setState({ list: newOrder, sortByToggle: !this.state.sortByToggle })
                break;
            case 'numeric':
                newOrder = this.state.list.slice().sort((a, b) => {
                    let textA = a[key];
                    let textB = b[key];
                    //return (this.state.sortByToggle ? (textA > textB) : (textA < textB))
                    if (this.state.sortByToggle) {
                        if (textA > textB) { return -1 }
                        if (textA < textB) { return 1 }
                    } else {
                        if (textA > textB) { return 1 }
                        if (textA < textB) { return -1 }
                    }
                    return 0;
                })
                this.setState({ list: newOrder, sortByToggle: !this.state.sortByToggle })
                break;

            default:
                return console.log('sort by switch defaulted')
        }
    }

    test() {
        console.log('log state: ', this.state)
        console.log('log props: ', this.props)
    }

    handleSelectItem(selectedType){
       // console.log(arguments[0])
       // this.setState({selectedItem: true, selectedItemInfo: arguments})
       switch (selectedType) {
           case 'tests':
               console.log('test arguments',arguments)
               this.setState({selectedItem: true, selectedItemInfo: arguments})
               break;
       
           default:
               return 'HandleSelectectItem defaulted';
       }
    }
    cancelSelectedItem(){
        this.setState({selectedItem: false})
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
                    if (textA > textB) { return 1 }
                    if (textA < textB) { return -1 }
                    return 0;
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
            case 'assignments':
                console.log('assignments props:', this.props)
                newList = this.props.dataList.filter((x) => x.kind === 'assignment')
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
            case 'students':
                console.log('student props:', this.props)
                newList = this.props.dataList.map((x, i) => {
                    let average = ((this.studentAverageTests(x.marks) + this.studentAverageAssignments(x.marks)) / 2).toFixed(1);
                    return {
                        first_name: x.first_name,
                        last_name: x.last_name,
                        tests: this.studentAverageTests(x.marks),
                        assignments: this.studentAverageAssignments(x.marks),
                        average: average,
                        id: x.student_id
                    }
                })
                // alphabetizing base list
                newList.sort((a, b) => {
                    let textA = a.first_name.toUpperCase();
                    let textB = b.first_name.toUpperCase();
                    if (textA > textB) { return 1 }
                    if (textA < textB) { return -1 }
                    return 0;
                })
                this.setState({ list: newList })
                break;
            default:
                return console.log('makeStateList defaulted');
        }

    }

    displayInfo(displaySwitch) {
        // DisplayInfo changes what info is displayed based off displaySwitch this.props
        let list = []
        let headerButtons = []
        switch (displaySwitch) {
            case 'classes':
                headerButtons = this.props.sortByButtons.map((x, i) => {
                    return (
                        <div key={i}><h3 onClick={() => this.sortBy(x.key, x.kind)}>{x.name}</h3></div>
                    )
                })
                list = this.state.list.map((x, i) => {
                    return (
                        <Link className='Link' key={i} to={'/class/' + x.class_id} style={{ textDecoration: 'none' }}>
                            <div className='InfoBoxContainer_Classes'>
                                <h4>{x.name}</h4>
                                <h4>{x.tests}</h4>
                                <h4>{x.assignments}</h4>
                                <h4>{x.average}</h4>
                            </div>
                        </Link>
                    )
                })
                return (
                    <div>
                        <div className='InfoBoxHeader_Classes'>
                            {headerButtons}
                        </div>
                        <div className='InfoBoxList_Classes'>
                            {list}
                        </div>
                    </div>
                )
            case 'tests':
                headerButtons = this.props.sortByButtons.map((x, i) => {
                    return (
                        <div key={i}><h3 onClick={() => this.sortBy(x.key, x.kind)}>{x.name}</h3></div>
                    )
                })
                list = this.state.list.map((x, i) => {
                    return (
                        <div key={i} className='InfoBoxContainer_Tests' 
                        onClick={()=>this.handleSelectItem('tests', x.assignment_id, x.name, x.max_score, x.date_due)}>
                            <h4>{x.name}</h4>
                            <h4>{x.max_score}</h4>
                            <h4>{x.date_due}</h4>
                        </div>
                    )
                })
                return (
                    <div>
                        <div className='InfoBoxHeader_Tests'>
                            {headerButtons}
                        </div>
                        <div className='InfoBoxList_Tests'>
                            {list}
                        </div>
                    </div>
                );
            case 'assignments':
                headerButtons = this.props.sortByButtons.map((x, i) => {
                    return (
                        <div key={i}><h3 onClick={() => this.sortBy(x.key, x.kind)}>{x.name}</h3></div>
                    )
                })
                list = this.state.list.map((x, i) => {
                    return (
                        <div key={i} className='InfoBoxContainer_Assignments'>
                            <h4>{x.name}</h4>
                            <h4>{x.max_score}</h4>
                            <h4>{x.date_due}</h4>
                        </div>
                    )
                })
                return (
                    <div>
                        <div className='InfoBoxHeader_Assignments'>
                            {headerButtons}
                        </div>
                        <div className='InfoBoxList_Assignments'>
                            {list}
                        </div>
                    </div>
                );
            case 'students':
                headerButtons = this.props.sortByButtons.map((x, i) => {
                    return (
                        <div key={i}><h3 onClick={() => this.sortBy(x.key, x.kind)}>{x.name}</h3></div>
                    )
                })
                let classId = this.props.classId * 1                
                list = this.state.list.map((x, i) => {
                    return (
                            <Link className='Link' key={i} to={`/Class/${classId}/Student/${x.id}`} style={{ textDecoration: 'none' }}>
                                <div key={i} className='InfoBoxContainer_Students'>
                                    <h4>{x.first_name}</h4>
                                    <h4>{x.last_name}</h4>
                                    <h4>{x.tests}</h4>
                                    <h4>{x.assignments}</h4>
                                    <h4>{x.average}</h4>
                                </div>
                            </Link>
                    )
                })
                return (
                    <div>
                        <div className='InfoBoxHeader_Students'>
                            {headerButtons}
                        </div>
                        <div className='InfoBoxList_Students'>
                            {list}
                        </div>
                    </div>
                );
            default:
                return console.log('display info defaulted')
        }
    }

    render() {
        let info = this.displayInfo(this.props.displaySwitch)
        return (
            <div>
                {info}
                <button onClick={()=>this.test()}>State</button>
                <EditModal 
                selectedItem={this.state.selectedItem} 
                selectedItemInfo={this.state.selectedItemInfo}
                cancelSelectedItem={()=>this.cancelSelectedItem()}/>
            </div>
        )
    }
}

export default InfoBox;