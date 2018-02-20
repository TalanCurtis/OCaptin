import axios from 'axios';

// Initial State user = {}
const intialState = {
    user:{}
}

// Action
const GET_USER = 'GET_USER';
const GET_TEACHER_CLASSES = 'GET_TEACHER_CLASSES'

// Action Creator
export function getUser(){
    const user = axios.get('/auth/me').then(res => {
        return res.data
    })
    return{
        type: GET_USER,
        payload: user
    }
}
export function getTeacherClasses(id){
    let classes = []
    axios.get(`/api/home/${id}`).then((res) => {
        // console.log(res.data[0])
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
                            first_name: res.data[i].student_first_name,
                            last_name: res.data[i].student_last_name,
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
                    if (!classes[j].assignments.some(x => x.id === res.data[i].assignment_id)) {
                        classes[j].assignments.push({
                            id: res.data[i].assignment_id,
                            desc: res.data[i].assignment_desc,
                            max: res.data[i].assignment_max,
                            kind: res.data[i].assignment_kind,
                            dateDue: res.data[i].assignment_due_date
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
                        student_id: res.data[k].mark_student_id,
                        id : res.data[k].mark_id,
                        score: res.data[k].mark_score,
                        score_max: res.data[k].assignment_max,
                        assingmnet_id: res.data[k].assignment_id,
                        kind: res.data[k].assignment_kind
                    })
                    }
                }
            }
        }
        console.log(classes)
    })
    return {
        type: GET_TEACHER_CLASSES,
        payload: classes
    }
}


// Reducer
export default function reducer(state = intialState, action){
    switch(action.type){
        case GET_USER +'_FULFILLED': 
            return Object.assign({}, state, {user:action.payload})
        /*
        if slow you could add a loading screen
        case GET_USER +'_PENDING': 
            return Object.assign({}, state, {user:action.payload})
        */
        case GET_TEACHER_CLASSES:
            return Object.assign({}, state , {classes: action.payload})
        default: 
            return state;
    }
}