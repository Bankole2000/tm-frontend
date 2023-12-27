<template>
  <div>
    <v-list-item-group dense v-model="selected" multiple active-class="">
      <v-slide-y-transition group tag="v-list">
        <v-list-item v-for="g in genres" :key="g.mainGenre" :value="g.mainGenre">
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox class="mr-0" :input-value="active"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="text-capitalize">{{g.mainGenre}} <span class="grey--text text--lighten-1">({{g._count.mainGenre}} songs)</span></v-list-item-title>
              <!-- <v-list-item-subtitle
                >({{g._count.mainGenre}} Songs)</v-list-item-subtitle
              > -->
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-slide-y-transition>
    </v-list-item-group>
  </div>
</template>
<script>
export default {
  props: {
    genres: {
      type: Array,
      default: () => []
    },
    selectedGenres: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return {
      // selectedGenres: []
    }
  },
  computed: {
    selected: {
      get(){
        return this.selectedGenres
      },
      set(val){
        console.log({val})
        this.$emit('genresSelected', val)
      }
    }
  },
  methods: {
    // genreSelected(e){
    //   console.log({e, selectedGenre: this.selectedGenres})
    //   this.$emit('genresSelected', this.selectedGenres)
    // }
  }
}
</script>