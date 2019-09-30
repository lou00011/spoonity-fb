<template>
<div>
<loginform id="loginform"></loginform>
</div>
</template>

<script>
import Login from '../components/LoginForm'
export default {
  name: 'login',
  components: {
    loginform: Login
  }
}
</script>
