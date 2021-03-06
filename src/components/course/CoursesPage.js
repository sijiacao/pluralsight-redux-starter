import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import * as courseActions from '../../actions/courseActions';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
//update routes.js to have access to this page; then update Header.js to have course header
class CoursesPage extends React.Component{
  constructor(props, context){
    super(props, context);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  courseRow(course, index){//we map over the list of courses and then call the courseRow function for each course
    return <div key={index}>{course.title}</div>;
  }
  redirectToAddCoursePage(){
    browserHistory.push('/course');
  }
  render(){
    const {courses} = this.props;

    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
               value="Add Course"
               className="btn btn-primary"
               onClick={this.redirectToAddCoursePage}/>
        <CourseList courses={courses}/>
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses:PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  course:PropTypes.object
};

function mapStateToProps(state, ownProps){
  //we expect that when the course data changes, this mapStateToProps function would receive that new state
  //and end up passing that state as this.props.courses to our component
  return {
    courses: state.courses//this 'courses' is determinted in indexjs in reducer folder
  };
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(courseActions, dispatch)//map all actions to this.props.actions
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
