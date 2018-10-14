<template>
    <div class="tableRow">
        <div v-if="this.headers" class="header row">
          <div v-for="header in this.headers" :key="header" class="item">
            {{header}}
          </div>
        </div>
        <div v-if="!this.headers" class="data row">
          <div v-for="(data, key) in tableData" :key="key" class="item">
            {{data}}
          </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    tableData: Object,
    headers: Array
  }
};
</script>

<style scoped>
.tableRow {
  width: 100%;
  box-sizing: border-box;
  border-left: 1px solid black;
  border-right: 1px solid black;
}

.tableRow:nth-child(2n + 1) {
  background-color: var(--color-table-alt);
}

.header {
  font-size: 2em;
  font-family: var(--font-heavy);
  border-bottom: 2px solid var(--color-dark);
  background-color: var(--color-base);
}

.data {
  font-size: 1.5em;
  font-family: var(--font-light);
  padding: 0.5em 0;
}

.item {
  width: 25%;
  text-align: center;
}

.row {
  display: flex;
  flex-direction: row;
}
</style>
