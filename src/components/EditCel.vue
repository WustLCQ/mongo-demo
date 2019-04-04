<template>
    <div v-if="columnName === 'actions'">
        <Button v-if="isEdit" @click="handleSave">保存</Button>
        <Button v-else @click="handleEdit">编辑</Button>
        <Button @click="handleDelete">删除</Button>
    </div>
    <Select v-else-if="isEdit && columnName === 'sex'" v-model="value">
        <Option value="男">
            男
        </Option>
        <Option value="女">
            女
        </Option>
    </Select>
    <Input
        ref="input"
        v-else-if="isEdit && columnName !== 'studentId'"
        v-model="value"
    />
    <span
        v-else
        class="m-text"
        @click="handleClick"
    >
        {{ value }}
    </span>
</template>

<script>
import { Input, Button, Select, Option } from 'iview';

export default {
    components: {
        Input,
        Button,
        Select,
        Option
    },
    props: ['id', 'columnName', 'isEdit', 'defaultValue'],
    data() {
        return {
            value: this.defaultValue
        }
    },
    methods: {
        handleClick() {
            event.stopPropagation();
            this.$emit('click');
        },
        handleSave() {
            this.$emit('save');
        },
        handleEdit() {
            this.$emit('edit');
        },
        handleDelete() {
            this.$emit('delete');
        }
    },
    watch: {
        value(val) {
            this.$emit('change', this.id, this.columnName, val);
        }
    }
}
</script>

<style scoped>
.m-text {
    display: inline-block;
    width: 100%;
    height: 100%;
}
</style>
