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
            classes: [],
            toggle: true
        }
    }
    componentDidMount() {
        // go get list of classes by user id
        let id = this.props.user.id
        axios.get(`/api/classes/${id}`).then((res) => {
            this.setState({ classes: res.data });
        })
    }

    handleOrganzieBy() {
        // this is where I toggle between alphabetical order. roughed version
        // todo hook up to organizeBy comp
        if(this.state.toggle){
            let newOrder = this.state.classes.sort(function (a, b) {
                var textA = a.class_name.toUpperCase();
                var textB = b.class_name.toUpperCase();
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            }) 
            this.setState({
                toggle: !this.state.toggle,
                classes: newOrder
            })          
        } else {
            let newOrder =  this.state.classes.sort(function (a, b) {
                var textA = a.class_name.toUpperCase();
                var textB = b.class_name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }) 
            this.setState({
                toggle: !this.state.toggle,
                classes: newOrder
            })                 
        }
    }
    render() {
        let classes = this.state.classes.map((x, i) => {
            return (
                <div key={i}>
                    <Link to={`/Class/${x.id}`}>
                        {x.class_name}
                    </Link>
                </div>)
        })
        return (
            <div className='Classes'>
                <Header pageTitle='Classes' />
                <OrganizeBy buttons={['Class', 'Avererage', 'Tests', "Assignments", 'Attendance']} />
                <button onClick={() => { this.handleOrganzieBy() }}>orderby</button>
                {classes}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Classes);