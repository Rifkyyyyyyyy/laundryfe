function generateSparklineData(length = 8) {
  return Array.from({ length }, () => Math.floor(Math.random() * 100));
}

function getChartDataMonth(kasirName = 'series1') {
  return {
    type: 'line',
    height: 90,
    options: {
      chart: { sparkline: { enabled: true } },
      dataLabels: { enabled: false },
      colors: ['#fff'],
      fill: { type: 'solid', opacity: 1 },
      stroke: { curve: 'smooth', width: 3 },
      yaxis: { min: 0, max: 100, labels: { show: false } },
      tooltip: {
        fixed: { enabled: false },
        x: { show: false },
        y: { title: { formatter: () => 'Total Order' } },
        marker: { show: false }
      }
    },
    series: [
      {
        name: kasirName,
        data: generateSparklineData()
      }
    ]
  };
}

export default getChartDataMonth;
