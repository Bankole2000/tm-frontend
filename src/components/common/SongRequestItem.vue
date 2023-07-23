<template>

    <v-card class="px-3 my-4" style="border-left: 4px solid orange">
      <v-layout row wrap>
        <v-flex md1 sm1 xs2>
          <div>
            <v-avatar tile color="grey darken-4 mr-4">
              <v-icon large dark>mdi-music</v-icon>
            </v-avatar>
          </div>
        </v-flex>
        <v-flex md3 sm5 xs5>
          <div class="caption grey--text text--lighten-2">Song Title</div>
          <div class="secondary--text text--lighten-1">Exodus</div>
        </v-flex>
        <v-flex md3 sm6 xs5>
          <div class="caption grey--text text--lighten-2">Artist</div>
          <div class="secondary--text text--lighten-1">Bob Marley</div>
        </v-flex>
        <v-flex v-if="$vuetify.breakpoint.smAndDown" sm1 xs2></v-flex>
        <v-flex md2 sm5 xs5>
          <div class="caption grey--text text--lighten-2">Requested By</div>
          <div class="secondary--text text--lighten-1">James Bond</div>
        </v-flex>
        <v-flex md2 sm5 xs4>
          <div class="caption grey--text text--lighten-2">Requested At</div>
          <div class="secondary--text text--lighten-1">James Bond</div>
        </v-flex>
        <v-flex md1 sm1 xs1>
          <div class="d-flex justify-center mt-n2">
            <v-checkbox hide-details></v-checkbox>
          </div>
        </v-flex>
      </v-layout>
    </v-card>
</template>