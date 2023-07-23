<template>
    <div class="list">
        <div class="top">
            <span>List {{ listIndex }}</span>
            <button v-if="isMix() && typeDisplay !== 1" @click="mixArr(validItems())"><span>Перемешать</span></button>
            <button v-if="isMix() && typeDisplay === 1" @click="sortedArr(validItems())"><span>Сортировать</span></button>
        </div>
        <div class="midl">
            <template v-if="typeDisplay === 0">
                <template v-for="item in validItems()" :key="item.id">
                    <row-color :item="item" :listIndex="listIndex" />
                </template>
            </template>
            <template v-else-if="typeDisplay === 1">
                <mixed-arr v-model:arr="arr.arr" />
            </template>
            <template v-else-if="typeDisplay === 2">
                <template v-for="item in sortArr" :key="item.id">
                    <row-color :item="item" :listIndex="listIndex" />
                </template>
            </template>
        </div>
    </div>
</template>
  
<script>
import RowColor from "@/components/right/rowColor.vue";
import MixedArr from "@/components/right/mixedArr.vue";

export default {
    name: 'ListArr',
    components: { MixedArr, RowColor },
    props: {
        listIndex: {
            required: true,
        }
    },
    data() {
        return {
            list: this.$store.getters.getListByIndex(this.listIndex - 1),
            arr: this.$store.getters.getListByIndex(this.listIndex - 1).value,
            sortArr: [],
            typeDisplay: 0
        }
    },
    methods: {
        isMix() {
            let count = 0
            for (let i = 0; i < this.list.items.length; i++) {
                if (this.list.items[i].isActive) {
                    count += 1
                }
            }
            return count >= 2;
        },
        validItems() {
            return this.list.items.filter((item) => item.isActive && item.count)
        },
        mixArr(arr) {
            let new_arr = []
            const initialValue = 0;
            new_arr.length = arr.reduce(
                (accumulator, currentValue) => accumulator + currentValue.count,
                initialValue
            )
            let start = 0
            for (let i = 0; i < arr.length; i++) {
                const data = {
                    listId: this.list.id,
                    itemId: arr[i].id,
                    color: arr[i].color
                }
                new_arr.fill(data, start, start + arr[i].count)
                start += arr[i].count
            }
            new_arr.sort(() => Math.random() - 0.5)
            const data = {
                index: this.listIndex - 1,
                arr: new_arr
            }
            this.$store.commit('setArr', data)
            this.typeDisplay = 1
        },
        sortedArr(arr) {
            this.sortArr = arr.sort(function (a, b) {
                if (a.count > b.count) {
                    return 1;
                }
                if (a.count < b.count) {
                    return -1;
                }
                return 0;
            })
            this.typeDisplay = 2
        }
    },
}
</script>
  
<style scoped>
button {
    color: white;
    background-color: deepskyblue;
    padding: 3px 6px;
    border-radius: 4px;
}

.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.list {
    border: 1px solid black;
    padding: 10px;
}

.midl {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
}
</style>