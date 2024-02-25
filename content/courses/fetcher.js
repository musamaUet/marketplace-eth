import courses from './index.json';

export const getAllCourses = () => {
    return {
        data: courses,
        courseMap: courses.reduce((acc, course, idx) => {
            acc[course.id] = course;
            acc[course.id].index = idx;
            return acc;
        }, {})
    }
}