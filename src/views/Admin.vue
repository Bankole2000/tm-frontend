<template>
  <div style="width: 100vw; height: 100vh">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>This is the Admin Page</h1>
          <SongRequestItem v-for="i in 5" :key="i" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import SongRequestItem from '../components/common/SongRequestItem.vue';
export default {
  name: 'Admin',
  components: {
    SongRequestItem
  }
}
</script>