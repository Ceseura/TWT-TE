<template>
  <div class="home">
    <Title title="Market Analysis Tool"/>
    <div class="two-column-layout">
      <div class="left-col">
        <div class="search">
          <input type="text" placeholder="Lookup by Country Name" class="search-input"/>
          <div class="search-button" />
        </div>
        <Table :tableData="this.tableData" :tableHeaders="this.tableHeaders"/>
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
import DataParser from '@/mixins/DataParser.js';
import rawData from '@/assets/data.js';
const axios = require('axios');

export default {
  components: {
    Title,
    Table,
    Charts
  },
  mixins: [DataParser],
  data: function() {
    return {
      tableData: [],
      tableHeaders: [
        'Country',
        'Average Price',
        'Quantity Sold',
        'Total Profit'
      ]
    };
  },
  created: function() {
    axios
      // .get('https://my.api.mockaroo.com/alex-liang.json?key=e6ac1da0')
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .then(res => {
        console.log(res.data);
        // this.tableData = this.parse_homepage_data(res.data);
        this.tableData = this.parse_homepage_data(rawData);
        this.tableData.sort((a, b) => {
          return b.total_profit - a.total_profit;
        });
        this.tableData.forEach(row => {
          row.avg_price = this.format_number(Math.round(row.avg_price));
          row.total_profit = this.format_number(row.total_profit);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.home {
  background-color: var(--color-base);
  width: 100%;
  min-height: 100vh;
}

.search {
  position: absolute;
  right: 3em;
  top: 0;
  padding: 0.5em 1em;
  width: 18%;
  border-radius: 2em;
  background-color: white;
  border: 1px solid black;
}

.search-input {
  border: 0;
}

.search-input:focus {
  outline: none;
}

.search-button {
  width: 1.5em;
  height: 1.5em;
  background-image: url('../assets/search_icon.png');
  background-size: cover;
  position: absolute;
  right: 0.5em;
  top: 0.25em;
}

.search-button:hover {
  cursor: pointer;
}

.two-column-layout {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.left-col {
  width: 60%;
  position: relative;
  padding-top: 3em;
  margin: 0 1em;
  box-sizing: border-box;
}

.right-col {
  width: 40%;
}
</style>
