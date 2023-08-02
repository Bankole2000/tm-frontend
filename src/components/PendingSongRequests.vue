<template>
  <div>
    <v-row align="center">
      <v-col cols="12" class="pb-0">
        <!-- <v-slide-y-transition leave-absolute>
          <v-progress-linear color="primary" v-show="loading" indeterminate rounded height="6"></v-progress-linear>
        </v-slide-y-transition> -->
        <!-- <v-slide-y-transition>
          <div v-show="!loading && Boolean(songRequests.length)"> -->
            <v-slide-y-transition group tag="v-list">
              <SongRequestItem @togglePlayedStatus="togglePlayedStatus" v-for="request in songRequests" :key="request.id"
                :request="request" />
            </v-slide-y-transition>
          <!-- </div>
        </v-slide-y-transition> -->
        <v-slide-y-transition>
          <v-alert type="success" v-show="!Boolean(songRequests.length) && !loading" text>🎵 No Pending Song requests 👋</v-alert>
        </v-slide-y-transition>
      </v-col>
      <v-col cols="12" sm="4" class="py-1 mt-2">
        <div class="d-flex align-center justify-start">
          <p class="mb-0 mr-8 grow">
            Showing {{ (currentPage - 1) * limit + 1 }} to
            {{ limit > total ? total : limit * currentPage }} of
            {{ total }}
          </p>
          <v-select v-model="limit" class="shrink" hide-details solo dense :items="[5, 10, 25, 50]"
            @change="limitChanged"></v-select>
          <p class="mb-0 ml-4 grow">
            {{ $vuetify.breakpoint.mdAndUp ? 'Items' : '' }} Per Page
          </p>
        </div>
      </v-col>
      <v-col cols="2" class="py-1 mt-2"></v-col>
      <v-col cols="12" sm="6" class="py-1 mt-2">
        <div class="d-flex" :class="$vuetify.breakpoint.smAndUp ? 'justify-end' : 'justify-center'
          ">
          <v-pagination v-model="currentPage" :length="pages" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"
            :total-visible="7" @next="pageNext" @previous="pagePrevious" @input="pageInput"></v-pagination>
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
  props: {
    isLoggedIn: {
      type: Boolean, 
      default: false,
    }
  },
  data() {
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
    async getPendingSongRequests(currentPage = 1, limit = 25) {
      if (this.loading) return;
      this.loading = true;
      try {
        const { data: { data } } = await API.getSongRequests(currentPage, limit, 'unplayed')
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
      await this.getPendingSongRequests(1, e)
    },
    async pageInput(e) {
      await this.getPendingSongRequests(e, this.limit)
    },
    async pagePrevious() {
      await this.getPendingSongRequests(this.currentPage, this.limit)
    },
    async pageNext() {
      await this.getPendingSongRequests(this.currentPage, this.limit)
    },
    async togglePlayedStatus(e) {
      console.log({ event: 'Toggle played status', e })
    }
  },
  sockets: {
    SONG_REQUEST_ADDED(data) {
      this.songRequests.unshift(data);
      this.total++;
      if (this.songRequests.length > this.limit) {
        this.songRequests.pop();
        this.pages = Math.ceil(this.total / this.limit);
      }
      if(this.isLoggedIn){
        this.showToast({show: true, message: 'New Song Request', timeout: 3000, sclass: 'warning'})
      }
    },
    async SONG_REQUEST_PLAYED(data) {
      this.showToast({ show: true, message: `"${data.title}" marked as played`, timeout: 2000, sclass: 'success' })
      await this.getPendingSongRequests(this.currentPage, this.limit);
    },
    SONG_REQUEST_UNPLAYED(data) {
      this.songRequests.unshift(data);
      this.total++;
      if (this.songRequests.length > this.limit) {
        this.songRequests.pop();
        this.pages = Math.ceil(this.total / this.limit);
      }
    },
    SONG_REQUEST_UPDATED(data){
      const index = this.songRequests.findIndex(r => r.id === data.id);
      if(index > -1){
        this.songRequests.splice(index, 1, data);
      }
    },
    async SONG_REQUEST_DELETED(){
      await this.getPendingSongRequests(this.currentPage, this.limit);
    }
  },
  async mounted() {
    await this.getPendingSongRequests();
  }
}
</script>

<style></style>