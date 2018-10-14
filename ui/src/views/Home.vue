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
              <option value="country">Country</option>
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
        <Table :tableData="this.displayData" 
               :tableHeaders="this.tableHeaders"/>
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
import cacheData from '@/assets/data.js';
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
      rawData: [],
      tableHeaders: [
        'Country',
        'Average Price',
        'Quantity Sold',
        'Total Profit'
      ],
      searchQuery: '',
      sortBy: 'total_profit'
    };
  },
  created: function() {
    axios
      // .get('https://my.api.mockaroo.com/alex-liang.json?key=e6ac1da0')
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .then(res => {
        console.log(res.data);
        this.rawData = this.parse_homepage_data(cacheData);
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    displayData: function() {
      let out = this.rawData.map(a => ({ ...a }));
      let filtered = out.filter(el => {
        return el.country
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
      let sorted = filtered.sort((a, b) => {
        if (this.sortBy === 'country')
          return a.country.localeCompare(b.country);
        else return b[this.sortBy] - a[this.sortBy];
      });
      sorted.forEach(row => {
        row.avg_price = this.format_number(Math.round(row.avg_price));
        row.total_profit = this.format_number(row.total_profit);
      });
      return sorted;
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
}

.left-col {
  width: 60%;
  position: relative;
  margin: 0 1em;
  box-sizing: border-box;
}

.right-col {
  width: 40%;
}
</style>
