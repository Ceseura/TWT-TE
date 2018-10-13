<template>
  <div class="country-info">
    <Title title="Country Info Page"/>
    <div class="two-column-layout">
      <div class="left-col">
        <div class="search">
            <input type="text" placeholder="Search by Country Name"/>
        </div>
        <Table :tableData="this.data"/>
      </div>
      <div class="right-col">
        <Charts />
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title';
import Table from '@/components/Table';
import Charts from '@/components/Charts';

export default {
  components: {
    Title,
    Table,
    Charts
  },
  data: function() {
    return {
      data: []
    };
  },
  created: function() {
    // GET data from api (axios?)
    this.data = [{ id: 0, content: 'hello world' }, { id: 1, content: 'no u' }];
  }
};
</script>

<style scoped>
.home {
  background-color: var(--color-base);
  width: 100vw;
  min-height: 100vh;
}

.two-column-layout {
  display: flex;
  flex-direction: row;
}

.left-col {
  border: 1px solid red;
  width: 60vw;
}

.right-col {
  border: 1px solid blue;
  width: 40vw;
}
</style>
