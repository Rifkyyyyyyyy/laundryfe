const chartData = {
  height: 480,
  type: 'bar',
  options: {
    chart: {
      id: 'laundry-bar-chart',
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 6
      }
    },
    xaxis: {
      type: 'category',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    legend: {
      show: true,
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: true
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: 'solid',
      opacity: 0.9
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true,
      borderColor: '#ddd'
    },
    colors: ['#1976d2', '#ff9800', '#4caf50', '#e91e63'] // biru, oranye, hijau, pink
  },
  series: [
    {
      name: 'Order Masuk',
      data: [50, 75, 60, 80, 90, 70, 85, 100, 95, 110, 120, 130]
    },
    {
      name: 'Order Diproses',
      data: [40, 60, 55, 70, 75, 65, 80, 90, 85, 95, 110, 115]
    },
    {
      name: 'Order Selesai',
      data: [30, 50, 45, 60, 65, 55, 70, 80, 75, 85, 90, 100]
    },
    {
      name: 'Order Batal',
      data: [5, 8, 4, 6, 7, 6, 5, 4, 3, 7, 6, 8]
    }
  ]
};

export default chartData;
