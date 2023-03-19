<template>
  <div class="container">
    <div class="container_settings">
      <p>SPAR Service Level Report</p>
      <div class="container_settings_menu">
        <div class="container_settings_menu-items">
          <img
            class="tool"
            src="../assets/tool-symbol.png"
            alt="tool symbol"
            style="width: 32px; height: 29px"
          />
          <img class="list" :src="imageUrl" @click="toggleImage" alt="list" />
          <img
            class="search"
            src="../assets/magnifying-glass.png"
            alt="search glass"
          />
        </div>
        <input
          type="text"
          class="searchBar"
          v-model="searchText"
          @input="filterProducts"
        />
      </div>
    </div>
    <div class="slider_wrapper">
      <div class="slider">
        <button class="previous" @click="prev" :disabled="current === 0">
          <img src="../assets/_.png" alt="previous" />
        </button>
        <div class="slides">
          <div v-for="(category, index) in visibleCategories" :key="index">
            <button
              class="category"
              @click="filterByCategory(category)"
              :class="{
                clicked: selectedCategory === category,
                unselected: selectedCategory !== category,
              }"
            >
              {{ category }}
            </button>
          </div>
        </div>
        <button
          class="next"
          @click="next"
          :disabled="current + 5 >= categories.length"
        >
          <img src="../assets/1.png" alt="next" />
        </button>
      </div>
      <div class="content">
        <label class="label_container">
          <input type="radio" checked="checked" name="radio" />
          <span class="checkmark"></span>By item
        </label>
        <label class="label_container">
          <input type="radio" name="radio" />
          <span class="checkmark"></span>By ihop
        </label>
      </div>
    </div>
    <div class="table_wrapper">
      <div class="table">
        <div class="table_header">
          <div
            class="table_item"
            @mouseover="showSortingDiv = true"
            @mouseleave="showSortingDiv = false"
          >
            <img
              class="activeSort"
              v-if="IconClicked"
              src="../assets/down.png"
            />
            Number
            <div class="sorting" v-show="showSortingDiv && IconClicked">
              <div class="sorting-option" @click="sortTable('Number', 'desc')">
                largest<img src="../assets/left-arrow.png" />
              </div>
              <div class="sorting-option" @click="sortTable('Number', 'asc')">
                smallest <img src="../assets/left-arrow2.png" />
              </div>
            </div>
          </div>
          <div class="table_item-name">Item</div>
          <div
            class="table_item"
            @mouseover="showOrderedSortingDiv = true"
            @mouseleave="showOrderedSortingDiv = false"
          >
            <img
              class="activeSort"
              v-if="IconClicked"
              src="../assets/down.png"
            />
            Ordered
            <div class="sorting" v-show="showOrderedSortingDiv && IconClicked">
              <div class="sorting-option" @click="sortTable('Ordered', 'desc')">
                largest<img src="../assets/left-arrow.png" />
              </div>
              <div class="sorting-option" @click="sortTable('Ordered', 'asc')">
                smallest <img src="../assets/left-arrow2.png" />
              </div>
            </div>
          </div>
          <div
            class="table_item"
            @mouseover="showDeliveredSortingDiv = true"
            @mouseleave="showDeliveredSortingDiv = false"
          >
            <img
              class="activeSort"
              v-if="IconClicked"
              src="../assets/down.png"
            />
            Delivered
            <div
              class="sorting"
              v-show="showDeliveredSortingDiv && IconClicked"
            >
              <div
                class="sorting-option"
                @click="sortTable('Delivered', 'desc')"
              >
                largest<img src="../assets/left-arrow.png" />
              </div>
              <div
                class="sorting-option"
                @click="sortTable('Delivered', 'asc')"
              >
                smallest <img src="../assets/left-arrow2.png" />
              </div>
            </div>
          </div>
          <div
            class="table_item"
            @mouseover="showIntimeSortingDiv = true"
            @mouseleave="showIntimeSortingDiv = false"
          >
            <img
              class="activeSort"
              v-if="IconClicked"
              src="../assets/down.png"
            />
            In time
            <div class="sorting" v-show="showIntimeSortingDiv && IconClicked">
              <div
                class="sorting-option-time"
                @click="sortTable('InTime', 'desc')"
              >
                No<img class="timeSrt" src="../assets/check.png" />
              </div>
              <div
                class="sorting-option-time"
                @click="sortTable('InTime', 'asc')"
              >
                Yes <img class="timeSrt" src="../assets/cross.png" />
              </div>
            </div>
          </div>
          <div
            class="table_item"
            @mouseover="showSLevelSortingDiv = true"
            @mouseleave="showSLevelSortingDiv = false"
          >
            <img
              class="activeSort"
              v-if="IconClicked"
              src="../assets/down.png"
            />
            Service level
            <div class="sorting" v-show="showSLevelSortingDiv && IconClicked">
              <div class="sorting-option" @click="sortTable('sLevel', 'desc')">
                largest<img src="../assets/left-arrow.png" />
              </div>
              <div class="sorting-option" @click="sortTable('sLevel', 'asc')">
                smallest <img src="../assets/left-arrow2.png" />
              </div>
            </div>
          </div>
        </div>
        <div
          class="table-item"
          v-for="(product, index) in displayedProductsPerPage"
          :key="index"
          @click="changeBgColor(index)"
        >
          <div class="table_item">{{ product.Number }}</div>
          <div class="table_item-name">{{ product.Item }}</div>
          <div class="table_item">{{ product.Ordered }}</div>
          <div class="table_item">{{ product.Delivered }}</div>
          <div class="table_item">
            <img
              v-if="product.InTime === 'Yes'"
              src="../assets/check.png"
              alt="In time"
            />
            <img v-else src="../assets/cross.png" alt="Not in time" />
          </div>
          <div class="table_item">{{ (product.sLevel * 100).toFixed(0) }}%</div>
        </div>
      </div>
    </div>
    <div class="pages_wrapper" ><div
      class="pages"
      :class="activePage(page)"
      v-for="page in pages"
      :key="page"
      @click="changePage(page)"
    >
      {{ page }}
    </div></div>
  </div>
