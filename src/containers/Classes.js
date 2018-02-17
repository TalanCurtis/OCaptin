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
            toggle: true,
            tests: [1, 5, 3, 6, 5, 9, 11, 4]
        }
        this.handleOrganizeBy = this.handleOrganizeBy.bind(this)
    }
    componentDidMount() {
        // go get list of classes by user id
        let id = this.props.user.id
        axios.get(`/api/classes/${id}`).then((res) => {
            this.setState({ classes: res.data });
        })
    }

    handleOrganizeBy(name, value) {
        let tog = this.state.toggle
        let newOrder = []
        switch (value) {
            case 'alpha':
                newOrder = this.state[name].sort(function (a, b) {
                    let textA = a.class_name.toUpperCase();
                    let textB = b.class_name.toUpperCase();
                    return (tog ? (textA > textB) : (textA < textB))
                })
                this.setState({
                    [name]: newOrder,
                    toggle: !this.state.toggle
                })
                console.log(this.state.classes)
                break;
            case 'numeric':
                console.log('numeric')
                newOrder = this.state[name].sort(function (a, b) {
                    return (tog ? (a > b) : (a < b))
                })
                this.setState({
                    [name]: newOrder,
                    toggle: !this.state.toggle
                })
                console.log(this.state.classes)
                break;
            default:
                console.log('incorrect input')
                break;
        }
    }
    render() {
        console.log(this.state.classes)
        let classes = this.state.classes.map((x, i) => {
            return (
                <div key={i}>
                    <Link to={`/Class/${x.id}`}>
                        {x.class_name}
                    </Link>
                </div>)
        })
        let tests = this.state.tests.map((x, i) => {
            return (
                <div key={i}>
                    <Link to={``}>
                        {x}
                    </Link>
                </div>)
        })
        return (
            <div className='Classes'>
                <Header pageTitle='Classes' />
                <OrganizeBy
                    handleOrganizeBy={this.handleOrganizeBy}
                    buttons={[
                        { name: 'classes', value: 'alpha' },
                        { name: 'avererage', value: 'numeric' },
                        { name: 'tests', value: 'numeric' },
                        { name: 'assignments', value: 'numeric' },
                        { name: 'attendance', value: 'numeric' }
                    ]} />
                <div>
                    {classes}
                    {tests}
                </div>

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