<template>
    <div class="tablerow">
        <div v-if="this.header"> Header </div>
        {{this.tableData}}
    </div>
</template>

<script>
export default {
  props: {
    tableData: Object,
    header: Boolean
  }
};
</script>

<style scoped>
</style>
