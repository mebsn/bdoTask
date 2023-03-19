<template>
  <header>
    <div class="header_menu">
      <div class="header_menu-item1">
        <div class="header_menu-item1-wrapper">
          <img src="../assets/user19.png" alt="User Logo" />
        </div>
        GDM
      </div>
      <div class="header_menu-item2"><img class="ringIcon" src="../assets/ringing14.png" alt="ring for notification" /> <div class="dot"></div></div>
      <img class="SignOut" src="../assets/sign-out-option.png" alt="sign out option" />
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderBdo",
  data() {
    return {};
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: end;
  align-items: center;
  background-color:white;
}
.header_menu {
  display:flex;
  align-items:center;
}
.header_menu-item1 {
  display:flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.header_menu-item1-wrapper {
  width:65px;
  height:65px;
  border-radius: 50%;
  background-color:#1A1F3D;
  display:flex;
  align-items: center;
  justify-content: center;
  margin-right:20px;
  font-size: 26px;
  line-height: 32px;
}
.header_menu-item1-wrapper, img {
  margin-left:8px;
}
.header_menu-item2 {
  position:relative;
}
.ringIcon {
  margin-left:70px;
  cursor: pointer;
}
.SignOut {
  margin-left:37px;
  margin-right:66px;
  cursor: pointer;
}
.dot {
  width:8px;
  height:8px;
  background-color: #F55364;
  border-radius:50%;
  position: absolute;
  top:-3px;
  left:83px;
}
</style>
