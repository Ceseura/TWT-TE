<template>
    <div class="table">
        <TableRow :headers="tableHeaders"/>
        <TableRow v-for="tablerow in this.tableData" :key="tablerow.country" :tableData="tablerow"/>
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
    tableHeaders: Array
  }
};
</script>
