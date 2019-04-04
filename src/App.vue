<template>
    <div id="app">
        <StudentForm/>
    </div>
</template>

<script>
import StudentForm from './components/StudentForm';
export default {
    name: 'app',
    components: {
        StudentForm
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
