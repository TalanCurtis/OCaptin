import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import axios from 'axios';

class Home extends Component {
    componentDidMount() {
        // Get all info on teacher
        let id = this.props.user.id
        axios.get(`/api/home/${id}`).then((res) => {
            //this.setState({ classes: res.data });
            console.log(res.data[0])
            /*  refrence for object in array returned
            { 
                 assignment_desc:"Math Worksheet"
                 assignment_id: 4
                 assignment_max: 100
                 assignment_kind: 'test'
                 class_id: 2
                 class_name: "Math 1020"
                 mark_id: 2
                 mark_score: 20
                 student_first_name: "Flag"
                 student_id: 59
                 student_last_name: "Fomly"
                 teacher_id: 16
             }*/
            // make new arrays from data and set them to state.
            // Classes Array
            let classes = []
            for (let i in res.data) {
                if (!classes.some(x => x.class_id === res.data[i].class_id)) {
                    classes.push({
                        class_id: res.data[i].class_id,
                        class_name: res.data[i].class_name,
                        students: [],
                        assignments: []
                    })
                }
            }
            // Assigning each student to their corresponding classes.
            for (let j in classes) {
                for (let i in res.data) {
                    if (classes[j].class_id === res.data[i].class_id) {
                        if (!classes[j].students.some(x => x.student_id === res.data[i].student_id)) {
                            classes[j].students.push({
                                student_id: res.data[i].student_id,
                                student_first_name: res.data[i].student_first_name,
                                student_last_name: res.data[i].student_last_name,
                                marks:[]
                            })
                        }
                    }
                }
            }
            // Assign assignments to corresponding classes
            for (let j in classes) {
                for (let i in res.data) {
                    if (classes[j].class_id === res.data[i].class_id) {
                        if (!classes[j].assignments.some(x => x.assignment_id === res.data[i].assignment_id)) {
                            classes[j].assignments.push({
                                assignment_id: res.data[i].assignment_id,
                                assignment_desc: res.data[i].assignment_desc,
                                assignment_max: res.data[i].assignment_max,
                                assignment_kind: res.data[i].assignment_kind
                            })
                        }
                    }
                }
            }
            // distribute the marks to the corresponding students;
            // if class id student id and mark id all match push into student marks
            for(let i in classes){
                for (let j in classes[i].students){
                    for (let k in res.data){
                        if (res.data[k].class_id === classes[i].class_id &&
                        res.data[k].student_id === classes[i].students[j].student_id &&
                        res.data[k].mark_student_id === classes[i].students[j].student_id 
                    ){
                        classes[i].students[j].marks.push({
                            mark_student_id: res.data[k].mark_student_id,
                            mark_id : res.data[k].mark_id,
                            mark_score: res.data[k].mark_score,
                            mark_score_max: res.data[k].assignment_max,
                            mark_assingmnet_id: res.data[k].assignment_id
                        })
                        }
                    }
                    //classes[i].students[j].marks.push(1)
                }
            }

            // for (let i in classes){
            //     for(let j in classes[i].students){
            //         for(let k in res.data){
            //             if(classes[i].class_id === res.data[k].class_id){

            //             }
            //         }
            //     }
            // }
            // for (let i in res.data){
            //     for (let j in classes){
            //         if (classes[j].class_id === res.data[i].class_id){
            //             for(let k in classes[j].students){
            //                 if (classes[j].students[k].id === res.data[i].mark_student_id){
            //                     classes[j].students[k].marks.push({
            //                         score: res.data[i].mark_score,
            //                         id: res.data[i].mark_id
            //                     })
            //                 }
            //             }
            //         }
            //     }
            // }
            // for (let i in classes){
            //     for (let j in classes[i].students){
            //         for (let k in res.data){
            //             if ()
            //         }
            //     }
            // }
            // let students = []
            // for (let i in res.data) {
            //     for (let j in classes) {
            //         if (classes[j].class_id = res.data[i].class_id) {
            //             if(!classes[j].students.some(x=> x.student_id === res.data[i].student_id) ){
            //                 classes[j].students.push({
            //                     student_id: res.data[i].student_id,
            //                     student_first_name: res.data[i].student_first_name,
            //                     student_last_name: res.data[i].student_last_name
            //                 })
            //             }
            //         }
            //     }
            // }
            //  make a list of students for each class
            // for (let i in classes){
            //     if (classes[i].class_id===res.data.)
            // }

            // Create students array
            // let students = []
            // for (let i in res.data){
            //     if (!students.some(x=> x.student_id === res.data[i].student_id)){
            //         students.push({
            //             student_id:res.data[i].student_id,
            //             student_first_name:res.data[i].student_first_name,
            //             student_last_name:res.data[i].student_last_name,
            //         })
            //     }
            // }
            // console.log(students)
            // // Create assignments array
            // let assignments = []
            // for (let i in res.data){
            //     if (!assignments.some(x=> x.assignment_id === res.data[i].assignment_id)){
            //         assignments.push({
            //             assignment_id:res.data[i].assignment_id,
            //             assignment_desc:res.data[i].assignment_desc,
            //             assignment_max:res.data[i].assignment_max,
            //         })
            //     }
            // }
            // console.log(assignments)
            // // Create assignments array
            // let marks = []
            // for (let i in res.data){
            //     if (!marks.some(x=> x.mark_id === res.data[i].mark_id)){
            //         marks.push({
            //             mark_id:res.data[i].mark_id,
            //             mark_score:res.data[i].mark_score
            //         })
            //     }
            // }
            // console.log(marks)
            console.log(classes)
        })
    }
    render() {
        return (
            <div className='Home'>
                <Header pageTitle='Home' />
                <div className='greeting'><h1>{`Hello ${this.props.user.first_name}`} </h1></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(Home);