<template>
    <div class="title">
        {{this.title}}
        <div class="subtitle">
          {{this.subtitle}}
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String
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

.subtitle {
  color: var(--color-light);
  font-size: 0.8em;
  font-family: var(--font-light);
  padding-left: 2em;
}
</style>
