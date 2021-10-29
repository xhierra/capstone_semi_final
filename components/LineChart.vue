<template>
  <div>
    <line-chart :data="chartData" :options="ChartOptions"/>
  </div>
</template>

  <script>
  export default {
    props:{
      datas : Array,
    },
    data : () => ({
        
        chartData: {
          datasets: [{
            label: "Price",
            data: [],
            fill: false,
            borderColor: 'green',
            tension: 0.1
          }],
          labels: []
        },
        ChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Price Chart',
            fontSize: 30,
            fontColor: '#6b7280'
          },
          elements: {
            point:{
              radius: 1
            }
          },
          scales: {
              xAxes: [{
                  ticks: {
                      display: false //this will remove only the label
                  },
                  gridLines: {
                    display: false
                  }
              }],

              yAxes: [{
                  ticks: {
                      callback: function(value, index, values) {
                        return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');;
                      }
                  },
              }]
          },
          tooltips: {
            backgroundColor: '#17BF62',
            callbacks: {

              label: function(t, d) {
                return null
              },
              
              title: function(t, d) {
                return 'Price: $' +t[0].xLabel.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
              },
              
            }
          },
          plotOptions: {
            series: {
              animation: false,
              dataLabels: {
                enabled: false
              }
            }
          },
        },
    }),
    mounted(){
      this.chartData.datasets[0].data = this.datas;
      this.chartData.labels = this.datas;
    }
  }
  </script>

  