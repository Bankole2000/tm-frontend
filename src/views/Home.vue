<template>
  <div class="home">
    <div style="display: flex; width: 100vw; height: 100vh">
      <v-col cols="0" md="7" class="pa-0 ma-0 d-none d-md-flex flex-column">
        <v-card style="
            height: 100vh;
            align-items: center;
            justify-content: center;
          " gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)" dark tile>
          <v-img :src="require('@/assets/img/homebanner.jpeg')" height="100vh"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
            <div class="d-flex align-center flex-column" style="height: 100vh">
              <v-row justify="center" align="center">
                <v-col>
                  <h1 class="display-4 font-weight-bold mb-4 text-center">Timi Keys</h1>
                  <h1 class="display-2 font-weight-thin mb-16 text-center px-4">
                    Let's play your favorite songs
                  </h1>
                  <div>
                    <p class="caption mb-2">Recently played</p>
                    <v-divider></v-divider>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="12" md="5" class="pa-0 ma-0">
        <v-card style="
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          " class="ma-0 pa-0" elevation="0" tile>
          <div style="
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            " class="mb-8" @click="$router.push({ name: 'pages.home' })">
            <v-avatar tile color="grey darken-4">
              <v-icon x-large dark>mdi-piano</v-icon>
            </v-avatar>
            <h1 class="mx-4">Timi Keys</h1>
          </div>
          <div class="px-6">
            <SongRequestForm @requestSong="requestSong" />
            <RecentlyPlayedMobile />
          </div>
        </v-card>
      </v-col>
    </div>
  </div>
</template>

<script>
import SongRequestForm from "../components/forms/SongRequestForm.vue";
import RecentlyPlayedMobile from '../components/RecentlyPlayedMobile.vue';
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    SongRequestForm,
    RecentlyPlayedMobile,
  },
  sockets: {
    SONG_REQUEST_ADDED(data) {
      console.log({ data, event: 'SONG_REQUEST_ADDED' });
    },
    SONG_REQUEST_PLAYED(data) {
      console.log({ data, event: 'SONG_REQUEST_PLAYED' });
    },
    SONG_REQUEST_UNPLAYED(data) {
      console.log({ data, event: 'SONG_REQUEST_UNPLAYED' });
    },
    SONG_REQUEST_DELETED(data) {
      console.log({ data, event: 'SONG_REQUEST_DELETED' });
    }
  },
  methods: {
    requestSong(e){
      console.log({e, event: 'requestSong'})
    }
  }
};
</script>
