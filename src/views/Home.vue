<template>
  <div class="home">
    <div style="display: flex; width: 100vw; height: 100vh">
      <v-col cols="0" md="7" class="pa-0 ma-0 d-none d-md-flex flex-column">
        <v-card
          style="
            height: 100vh;
            
            align-items: center;
            justify-content: center;
          "
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
          dark
          tile
        >
          <!-- :img="require('@/assets/img/homebanner.jpeg')" -->
        <v-img
        
          :src="require('@/assets/img/homebanner.jpeg')"
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        >
        <div class="d-flex align-center flex-column" style="height: 100vh">

        <v-row justify="center" align="center">
          <v-col>

          <h1 class="display-4 font-weight-bold mb-4 text-center">Timi Keys</h1>
          <h1 class="display-2 font-weight-thin mb-16 text-center px-4">
            Let's play your favorite songs
          </h1>
          </v-col>
        </v-row>
        </div>
        </v-img>
        </v-card>
      </v-col>
      <v-col cols="12" md="5" class="pa-0 ma-0">
        <v-card
          style="
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          "
          class="ma-0 pa-0"
          elevation="0"
          tile
        >
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            "
            class="mb-8"
            @click="$router.push({ name: 'pages.home' })"
          >
          <v-avatar tile color="grey darken-4">
      <v-icon x-large dark>mdi-piano</v-icon>
    </v-avatar>
            <!-- <img
              :src="require('@/assets/logo.png')"
              width="50"
              height="50"
              :aspect-ratio="1"
              class="ml-2 pl-0"
            /> -->
            <h1 class="mx-4">Timi Keys</h1>
          </div>
          <div class="px-6">

          <SongRequestForm/>
          </div>
          <!-- <p class="text-center mt-4">
            Don't have an account?
            <router-link :to="{ name: 'auth.signup' }"
              ><span class="secondary--text">Sign Up</span></router-link
            >
          </p> -->
        </v-card>
      </v-col>
    </div>
    <!-- <div
      v-if="$vuetify.breakpoint.mdAndUp"
      style="flex: 6; z-index: 1; background-color: white"
    ></div>
    <div style="flex: 4; border-left: 1px solid grey; z-index: 0">
      <v-card :style="{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: $vuetify.breakpoint.mdAndUp ? '0 48px' : '0 12px',
            }"
            class="text-center"
            elevation="0">
      <div class="px-4" style="width: 100%">

      <SongRequestForm />
      </div>
      </v-card>
    </div> -->
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import SongRequestForm from "../components/forms/SongRequestForm.vue";
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {
    SongRequestForm,
    // HelloWorld
  },
};
</script>
