import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { updateAdaptiveVars } from "./utils/adaptive"; 

updateAdaptiveVars();
window.addEventListener("resize", updateAdaptiveVars);

createApp(App).mount("#app");
