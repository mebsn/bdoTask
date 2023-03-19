<template>
  <nav>
    <img
      class="logo"
      src="../assets/Picture27.png"
      alt="logo"
      style="width: 72px; height: 75px"
    />
    <img class="customer" src="../assets/customer.png" alt="customer" />
    <img
      class="shoppingBag"
      src="../assets/shopping-bag.png"
      alt="shopping bag"
    />
    <img class="catalog" src="../assets/catalog.png" alt="catalog" />
    <img
      class="teamManagment"
      src="../assets/team-management.png"
      alt="team management"
    />
    <img class="invoice" src="../assets/invoice.png" alt="invoice" />
    <img class="settings" src="../assets/settings.png" alt="settings" />
    <img
      class="terms"
      src="../assets/terms-and-conditions.png"
      alt="terms and conditions"
    />
    <img class="documents" src="../assets/paper.png" alt="documents" />
  </nav>
</template>

<script>
export default {
  name: "MainMenu",
  data() {
    return {};
  },
};
</script>

<style scoped>
nav {
  width: 110px;
  height: 956px;
  border-radius: 36px;
  background-color: #211543;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo {
  margin-top: 21px;
}
.customer {
  margin-top: 47px;
}
.shoppingBag {
  margin-top: 27px;
}
.catalog {
  margin-top: 34px;
}
.teamManagment {
  margin-top: 30px;
}
.invoice {
  margin-top: 31px;
}
.settings {
  margin-top: 31px;
}
.terms {
  margin-top: 312px;
}
.documents {
  margin-top: 33px;
  margin-left:5px;
}
img {
  cursor:pointer;
}
</style>
