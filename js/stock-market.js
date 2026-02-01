// Stock Market-specific JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Helper to get CSS variables
    const getStyle = window.getStyle || ((varName) => getComputedStyle(document.documentElement).getPropertyValue(varName).trim());
    const body = document.body;

    // Store chart instance
    let priceTrendChart = null;

    // Update chart theme
    function updateChartTheme(theme) {
        if (priceTrendChart) {
            try {
                priceTrendChart.updateOptions({
                    theme: {
                        mode: theme
                    }
                });
            } catch (e) {
                if (window.DEBUG_MODE) {
                    console.error('Chart theme update error:', e);
                }
            }
        }
    }

    // Listen for theme changes from main.js
    window.addEventListener('themeChanged', (event) => {
        updateChartTheme(event.detail.theme);
    });

    // Price Trend Chart (Grouped Bar Chart)
    const priceTrendOptions = {
        chart: {
            type: 'bar',
            height: 300,
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                borderRadius: 4,
                dataLabels: {
                    position: 'top'
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 0
        },
        colors: ['#D9D9D9', '#003A48'], // Gray for first series, dark teal base for second series gradient
        series: [
            {
                name: 'Series 1',
                data: [250, 300, 450, 500, 600, 750]
            },
            {
                name: 'Series 2',
                data: [500, 550, 600, 650, 750, 800]
            }
        ],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            labels: {
                style: {
                    colors: getStyle('--text-muted') || '#999',
                    fontSize: '12px'
                }
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: getStyle('--text-muted') || '#999',
                    fontSize: '12px'
                }
            },
            grid: {
                borderColor: 'rgba(255,255,255,0.05)'
            }
        },
        grid: {
            borderColor: 'rgba(255,255,255,0.05)',
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        legend: {
            show: false
        },
        tooltip: {
            theme: body.getAttribute('data-theme') || 'dark',
            y: {
                formatter: function(val) {
                    return val + ' ر.س';
                }
            }
        },
        fill: {
            opacity: 1,
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'linear',
                shadeIntensity: 1,
                gradientToColors: [null, '#00A69A'], // First series stays solid, second gets gradient
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 31.58, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: '#003A48',
                        opacity: 1
                    },
                    {
                        offset: 31.58,
                        color: '#003A48',
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: '#00A69A',
                        opacity: 1
                    }
                ]
            }
        }
    };

    const chartElement = document.querySelector('#price-trend-chart');
    if (chartElement) {
        priceTrendChart = new ApexCharts(chartElement, priceTrendOptions);
        priceTrendChart.render();
    }

    // Resize chart on window resize
    let resizeTimeout;
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (priceTrendChart) {
                priceTrendChart.update();
            }
        }, 100);
    };

    window.addEventListener('resize', handleResize);
    
    // Handle orientation change
    const handleOrientationChange = () => {
        setTimeout(() => {
            if (priceTrendChart) {
                priceTrendChart.update();
            }
        }, 200);
    };
    window.addEventListener('orientationchange', handleOrientationChange);
});
