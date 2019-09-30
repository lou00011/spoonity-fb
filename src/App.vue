<template>
  <div id="app">
    <headr id="headr"></headr>
    <footr id="footr"></footr>
    <navigation
    id="navigation"
    @return="redirect($event)"
    ></navigation>
    <router-view id="content"></router-view>
    <sidebar id="sidebar"></sidebar>

  </div>
</template>

<script>
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import Navigation from '../src/components/Nav'
import Sidebar from '../src/components/Sidebar'
export default {
  components: {
    headr: Header,
    footr: Footer,
    navigation: Navigation,
    sidebar: Sidebar
  },
  methods: {
    redirect: function (path) {
      this.$router.push(path)
    }
  }
}
</script>
