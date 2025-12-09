<!-- src/App.vue -->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <MessageComponent msg="This is my first VUE app!" />
  </div>
</template>

<script>
import MessageComponent from './components/MessageComponent.vue';

export default {
  name: 'App',
  components: {
    MessageComponent
  }
};
</script>

<style>
/* you can keep the default styles from the generated App.vue here */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
