<template>
    <div class="title" :class="{'spacing-bottom': !this.subtitle}">
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
  padding: 0em 1.5em;
  padding-top: 0.5em;
  cursor: default;
}

.spacing-bottom {
  padding-bottom: 0.8em;
}

.subtitle {
  color: var(--color-pink);
  font-size: 0.8em;
  font-family: var(--font-light);
  padding-left: 2em;
}
</style>
