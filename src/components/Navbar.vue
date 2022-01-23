<template>
  <div class="container_nav">
    <nav class="navbar">
      <h1 class="title_app">FlagsCountries.app</h1>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style>
.container_nav {
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: center;
}
.navbar {
  display: flex;
  flex-direction: row;
  width: 100%;
  background: var(--color-background-nav);
  justify-content: center;
  align-items: center;
}
.title_app {
  display: flex;
  margin-left: 50px;
  font-family: "Montserrat", sans-serif;
  font-size: 40px;
  font-style: italic;
  color: #6d2080;
  justify-content: center;
}
@media (max-width: 450px) {
  .container_nav {
    min-width: 360px;
    height: 60px;
    margin-top: 15px;
  }
  .title_app {
    margin-left: 0px;
    font-size: 30px;
  }
}
</style>