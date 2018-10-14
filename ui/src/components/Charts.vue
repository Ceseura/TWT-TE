<template>
    <div class="charts">
        <highcharts :options="barChartOptions"></highcharts>
        <highcharts v-if="chartType != 'avg_price'" :options="pieChartOptions"></highcharts>
    </div>
</template>

<script>
import { Chart } from 'highcharts-vue';

export default {
  props: {
    chartData: Array,
    chartType: String
  },
  components: {
    highcharts: Chart
  },
  data: function() {
    return {
      barChartOptions: this.generateBarChartOptions(this.chartType),
      pieChartOptions: this.generatePieChartOptions(this.chartType)
    };
  },
  watch: {
    chartType: function() {
      this.barChartOptions = this.generateBarChartOptions(this.chartType);
      this.pieChartOptions = this.generatePieChartOptions(this.chartType);
    },
    chartData: function() {
      this.barChartOptions = this.generateBarChartOptions(this.chartType);
      this.pieChartOptions = this.generatePieChartOptions(this.chartType);
    }
  },
  created: function() {
    this.barChartOptions = this.generateBarChartOptions(this.chartType);
    this.pieChartOptions = this.generatePieChartOptions(this.chartType);
  },
  methods: {
    // @params
    //    x: String, which element in chartData to plot along the y axis
    generateBarChartOptions: function(cType) {
        console.log(this.chartData[0])
      return {
        chart: {
          type: 'column',
          backgroundColor: '#efefef'
        },
        title: {
          text: this.prettierType(cType)
        },
        xAxis: {
          categories: this.chartData.map(el => el.country)
        },
        series: [
          {
            name: this.prettierType(cType),
            showInLegend: false,
            data: this.chartData.map(el => el[cType])
          }
        ]
      };
    },
    generatePieChartOptions: function(cType) {
        let t = this.chartData.map(el => el[cType]).reduce((total, num) => {return total + num});
        console.log(t);
      return {
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: true,
              format: '{point.name}: {point.percentage:,.2f}%'
            }
          }
        },
        chart: {
          type: 'pie',
          backgroundColor: '#efefef'
        },
        title: {
          text: this.prettierType(cType) + ' by Percentage'
        },
        xAxis: {
          categories: this.chartData.map(el => el.country)
        },
        series: [
          {
            name: this.prettierType(cType),
            data: this.chartData.map(el => {return {
                name: el.country,
                y: el[cType],
                percentage: el[cType] / t
            }})
          }
        ]
      };
    },
    prettierType: function(ugly) {
      if (ugly === 'avg_price') return 'Average Price';
      else if (ugly === 'qty_sold') return 'Quantity Sold';
      else if (ugly === 'total_profit') return 'Total Profit';
      else return 'Invalid SortBy';
    }
  }
};
</script>

<style scoped>
.charts {
  padding-top: 1em;
  padding-right: 1em;
}
</style>
