<template>
  <div class="gallery">
    <div class="gallery-card">
      <router-link
        to="{
				name: 'Details',
				params: country
			}"
      >
        <img :src="country.flags.png" :alt="country" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["country"],
};
</script>

<style>
</style>