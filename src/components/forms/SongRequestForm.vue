<template>
 <div class="song-request-form" style="width: 100%">

    <v-row>
      <v-col cols="12">

    <v-text-field label="Song Title" v-model="title" placeholder="e.g 'We are the world' or 'Genie in a bottle'" solo rounded outlined prepend-inner-icon="mdi-music"></v-text-field>
    <v-text-field label="Song Artist" v-model="artist" solo rounded outlined placeholder="e.g. 'Micheal Jackson' or 'Christina Aguilera'" prepend-inner-icon="mdi-microphone-variant"></v-text-field>
    <v-text-field label="Requested By (optional)" v-model="requestedBy" placeholder="Your Name" solo rounded outlined prepend-inner-icon="mdi-account"></v-text-field>
    <v-btn rounded @click="requestSong" x-large block color="secondary" :loading="loading">Request Song
      <!-- <v-icon right>mdi-music-box-multiple-outline</v-icon> -->
      <v-icon right>mdi-piano</v-icon>
      </v-btn>
      </v-col>
    </v-row>
    <v-overlay absolute color="warning" :value="loading" :opacity="0.3"></v-overlay>
 </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      artist: "",
      requestedBy: "",
      loading: false
    }
  },
  methods: {
    requestSong(){
      console.log({
        title: this.title,
        artist: this.artist,
        requestedBy: this.requestedBy
      });
    }
  },
  mounted(){

  }
}
</script>

<style>

</style>