<template>
    <div class="table">
        <TableRow :header="true" />
        <TableRow v-for="tablerow in this.tableData" :key="tablerow.id" :tableData="tablerow"/>
    </div>
</template>

<script>
import TableRow from '@/components/TableRow';

export default {
  components: {
    TableRow
  },
  props: {
    tableData: Array
  }
};
</script>
