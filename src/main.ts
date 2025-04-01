import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import * as BootstrapVueNext from 'bootstrap-vue-next';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);

// Подключаем все компоненты BootstrapVueNext глобально
for (const component in BootstrapVueNext) {
    app.component(component, (BootstrapVueNext as any)[component]);
  }
app.use(createPinia());
app.use(router);

app.mount('#app');
