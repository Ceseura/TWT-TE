<template>
    <div class='statistics'>
        <div v-for="(statistic, key) in statistics" :key="key" class="statistic">
            <div class="stat-key">{{Object.keys(statistic)[0]}}:</div>
            <div class="seperator" />
            <div class="stat-value">{{Object.values(statistic)[0]}}</div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    statistics: Array
  }
};
</script>

<style scoped>
.statistics {
  font-family: var(--font-light);
  font-size: 1.3em;
  color: var(--color-grey);
  margin-top: 2em;
  margin-bottom: 1em;
  padding: 1em 5em 1em 2em;
  width: 100%;
  box-sizing: border-box;
}

.statistic {
  display: flex;
  flex-direction: row;
  padding: 0.2em 0;
}

.seperator {
  flex: 1 1 auto;
}
</style>
