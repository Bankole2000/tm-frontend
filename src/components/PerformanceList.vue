<template>
  <div>
    <v-list :dense="$vuetify.breakpoint.smAndDown" two-line>
      <v-list-item-group v-model="selectedPerformance">
        <v-slide-y-transition group>
          <v-list-item v-for="p in performances" :key="p.id">
            <v-list-item-avatar>
              <v-icon>mdi-music</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{p.songName}}</v-list-item-title>
              <v-list-item-subtitle class="text-capitalize">{{p.artistName}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn @click="openLink(p.videoURL)" fab color="error" x-small>
                <v-icon>mdi-play</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-slide-y-transition>
      </v-list-item-group>
    </v-list>
  </div>
</template>
<script>
export default {
  props: {
    performances: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return {
      selectedPerformance: null
    }
  },
  methods: {
    openLink(url){
      console.log({url})
      window.open(url, '_blank')
    }
  }
}
</script>