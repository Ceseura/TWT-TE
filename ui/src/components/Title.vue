<template>
    <div class="title">
        {{this.title}}
    </div>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>

<style scoped>
.title {
  color: var(--color-dark);
  font-size: 5em;
  font-family: var(--font-light);
  padding: 0.8em 1.5em;
}
</style>
