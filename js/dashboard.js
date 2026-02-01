// Dashboard-specific JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Helper to get CSS variables
    const getStyle = window.getStyle || ((varName) => getComputedStyle(document.documentElement).getPropertyValue(varName).trim());
    const body = document.body;

    // Store chart instances
    const chartInstances = {
        kpi1: null,
        kpi2: null,
        kpi3: null,
        kpi4: null,
        monthlyTrends: null,
        wasteDistribution: null,
        dailyActivity: null
    };

    // Update charts theme
    function updateChartsTheme(theme) {
        Object.values(chartInstances).forEach(chart => {
            if (chart) {
                try {
                    chart.updateOptions({
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
        });
    }

    // Listen for theme changes from main.js
    window.addEventListener('themeChanged', (event) => {
        updateChartsTheme(event.detail.theme);
    });

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
                            show: true,
                            fontSize: '16px',
                            fontWeight: 700,
                            color: getStyle('--text-primary'),
                            offsetY: 13,
                            formatter: function(val) {
                                return textValue || val + '%';
                            }
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

    // KPI Chart 1: عدد المواقع النشطة (53%)
    chartInstances.kpi1 = createKPIChart('kpi-1', 53, '#00d2ff', '53%');
    if (chartInstances.kpi1) {
        chartInstances.kpi1.render();
        setTimeout(() => addIconToChart('kpi-1'), 300);
    }

    // KPI Chart 2: نسبة إعادة التدوير (62%)
    chartInstances.kpi2 = createKPIChart('kpi-2', 62, '#00897b', '62%');
    if (chartInstances.kpi2) {
        chartInstances.kpi2.render();
        setTimeout(() => addIconToChart('kpi-2'), 300);
    }

    // KPI Chart 3: النفايات المعاد تدويرها (32%)
    chartInstances.kpi3 = createKPIChart('kpi-3', 32, '#ff9800', '32%');
    if (chartInstances.kpi3) {
        chartInstances.kpi3.render();
        setTimeout(() => addIconToChart('kpi-3'), 300);
    }

    // KPI Chart 4: إجمالي النفايات (80%)
    chartInstances.kpi4 = createKPIChart('kpi-4', 80, '#00d2ff', '80%');
    if (chartInstances.kpi4) {
        chartInstances.kpi4.render();
        setTimeout(() => addIconToChart('kpi-4'), 300);
    }

    // Monthly Trends Chart (Line Chart)
    const monthlyTrendsOptions = {
        chart: {
            type: 'area',
            height: 550,
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
                name: 'العضوية',
                data: [35, 15, 25, 45, 70, 60, 60, 180, 150, 120, 100, 90]
            },
            {
                name: 'المعاد تدويرها',
                data: [0, 5, 10, 30, 50, 80, 110, 140, 180, 200, 220, 240]
            }
        ],
        markers: {
            size: Array(12).fill(0).concat([0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0]), // 24 elements: 12 for first series (all 0) + 12 for second series (only July = index 18 has marker)
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

    chartInstances.monthlyTrends = new ApexCharts(document.querySelector('#monthlyTrendsChart'), monthlyTrendsOptions);
    chartInstances.monthlyTrends.render();

    // Waste Distribution Chart (Multi-Ring Radial Bar)
    const maxValue = 1000;
    const percentages = [
        Math.round((862 / maxValue) * 100), // ورق وكرتون (86%)
        Math.round((753 / maxValue) * 100), // معادن (75%)
        Math.round((553 / maxValue) * 100)  // بلاستيك (55%)
    ];
    
    const wasteDistributionOptions = {
        chart: {
            type: 'radialBar',
            height: 'auto',
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800
            }
        },
        series: percentages,
        colors: ['#E323FF', '#4DFFDF', '#FFD422'], // Gradient start colors
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '40%'
                },
                track: {
                    background: 'transparent',
                    strokeWidth: '100%'
                },
                dataLabels: {
                    show: false
                }
            }
        },
        labels: ['ورق وكرتون', 'معادن', 'بلاستيك'],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'linear',
                shadeIntensity: 1,
                gradientToColors: [
                    ['#7517F8'], // Purple gradient
                    ['#4DA1FF'], // Teal gradient 
                    ['#FF7D05']  // Orange gradient 
                ],
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: 'round'
        },
        legend: {
            show: false
        },
        tooltip: {
            theme: body.getAttribute('data-theme') || 'dark',
            y: {
                formatter: function(val, { seriesIndex }) {
                    const values = [862, 753, 553];
                    return values[seriesIndex] + ' طن';
                }
            }
        }
    };
    
    chartInstances.wasteDistribution = new ApexCharts(document.querySelector('#wasteDistributionChart'), wasteDistributionOptions);
    chartInstances.wasteDistribution.render();

    // Daily Activity Chart (Bar Chart)
    const dailyActivityOptions = {
        chart: {
            type: 'bar',
            height: 150,
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
                columnWidth: '60%',
                borderRadius: 4,
                dataLabels: {
                    position: 'top'
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#9c27b0', '#00d2ff'], // Magenta for operations, Blue for weight
        series: [
            {
                name: 'عدد عمليات الجمع',
                data: [8, 12, 10, 18, 15, 22, 20, 25, 23, 28]
            },
            {
                name: 'الوزن (طن)',
                data: [12, 19, 15, 25, 22, 30, 28, 35, 32, 40]
            }
        ],
        xaxis: {
            categories: Array.from({ length: 10 }, (_, i) => {
                const hour = i.toString().padStart(2, '0');
                return hour + ':00';
            }),
            labels: {
                style: {
                    colors: getStyle('--text-muted'),
                    fontSize: '10px'
                },
                rotate: -45,
                rotateAlways: false
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
                    colors: getStyle('--text-muted'),
                    fontSize: '11px'
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
            position: 'bottom',
            horizontalAlign: 'center',
            markers: {
                width: 8,
                height: 8,
                radius: 4
            },
            labels: {
                colors: getStyle('--text-secondary'),
                useSeriesColors: false
            }
        },
        tooltip: {
            theme: body.getAttribute('data-theme') || 'dark'
        }
    };

    chartInstances.dailyActivity = new ApexCharts(document.querySelector('#dailyActivityChart'), dailyActivityOptions);
    chartInstances.dailyActivity.render();

    // Fix chart rendering issues on mobile/resize
    const resizeCharts = () => {
        // Force all charts to resize with proper dimensions
        Object.values(chartInstances).forEach(chart => {
            if (chart) {
                try {
                    // Use updateOptions to force re-render with current dimensions
                    if (typeof chart.updateOptions === 'function') {
                        chart.updateOptions({}, false, false, false);
                    }
                    // Also call resize
                    if (typeof chart.resize === 'function') {
                        setTimeout(() => {
                            chart.resize();
                        }, 50);
                    }
                } catch (e) {
                    if (window.DEBUG_MODE) {
                        console.error('Chart resize error:', e);
                    }
                }
            }
        });
        
        // Handle waste distribution chart rings separately
        const wasteRings = document.querySelectorAll('#wasteDistributionChart > div[id^="wasteRing"]');
        wasteRings.forEach(ringDiv => {
            try {
                const ringChart = ApexCharts.getChartByID(ringDiv.id);
                if (ringChart) {
                    if (typeof ringChart.updateOptions === 'function') {
                        ringChart.updateOptions({}, false, false, false);
                    }
                    if (typeof ringChart.resize === 'function') {
                        setTimeout(() => {
                            ringChart.resize();
                        }, 50);
                    }
                }
            } catch (e) {
                if (window.DEBUG_MODE) {
                    console.error('Ring chart resize error:', e);
                }
            }
        });
    };

    // Resize charts on window resize with better debouncing
    let resizeTimeout;
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCharts();
        }, 100);
    };

    window.addEventListener('resize', handleResize);
    
    // Handle orientation change
    const handleOrientationChange = () => {
        setTimeout(() => {
            resizeCharts();
        }, 200);
    };
    window.addEventListener('orientationchange', handleOrientationChange);

    // Observe sidebar visibility changes (for mobile/tablet transitions)
    const sidebar = document.querySelector('.sidebar');
    let sidebarObserver = null;
    if (sidebar && window.MutationObserver) {
        sidebarObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    setTimeout(() => {
                        resizeCharts();
                    }, 200);
                }
            });
        });
        
        sidebarObserver.observe(sidebar, {
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    }

    // Use ResizeObserver for container size changes
    const resizeObservers = [];
    if (window.ResizeObserver) {
        const chartContainers = document.querySelectorAll('.chart-card, #wasteDistributionChart, #monthlyTrendsChart, #dailyActivityChart');
        chartContainers.forEach(container => {
            const resizeObserver = new ResizeObserver(() => {
                resizeCharts();
            });
            resizeObserver.observe(container);
            resizeObservers.push(resizeObserver);
        });
    }

    // Cleanup event listeners and observers on page unload
    window.addEventListener('beforeunload', () => {
        if (sidebarObserver) {
            sidebarObserver.disconnect();
        }
        resizeObservers.forEach(observer => {
            observer.disconnect();
        });
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleOrientationChange);
    });

    // Fix initial render - multiple attempts to ensure it works
    const initCharts = () => {
        resizeCharts();
    };

    // Run on load - more aggressive timing
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initCharts, 50);
            setTimeout(initCharts, 200);
            setTimeout(initCharts, 500);
        });
    } else {
        setTimeout(initCharts, 50);
        setTimeout(initCharts, 200);
        setTimeout(initCharts, 500);
    }

    window.addEventListener('load', () => {
        setTimeout(initCharts, 100);
        setTimeout(initCharts, 400);
        setTimeout(initCharts, 800);
    });
});
