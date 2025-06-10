// Fungsi generate array random integer dengan panjang tertentu dan range min-max
const generateRandomData = (length, min, max) => {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

const chartData = {
  height: 480,
  type: 'bar',
  options: {
    chart: {
      id: 'laundry-bar-chart',
      stacked: true,
      toolbar: { show: true },
      zoom: { enabled: true }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: { position: 'bottom', offsetX: -10, offsetY: 0 }
        }
      }
    ],
    plotOptions: {
      bar: { horizontal: false, columnWidth: '50%', borderRadius: 6 }
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
      labels: { useSeriesColors: true },
      markers: { width: 16, height: 16, radius: 5 },
      itemMargin: { horizontal: 15, vertical: 8 }
    },
    fill: { type: 'solid', opacity: 0.9 },
    dataLabels: { enabled: false },
    grid: { show: true, borderColor: '#ddd' },
    colors: ['#1976d2', '#ff9800', '#4caf50', '#e91e63']
  },
  series: [
    {
      name: 'Order Masuk',
      data: generateRandomData(12, 40, 130) // random antara 40 - 130
    },
    {
      name: 'Order Diproses',
      data: generateRandomData(12, 30, 110) // random antara 30 - 110
    },
    {
      name: 'Order Selesai',
      data: generateRandomData(12, 20, 90) // random antara 20 - 90
    },
    {
      name: 'Order Batal',
      data: generateRandomData(12, 0, 15) // random antara 0 - 15
    }
  ]
};

export default chartData;
