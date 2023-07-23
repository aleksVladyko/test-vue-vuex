<template>
    <div class="row">
        <div v-for="(block, index) in arr" :key="index" @click="deleteItem(index)" class="colorBlock"
            :style="{ 'background': block.color }">
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'mixedArr',
    props: {
        arr: {
            required: true,
            type: Array
        }
    },
    methods: {
        deleteItem(index) {
            const data = this.arr[index]
            const arr = [].concat(
                this.arr.slice(0, index),
                this.arr.slice(index + 1, this.arr.length))
            this.$store.commit('deleteInItemCount', data)
            this.$emit('update:arr', arr)
        }
    }
}
</script>
<style scoped>
.row {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
}

.colorBlock {
    width: 15px;
    height: 15px;
    cursor: pointer;
}
</style>