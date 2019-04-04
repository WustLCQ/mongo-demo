<template>
    <div class="student-form">
        <Table
            :columns=columns
            :data="studentList"
        >
            <template
                v-for="column in columns"
                slot-scope="{ row }"
                :slot="column.slot"
            >
                <EditCel
                    :key="row.studentId"
                    :id="row.studentId"
                    :columnName="column.key"
                    :defaultValue="row[column.key]"
                    :isEdit="row.isEdit"
                    @edit="handleEdit(row.studentId)"
                    @save="handleSave(row.studentId)"
                    @delete="handleDelete(row.studentId)"
                    @change="handleChange"
                />
            </template>
        </Table>
    </div>
</template>

<script>
import { Table } from 'iview';
import EditCel from './EditCel';

export default {
    components: {
        Table,
        EditCel
    },
    data() {
        return {
            columns: [{
                title: '学号',
                key: 'studentId',
                slot: 'studentId',
            }, {
                title: '姓名',
                key: 'name',
                slot: 'name',
            }, {
                title: '性别',
                key: 'sex',
                slot: 'sex',
            }, {
                title: '年龄',
                key: 'age',
                slot: 'age',
            }, {
                title: '操作',
                key: 'actions',
                slot: 'actions',
            }],
            studentList: [],
            currentStudent: {},
        }
    },
    created() {
        this.getStudentList();
    },
    methods: {
        async getStudentList() {
            const res = await this.$axios.get('/rest/students');
            if (res.result === 1) {
                this.studentList = res.data.map(item => ({
                    ...item,
                    isEdit: false
                }));
            }
        },
        async updateStudent(student) {
            await this.$axios.post('/rest/student', { ...student, isEdit: undefined });
        },
        async deleteStudent(studentId) {
            return await this.$axios.delete('/rest/student', { data: { studentId }});
        },
        handleEdit(studentId) {
            this.studentList.find(item => item.studentId === studentId).isEdit = true;
        },
        handleChange(studentId, columnName, value) {
            this.currentStudent = {
                studentId,
                [columnName]: value
            };
        },
        async handleDelete(studentId) {
            const res = await this.deleteStudent(studentId);
            if (res.result === 1) {
                const studentIndex = this.studentList.findIndex(item => item.studentId === studentId);
                this.studentList.splice(studentIndex, 1);
            }
        },
        async handleSave(studentId) {
            const saveStudentIndex = this.studentList.findIndex(item => item.studentId === studentId);
            const saveStudent = {
                ...this.studentList[saveStudentIndex],
                ...this.currentStudent,
                isEdit: false
            }

            await this.updateStudent(saveStudent);
            this.studentList.splice(saveStudentIndex, 1, saveStudent);
        }
    }
}
</script>

<style lang="less" scoped>

</style>