</template>

<script>
export default {
  name: "ItemPage",
  data() {
    return {
      categories: [
        "Dairy",
        "Snacks",
        "Ready Meals",
        "Sweets",
        "Beverages",
        "Frozen Goods",
        "Baked Goods",
        "Cigarettes",
      ],
      current: 0,
      displayedProducts: [],
      filteredProducts: [],
      selectedCategory: null,
      searchText: "",
      imageUrl: "/list.png",
      altImageUrl: "/list1.png",
      useAltImage: false,
      selectedIdx: -1,
      showSortingDiv: false,
      showOrderedSortingDiv: false,
      showDeliveredSortingDiv: false,
      showIntimeSortingDiv: false,
      showSLevelSortingDiv: false,
      IconClicked: false,
      currentPage:1,
      itemsPerPage:7,
    };
  },
  computed: {
    products() {
      return this.$store.state.data.data;
    },
    visibleCategories() {
      return this.categories.slice(this.current, this.current + 5);
    },
    pages() {
      const pageCount = Math.ceil(this.displayedProducts.length / 7); 
      return Array.from({ length: pageCount }, (_, i) => i + 1); 
    },
    displayedProductsPerPage() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.displayedProducts.slice(startIndex, endIndex);
    },
    activePage() {
      return (page) => {
        return {
          active: page === this.currentPage,
        };
      };
    },
  },
  mounted() {
    this.$store.dispatch("fetchData").then(() => {
      this.displayedProducts = this.products;
    });
  },
  methods: {
    changePage(pageNumber) {
      this.currentPage = pageNumber;
      this.itemsPerPage = 7;
    },
    sortTable(prop, order) {
      if (order === "asc") {
        this.displayedProducts.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
      } else if (order === "desc") {
        this.displayedProducts.sort((a, b) => (a[prop] > b[prop] ? -1 : 1));
      }
    },
    changeBgColor(index) {
      const tableItems = document.getElementsByClassName("table-item");
      for (let i = 0; i < tableItems.length; i++) {
        tableItems.item(i).style.backgroundColor = "";
        tableItems.item(i).style.color = "";
      }

      const currentItem = tableItems.item(index);
      const storedIndex = localStorage.getItem("selectedItemIndex");

      if (storedIndex !== null && storedIndex === index.toString()) {
        localStorage.removeItem("selectedItemIndex");
      } else {
        currentItem.style.backgroundColor = "#7949F4";
        currentItem.style.color = "white";
        localStorage.setItem("selectedItemIndex", index.toString());
      }
    },
    prev() {
      this.current -= 1;
    },
    next() {
      this.current += 1;
    },
    filterByCategory(category) {
      const tableItems = document.getElementsByClassName("table-item");
      for (let i = 0; i < tableItems.length; i++) {
        tableItems.item(i).style.backgroundColor = "";
        tableItems.item(i).style.color = "";
      }
      if (this.selectedCategory === category) {
        this.selectedCategory = null;
        this.displayedProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter(
          (product) => product.Category === category
        );
        this.displayedProducts = this.filteredProducts.length
          ? this.filteredProducts
          : this.products;

        this.selectedCategory = category;
      }
    },
    toggleImage() {
      this.IconClicked = !this.IconClicked;
      this.useAltImage = !this.useAltImage;
      this.imageUrl = this.useAltImage ? this.altImageUrl : "/list.png";
    },
    filterProducts() {
      const filteredProducts = this.products.filter((product) => {
        for (const prop in product) {
          if (
            product[prop]
              .toString()
              .toLowerCase()
              .indexOf(this.searchText.toLowerCase()) !== -1
          ) {
            return true;
          }
        }
        return false;
      });
      this.displayedProducts = filteredProducts;
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  background-color: #f3f7ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 930px;
}
.activeSort {
  margin-right: 5px;
}
.container_settings {
  height: 100px;
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 10px;
}
.border-left {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
.selected {
  background-color: red;
}
.border-right {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}
.table_wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
}
.table {
  width: 76%;
  margin-left: 80px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}
.table_header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  height: 57px;
  align-items: center;
  font-size: 20px;
  font-style: bold;
}

