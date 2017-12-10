<template>
  <div class="l-auth-container">
    <div class="l-auth">
      <v-form v-model="validLogin">
        <v-text-field label="Username"
                      v-model="credentials.username"
                      prepend-icon="account_box"
                      required
                      color="light-blue lighten-1">
        </v-text-field>

        <v-text-field label="Password"
                      v-model="credentials.password"
                      prepend-icon="lock"
                      :append-icon="signUpPasswordVisible ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (signUpPasswordVisible = !signUpPasswordVisible)"
                      :type="signUpPasswordVisible ? 'text' : 'password'"
                      color="light-blue lighten-1"
                      required>
        </v-text-field>

        <v-text-field label="Retype password"
                      v-if="signUpVisible"
                      v-model="credentials.password2"
                      prepend-icon="lock"
                      :append-icon="signUpPasswordVisible ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (signUpPasswordVisible = !signUpPasswordVisible)"
                      :type="signUpPasswordVisible ? 'text' : 'password'"
                      color="light-blue lighten-1"
                      required>
        </v-text-field>

        <!--
        <v-btn-toggle>
          <v-btn flat @click.native="signUpVisible = !signUpVisible">Создать</v-btn>
        </v-btn-toggle>
        -->

        <v-btn color="light-blue lighten-1" @click.native="submitAuthentication()">Login</v-btn>
      </v-form>
    </div>

    <v-snackbar bottom="bottom"
                color="red lighten-1"
                v-model="snackbar">
      {{ message }}
    </v-snackbar>
  </div>
</template>


<script>
  import store from '@/store'

  export default {
    data () {
      return {
        snackbar: false,
        validLogin: false,
        validSignUp: false,
        signUpVisible: false,
        loginPasswordVisible: false,
        signUpPasswordVisible: false,
        rules: [ (value) => !!value || 'This field is required' ],
        credentials: {
          username: '',
          password: ''
        },
        user: store.user,
        message: ''
      }
    },
    methods: {
      submitAuthentication () {
        store.login(this.credentials)
        this.$router.push('/')
      },

      submitSignUp () {
        store.register(this.credentials)
      }
    }
  }
</script>

<style lang="scss">
  @import "./../../../assets/styles";
  .l-auth {
    background-color: $background;
    padding: 15px;
    margin: 45px auto;
    min-width: 272px;
    max-width: 320px;
    animation: bounceIn 1s forwards ease;
  }
</style>
