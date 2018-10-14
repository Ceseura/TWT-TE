<template>
  <div class="home">
    <div class="two-column-layout">
      <div class="left-col">
        <Title title="Market Analysis Tool"/>

        <div class="settings">
          <div class="align-right" />
          <div class="sort-by">
            Sort by: 
            <select v-model="sortBy">
              <option value="avg_price">Average Price</option>
              <option value="qty_sold">Quantity Sold</option>
              <option value="total_profit">Total Profit</option>
            </select>
          </div>
          <div class="search">
            <input type="text" 
                  placeholder="Lookup by Country Name" 
                  class="search-input"
                  v-model="searchQuery"/>
            <div class="search-icon" />
          </div>
        </div>
        <Table :tableData="this.tableData" 
               :tableHeaders="this.tableHeaders"
               :clickable="true"/>
      </div>
      <div class="right-col">
        <Statistics :statistics="statistics" />
        <Charts :chartData="this.chartData" :chartType="this.sortBy" :homepage="true"/>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title';
import Table from '@/components/Table';
import Charts from '@/components/Charts';
import Statistics from '@/components/Statistics';
import DataParser from '@/mixins/DataParser.js';
import cacheData from '@/assets/data.js';
const axios = require('axios');

export default {
  components: {
    Title,
    Table,
    Charts,
    Statistics
  },
  mixins: [DataParser],
  data: function() {
    return {
      rawData: [],
      tableHeaders: [
        'Country',
        'Average Price',
        'Quantity Sold',
        'Total Profit'
      ],
      searchQuery: '',
      sortBy: 'total_profit',
      chartData: [],
      statistics: []
    };
  },
  created: function() {
    axios
      // .get('https://my.api.mockaroo.com/alex-liang.json?key=e6ac1da0')
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .then(res => {
        console.log(res.data);
        this.rawData = this.parse_homepage_data(cacheData);
        this.statistics.push({ 'Number of Transactions Analyzed': '100' });
        this.statistics.push({
          'Number of Unique Countries': this.rawData.length
        });
        let total_total_profit = this.rawData
          .map(el => el.total_profit)
          .reduce((num, total) => {
            return num + total;
          });
        this.statistics.push({
          'Overall Total Profit': this.format_number(total_total_profit)
        });
        this.statistics.push({
          'Overall Average Price': this.format_number(total_total_profit / 100)
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    tableData: function() {
      let out = this.rawData.map(a => ({ ...a }));
      let filtered = out.filter(el => {
        return el.country
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
      let sorted = filtered.sort((a, b) => {
        return b[this.sortBy] - a[this.sortBy];
      });

      let qty_graphed = 9;

      this.chartData = sorted.map(a => ({ ...a })).slice(0, qty_graphed);
      if (sorted.length > qty_graphed) {
        let otherData = sorted.map(a => ({ ...a })).slice(qty_graphed);
        let otherTransactions = {
          country: sorted.length - qty_graphed + ' other',
          avg_price: 0,
          qty_sold: 0,
          total_profit: 0
        };
        otherData.forEach(el => {
          otherTransactions.qty_sold += el.qty_sold;
          otherTransactions.total_profit += el.total_profit;
          otherTransactions.avg_price =
            otherTransactions.total_profit / otherTransactions.qty_sold;
        });
        this.chartData.push(otherTransactions);
      }

      sorted.forEach(row => {
        row.avg_price = this.format_number(Math.round(row.avg_price));
        row.total_profit = this.format_number(row.total_profit);
      });
      return sorted;
    },
    prettierType: function() {
      if (this.sortBy === 'avg_price') return 'Average Price';
      else if (this.sortBy === 'qty_sold') return 'Quantity Sold';
      else if (this.sortBy === 'total_profit') return 'Total Profit';
      else return 'Invalid SortBy';
    }
  }
};
</script>

<style scoped>
.home {
  background-color: var(--color-base);
  width: 100%;
  min-height: 100vh;
}

.settings {
  display: flex;
  flex-direction: row;
  padding-bottom: 1em;
}

.align-right {
  flex: 1 1 auto;
}

.sort-by {
  padding: 0.5em 1em;
  font-family: var(--font-heavy);
  margin-right: 3em;
}

.search {
  padding: 0.5em 1em;
  width: 12em;
  border-radius: 2em;
  background-color: white;
  border: 1px solid black;
  position: relative;
}

.search-input {
  border: 0;
}

.search-input:focus {
  outline: none;
}

.search-icon {
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
  min-height: 100vh;
}

.left-col {
  width: 60%;
  position: relative;
  margin: 0 1em;
  box-sizing: border-box;
}

.right-col {
  width: 40%;
  padding: 0 1em;
  background-color: var(--color-red);
}
</style>
