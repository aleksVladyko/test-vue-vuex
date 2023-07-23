import { createStore } from "vuex";
import { ref } from "vue";

const store = createStore({
    state: {
        lists: [],
    },
    mutations: {
        setAllItemActive(state, data) {
            for (let i = 0; i < state.lists[data.id].items.length; i++) {
                state.lists[data.id].items[i].isActive = data.isActive;
            }
        },
        addList(state, list) {
            state.lists.push(list);
        },
        deleteInItemCount(state, data) {
            if (!state.lists[data.listId - 1].items[data.itemId - 1].count) {
                return;
            }
            state.lists[data.listId - 1].items[data.itemId - 1].count -= 1;
        },
        deleteLastItemCount(state, data) {
            state.lists[data[1]].items[data.id - 1].pop();
        },
        setArr(state, data) {
            state.lists[data.index]["arr"] = data.arr;
        },
    },
    getters: {
        lists(state) {
            return state.lists;
        },
        getListByIndex: (state) => (index) => {
            return ref(state.lists[index]);
        },
    },
});
export default store;
