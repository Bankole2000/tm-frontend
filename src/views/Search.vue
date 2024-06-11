<template>
  <div class="search">
    <div style="width: 100vw; height: 100vh">
      <v-container>
        <v-row>
          <v-col cols="12" class="pt-8 mt-8">
            <div class="d-flex align-center">
              <h1>Search Performances</h1>
            </div>
            <v-divider class="my-1 mb-3"></v-divider>
            <div class="d-flex align-center">
              <v-text-field @keyup.enter="getPerformances()" v-model="search" hide-details prepend-inner-icon="mdi-magnify" @click:clear="clearSearch" clearable rounded solo outlined placeholder="artist, album, song title">
                <!-- <template v-slot:append-outer>
                  <v-fade-transition leave-absolute>
                    <v-progress-circular v-if="loadingResults" size="24" color="info" indeterminate></v-progress-circular>
                    <v-btn @click="getPerformances()" v-else rounded color="primary">
                        <v-icon left>mdi-magnify</v-icon>
                        Search
                      </v-btn>
                  </v-fade-transition>
                </template> -->
              </v-text-field>
              <v-btn class="mx-2" x-large :loading="loadingResults" :disabled="loadingResults" @click="getPerformances()" rounded color="primary">
                <v-icon left>mdi-magnify</v-icon>
                Search
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col cols="12">
            <v-card min-height="70vh">
            <v-tabs dark v-model="tabs" class="text-uppercase" grow background-color="primary" @change="tabChange">
              <v-tab>Genres <span class="grey--text text--lighten-1">&nbsp;({{filteredGenres.length}})</span></v-tab>
              <v-tab>Performances <span class="grey--text text--lighten-1">&nbsp;({{total}})</span></v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabs">
              <v-tab-item :value="0">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field hide-details v-model="genreFilter" outlined solo label="filter Genres" prepend-inner-icon="mdi-filter-variant"></v-text-field>
                      <GenreList :genres="filteredGenres" @genresSelected="genresSelected" :selectedGenres="selectedGenres"/>
                    </v-col>
                    <v-overlay :value="loadingGenres" :opacity="0.6">
                      <v-progress-circular indeterminate size="24"></v-progress-circular>
                    </v-overlay>
                  </v-row>
                </v-container>
              </v-tab-item>
              <v-tab-item :value="1">
                <div v-if="search || selectedGenres.length">
                  <div class="d-flex align-center">
                    <v-subheader><span v-if="search">Searching: "{{search}}" &nbsp;</span><span v-if="selectedGenres.length">in Genres: {{selectedGenres}}</span></v-subheader>
                    <v-spacer></v-spacer>
                    <v-btn x-small @click="clearSearch()" class="mr-4"><v-icon left>mdi-window-close</v-icon> clear</v-btn>
                  </div>
                  <v-divider></v-divider>
                </div>
                <PerformanceList :performances="performances" />
                <v-container>
                  <v-row>
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
                        {{ $vuetify.breakpoint.mdAndUp ? 'Items per' : '' }}Page
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
                </v-container>
                
                <v-overlay :value="loadingResults" :opacity="0.6">
                  <v-progress-circular indeterminate size="64"></v-progress-circular>
                </v-overlay>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    
    </div>
  </template>
<script>
import API from '@/api';
import GenreList from '../components/GenreList.vue'
import PerformanceList from '../components/PerformanceList.vue'
export default {
  components: {
    GenreList,
    PerformanceList,
  },
  data(){
    return {
      tabs: null,
      genres: [],
      performances: [],
      search:'',
      currentPage: 1,
      limit: 10,
      pages: 0,
      next: null,
      total: 1,
      loadingGenres: false,
      loadingResults: false,
      selectedGenres: [],
      genreFilter: '',
    }
  },
  methods: {
    tabChange(e){
      console.log({e})
    },
    async getGenres(){
      if(this.loadingGenres) return;
      this.loadingGenres = true;
      try {
        const {data: {data}} = await API.getGenres()
        console.log({data})
        this.genres = data
      } catch (error) {
        console.log({ error })
      } finally {
        this.loadingGenres = false;
      }
    },
    async getPerformances(currentPage = 1, limit = 10){
      if(this.loadingResults) return;
      this.loadingResults = true;
      const usedSearch = Boolean(this.search || this.selectedGenres.length);
      try {
        const { data: { data } } = usedSearch ? await API.searchPerformances(currentPage, limit, this.search, this.selectedGenres.length > 1? this.selectedGenres.join(",") : this.selectedGenres[0]) : await API.getPerformances(currentPage, limit)
        const {
          total,
          pages,
          prev,
          next,
          page,
          data: performances,
          limit: newLimit,
        } = data
        console.log({data})
        this.total = total
        this.currentPage = page
        this.prev = prev
        this.next = next
        this.pages = pages
        this.performances = performances
        this.limit = newLimit
        if(usedSearch) this.tabs = 1;
      } catch (error) {
        console.log({ error })
      } finally {
        this.loadingResults = false;
      }
    },
    async limitChanged(e) {
      await this.getPerformances(1, e)
    },
    async pageInput(e) {
      await this.getPerformances(e, this.limit)
    },
    async pagePrevious() {
      await this.getPerformances(this.currentPage, this.limit)
    },
    async pageNext() {
      await this.getPerformances(this.currentPage, this.limit)
    },
    async genresSelected(e){
      console.log({e})
      this.selectedGenres = e
      this.loadingGenres = true;
      await this.getPerformances();
      this.loadingGenres = false;
    },
    async clearSearch(){
      this.search = '';
      this.selectedGenres = [];
      this.genreFilter = '';
      await this.getGenres();
      await this.getPerformances();
    }
  },
  computed: {
    filteredGenres(){
      if(!this.genreFilter) return this.genres;
      return this.genres.filter(g => g.genre.toLowerCase().includes(this.genreFilter.toLowerCase()) || g.genreName.toLowerCase().includes(this.genreFilter.toLowerCase()));
    }
  },
  async mounted(){
    await this.getGenres()
    await this.getPerformances()
  }
}
</script>
