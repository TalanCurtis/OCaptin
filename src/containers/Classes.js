import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import InfoBox from '../components/InfoBox';


class Classes extends Component {
    componentDidMount() {
        console.log('classes props:', this.props)
    }

    render() {
        return (
            <div className='Classes' >
                <Header pageTitle='Classes' />
                <InfoBox
                    title='Classes'
                    displaySwitch='classes'
                    dataList={this.props.classes}
                    sortByButtons={[
                        {name: 'Class', kind:'alpha', key:'name'},
                        {name: 'Tests', kind:'numeric', key:'tests'},
                        {name: 'Assignments', kind:'numeric', key:'assignments'},
                        {name: 'Average', kind:'numeric', key:'average'}
                        
                    ]}
                />
            </div>
        )
    }
}


function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Classes);

