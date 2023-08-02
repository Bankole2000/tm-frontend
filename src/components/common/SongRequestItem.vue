<template>
  <v-card class="px-3 my-5" :class="request.hasBeenPlayed ? 'played' : 'unplayed'">
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
        <div class="secondary--text text--lighten-1">{{ request.title }}</div>
      </v-flex>
      <v-flex v-if="$vuetify.breakpoint.xs" sm1 xs2></v-flex>
      <v-flex md3 sm6 xs5>
        <div class="caption grey--text text--lighten-2">Artist</div>
        <div class="secondary--text text--lighten-1">{{ request.artist }}</div>
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
        <div class="caption grey--text text--lighten-2">Actions</div>
        <div class="d-flex justify-center mt-n4 mb-2">
          <v-btn class="mt-4 mr-4" @click="toggleEditSong" small text color="accent darken-3"
            icon><v-icon>mdi-{{!isEditing ? 'pencil': 'chevron-up'}}</v-icon></v-btn>
          <v-checkbox v-model="songHasBeenPlayed" hide-details></v-checkbox>
        </div>
      </v-flex>
    </v-layout>
    <v-expand-transition>
      <div v-show="isEditing">
        <RequestEditForm @updaterequest="updateRequest" @deleterequest="deleteRequest" :artist="request.artist" :title="request.title" :is-editing="isEditing"
          :requested-by="request.requestedBy" :id="request.id" />
      </div>
    </v-expand-transition>
    <v-overlay absolute :value="loading">
      <v-progress-circular indeterminate size="32"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>
<script>
import API from "@/api";
import { mapActions } from 'vuex';
import RequestEditForm from "../forms/RequestEditForm.vue";
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
  data() {
    return {
      loading: false,
      isEditing: false,
    };
  },
  computed: {
    songHasBeenPlayed: {
      get() {
        return this.request.hasBeenPlayed;
      },
      set(val) {
        return this.statusChanged(val);
      }
    }
  },
  methods: {
    ...mapActions({
      showToast: "ui/showToast"
    }),
    formattedTime(dateTime) {
      const date = new Date(dateTime);
      return date.toLocaleString(["en-US"], {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    },
    toggleEditSong() {
      this.isEditing = !this.isEditing;
    },
    async statusChanged(e) {
      if (this.loading)
        return;
      this.loading = true;
      try {
        const { data: { data } } = await API.togglePlayedStatus(this.request.id, e);
        this.$emit('togglePlayedStatus', { id: data.id, status: data.hasBeenPlayed });
      }
      catch (error) {
        console.log({ error });
      }
      finally {
        this.loading = false;
      }
    },
    async updateRequest(e){
      console.log({e});
      if(this.loading) return;
      this.loading = true;
      try {
        const { id, ...data } = e;
        const { data: result } = await API.updateSongRequest(id, data);
        if (result.success){
          this.isEditing = false;
          this.showToast({ show: true, message: 'Song updated', timeout: 3000, sclass: 'success'})
        }
      } catch (error) {
        console.log({ error });
      } finally {
        this.loading = false;
      }
    },
    async deleteRequest(e){
      console.log({e});
      if(this.loading) return;
      this.loading = true;
      try {
        const { data: result } = await API.deleteSongRequest(e.id);
        if (result.success){
          this.isEditing = false;
          this.showToast({ show: true, message: 'Song deleted', timeout: 3000, sclass: 'info'})
        }
      } catch (error) {
        console.log({ error });
      } finally {
        this.loading = false;
      }
    }
  },
  components: { RequestEditForm }
}
</script>
<style>
.played {
  border-left: 4px solid #6b21a8 !important;
}

.unplayed {
  border-left: 4px solid #FFC107 !important;
}
</style>