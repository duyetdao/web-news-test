<template>
  <v-card class="mx-auto mt-8" max-width="600">
    <v-img class="white--text align-end" height="300px" :src="data.urlToImage">
      <v-card-title>{{data.title}}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">{{data.publishedAt.substring(0,10)}}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{data.description}}</div>

      <div>{{data.content}}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" text @click="goBack">Quay lại</v-btn>

      <a :href="data.url" target="_blank">Open original news</a>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    data: null,
  }),
  computed: {
    ...mapGetters("user", ["itemSelected"]),
  },
  methods: {
    ...mapActions("user", ["getData"]),
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    this.data = this.$router.currentRoute.params.itemData;
    console.log(this.data);
  },
};
</script>