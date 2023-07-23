<template>
  <div class="main">
    <template v-for="list in this.$store.state.lists" :key="list.id">
      <drop-down-list :listId="list.id" />
    </template>
  </div>
</template>
  
<script>
import DropDownList from "@/components/left/dropDownList.vue";
import { mapGetters } from "vuex";

export default {
  name: 'leftPanel',
  components: { DropDownList },
  computed: {
    ...mapGetters(['lists'])
  }
}

</script>
  
<style scoped>
.main {
  padding: 30px 15px;
  border: 1px solid black;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  max-height: 100%;
  overflow-y: auto;
}
</style>