.table-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  height: 57px;
  align-items: center;
  margin-top: 2px;
  font-size: 16px;
}
.table_item {
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
}
.sorting {
  position: absolute;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 90px;
  border-radius: 24px;
  color: #211543;
  cursor: pointer;
  font-size: 16px;
}
.sorting-option-time {
  display: flex;
  align-items: center;
}
.sorting span:hover {
  color: #7949f4;
}
.sorting-option {
  height: 30px;
}
.sorting-option:first-child {
  margin-top: 10px;
}
.table_item-name {
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 280px;
}
p {
  font-size: 30px;
  line-height: 36px;
  padding-left: 214px;
}
.container_settings_menu {
  padding-right: 66px;
  display: flex;
  align-items: center;
  margin-left: 200px;
}
.pages_wrapper {
  display:flex;
  flex-direction: row;
  align-items: center;
}
.pages {
  margin-left:5px;
  font-size: 20px;
  cursor: pointer;
}
.timeSrt {
  margin-left: 5px;
}
.pages.active {
  font-size: 32px;
} 
.container_settings_menu-items {
  display: flex;
  align-items: center;
  width: 200px;
  justify-content: space-around;
  padding-right: 10px;
}
.searchBar {
  width: 23vw;
  max-width: 338px;
  height: 47px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  outline: none;
  border: none;
  padding-left: 25px;
  font-size: 18px;
}
.slider_wrapper {
  width: 100%;
  display: flex;
}
.slider {
  display: flex;
  align-items: center;
  padding-left: 214px;
}
.slides {
  display: flex;
}
.slides > div {
  padding: 10px;
}
.previous {
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
}
.next {
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
}
.content {
  display: flex;
  flex-direction: column;
  margin-left: 130px;
  padding: 10px;
  border-radius: 5px;
}
.category {
  width: 9.236vw;
  height: 99px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  font-size: 1.3vw;
  line-height: 24px;
  color: #211543;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  border: none;
  outline: none;
  cursor: pointer;
}
.category.clicked {
  background-color: #1ed8b9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}
input {
  width: 30px;
  height: 30px;
}
label {
  margin-top: 10px;
  display: flex;
  align-items: center;
  font-size: 22px;
  cursor: pointer;
}
input[type="radio"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 50%;
  border: 3px solid white;
  width: 27px;
  height: 27px;
  outline: none;
  transition: all 0.3s ease-in-out;
  background-color: white;
}

input[type="radio"]:checked {
  background-color: #1ed8b9;
}
img {
  cursor: pointer;
}
.tdImg {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
