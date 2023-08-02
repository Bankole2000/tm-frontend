<template>
  <div style="width: 100vw; height: 100vh">
    <v-container>
      <v-row>
        <v-col cols="12" class="pt-8 mt-8">
          <div class="d-flex align-center">
            <h2>👋 Welcome Timi</h2>
            <v-spacer></v-spacer>
            <AdminModal @logout="logout"/>
          </div>
          <v-divider class="my-4"></v-divider>
          <p class="subtitle-1 mb-0">Latest Song Requests</p>
          <PendingSongRequests :isLoggedIn="isLoggedIn" />
          <v-divider class="my-8"></v-divider>
          <AllSongRequests />
        </v-col>
      </v-row>
    </v-container>
    <LoginModal :logout="isLoggedIn" />
  </div>
</template>
<script>
import AllSongRequests from '../components/AllSongRequests.vue';
import PendingSongRequests from '../components/PendingSongRequests.vue';
import LoginModal from '../components/LoginModal.vue';
import AdminModal from '../components/AdminModal.vue';
export default {
  name: 'Admin',
  components: {
    PendingSongRequests,
    AllSongRequests,
    LoginModal,
    AdminModal
},
  data(){
    return {
      isLoggedIn: true
    }
  },
  methods: {
    logout(){
      this.isLoggedIn = !this.isLoggedIn;
    }
  }
}
</script>