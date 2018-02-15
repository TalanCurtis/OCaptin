import React, { Component } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class Classes extends Component {
    constructor() {
        super();
        this.state = {
            classes: []
        }
    }
    componentDidMount() {
        // go get list of classes by user id
        let id = this.props.user.id
        axios.get(`/api/classes/${id}`).then((res) => {
            //console.log('res:', res.data);
            this.setState({ classes: res.data });
        })
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