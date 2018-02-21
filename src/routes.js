import React from 'react';
import { Route, Switch} from 'react-router-dom';
// import Placeholder from './components/Placeholder';
import Auth from './containers/Auth';
import Classes from './containers/Classes';
import Class from './containers/Class';
import ClassStudent from './containers/ClassStudent';
import Home from './containers/Home';

export default(
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/Home' component={Home} />
        <Route path='/Classes' component={Classes}/>
        <Route path='/Class/:class_id/Student/:student_id' component={ClassStudent}/>
        <Route path='/Class/:class_id' component={Class}/>
    </Switch>
)