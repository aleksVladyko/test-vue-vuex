<template>
  <label>
    <div class="row">
      <div class="check-number">
        <input type="checkbox" @change="setFlag($event.target.checked)" :checked="isActive">
        <span>Item {{ number }}</span>
      </div>
      <div class="count-color">
        <input type="number" @change="setCount($event.target.value)" :value="count" min="0" class="inputCount">
        <input type="color" @change="setColor($event.target.value)" :value="color" class="inputColor">
      </div>
    </div>
  </label>
</template>
  
<script>
export default {
  name: 'listItem',
  props: {
    number: {
      required: true,
      type: Number
    },
    count: {
      required: true,
      type: Number
    },
    color: {
      required: true,
      type: String
    },
    isActive: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  methods: {
    setFlag(value) {
      this.$emit('update:isActive', value)
    },
    setCount(value) {
      this.$emit('update:count', parseInt(value))
    },
    setColor(value) {
      this.$emit('update:color', value)
    }
  }
}

</script>
  
<style scoped>
.row {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.check-number,
.count-color {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;
}

.inputCount {
  border: 1px solid black;
  border-radius: 4px;
  width: 45px;
  text-align: center;
}

.inputColor {
  width: 30px;
  height: 30px;
}
</style>