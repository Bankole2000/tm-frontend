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
  data(){
    return {
      songRequests: [],
      currentPage: 1,
      limit: 25,
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
    async getPendingSongRequests(currentPage = 1, limit = 25){
      try {
        const { data: { data } } = await API.getSongRequests(currentPage, limit, 'unplayed')
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
      await this.getPendingSongRequests(1, e)
    },
    async pageInput(e) {
      console.log({ event: 'Page Select', e })
      await this.getPendingSongRequests(e, this.limit)
    },
    async pagePrevious(e) {
      console.log({ event: 'Previous', e, currentPage: this.currentPage })
      await this.getPendingSongRequests(this.currentPage, this.limit)
    },
    async pageNext(e) {
      console.log({ event: 'Next', e, currentPage: this.currentPage })
      await this.getPendingSongRequests(this.currentPage, this.limit)
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
    async SONG_REQUEST_PLAYED(data) {
      console.log({ data, event: 'SONG_REQUEST_PLAYED' });
      this.showToast({ show: true, message: 'Song marked as played', timeout: 2000, sclass: 'success'})
      await this.getPendingSongRequests(this.currentPage, this.limit);
    },
    SONG_REQUEST_UNPLAYED(data) {
      console.log({ data, event: 'SONG_REQUEST_UNPLAYED' });
      this.songRequests.unshift(data);
      this.total++;
      if (this.songRequests.length > this.limit){
        this.songRequests.pop();
        this.pages = Math.ceil(this.total / this.limit);
      }
    },
  },
  async mounted(){
    await this.getPendingSongRequests();
  }
}
</script>

<style>

</style>