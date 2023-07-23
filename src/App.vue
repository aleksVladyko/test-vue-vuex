<template>
  <div class="mainContainer">
    <left-panel />
    <right-panel />
  </div>
</template>

<script>

import LeftPanel from "@/components/left/leftPanel.vue";
import RightPanel from "@/components/right/rightPanel.vue";

export default {
  name: 'App',
  components: {
    RightPanel,
    LeftPanel
  },
  created() {
    this.init()
  },
  methods: {
    randomInteger(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },
    randomColor() {
      let letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i <= 5; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    init() {
      const countLists = 5;
      for (let i = 0; i < countLists; i++) {
        const countItems = this.randomInteger(4, 10);
        let list = { id: i + 1, items: [] };
        for (let j = 0; j < countItems; j++) {
          const item = {
            id: j + 1,
            count: this.randomInteger(2, 15),
            color: this.randomColor(),
            isActive: false
          };
          const { items } = list;
          items.push(item);
        }
        this.$store.commit('addList', list);
      }
    }
  }
}
</script>

<style>
html body #app {
  height: 100vh;
}

.mainContainer {
  display: flex;
  column-gap: 50px;
  padding: 20px 15px;
  justify-content: center;
  height: 100%;
}
</style>