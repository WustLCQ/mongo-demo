const router = require('koa-router')();
const studentModel = require('../model/student');

router.use(async (ctx, next) => {
    await next();
    ctx.response.status = 200
    ctx.response.body = {
        result: 1,
        data: ctx.response.body
    }
});

router.get('/rest/students', async (ctx) => {
    const students = await studentModel.getAllStudents();
    const res = await studentModel.getStudentsByCourseGte('语文', 80);
    ctx.body = students;
});

router.put('/rest/student', async (ctx) => {
    const student = ctx.request.body;
    await studentModel.addStudent(student);
});

router.delete('/rest/student', async (ctx) => {
    const { studentId } = ctx.request.body;
    await studentModel.deleteStudent(studentId);
});

router.post('/rest/student', async (ctx) => {
    const student = ctx.request.body;
    await studentModel.updateStudent(student);
});

module.exports = router;
