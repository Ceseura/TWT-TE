let DataParser = {
  methods: {
    // @params
    //  Given an array of transaction objects in the format:
    //  {
    //     id: 1,
    //     import_country: 'China',
    //     model: 'E-Series',
    //     make: 'Ford',
    //     sold_by: 'Roanna Hinken',
    //     sale_price: 19707
    //  }
    //  Output some statistics regarding transactions for each country in the format:
    //  {
    //     country: 'USA',
    //     avg_price: 18001,
    //     qty_sold: 80,
    //     total_profit: 10
    //  }
    parse_homepage_data: function(rawData) {
      let out = [];
      rawData.forEach(transaction => {
        // Check if transaction.import_country is already in parsed[]
        let index = out.findIndex(el => {
          return el.country === transaction.import_country;
        });

        // findIndex returns -1 if the item is not in the array
        // If the import_country is not already in parsed[], create a new entry
        if (index === -1) {
          out.push({
            country: transaction.import_country,
            avg_price: transaction.sale_price,
            qty_sold: 1,
            total_profit: transaction.sale_price
          });
          // Otherwise, update the item in parsed
        } else {
          out[index].qty_sold += 1;
          out[index].total_profit += transaction.sale_price;
          out[index].avg_price = out[index].total_profit / out[index].qty_sold;
        }
      });

      return out;
    },
    // Same as above, except we are grouping by Make/Model of Car instead of country
    // Returns:
    // {
    //   make: 'Ford',
    //   model: 'E-Series',
    //   avg_price: 19707,
    //   qty_sold: 3,
    //   total_profit: 10
    // }
    parse_country_data: function(rawData) {
      let out = [];
      rawData.forEach(transaction => {
        let index = out.findIndex(el => {
          return el.make === transaction.make && el.model == transaction.model;
        });

        if (index === -1) {
          out.push({
            make: transaction.make ? transaction.make : 'undefined',
            model: transaction.model ? transaction.model : 'undefined',
            avg_price: transaction.sale_price,
            qty_sold: 1,
            total_profit: transaction.sale_price
          });
        } else {
          out[index].qty_sold += 1;
          out[index].total_profit += transaction.sale_price;
          out[index].avg_price = out[index].total_profit / out[index].qty_sold;
        }
      });

      return out;
    },
    // Same as above, but groups by make instead of make and model
    parse_country_data_by_make: function(rawData) {
      let out = [];
      rawData.forEach(transaction => {
        let index = out.findIndex(el => {
          if (transaction.make) return el.make === transaction.make;
          else return el.make === 'Unlisted';
        });

        if (index === -1) {
          out.push({
            make: transaction.make ? transaction.make : 'Unlisted',
            model: '',
            avg_price: transaction.sale_price,
            qty_sold: 1,
            total_profit: transaction.sale_price
          });
        } else {
          out[index].qty_sold += 1;
          out[index].total_profit += transaction.sale_price;
          out[index].avg_price = out[index].total_profit / out[index].qty_sold;
        }
      });

      return out;
    },
    format_number: function(integer) {
      return integer.toLocaleString(integer);
    }
  }
};

export default DataParser;
