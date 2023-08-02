<template>
  <div>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card class="d-flex align-center justify-center flex-column ma-0" style="max-height: 90vh;" tile>
        <v-container style="max-width: 80vw">
          <v-row justify="center">
            <v-col cols="12" md="6" class="px-4">
              <h1 class="text-center mb-n1">Admin Login</h1>
              <v-divider class="my-3"></v-divider>
              <v-text-field prepend-inner-icon="mdi-account" :readonly="loading" label="Admin Email" placeholder="Admin Email" rounded solo outlined v-model="email"></v-text-field>
              <v-text-field prepend-inner-icon="mdi-lock" :readonly="loading" @keyup.enter="login" placeholder="Admin Password" rounded solo outlined :type="showPassword ? 'text': 'password'" @click:append="showPassword = !showPassword" :append-icon="showPassword ? 'mdi-eye': 'mdi-eye-off'" label="Admin Password" v-model="password"></v-text-field>
              <v-btn x-large rounded color="primary" block @click="login" :loading="loading" :disabled="loading">Login <v-icon right>mdi-send</v-icon></v-btn>
            </v-col>
          </v-row>
        </v-container>
        <v-overlay absolute :value="loading">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import API from "@/api";
  import { mapActions } from "vuex";
  export default {
    props: {
      logout: {
        type: Boolean,
        default: false,
      }
    },
    data(){
      return {
        dialog: true,
        email: "",
        password: "",
        loading: false,
        showPassword: false,
      }
    },
    watch: {
      logout(){
        this.showToast({ show: true, message: "Logged out", sclass:"info", timeout: 3000})
        this.dialog = true
      }
    },
    methods: {
      ...mapActions({
        showToast: "ui/showToast"
      }),
      async login(){
        if(this.loading) return;
        this.loading = true;
        if (!this.email.trim()){
          this.showToast({ show: true, message: 'Email is required', sclass: "error", timeout: 3000})
          this.loading = false;
          return;
        }
        if (!this.password.trim()){
          this.showToast({ show: true, message: 'Password is required', sclass: "error", timeout: 3000})
          this.loading = false;
          return;
        }
        const { email, password } = this.$data;
        try {
          const { data } = await API.login(email, password);
          if(data.success) {
            this.showToast({ show: true, message: data.message, sclass: 'success', timeout: 3000})
            this.dialog = false;
            this.email = "";
            this.password = "";
          }
        } catch (error) {
          console.log({error})
          if(error.response){
              this.showToast({
                show: true,
                message: error.response.data.message,
                sclass: "error",
                timeout: 3000
              })
          } else {
            this.showToast({
              show: true,
              message: "Something went wrong - please try again",
              sclass: "error",
              timeout: 3000
            })
          }
        } finally {
          this.loading = false;
        }
      }
    }
  }
</script>