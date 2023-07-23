<template>
 <div class="song-request-form" style="width: 100%">

    <v-row>
      <v-col cols="12">

    <v-text-field label="Song Title" v-model="title" placeholder="e.g 'We are the world' or 'Genie in a bottle'" solo rounded outlined prepend-inner-icon="mdi-music"></v-text-field>
    <v-text-field label="Song Artist" v-model="artist" solo rounded outlined placeholder="e.g. 'Micheal Jackson' or 'Christina Aguilera'" prepend-inner-icon="mdi-microphone-variant"></v-text-field>
    <v-text-field label="Requested By (optional)" v-model="requestedBy" placeholder="Your Name" solo rounded outlined prepend-inner-icon="mdi-account"></v-text-field>
    <v-btn rounded x-large block>Request Song
      <!-- <v-icon right>mdi-music-box-multiple-outline</v-icon> -->
      <v-icon right>mdi-piano</v-icon>
      </v-btn>
      </v-col>
    </v-row>

 </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      artist: "",
      requestedBy: ""
    }
  },
  mounted(){

  }
}
</script>

<style>

</style>