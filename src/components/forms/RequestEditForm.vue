<template>
  <v-container class="pb-4">
    <v-row>
      <v-col cols="12" md="4" sm="6">
        <v-text-field label="Song Title" v-model="newTitle" dense hide-details outlined></v-text-field>
      </v-col>
      <v-col cols="12" md="4" sm="6">
        <v-text-field label="Song Artist" v-model="newArtist" dense hide-details outlined></v-text-field>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-text-field label="Requested By" v-model="newRequestedBy" dense hide-details outlined></v-text-field>
      </v-col>
      <v-col cols="12">
        <div class="d-flex">
          <v-spacer></v-spacer>
            <v-btn color="accent" @click="updateRequest" class="mx-2"><v-icon left>mdi-content-save</v-icon>Update</v-btn>
            <v-btn text @click="deleteRequest" color="error"><v-icon left>mdi-trash-can</v-icon>Delete</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  props: {
    isEditing: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    artist: {
      type: String,
      default: '',
    },
    requestedBy: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: Math.random().toString()
    }
  },
  data(){
    return {
      newTitle: '',
      newArtist: '',
      newRequestedBy: ''
    }
  },
  watch:{
    isEditing(val){
      if(val){
        this.newTitle = this.title;
        this.newArtist = this.artist;
        this.newRequestedBy = this.requestedBy;
      }
    }
  },
  methods: {
    ...mapActions({
      showToast: "ui/showToast"
    }),
    updateRequest(){
      if(!this.newArtist.trim() && !this.newTitle.trim()) {
        this.showToast({ show: true, message: "Please add song title or artist", sclass: 'error', timeout: 2000})
        return;
      }
      this.$emit('updaterequest', {
        id: this.id,
        title: this.newTitle.trim() || 'Any Song',
        artist: this.newArtist.trim() || 'Unknown',
        requestedBy: this.newRequestedBy.trim() || 'Anonymous'
      })
    },
    deleteRequest(){
      this.$emit('deleterequest', {
        id: this.id,
      })
    }
  }
}
</script>