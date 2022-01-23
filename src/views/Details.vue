<template>
  <div>
    <Navbar class="navbar-comp" />
    <div class="country-detail">
      <div class="loaderFlex"><div v-if="Loading" class="loader"></div></div>

      <div v-for="country in countryInfo" class="countryTile" :key="country.id">
        <img :src="country.flag" alt="Country Flag" class="flag" />
        <div class="country-details">
          <h1>{{ country.name }}</h1>
          <div class="listDiv">
            <ul>
              <li><span>Native Name:</span> {{ country.nativeName }}</li>
              <li>
                <span>Population:</span>
                {{ country.population | formatNumbers }}
              </li>
              <li><span>Region:</span> {{ country.region }}</li>
              <li><span>Sub Region:</span> {{ country.subregion }}</li>
              <li><span>Capital:</span> {{ country.capital }}</li>
            </ul>
            <ul>
              <li>
                <span>Top Level Domain:</span> {{ country.topLevelDomain["0"] }}
              </li>
              <li>
                <span>Currencies:</span> {{ country.currencies["0"].name }}
              </li>
              <li>
                <span>Languages:</span>
                <span
                  v-for="(language, index) in country.languages"
                  :key="index"
                  class="languages"
                >
                  {{ language.name
                  }}<span v-if="index + 1 < country.languages.length">, </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="container_btns">
        <button class="rbtn">
          <a @click="$router.go(-1)" class="rbtn-link">
            <img class="rbtn-img" src="../assets/back.svg" alt="icon_back" />
            <p class="rbtn-p">Voltar</p>
          </a>
        </button>
        <button class="rbtn">
          <a href="/" class="rbtn-link">
            <img class="rbtn-img" src="../assets/home.svg" alt="icon_back" />
            <p class="rbtn-p">Home</p>
          </a>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";
import axios from "axios";

export default {
  name: "country-detail",

  components: {
    Navbar,
  },

  data() {
    return {
      Loading: false,
      countryInfo: "",
      borderCountries: "",
      alpha3Code: [],
      alpha3CodetoString: [],
    };
  },
  mounted() {
    this.Loading = true;
    axios
      .get(
        `https://restcountries.com/v2/alpha?codes=${this.$route.params.country}`
      )
      .then((response) => {
        this.countryInfo = response.data;
        return axios
          .get(
            `https://restcountries.com/v2/alpha?codes=${this.alpha3CodetoString}`
          )
          .then((response) => (this.borderCountries = response.data))
          .catch((error) => (this.errorBorders = error));
      })
      .catch((error) => (this.error = error))
      .finally(() => {
        this.Loading = false;
      });
  },

  filters: {
    formatNumbers(value) {
      return `${value}`;
    },
  },
};
</script>

<style scoped>
.country-detail {
  background: #fff;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-size: 16px;
}

.loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #2b3845;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-bottom: 50px;
  animation: spin 2s linear infinite;
  transition: 1s ease;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loaderFlex {
  display: flex;
  justify-content: center;
}

.container_btns {
  display: flex;
  flex-direction: row;
  gap: 70px;
  justify-content: center;
  margin-top: 20px;
}

.rbtn {
  display: flex;
  width: 140px;
  height: 40px;
  border: 1px solid #6d2080;
  border-radius: 10px;
  box-sizing: border-box;
  background: var(--color-background-nav);
}

.rbtn-link {
  display: flex;
  width: 140px;
  height: 40px;
  text-decoration: none;
  align-items: center;
}

.rbtn-img {
  display: flex;
  width: 50%;
  height: 100%;
  padding: 4px;
  filter: invert(16%) sepia(26%) saturate(6952%) hue-rotate(275deg)
    brightness(91%) contrast(94%);
  cursor: pointer;
}

button:nth-child(2) > a > img {
  height: 33px;
}

.v-application p {
  margin: 0 !important;
}

.rbtn-p {
  width: 50%;
  margin: auto;
  font-size: 18px;
  font-weight: 400;
  color: #6d2080;
  cursor: pointer;
}

.countryTile {
  display: flex;
  padding-top: 50px;
}

.flag {
  max-width: 570px;
  min-width: 300px;
  padding-bottom: 50px;
  width: 100%;
}

.country-details {
  text-align: left;
  min-width: 400px;
  max-width: 650px;
  margin: 0 0 0 auto;
  width: 100%;
  padding-left: 40px;
}

.listDiv {
  display: flex;
}

.country-details ul {
  list-style: none;
  text-align: left;
  line-height: 32px;
  padding-left: 0;
  margin: 0 auto 0 0;
}

.country-details ul:last-child {
  margin: 0 0 0 auto;
}
li span {
  font-weight: 600;
}

.languages,
.languages span {
  font-weight: 400;
}

@media (max-width: 950px) {
  .country-detail {
    max-width: 1400px;
    padding: 25px;
  }
  .countryTile {
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    justify-content: center;
    align-items: center;
  }
  .flag {
    max-width: 400px;
    min-width: 300px;
    padding-bottom: 50px;
  }
  .country-details {
    text-align: center;
    max-width: 100%;
    width: 100%;
    padding: 0 50px;
  }
}
@media (max-width: 600px) {
  .country-detail {
    font-size: 14px;
  }
  .country-details {
    text-align: center;
    width: 100%;
    padding: 0 10px;
  }
}
@media (max-width: 450px) {
  .country-detail {
    min-width: 360px;
    padding: 15px;
  }
  .countryTile {
    padding-top: 10px;
  }
  .flag {
    padding-bottom: 18px;
  }
  .listDiv {
    display: block;
  }
  .country-details {
    text-align: center;
    min-width: 360px;
    padding: 0;
  }
  .country-details li {
    line-height: 22px;
  }
  .container_btns {
    gap: 30px;
    margin-top: 20px;
  }
}
</style>