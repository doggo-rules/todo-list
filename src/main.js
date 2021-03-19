// Vue
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

// Bootstrap
import "bootstrap/dist/css/bootstrap.css";

// Stores
import todoStore from "./stores/todoStore";
app.use(todoStore);

// Mount App
app.mount("#app");
