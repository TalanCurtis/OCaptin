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
                        {name: 'Class', kind:'alpha', property:'class_name'},
                        {name: 'Tests', kind:'numeric', property:'tests'},
                        {name: 'Assignments', kind:'numeric', property:'assignments'},
                        {name: 'Average', kind:'numeric', property:'average'}
                        
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

