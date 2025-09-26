<template>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on">Bottom</v-btn> -->
        <v-btn
          style="height: 40px; width: 40px; border-radius: 10px;"
          class="ml-4"
          x-small
          v-bind="attrs" v-on="on"
          :href="`https://www.${platform}.com/${username}`"
          target="_blank"
          rel="noopener"
          outlined
          >
          <!-- color="grey" -->
          <!-- class="white--text" -->
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </template>
      <span>Follow on {{ platform.charAt(0).toUpperCase() + platform.slice(1) }}</span>
    </v-tooltip>
  
</template>
<script>
export default {
  props: {
    platform: {
      type: String,
      required: true,
      default: 'twitter',
      validator: value => ['twitter', 'facebook', 'instagram', 'linkedin', 'github'].includes(value)
    },
    username: {
      type: String,
      required: true,
      default: 'yourusername'
    },
    link: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'mdi-twitter'
    }
  },
}

</script>

