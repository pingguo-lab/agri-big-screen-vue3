import { createStore } from "vuex";

// Vue 2: new Vuex.Store({...})  Vue 3: createStore({...})  其余 API 完全一致

window.addEventListener("storage", (event) => {
  if (event.key === "topicId") {
    store.commit("handleTopicId", event.newValue);
  }
});

const mutations = {
  handleUserName: (state, user_name) => {
    state.user_name = user_name;
    localStorage.setItem("user_name", user_name);
  },
  handleUserRole: (state, user_role) => {
    state.user_role = user_role;
    localStorage.setItem("user_role", user_role);
  },
  handleTopicId: (state, topicId) => {
    state.topicId = topicId;
  },
  handleArea: (state, area) => {
    state.area = area;
    localStorage.setItem("area", area);
  },
  handleClientId: (state, clientId) => {
    state.clientId = clientId;
    localStorage.setItem("clientId", clientId);
  },
  handleToken: (state, token) => {
    state.token = token;
    localStorage.setItem("token", token);
  },
  handleConfig: (state, config) => {
    state.config = config;
    let localConfig = JSON.stringify(config);
    localStorage.setItem("user_config", localConfig);
  },
};

const state = {
  user_name: localStorage.getItem("user_name"),
  user_role: localStorage.getItem("user_role"),
  user_config: JSON.parse(localStorage.getItem("user_config")),
  clientId: "",
  topicId: 0,
  area: localStorage.getItem("area"),
  token: localStorage.getItem("token"),
};

const getters = {
  username: (state) => state.user_name,
  userrole: (state) => state.user_role,
  userconfig: (state) => state.user_config,
  topicId: (state) => state.topicId,
  area: (state) => state.area,
  token: (state) => state.token,
};

const store = createStore({
  mutations,
  state,
  getters,
});

export default store;
