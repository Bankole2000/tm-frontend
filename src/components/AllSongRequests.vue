<template>
    <div>
     <v-row align="center">
      <v-col cols="12">
        <div class="d-flex align-center pr-4">

          <p class="subtitle-1 mb-0">All Song Requests</p>
          <v-spacer></v-spacer>
          <v-text-field v-if="$vuetify.breakpoint.mdAndUp" :readonly="loading" class="mx-2" prepend-inner-icon="mdi-magnify" v-model="search" @click:clear="clearSearch" @keyup.enter="getSongRequests" clearable dense label="Search" @click:append-outer="getSongRequests" hide-details outlined append-outer-icon="mdi-search-web"></v-text-field>
          <v-select :disabled="loading" label="Status" style="max-width: 150px" :items="['all', 'played', 'unplayed']" @change="getSongRequests" dense outlined v-model="status" hide-details></v-select>
        </div>
      </v-col>
      <v-col cols="12" v-if="Boolean(songRequests.length) || loading" class="pr-4 py-0">
        <v-slide-y-transition leave-absolute>
          <v-progress-linear
            color="primary"
            v-show="loading"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-slide-y-transition>
        <v-slide-y-transition>
          <div v-show="!loading">
            <v-slide-y-transition class="py-0" group tag="v-list">
              <SongRequestItem @togglePlayedStatus="togglePlayedStatus" v-for="request in songRequests" :key="request.id" :request="request" />
            </v-slide-y-transition>
          </div>
        </v-slide-y-transition>
      </v-col>
      <v-col cols="12" v-else class="py-0">
        <v-alert dense type="info" text class="mb-0">
          No <span class="font-weight-bold" v-if="status !== 'all'">{{ status }}</span> Song Requests found<span v-if="search"> for <strong>"{{ search }}"</strong> search term</span>.
      </v-alert>
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
    async clearSearch(){
      this.search = ''
      await this.getSongRequests();
    },
    async getSongRequests(currentPage = 1, limit = 25){
      if(this.loading) return;
      this.loading = true;
      try {
        const { data: { data } } = !this.search
          ? await API.getSongRequests(currentPage, limit, this.status) 
          : await API.searchSongRequests(currentPage, limit, this.search, this.status)
        
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
      } finally {
        this.loading = false;
      }
    },
    async limitChanged(e) {
      await this.getSongRequests(1, e)
    },
    async pageInput(e) {
      await this.getSongRequests(e, this.limit)
    },
    async pagePrevious() {
      await this.getSongRequests(this.currentPage, this.limit)
    },
    async pageNext() {
      await this.getSongRequests(this.currentPage, this.limit)
    },
    async togglePlayedStatus(e){
      console.log({ event: 'Toggle played status', e})
    }
  },
  sockets: {
    SONG_REQUEST_ADDED(data) {
      this.songRequests.unshift(data);
      this.total++;
      if (this.songRequests.length > this.limit){
        this.songRequests.pop();
        this.pages = Math.ceil(this.total / this.limit);
      }
    },
    SONG_REQUEST_PLAYED(data) {
      const index = this.songRequests.findIndex(r => r.id === data.id);
      if(index > -1){
        this.songRequests[index].hasBeenPlayed = data.hasBeenPlayed;
      }
    },
    SONG_REQUEST_UPDATED(data){
      const index = this.songRequests.findIndex(r => r.id === data.id);
      if(index > -1){
        this.songRequests.splice(index, 1, data);
      }
    },
    async SONG_REQUEST_DELETED(){
      await this.getSongRequests();
    },
    SONG_REQUEST_UNPLAYED(data) {
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