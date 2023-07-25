<template>

    <v-card class="px-3 my-5" :class="request.hasBeenPlayed ? 'played':'unplayed'">
      <v-layout row wrap>
        <v-flex md1 sm1 xs2>
          <div>
            <v-avatar tile color="grey darken-4 mr-4">
              <v-icon large dark>mdi-music</v-icon>
            </v-avatar>
          </div>
        </v-flex>
        <v-flex md3 sm5 xs10>
          <div class="caption grey--text text--lighten-2">Song Title</div>
          <div class="secondary--text text--lighten-1">{{request.title}}</div>
        </v-flex>
        <v-flex v-if="$vuetify.breakpoint.xs" sm1 xs2></v-flex>
        <v-flex md3 sm6 xs5>
          <div class="caption grey--text text--lighten-2">Artist</div>
          <div class="secondary--text text--lighten-1">{{ request.artist}}</div>
        </v-flex>
        <v-flex v-if="$vuetify.breakpoint.smOnly" sm1 xs2></v-flex>
        <v-flex md2 sm5 xs5>
          <div class="caption grey--text text--lighten-2">Requested By</div>
          <div class="secondary--text text--lighten-1">{{ request.requestedBy }}</div>
        </v-flex>
        <v-flex v-if="$vuetify.breakpoint.xs" sm1 xs2></v-flex>
        <v-flex md2 sm5 xs8>
          <div class="caption grey--text text--lighten-2">Requested At</div>
          <div class="secondary--text text--lighten-1">{{ formattedTime(request.requestedAt) }}</div>
        </v-flex>
        <v-flex md1 sm1 xs2>
          <div class="d-flex justify-center mt-n2">
            <v-checkbox v-model="songHasBeenPlayed" hide-details></v-checkbox>
          </div>
        </v-flex>
      </v-layout>
      <v-overlay absolute :value="loading">
        <v-progress-circular indeterminate size="32"></v-progress-circular>
      </v-overlay>
    </v-card>
</template>
<script>
import API from "@/api";
export default {
  props: {
    request: {
      type: Object,
      default: () => ({
        id: Math.random(),
        title: 'Exodus',
        artist: 'Bob Marley',
        requestedBy: 'James Bond',
        requestedAt: '2023-07-23T05:14:49.194Z',
        hasBeenPlayed: false,
      })
    }
  },
  data(){
    return {
      loading: false
    }
  },
  computed: {
    songHasBeenPlayed: {
      get(){
        return this.request.hasBeenPlayed
      },
      set(val){
        return this.statusChanged(val)
      }
    }
  },
  methods: {
    formattedTime(dateTime){
      const formatter = new Intl.DateTimeFormat('en', {
        hour12: true,
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit',
    weekday: 'short',
    month: 'short',
    year: 'numeric',
      });
      return formatter.format(new Date(dateTime));
    },
    async statusChanged(e){
      if(this.loading) return;
      this.loading = true;
      try {
        const { data: { data } } = await API.togglePlayedStatus(this.request.id, e)
        this.$emit('togglePlayedStatus', { id: data.id, status: data.hasBeenPlayed});
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
<style>
  .played{
    border-left: 4px solid #007BFF !important;
  }
  .unplayed{
    border-left: 4px solid orange !important;
  }
</style>