import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import InfoBox from '../components/InfoBox'

class Class extends Component {

    componentDidMount() {
        // let classInfo = this.props.classes.find(x => x.class_id === (this.props.location.pathname.split('/').pop()) * 1)
        console.log(this.props)
        //console.log(classInfo)
        // let tests = classInfo.assignments.filter((x) => x.kind === 'test')
    }

    render() {
        let classInfo = this.props.classes.find(x => x.class_id === (this.props.location.pathname.split('/').pop()) * 1)
        return (
            <div className='Class'>
                <Header pageTitle='Class' />
                <InfoBox
                    title='Tests'
                    displaySwitch='tests'
                    dataList={classInfo.assignments}
                    sortByButtons={[
                        { name: 'Tests', kind: 'alpha', key: 'name' },
                        { name: 'Max Score', kind: 'numeric', key: 'tests' },
                        { name: 'Due Date', kind: 'numeric', key: 'due_date' }
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