<template>
    <div class="title">
        {{this.Title}}
    </div>
</template>

<script>
export default {
  props: {
    Title: String
  }
};
</script>

<style scoped>
.title {
  color: var(--color-dark);
  font-size: 5em;
}
</style>
