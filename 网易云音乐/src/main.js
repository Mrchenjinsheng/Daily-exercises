import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//引入自己的字体图标
import '../public/iconfont/iconfont.css';


//按需引入elementUI
// import 'element-ui/lib/theme-chalk/index.css';
import './theme/element-variables.scss'
import { 
  Button,
  Tag,
  Input
} from 'element-ui';
Vue.use(Button)
Vue.use(Tag)
Vue.use(Input)


//按需引入VantUI
import 'vant/lib/index.css';
import { 
  Tab,
  Tabs,
  Toast
 } from 'vant';
Vue.use(Tab).use(Tabs);
Vue.use(Toast)




//引入axios
import axios from 'axios'
Vue.prototype.axios = axios
axios.defaults.baseURL = '/api/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.withCredentials = true

//时间格式化插件
import moment from 'moment'
Vue.filter('dateFormat',function(dataStr,parrent="YYYY-MM-DD") {
    return moment(dataStr).format(parrent)
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
