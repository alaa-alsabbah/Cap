document.addEventListener('DOMContentLoaded', function () {
    // Helper to get CSS variables
    const getStyle = (varName) => getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

    // Store chart instances
    const vehiclesChartInstances = {
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

    // Vehicles KPI Chart 1: المركبات النشطة (32% - 4 out of 6 vehicles)
    vehiclesChartInstances.kpi1 = createKPIChart('vehicles-kpi-1', 32, '#00d2ff', '32%');
    if (vehiclesChartInstances.kpi1) {
        vehiclesChartInstances.kpi1.render();
        setTimeout(() => addIconToChart('vehicles-kpi-1'), 300);
    }

    // Vehicles KPI Chart 2: عمليات الجمع اليوم (32%)
    vehiclesChartInstances.kpi2 = createKPIChart('vehicles-kpi-2', 32, '#00d2ff', '32%');
    if (vehiclesChartInstances.kpi2) {
        vehiclesChartInstances.kpi2.render();
        setTimeout(() => addIconToChart('vehicles-kpi-2'), 300);
    }

    // Vehicles KPI Chart 3: متوسط الحمولة (32%)
    vehiclesChartInstances.kpi3 = createKPIChart('vehicles-kpi-3', 32, '#ff9800', '32%');
    if (vehiclesChartInstances.kpi3) {
        vehiclesChartInstances.kpi3.render();
        setTimeout(() => addIconToChart('vehicles-kpi-3'), 300);
    }

    // Vehicles KPI Chart 4: المسافة المقطوعة (32%)
    vehiclesChartInstances.kpi4 = createKPIChart('vehicles-kpi-4', 32, '#ff9800', '32%');
    if (vehiclesChartInstances.kpi4) {
        vehiclesChartInstances.kpi4.render();
        setTimeout(() => addIconToChart('vehicles-kpi-4'), 300);
    }

    // Fix chart rendering issues on mobile/resize
    const resizeCharts = () => {
        Object.values(vehiclesChartInstances).forEach(chart => {
            if (chart) {
                try {
                    if (typeof chart.updateOptions === 'function') {
                        chart.updateOptions({}, false, false, false);
                    }
                    if (typeof chart.resize === 'function') {
                        setTimeout(() => {
                            chart.resize();
                        }, 50);
                    }
                } catch (e) {
                    if (window.DEBUG_MODE) {
                        console.error('Vehicles chart resize error:', e);
                    }
                }
            }
        });
    };

    // Resize charts on window resize with debouncing
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

    // Use ResizeObserver for container size changes
    const resizeObservers = [];
    if (window.ResizeObserver) {
        const chartContainers = document.querySelectorAll('.kpi-card');
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
        resizeObservers.forEach(observer => {
            observer.disconnect();
        });
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleOrientationChange);
    });

    // Fix initial render
    const initCharts = () => {
        resizeCharts();
    };

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initCharts, 50);
            setTimeout(initCharts, 200);
        });
    } else {
        setTimeout(initCharts, 50);
        setTimeout(initCharts, 200);
    }

    window.addEventListener('load', () => {
        setTimeout(initCharts, 100);
        setTimeout(initCharts, 400);
    });

    // Initialize Vehicle Progress Bars
    // This function reads data-value attributes and sets the width
    // Backend developers just need to set data-value="X" where X is 0-100
    const initProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress-bar[data-value]');
        progressBars.forEach(bar => {
            const value = bar.getAttribute('data-value');
            if (value !== null && value !== '') {
                // Ensure value is between 0 and 100
                const percentage = Math.min(100, Math.max(0, parseFloat(value)));
                bar.style.width = percentage + '%';
            }
        });
    };

    // Initialize progress bars on page load
    initProgressBars();

    // Also run on load event to ensure DOM is ready
    window.addEventListener('load', () => {
        initProgressBars();
    });
});
