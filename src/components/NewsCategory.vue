<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text">{{category}}</h1>
    </v-card-title>
    <v-card color="basil" flat>
      <v-container fluid>
        <v-row dense>
          <v-col v-for="(card, index) in data1" :key="index" cols="4">
            <v-card @click="goDetails(card)">
              <v-img
                :src="card.urlToImage"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="300px"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{  }">
                    <v-btn icon>
                      <v-icon>mdi-dots-horizontal-circle</v-icon>More
                    </v-btn>
                  </template>
                </v-tooltip>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    data1: null,
    category: null,
  }),

  computed: {
    ...mapGetters("news", ["listDataCategory"]),
  },
  methods: {
    goDetails: function (item) {
      this.$router.push({
        name: "newsdetail",
        params: { itemData: item },
      });
    },
  },
  watch: {},

  created() {
    this.data1 = this.listDataCategory;
    this.category = this.$router.currentRoute.params.itemData;
    console.log(this.$router.currentRoute.params.itemData);
  },

  mounted() {},
};
</script>