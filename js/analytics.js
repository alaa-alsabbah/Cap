// Analytics-specific JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Helper to get CSS variables
    const getStyle = (varName) => getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

    // Store chart instances
    const analyticsChartInstances = {
        kpi1: null,
        kpi2: null,
        kpi3: null,
        kpi4: null
    };

    // KPI Charts (Circular Progress)
    const createKPIChart = (id, percent, color, textValue) => {
        const chartElement = document.getElementById(id);
        if (!chartElement) return null;

        const options = {
            chart: {
                type: 'radialBar',
                height: 90,
                width: 90,
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '65%'
                    },
                    track: {
                        background: 'rgb(255, 255, 255)',
                        strokeWidth: '5%'
                    },
                    dataLabels: {
                        name: {
                            show: false
                        },
                        value: {
                            show: false
                        }
                    }
                }
            },
            fill: {
                type: 'solid',
                colors: [color]
            },
            stroke: {
                lineCap: 'round',
                width: 1,
                curve: 'straight'
            },
            series: [percent]
        };

        const chart = new ApexCharts(chartElement, options);
        return chart;
    };

    // Helper function to add icon to chart
    const addIconToChart = (chartElementId) => {
        const chartElement = document.getElementById(chartElementId);
        if (!chartElement) return;
        
        // Check if icon already exists
        if (chartElement.querySelector('.kpi-chart-icon')) return;
        
        const iconOverlay = document.createElement('div');
        iconOverlay.className = 'kpi-chart-icon';
        iconOverlay.innerHTML = '<i class="icon-chart"></i>';
        chartElement.appendChild(iconOverlay);
    };

    // Analytics KPI Chart 1: توفير محتمل (18%)
    analyticsChartInstances.kpi1 = createKPIChart('analytics-kpi-1', 18, '#ff9800', '');
    if (analyticsChartInstances.kpi1) {
        analyticsChartInstances.kpi1.render();
        setTimeout(() => addIconToChart('analytics-kpi-1'), 300);
    }

    // Analytics KPI Chart 2: حاويات ستمتلئ قريباً (low percentage, around 10-15%)
    analyticsChartInstances.kpi2 = createKPIChart('analytics-kpi-2', 12, '#ff9800', '');
    if (analyticsChartInstances.kpi2) {
        analyticsChartInstances.kpi2.render();
        setTimeout(() => addIconToChart('analytics-kpi-2'), 300);
    }

    // Analytics KPI Chart 3: التوقع للشهر القادم (around 60-70%)
    analyticsChartInstances.kpi3 = createKPIChart('analytics-kpi-3', 65, '#00d2ff', '');
    if (analyticsChartInstances.kpi3) {
        analyticsChartInstances.kpi3.render();
        setTimeout(() => addIconToChart('analytics-kpi-3'), 300);
    }

    // Analytics KPI Chart 4: التوفير البيئي المقدر (around 40-50%)
    analyticsChartInstances.kpi4 = createKPIChart('analytics-kpi-4', 45, '#9c27b0', '');
    if (analyticsChartInstances.kpi4) {
        analyticsChartInstances.kpi4.render();
        setTimeout(() => addIconToChart('analytics-kpi-4'), 300);
    }

    // Monthly Trends Chart (Line Chart)
    const body = document.body;
    const analyticsMonthlyTrendsOptions = {
        chart: {
            type: 'area',
            height: 300,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 1
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.3,
                opacityTo: 0,
                stops: [0, 100]
            }
        },
        colors: ['#00d2ff', '#9c27b0'], // Blue for Membership, Purple for Recycled
        series: [
            {
                name: 'الحد الاعلى',
                data: [35, 15, 25, 45, 70, 60, 60, 180, 150, 120, 100, 90]
            },
            {
                name: 'الحد الادنى',
                data: [0, 5, 10, 30, 50, 80, 110, 140, 180, 200, 220, 240]
            }
        ],
        markers: {
            size: Array(12).fill(0).concat([0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0]),
            colors: Array(18).fill('transparent').concat(['#9c27b0']).concat(Array(5).fill('transparent')),
            strokeColors: Array(18).fill('transparent').concat(['#9c27b0']).concat(Array(5).fill('transparent')),
            strokeWidth: 2,
            hover: {
                size: 7
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
                style: {
                    colors: getStyle('--text-muted'),
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
            min: 0,
            max: 250,
            tickAmount: 7,
            labels: {
                style: {
                    colors: getStyle('--text-muted'),
                    fontSize: '12px'
                },
                formatter: function(val) {
                    return val + 'K';
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
            }
        },
        legend: {
            show: false // Legend is now in HTML, not in chart
        },
        tooltip: {
            theme: body.getAttribute('data-theme') || 'dark',
            y: {
                formatter: function(val) {
                    return val.toLocaleString() + ' طن';
                }
            }
        }
    };

    const analyticsMonthlyTrendsChart = new ApexCharts(document.querySelector('#analyticsMonthlyTrendsChart'), analyticsMonthlyTrendsOptions);
    analyticsMonthlyTrendsChart.render();

    // Container Prediction Charts
    const createContainerChart = (id, percent, color) => {
        const chartElement = document.getElementById(id);
        if (!chartElement) return null;

        const options = {
            chart: {
                type: 'radialBar',
                height: 150,
                width: 150,
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '70%'
                    },
                    track: {
                        background: 'rgba(255, 255, 255, 0.1)',
                        strokeWidth: '60%'
                    },
                    dataLabels: {
                        show: false
                    }
                }
            },
            fill: {
                type: 'solid',
                colors: [color]
            },
            stroke: {
                lineCap: 'round'
            },
            series: [percent]
        };

        const chart = new ApexCharts(chartElement, options);
        chart.render();
        return chart;
    };

    // Create container charts
    createContainerChart('container-chart-1', 78, '#ff9800'); // Orange
    createContainerChart('container-chart-2', 92, '#f44336'); // Red
    createContainerChart('container-chart-3', 85, '#ff9800'); // Orange
    createContainerChart('container-chart-4', 65, '#00d2ff'); // Teal

    // Maintenance Prediction Charts
    const createMaintenanceChart = (id, percent, color) => {
        const chartElement = document.getElementById(id);
        if (!chartElement) return null;

        const options = {
            chart: {
                type: 'radialBar',
                height: 100,
                width: 100,
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '60%'
                    },
                    track: {
                        background: 'rgba(255, 255, 255, 0.1)',
                        strokeWidth: '60%'
                    },
                    dataLabels: {
                        show: false
                    }
                }
            },
            fill: {
                type: 'solid',
                colors: [color]
            },
            stroke: {
                lineCap: 'round'
            },
            series: [percent]
        };

        const chart = new ApexCharts(chartElement, options);
        chart.render();
        return chart;
    };

    // Create maintenance charts (showing 12% on outer ring, but we'll use 12 as percentage for visual)
    createMaintenanceChart('maintenance-chart-1', 12, '#f44336'); // Red
    createMaintenanceChart('maintenance-chart-2', 12, '#f44336'); // Red
});
