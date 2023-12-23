import Vue from 'vue'
import { Button,FormModel,Input,Icon,message,Layout,Card,Menu,Table,Row,Col,Modal,Select,Upload} from 'ant-design-vue'//导入antdesign的按钮
Vue.use(Button)
Vue.use(FormModel)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Table)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Modal)
Vue.use(Select)
Vue.use(Upload)

message.config({
    top: `60px`,
    duration: 2,
    maxCount: 3,
  });

Vue.prototype.$message=message; //将vue原型替换为组件
Vue.prototype.$comfirm=Modal.confirm;