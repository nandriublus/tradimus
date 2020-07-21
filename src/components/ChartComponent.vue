<template>
  <canvas :id="chartName">Gráfico Aqui</canvas>
</template>

<script>
import Chart from 'chart.js';

export default {
 props: {
   chartName: String,
   options: Object,
   ready: Boolean
 },
 watch: {
   ready(val) {
     if(val){
        this.createChart();
     }
   }
 },
 methods: {
   createChart() {
    const ctx = document.getElementById(this.chartName);
    Chart.defaults.global.defaultFontFamily = "'Open Sans', Helvetica, Arial, sans-serif";
    Chart.defaults.global.defaultFontSize = 14;
    Chart.defaults.global.defaultFontColor = "#000";
    Chart.defaults.line.spanGaps = true;
    new Chart(ctx, {
      type: this.options.type,
      data: {
        labels: this.options.labels,
        datasets: this.options.datasets
        },
      options: this.options.options
    });
  }
   
 },
}
</script>

<style>

</style>
