<template>
  <div class="main">
    <template v-for="list in this.$store.state.lists" :key="list.id">
      <list-arr :listIndex="list.id" />
    </template>
  </div>
</template>
  
<script>
import ListArr from "@/components/right/ListArr.vue";
import { mapGetters } from "vuex";

export default {
  name: 'rightPanel',
  components: { ListArr },
  computed: {
    ...mapGetters(['lists'])
  },
}

</script>
  
<style scoped>
.main {
  padding: 30px 15px;
  border: 1px solid black;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  max-height: 100%;
  overflow-y: auto;
}
</style>