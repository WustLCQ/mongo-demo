const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    // 学号
    studentId: {
        type: String,
        index: true
    },
    // 姓名
    name: String,
    // 性别
    sex: String,
    // 年龄
    age: Number,
    courses: [{
        courseId: {
            type: String,
            index: true
        },
        courseName: String,
        grade: Number
    }]
});

/**
 * 添加学生
 */
schema.statics.addStudent = async function(studentInfo = {}) {
    return await this.create(studentInfo);
}
/**
 * 修改学生信息
 */
schema.statics.updateStudent = async function(studentInfo = {}) {
    return await this.updateOne({ studentId: studentInfo.studentId }, studentInfo);
}
/**
 * 删除学生
 */
schema.statics.deleteStudent = async function(studentId) {
    return await this.deleteOne({ studentId: studentId });
}
/**
 * 获取所有学生
 */
schema.statics.getAllStudents = async function() {
    return await this.find().exec();
}

/**
 * 获取课程得分高于某分数的学生
 * @param courseName 课程名称
 * @param grade 分数
 */
schema.statics.getStudentsByCourseGte = async function(courseName, grade) {
    return await this.find({
        'courses.courseName': courseName,
        'courses.grade': {
            $gte: grade
        }
    }).exec();
}

module.exports = mongoose.model('Student', schema);