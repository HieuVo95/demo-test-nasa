import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        keyword: null,
        totalAllData: 0,
        allData: [],
        likedData: [],
        removedData: []
    },
    getters: {
        keyword: state => state.keyword,
        totalAllData: state => state.totalAllData,
        allData: state => state.allData,
        likedData: state => state.likedData,
        removedData: state => state.removedData
    },
    mutations: {
        setKeyword(state, data) {
            state.keyword = data;
        },
        setTotalAllData(state, data) {
            state.totalAllData = data;
        },
        setAllData(state, data) {
            state.allData = data;
        },
        addLikedData(state, item) {
            if (!state.likedData.some(o => o.data[0].nasa_id === item.data[0].nasa_id))
                state.likedData.unshift(item);
        },
        deleteLikedData(state, item) {
            state.likedData = state.likedData.filter(o => o.data[0].nasa_id !== item.data[0].nasa_id);
        },
        addRemovedData(state, item) {
            if (!state.removedData.some(o => o.data[0].nasa_id === item.data[0].nasa_id))
                state.removedData.unshift(item);
        },
        deleteremovedData(state, item) {
            state.removedData = state.removedData.filter(o => o.data[0].nasa_id !== item.data[0].nasa_id);
        },
        clearStorage(state) {
            state.keyword = null;
            state.totalAllData = 0;
            state.allData = [];
            state.likedData = [];
            state.removedData = [];
        }
    },
    actions: {

    }
});