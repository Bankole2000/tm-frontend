<template>
    <div>
     <v-row align="center">
      <v-col cols="12">
        <v-slide-y-transition class="py-0" group tag="v-list">
          <SongRequestItem @togglePlayedStatus="togglePlayedStatus" v-for="request in songRequests" :key="request.id" :request="request" />
        </v-slide-y-transition>
      </v-col>
      <v-col cols="12" sm="4" class="py-1 mt-2">
        <div class="d-flex align-center justify-start">
          <p class="mb-0 mr-8 grow">
            Showing {{ (currentPage - 1) * limit + 1 }} to
            {{ limit > total ? total : limit * currentPage }} of
            {{ total }}
          </p>
          <v-select
            v-model="limit"
            class="shrink"
            hide-details
            solo
            dense
            :items="[5, 10, 25, 50]"
            @change="limitChanged"
          ></v-select>
          <p class="mb-0 ml-4 grow">
            {{ $vuetify.breakpoint.mdAndUp ? 'Items' : '' }} Per Page
          </p>
        </div>
      </v-col>
      <v-col cols="2" class="py-1 mt-2"></v-col>
      <v-col cols="12" sm="6" class="py-1 mt-2">
        <div
          class="d-flex"
          :class="
            $vuetify.breakpoint.smAndUp ? 'justify-end' : 'justify-center'
          "
        >
          <v-pagination
            v-model="currentPage"
            :length="pages"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            :total-visible="7"
            @next="pageNext"
            @previous="pagePrevious"
            @input="pageInput"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import API from '@/api'
import { mapActions } from 'vuex';
import SongRequestItem from './common/SongRequestItem.vue'
export default {
  components: { SongRequestItem },
  data() {
    return {
      songRequests: [],
      search: '',
      currentPage: 1,
      limit: 25,
      status: 'all',
      pages: 0,
      next: null,
      total: 1,
      loading: false,
    }
  },
  methods: {
    ...mapActions({
      showToast: "ui/showToast"
    }),
    async getSongRequests(currentPage = 1, limit = 25){
      try {
        const { data: { data } } = !this.search.trim() 
          ? await API.getSongRequests(currentPage, limit, this.status) 
          : await API.searchSongRequests(currentPage, limit, this.search, this.status)
        console.log(data) 
        const {
          total,
          pages,
          prev,
          next,
          page,
          data: songRequests,
          limit: newLimit,
        } = data
        this.total = total
        this.currentPage = page
        this.prev = prev
        this.next = next
        this.pages = pages
        this.songRequests = songRequests
        this.limit = newLimit
      } catch (error) {
        console.log({ error })
      }
    },
    async limitChanged(e) {
      console.log({ e })
      await this.getSongRequests(1, e)
    },
    async pageInput(e) {
      console.log({ event: 'Page Select', e })
      await this.getSongRequests(e, this.limit)
    },
    async pagePrevious(e) {
      console.log({ event: 'Previous', e, currentPage: this.currentPage })
      await this.getSongRequests(this.currentPage, this.limit)
    },
    async pageNext(e) {
      console.log({ event: 'Next', e, currentPage: this.currentPage })
      await this.getSongRequests(this.currentPage, this.limit)
    },
    async togglePlayedStatus(e){
      console.log({ event: 'Toggle played status', e})
    }
  },
  sockets: {
    SONG_REQUEST_ADDED(data) {
      console.log({ data, event: 'SONG_REQUEST_ADDED' });
      this.songRequests.unshift(data);
      this.total++;
      if (this.songRequests.length > this.limit){
        this.songRequests.pop();
        this.pages = Math.ceil(this.total / this.limit);
      }
    },
    SONG_REQUEST_PLAYED(data) {
      console.log({ data, event: 'SONG_REQUEST_PLAYED' });
      const index = this.songRequests.findIndex(r => r.id === data.id);
      if(index > -1){
        this.songRequests[index].hasBeenPlayed = data.hasBeenPlayed;
      }
    },
    SONG_REQUEST_UNPLAYED(data) {
      console.log({ data, event: 'SONG_REQUEST_UNPLAYED' });
      const index = this.songRequests.findIndex(r => r.id === data.id);
      if(index > -1){
        this.songRequests[index].hasBeenPlayed = data.hasBeenPlayed;
      }
    },
  },
  async mounted(){
    await this.getSongRequests();
  }
}
</script>

<style>

</style>