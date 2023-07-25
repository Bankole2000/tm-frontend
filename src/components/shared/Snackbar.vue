<template>
  <v-snackbar
    rounded="lg"
    :value="toast.show"
    :bottom="true"
    :left="$vuetify.breakpoint.mdAndUp"
    :timeout="toast.timeout"
  >
    <!-- :centered="$vuetify.breakpoint.smAndDown" -->
    <span :class="`${toast.sclass}--text text-capitalize font-weight-bold`"
      >{{ toast.sclass }}: &nbsp;</span
    >
    <span v-html="toast.message"></span>

    <template v-slot:action="{ attrs }">
      <v-btn
        dark
        text
        class="text-capitalize"
        v-bind="attrs"
        :color="toast.sclass"
        @click="showToast({ show: false })"
      >
        <v-icon left>{{ toast.icon }}</v-icon> Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters({ toast: "ui/toast" }),
  },
  methods: {
    ...mapActions({ showToast: "ui/showToast" }),
  },
  updated() {
    const { timeout, show } = this.toast;
    if (show) {
      setTimeout(() => {
        this.showToast({ show: false });
      }, timeout);
    }
  },
};
</script>

<style>
</style>