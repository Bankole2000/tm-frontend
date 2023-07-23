<template>
  <v-app>
    <!-- <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->

    <v-main>
      <router-view/>
    </v-main>
    <Snackbar />
  </v-app>
</template>

<script>
import Snackbar from './components/shared/Snackbar.vue';

export default {
  components: { Snackbar },
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
