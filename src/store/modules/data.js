import XLSX from "xlsx";

const state = {
  data: [],
};

const mutations = {
  setData(state, payload) {
    state.data = payload;
  },
};

const actions = {
  fetchData({ commit, state }) {
    if (state.data.length) {
      return Promise.resolve(state.data);
    }
    return fetch("data.xlsx")
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        let data = XLSX.utils.sheet_to_json(sheet);
        data = JSON.stringify(data)
          .replace(/Product Category/g, "Category")
          .replace(/In time/g, "InTime")
          .replace(/Service level/g, "sLevel");
        data = JSON.parse(data);
        commit("setData", data);
        console.log(data);
        return data;
      })
      .catch((error) => console.log(error));
  },
};

export default {
  state,
  mutations,
  actions,
};
