import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import NaiveUI from 'naive-ui';

const app = createApp(App);
app.use(createPinia());
app.use(NaiveUI);
app.mount('#app');