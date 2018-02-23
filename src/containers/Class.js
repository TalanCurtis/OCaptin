import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import InfoBox from '../components/InfoBox'

class Class extends Component {

    componentDidMount() {
        // let classInfo = this.props.classes.find(x => x.class_id === (this.props.location.pathname.split('/').pop()) * 1)
        // console.log('class props: ',this.props)
        //console.log(classInfo)
        // let tests = classInfo.assignments.filter((x) => x.kind === 'test')
    }

    render() {
        let classInfo = this.props.classes.find(x => x.class_id === (this.props.location.pathname.split('/').pop()) * 1)
        console.log('class info; ',classInfo)
        return (
            <div className='Class'>
                <Header pageTitle={classInfo.class_name} />
                <InfoBox title='Tests'
                    classId={classInfo.class_id}
                    displaySwitch='tests'
                    dataList={classInfo.assignments}
                    sortByButtons={[
                        { name: 'Tests', kind: 'alpha', key: 'name' },
                        { name: 'Max Score', kind: 'numeric', key: 'max_score' },
                        { name: 'Due Date', kind: 'numeric', key: 'due_date' }
                    ]}
                />
                <InfoBox title='Assignments'
                    classId={classInfo.class_id}
                    displaySwitch='assignments'
                    dataList={classInfo.assignments}
                    sortByButtons={[
                        { name: 'Assignments', kind: 'alpha', key: 'name' },
                        { name: 'Max Score', kind: 'numeric', key: 'max_score' },
                        { name: 'Due Date', kind: 'numeric', key: 'due_date' }
                    ]}
                />
                <InfoBox title='Students'
                    classId={classInfo.class_id}
                    displaySwitch='students'
                    dataList={classInfo.students}
                    sortByButtons={[
                        { name: 'First', kind: 'alpha', key: 'first_name' },
                        { name: 'Last', kind: 'alpha', key: 'last_name' },
                        { name: 'Tests', kind: 'numeric', key: 'tests' },
                        { name: 'Assignments', kind: 'numeric', key: 'assignments' },
                        { name: 'Average', kind: 'numeric', key: 'average' }
                    ]}
                />
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}
export default connect(mapStateToProps)(Class);