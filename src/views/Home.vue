<template>
  <div class="home">
    <div style="display: flex; width: 100vw; height: 100vh">
      <v-col cols="0" md="7" class="pa-0 ma-0 d-none d-md-flex flex-column">
        <v-card style="
            height: 100vh;
            align-items: center;
            justify-content: center;
          " gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)" dark tile>
          <v-img :src="require('@/assets/img/timikeys1.jpg')" height="100vh"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
            <div class="d-flex align-center flex-column" style="height: 100vh">
              <v-row justify="center" align="center">
                <v-col>
                  <h1 class="display-4 font-weight-bold mb-4 text-center">&nbsp;</h1>
                  <h1 class="display-2 font-weight-thin mb-16 text-center px-4">
                    Let's play your favorite songs
                  </h1>
                  <div class="mt-n8">
                    <RecentlyPlayedDesktop />
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="12" md="5" class="pa-0 ma-0">
        <!-- background: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0.65) 100%), url('https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-icon.png?v=c78bd457575a') no-repeat; -->
        <v-card style="
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          "
          :style="{background: $vuetify.breakpoint.smAndDown ? `linear-gradient(to top, rgba(255, 255, 255, 255) 0%, rgba(255, 255, 255, 0.5) 59%, rgba(255, 255, 255, 0.65) 100%), url('${require('@/assets/img/timikeys1.jpg')}') no-repeat center left`: 'none'}"
          class="ma-0 pa-0" elevation="0" tile>
          <div style="
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            " class="mb-8" @click="$router.push({ name: 'pages.home' })">
            <v-avatar tile color="transparent" size="54">
              <v-img contain :src="require('@/assets/img/logo.png')"></v-img>
              <!-- <v-icon x-large dark>mdi-piano</v-icon> -->
            </v-avatar>
            <h1 class="mx-4 display-1 font-weight-bold font-italic">TimiKeys</h1>
          </div>
          <p class="mb-2 text-center headline mt-n4" v-if="$vuetify.breakpoint.smAndDown">💿 You're the <strong>DJ</strong>! <br /> Request your favorite songs <i>live</i> 🎹</p>
          <div class="px-6">
            <SongRequestForm @requestSong="requestSong" />
            <div class="d-flex align-center justify-end" :class="$vuetify.breakpoint.smAndDown ? 'mt-4': 'mt-16 pt-16'">
              <SocialButton v-for="link in socialLinks" :key="link.name" :platform="link.platform" :icon="link.icon" :username="link.username"/>
            </div>
            <RecentlyPlayedMobile v-if="$vuetify.breakpoint.smAndDown" />

          </div>
        </v-card>
      </v-col>
    </div>
  </div>
</template>

<script>
import SongRequestForm from "../components/forms/SongRequestForm.vue";
import RecentlyPlayedMobile from '../components/RecentlyPlayedMobile.vue';
import RecentlyPlayedDesktop from '../components/RecentlyPlayedDesktop.vue';
import SocialButton from "../components/common/SocialButton.vue";
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    SongRequestForm,
    SocialButton,
    RecentlyPlayedMobile,
    RecentlyPlayedDesktop
  },
  // sockets: {
  //   SONG_REQUEST_ADDED(data) {
  //     console.log({ data, event: 'SONG_REQUEST_ADDED' });
  //   },
  //   SONG_REQUEST_PLAYED(data) {
  //     console.log({ data, event: 'SONG_REQUEST_PLAYED' });
  //   },
  //   SONG_REQUEST_UNPLAYED(data) {
  //     console.log({ data, event: 'SONG_REQUEST_UNPLAYED' });
  //   },
  //   SONG_REQUEST_DELETED(data) {
  //     console.log({ data, event: 'SONG_REQUEST_DELETED' });
  //   }
  // },
  methods: {
    requestSong(e){
      console.log({e, event: 'requestSong'})
    }
  },
  data() {
    return {
      socialLinks: [
        {
          platform: 'instagram',
          username: 'timikeys_',
          icon: 'mdi-instagram'
        },
        {
          platform: 'tiktok',
          username: '@timikeys_',
          icon: 'mdi-music'
        },
        {
          platform: 'youtube',
          username: '@timikeys_',
          icon: 'mdi-youtube'
        },
        {
          platform: 'linkedin',
          username: 'in/timi-esan-21442b20b',
          icon: 'mdi-linkedin'
        },
      ]
    }
  }
};
</script>
<style>
::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}
</style>
