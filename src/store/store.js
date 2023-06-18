import { createStore } from "vuex";
import sv from './modules/sv/index';

const store = createStore({
    modules: {
        sv 
    }
});

export default store;