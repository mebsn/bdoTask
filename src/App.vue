<template>
  <MainMenu id="mainMenu" />
  <HeaderBdo />
  <ItemPage />
</template>

<script>
import ItemPage from "./components/ItemPage.vue";
import HeaderBdo from "./components/HeaderBdo.vue";
import MainMenu from "./components/MainMenu.vue";

export default {
  name: "App",
  components: {
    ItemPage,
    HeaderBdo,
    MainMenu,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@700&family=Roboto:wght@300;400&display=swap");

#app {
  font-family: "Inter", sans-serif;
  color: #211543;
  margin: 0;
}
body {
  margin: 0px;
  background-color:#F3F7FF;
}
#mainMenu {
  position: absolute;
  left: 32px;
  top: 27px;
}
</style>
