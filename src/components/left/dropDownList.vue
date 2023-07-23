<template>
    <div class="list">
        <button @click="isOpen = !isOpen">
            <template v-if="!isOpen">
                <span>🔽</span>
            </template>
            <template v-else>
                <span>🔼</span>
            </template>
        </button>
        <input type="checkbox" :checked="typeActive().checked" :indeterminate="typeActive().indeterminate"
            @click="setFull()">
        <div>
            List {{ listId }}
        </div>
    </div>
    <div v-if="isOpen">
        <div class="rows" v-for="item in list.items" :key="item.id">
            <list-item :number="item.id" v-model:count="item.count" v-model:color="item.color"
                v-model:isActive="item.isActive" />
        </div>
    </div>
</template>
<script>
import ListItem from "@/components/left/listItem.vue";
import { mapGetters } from "vuex";

export default {
    name: 'dropDownList',
    components: { ListItem },
    props: {
        listId: {
            required: true,
        },
    },
    data() {
        return {
            isOpen: false,
            list: this.$store.getters.getListByIndex(this.listId - 1)
        };
    },

    methods: {
        typeActive() {
            let tmp = {
                indeterminate: false,
                checked: true
            };
            for (let i = 0; i < this.list.items.length - 1; i++) {
                if (this.list.items[i].isActive !== this.list.items[i + 1].isActive) {
                    tmp.checked = false;
                    break;
                }
            }
            if (!this.list.items[0].isActive) {
                tmp.checked = false;
            }
            for (let i = 0; i < this.list.items.length - 1; i++) {
                if (this.list.items[i].isActive !== this.list.items[i + 1].isActive) {
                    tmp.indeterminate = true;
                    break;
                }
            }
            return tmp;
        },
        setFull() {
            const flag = this.list.items.some(item => !item.isActive);
            const data = {
                id: this.list.id - 1,
                isActive: flag
            };
            this.$store.commit('setAllItemActive', data);
        }
    },
    computed: {
        ...mapGetters(['getListByIndex'])
    }
}

</script>
  
<style scoped>
.list {
    display: flex;
    column-gap: 7px;
    align-items: center;
}

button {
    width: 30px;
}

.rows {
    display: flex;
    flex-direction: column;
}
</style>