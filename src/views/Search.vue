<template>
  <div class="container-seach">
    <Navbar class="navbar-comp" />
    <div class="cointainer-filter">
      <div class="filter-Comp">
        <div class="secundary-filter">
          <div class="sec-filter-card">
            <template>
              <label>País</label>
              <v-col class="d-flex select-filter" cols="12" sm="6">
                <v-autocomplete
                  class="select-item"
                  hide-no-data
                  solo
                  item-text="translations.br"
                  item-value="id"
                  placeholder="Escolha um País"
                  :items="this.country || this.coutrySelected"
                  v-model="search"
                >
                </v-autocomplete>
              </v-col>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="gallery-container">
      <div class="gallery" v-if="country">
        <div
          class="gallery-card"
          v-for="country in filteredCountries"
          :key="country.id"
        >
          <router-link
            :to="{
              name: 'country-detail',
              params: { country: country.alpha2Code.toLowerCase() },
            }"
          >
            <img :src="country.flag" :alt="country" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
"use strict";
import Navbar from "../components/Navbar.vue";
import axios from "axios";

export default {
  name: "Search",

  components: {
    Navbar,
  },

  data() {
    return {
      search: "",
      name: "",
      country: "",
      coutrySelected: ["Brasil"],
    };
  },

  methods: {},

  mounted() {
    axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        this.country = response.data;
      })
      .catch((error) => (this.error = error));
  },
  computed: {
    filteredCountries: function () {
      return this.country.filter((country) => {
        if (this.search !== "") {
          return country.translations.br
            .toLowerCase()
            .match(this.search.toLowerCase());
        } else {
          return country;
        }
      });
    },
  },
};
</script>

<style scoped>
.container-seach {
  display: flex;
  flex-direction: column;
}
.navbar-comp {
  display: flex;
  width: auto;
  height: 100px;
}
.cointainer-filter {
  display: flex;
  width: 100%;
  height: 80px;
  top: 220px;
  justify-content: center;
  align-items: center;
}
.filter-Comp {
  display: flex;
  width: 100%;
  height: 80px;
  align-items: center;
}
.col-sm-6 {
  flex: none !important;
}
.col-12 {
  max-width: 350px !important;
}
.select-item {
  width: 300px;
  height: 50px;
  border-bottom: 1px solid #a8a8a8;
  background: transparent;
}

.secundary-filter {
  display: flex;
  width: 50%;
  top: 0px;
  justify-content: center;
}
.sec-filter-card {
  display: flex;
  flex-direction: column;
}
.sec-filter-card > label {
  width: 160px;
  height: 20px;
  margin-left: 30px;
  font-weight: 400;
  font-size: 16px;
  color: #6d2080;
}

.gallery-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 600px;
  /* overflow: hidden; */
  top: 200px;
}
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 90px 90px;
  margin: 50px 50px 0px 50px;
  justify-content: center;
}
.gallery-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
img {
  display: flex;
  flex-wrap: wrap;
  width: 350px;
  height: 220px;
}

@media (max-width: 700px) {
  .filter-Comp {
    justify-content: center;
  }
}
@media (max-width: 450px) {
  .container-seach {
    min-width: 360px;
  }
  .sec-filter-card > label {
    font-size: 14px;
    max-width: 250px;
  }
  .gallery-container {
    min-width: 360px;
  }
  .gallery {
    gap: 50px 50px;
    margin: 0 auto;
  }
  img {
    width: 320px;
    height: 200px;
  }
}
</style>
