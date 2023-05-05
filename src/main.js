import { createApp } from 'vue'
import { router } from './router/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/index.scss'
import App from './App.vue'
// import myComponent from '@/components/myComponent.vue'
// import componentA from '@/components/componentA.vue'
// import componentB from '@/components/componentB.vue'
// import componentC from '@/components/componentC.vue'
const app = createApp(App)
app.use(router).use(ElementPlus).mount('#app')
// app.component('my-component', {
//     template: `<button>btn</button>`
// })
// app.component('my-component', myComponent)
// app.component('component-a', componentA)
//     .component('component-b', componentB)
//     .component('component-c', componentC)
