<template>
  <div style="width: 100vw; height: 100vh">
    <v-container>
      <v-row>
        <v-col cols="12" class="pt-8">
          <h2>👋 Welcome Timi</h2>
          <p class="subtitle-1 mb-0">Latest Song Requests</p>
          <PendingSongRequests />
          <v-divider class="my-8"></v-divider>
          <p class="subtitle-1 mb-0">All Song Requests</p>
          <AllSongRequests />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import AllSongRequests from '../components/AllSongRequests.vue';
import PendingSongRequests from '../components/PendingSongRequests.vue';
export default {
  name: 'Admin',
  components: {
    PendingSongRequests,
    AllSongRequests
  }
}
</script>