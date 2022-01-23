<template>
  <div>
    <div class="gallery-container">
      <FlagsCard
        v-for="country in countries"
        :key="country.id"
        :country="country"
      />
    </div>
  </div>
</template>

<script>
import FlagsCard from "./FlagsCard.vue";

export default {
  name: "Gallery",
  data() {
    return {
      country: "",
    };
  },

  components: {
    FlagsCard,
  },
};
</script>

<style scoped>
</style>