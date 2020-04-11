import axios from "axios";
import Vue from "vue";
import router from './router/index'

const http = axios.create({
  baseURL: "http://localhost:3000/admin/api"
});

// req监听器
http.interceptors.request.use(
  function(config) {
    if (localStorage.token) {
      config.headers.Authorization = "Bearer " + localStorage.token;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// res监听器
http.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: "error",
        message: err.response.data.message
      });
		}
		if(err.response.status === 401){
			router.push('/login')
		}
  }
);

export default http;
