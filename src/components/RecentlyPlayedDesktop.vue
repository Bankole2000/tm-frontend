<template>
  <div>
    <v-expand-transition>
      <div v-show="Boolean(songRequests.length)">
        <v-row>
      <v-col cols="12">
        <p class="caption mb-0">Recently Played</p>
        <v-divider class="my-2"></v-divider>
        <div style="max-height: 200px; overflow-y: scroll; background: transparent;" :dark="false" class="pr-4">
          <v-slide-y-transition class="py-0" style="background: transparent;" group tag="v-list">
            <v-alert
              v-for="r in songRequests"
              :key="r.id"
              class="my-1"
              dense
              color="primary lighten-3"
              border="left"
              elevation="2"
              colored-border
              icon="mdi-music"
            >
              <strong>{{ r.title }}</strong> by {{ r.artist }}
            </v-alert>
          </v-slide-y-transition>
        </div>
      </v-col>
    </v-row>
      </div>
    </v-expand-transition>
    
  </div>
</template>

<script>
import API from "@/api";
export default {
  data() {
    return {
      songRequests: [],
    };
  },
  sockets: {
    SONG_REQUEST_PLAYED(data) {
      this.songRequests.unshift(data);
      if (this.songRequests.length > 10) {
        this.songRequests.pop();
      }
    },
    async SONG_REQUEST_UNPLAYED() {
      await this.getRecentlyPlayed()
    },
    async SONG_REQUEST_DELETED() {
      await this.getRecentlyPlayed()
    },
    async SONG_REQUEST_UPDATED(data) {
      const index = this.songRequests.findIndex(r => r.id === data.id);
      if(index > -1){
        this.songRequests.splice(index, 1, data);
      }
    }
  },
  methods: {
    async getRecentlyPlayed() {
      try {
        const {
          data: { data },
        } = await API.getSongRequests(1, 10, "played");
        const { data: songRequests } = data;
        this.songRequests = songRequests;
      } catch (error) {
        console.log({ error });
      }
    },
  },
  async mounted() {
    await this.getRecentlyPlayed();
  },
};
</script>

<style>
</style>