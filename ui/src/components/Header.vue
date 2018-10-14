<template>
    <div class="header">
        Vandelay Industries
    </div>
</template>

<script>
export default {};
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

  font-size: 2em;
  font-family: var(--font-light);
}
</style>
