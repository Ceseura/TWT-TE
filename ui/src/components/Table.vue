<template>
    <div class="table">
        <TableRow :headers="tableHeaders" :clickable="false"/>
        <TableRow v-for="tablerow in this.tableData" :key="tablerow.country" :tableData="tablerow" :clickable="clickable"/>
    </div>
</template>

<script>
import TableRow from '@/components/TableRow';

export default {
  components: {
    TableRow
  },
  props: {
    tableData: Array,
    tableHeaders: Array,
    clickable: Boolean
  }
};
</script>
