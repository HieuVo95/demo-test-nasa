import Vue from "vue";
import Axios from "axios";

let config = {
    baseURL: "https://images-api.nasa.gov"
};

const axios = Axios.create(config);

Object.defineProperty(Vue.prototype, "$axios", {
    value: axios
});