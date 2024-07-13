<script>
  export default {
    data(){
      return {
        videoNumber: 0,
        videoURL: '',
        songName: '',
        artistName: '',
        albumName: '',
        yesOrNo: false,
        videoLength: '3:15',
        videoLengthInSeconds: 0,
        mainGenre: '',
        subGenre: '',
        otherGenres: '',
      }
    },
    methods: {
      async submit(){
        console.log({data: this.$data})
      }
    }
  }
</script>

<template>
  <div>
    <v-text-field label="Video Number" type="number" v-model="videoNumber"></v-text-field>
    <v-text-field label="Video URL" type="number" v-model="videoURL"></v-text-field>
    <v-text-field label="Song Name" type="number" v-model="songName"></v-text-field>
    <v-text-field label="Artist Name" type="number" v-model="artistName"></v-text-field>
    <v-text-field label="Album Name" type="number" v-model="albumName"></v-text-field>
    <v-switch label="Yes OR No" type="number" v-model="yesOrNo"></v-switch>
    <v-text-field label="Video Length" type="number" v-model="videoLength"></v-text-field>
    <v-text-field label="Video Length in Seconds" type="number" v-model="videoLengthInSeconds"></v-text-field>
    <v-text-field label="Main Genre" type="number" v-model="mainGenre"></v-text-field>
    <v-text-field label="Sub Genre" type="number" v-model="subGenre"></v-text-field>
    <v-btn @click="submit">Submit</v-btn>
  </div>
</template>
