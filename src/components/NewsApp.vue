<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text">Đọc báo</h1>
    </v-card-title>

    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab>Mới nhất</v-tab>
      <v-tab>Thể loại</v-tab>
      <v-tab>Hồ sơ</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
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
      </v-tab-item>
      <v-tab-item>
        <v-card color="basil" flat>
          <v-container fluid>
            <v-row dense>
              <v-col
                @click="categoryPage(item.title)"
                v-for="(item, index) in items1"
                :key="index"
                cols="3"
              >
                <v-card>
                  <v-img
                    :src="item.urlImg"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="300px"
                  >
                    <v-card-title v-text="item.title"></v-card-title>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card class="mx-auto" max-width="434" tile v-if="nameRegister !== null">
          <v-img height="100%" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg">
            <v-row align="end" class="fill-height">
              <v-col align-self="start" class="pa-0" cols="12">
                <v-avatar class="profile" color="grey" size="164" tile>
                  <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                </v-avatar>
              </v-col>
              <v-col class="py-0">
                <v-list-item color="rgba(0, 0, 0, .4)" dark>
                  <v-list-item-content>
                    <v-list-item-title class="title">{{nameRegister}}</v-list-item-title>
                    <v-list-item-subtitle>{{workRegister}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-img>
        </v-card>
        <div class="login-page" v-if="nameRegister == null">
          <v-container>
            <v-form>
              <v-text-field v-model="name" label="Họ và tên" required></v-text-field>
              <v-text-field v-model="work" label="Nghề nghiệp" required></v-text-field>
              <v-btn color="success" class="mr-4" @click="registerWork()">Đăng ký</v-btn>
            </v-form>
          </v-container>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    tab: null,
    items: ["Mới nhất", "Thể loại", "Hồ sơ"],
    data1: null,
    items1: [
      {
        title: "bitcoin",
        urlImg:
          "https://specials-images.forbesimg.com/imageserve/1196863074/960x0.jpg?fit=scale",
      },
      {
        title: "apple",
        urlImg:
          "https://pbs.twimg.com/profile_images/1283958620359516160/p7zz5dxZ.jpg",
      },
      {
        title: "earthquake",
        urlImg:
          "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iJMRWBqJe7WA/v1/1000x-1.jpg",
      },
      {
        title: "animal",
        urlImg:
          "https://www.nationalgeographic.com/content/dam/magazine/rights-exempt/2019/10/extinction/south-china-tiger.jpg",
      },
    ],
    name: "",
    work: "",
    nameRegister: null,
    workRegister: null,
  }),

  computed: {
    ...mapGetters("news", ["listHeadlineData"]),
  },
  methods: {
    ...mapActions("news", [
      "getlistHeadlineData",
      "getDataCategory",
      "register",
    ]),
    goDetails: function (item) {
      this.$router.push({
        name: "newsdetail",
        params: { itemData: item },
      });
    },
    categoryPage(item) {
      this.getDataCategory(item).then((resp) => {
        console.log(resp);
        this.$router.push({
          name: "newscategory",
          params: { itemData: item },
        });
      });
    },
    registerWork() {
      const { name, work } = this;
      this.register({ name, work });
      this.nameRegister = localStorage.getItem("name");
      this.workRegister = localStorage.getItem("work");
    },
  },
  watch: {
    tab() {},
  },

  created() {
    this.$router.currentRouter;
    this.getlistHeadlineData().then((resp) => {
      this.data1 = resp;
      console.log(this.data1);
    });
    this.nameRegister = localStorage.getItem("name");
    this.workRegister = localStorage.getItem("work");
  },

  mounted() {},
};
</script>