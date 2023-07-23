<template>
    <div class="row">
        <div v-for="index in item.count" :key="index" @click="deleteItem()" class="colorBlock"
            :style="{ 'background': item.color }">
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'rowColor',
    props: {
        item: {
            required: true,
        },
        listIndex: {
            required: true,
            type: Number
        }
    },
    methods: {
        deleteItem() {
            const data = {
                listId: this.listIndex,
                itemId: this.item.id
            }
            this.$store.commit('deleteInItemCount', data)
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