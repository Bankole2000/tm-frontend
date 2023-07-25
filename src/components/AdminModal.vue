<template>
  <div>
    <v-menu transition="slide-x-transition" offset-y bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="primary"
          dark
          v-bind="attrs"
          v-on="on"
          icon
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-btn text block>Hide Recently Played</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn @click="logout" text block>Log out</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
export default {
  data: () => ({
  }),
  methods: {
    logout(){
      this.$emit('logout')
    }
  }
};
</script>