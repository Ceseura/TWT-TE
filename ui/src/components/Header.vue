<template>
    <div class="header">
        <div class="brand" v-on:click="gotoHome">
            Vandelay Industries
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    gotoHome: function(event) {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.header {
  top: 0;
  width: 100%;
  height: 60px;
  background-color: var(--color-dark);
  color: var(--color-base);
  z-index: 10;
  padding-left: 50px;
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;

  cursor: default;
}

.brand {
  font-size: 2em;
  font-family: var(--font-light);
  color: var(--color-base)
}

.brand:hover {
  cursor: pointer;
}
</style>
