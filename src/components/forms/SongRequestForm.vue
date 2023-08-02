<template>
 <div class="song-request-form" style="width: 100%">

    <v-row>
      <v-col cols="12">

    <v-text-field @keyup.enter="requestSong" label="Song Title" hint="If you don't know the song title, just use a popular phrase from it" type="text" v-model="title" placeholder="e.g 'We are the world' or 'any song by Hans Zimmer'" solo rounded outlined prepend-inner-icon="mdi-music"></v-text-field>
    <v-text-field @keyup.enter="requestSong" hint="If you don't know the Artists' name, just enter 'Anonymous' or 'Unknown'" type="text" label="Song Artist (Optional)" v-model="artist" solo rounded outlined placeholder="e.g. 'Micheal Jackson' or 'Frank Ocean' or 'Unknown'" prepend-inner-icon="mdi-microphone-variant"></v-text-field>
    <v-text-field @keyup.enter="requestSong" label="Requested By (optional)" v-model="requestedBy" placeholder="Your Name (optional)" solo rounded outlined prepend-inner-icon="mdi-account"></v-text-field>
     <v-expand-transition>
      
    <v-alert v-show="message.show" outlined :type="message.type || 'info'" text>
      {{ message.message}}
    </v-alert>
     </v-expand-transition>
    <v-btn rounded @click="requestSong" x-large block color="primary" :loading="loading">Request Song
      <!-- <v-icon right>mdi-music-box-multiple-outline</v-icon> -->
      <v-icon right>mdi-piano</v-icon>
      </v-btn>
      </v-col>
    </v-row>
    <v-overlay absolute color="warning" :value="loading" :opacity="0.3"></v-overlay>
 </div>
</template>

<script>
import { mapActions } from 'vuex';
import API from '@/api';
export default {
  data() {
    return {
      title: "",
      artist: "",
      requestedBy: "",
      loading: false,
      message: {
        show: false,
        message: "",
        type: "",
      }
    }
  },
  methods: {
    ...mapActions({
      showToast: "ui/showToast"
    }),
    async requestSong(){
      if (this.loading) {
        return;
      }
      this.loading = true
      if(!this.title.trim() && !this.artist.trim()){
        this.showToast({ show: true, message: "Please add a Song Title or Artist", sclass: 'error', timeout: 2000})
        this.loading = false;
        return;
      }
      // if(!this.artist.trim()){
      //   this.showToast({ show: true, message: "Please add the Song Artist's name", sclass: 'error', timeout: 2000})
      //   this.loading = false;
      //   return;
      // }
      const songRequest = {
        title: this.title.trim() || 'Any Song',
        artist: this.artist.trim() || 'Unknown Artist',
        requestedBy: this.requestedBy.trim() || 'Anonymous'
      }
      try {
        const result = await API.addSongRequest(songRequest);
        if (result.data.success){
          this.showToast({ show: true, message: 'Song request sent', timeout: 3000, sclass: 'success'})
          this.showMessage('Listen closely 🎶', 'success', 5000);
          this.title = ""
          this.artist = ""
          this.requestedBy = ""
        }
      } catch (error) {
        this.showToast({ show: true, message: 'An error occurred', timeout: 3000, sclass: 'error'})
        this.showMessage("Looks like something went wrong - please try again", 'error', 3000)
        console.log({ error })
      } finally {
        this.loading = false;
      }
      this.$emit('requestSong', songRequest)
    },
    showMessage(message, type, timeout = 5000) {
      this.message = {
        show: true,
        message,
        type,
      }
      setTimeout(() => {
        this.message = {
          show: false,
          message: '',
          type: '',
        }
      }, timeout)
    }
  },
  mounted(){
    
  }
}
</script>

<style>

</style>