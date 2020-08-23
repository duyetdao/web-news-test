import { userService } from "../../service/news.service"
const state = {
    listHeadlineData: null,
    listDataCategory: null,
    userData: null,
};
const getters = {
    listHeadlineData: state => state.listHeadlineData,
    listDataCategory: state => state.listDataCategory,
    userData: state => state.userData,
};

const actions = {
    async getlistHeadlineData({ commit }) {
        await userService.getTopHeadlineData().then(data => {
            commit('getDataSuccess', data);
        })
        return state.listHeadlineData;
    },
    async getDataCategory({ commit }, payload) {
        await userService.getdataCategory(payload).then(data => {
            commit('getDataCategorySuccess', data);
        })
        return state.listDataCategory;
    },
    register({ commit }, { name, work }) {
        commit('registerRequest', { name: name, work: work });

    },

};

const mutations = {
    getDataSuccess(state, data) {
        state.listHeadlineData = data.data.articles;
    },
    getDataCategorySuccess(state, data) {
        state.listDataCategory = data.data.articles;
    },
    registerRequest(state, data) {
        localStorage.setItem("name", data.name)
        localStorage.setItem("work", data.work)
        state.userData = { name: data.name, pass: data.work };
    },


};
export const news = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};