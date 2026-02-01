// Map page JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Initialize map
    const map = L.map('map', {
        zoomControl: false,
        attributionControl: false
    }).setView([35.2271, -80.8431], 15); // Charlotte, NC coordinates

    // Add OpenStreetMap tiles with full details (shows parks in green, place names, etc.)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // Alternative: Use Stamen Toner Lite for cleaner look with details
    // L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png', {
    //     attribution: 'Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap contributors',
    //     subdomains: 'abcd',
    //     maxZoom: 20
    // }).addTo(map);

    // Add zoom controls
    L.control.zoom({
        position: 'topright'
    }).addTo(map);

    // Custom icon creation function
    function createCustomIcon(color, iconType) {
        let iconHtml = '';
        let iconColor = color;
        
        if (iconType === 'truck') {
            // Green or Orange truck
            iconHtml = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 8h-3V4H1v13h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="white"/>
            </svg>`;
        } else if (iconType === 'pin') {
            // Blue location pin
            iconHtml = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="white"/>
            </svg>`;
        } else if (iconType === 'recycle') {
            // Green recycling symbol
            iconHtml = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="white"/>
            </svg>`;
        } else {
            // Red alert/exclamation
            iconHtml = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="white"/>
            </svg>`;
        }
        
        return L.divIcon({
            html: `<div style="
                background-color: ${iconColor};
                border: 2px solid white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 8px rgba(0,0,0,0.4);
                cursor: pointer;
            ">${iconHtml}</div>`,
            className: 'custom-map-icon',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });
    }

    // Sample markers data
    const markers = [
        { lat: 35.2271, lng: -80.8431, type: 'active-vehicle', name: 'مركبة 1' },
        { lat: 35.2300, lng: -80.8500, type: 'waiting-vehicle', name: 'مركبة 2' },
        { lat: 35.2250, lng: -80.8400, type: 'collection-point', name: 'نقطة جمع 2' },
        { lat: 35.2200, lng: -80.8450, type: 'recycling-center', name: 'مركز إعادة تدوير 1' },
        { lat: 35.2320, lng: -80.8380, type: 'alert', name: 'تنبيه' },
        { lat: 35.2280, lng: -80.8480, type: 'active-vehicle', name: 'مركبة 3' },
        { lat: 35.2240, lng: -80.8420, type: 'collection-point', name: 'نقطة جمع 1' },
        { lat: 35.2260, lng: -80.8460, type: 'recycling-center', name: 'مركز إعادة تدوير 2' },
    ];

    // Icon colors and types
    const iconConfig = {
        'active-vehicle': { color: '#4CAF50', type: 'truck' },
        'waiting-vehicle': { color: '#FF9800', type: 'truck' },
        'collection-point': { color: '#2196F3', type: 'pin' },
        'recycling-center': { color: '#4CAF50', type: 'recycle' },
        'alert': { color: '#F44336', type: 'alert' }
    };

    // Add markers to map
    markers.forEach(markerData => {
        const config = iconConfig[markerData.type];
        const icon = createCustomIcon(config.color, config.type);
        
        const marker = L.marker([markerData.lat, markerData.lng], { icon })
            .addTo(map)
            .bindPopup(markerData.name);

        // Handle marker click for collection points and other markers
        marker.on('click', function() {
            // Update details panel
            updateDetailsPanel(markerData);
        });
    });

    // Update details panel function
    function updateDetailsPanel(data) {
        // Find all map-detail-value spans
        const detailValues = document.querySelectorAll('.map-detail-value span');
        const progressValue = document.querySelector('.map-detail-progress-value');
        const progressFill = document.querySelector('.map-detail-progress-fill');
        
        // Update coordinates (first span in first subcard)
        if (detailValues[0]) {
            detailValues[0].textContent = data.coordinates || '70.0, 30.0';
        }
        
        // Update name (first span in second subcard)
        if (detailValues[1]) {
            detailValues[1].textContent = data.name || 'نقطة جمع 2';
        }
        
        // Update progress value and bar
        if (progressValue && data.progress !== undefined) {
            progressValue.textContent = data.progress + '%';
        }
        
        if (progressFill && data.progress !== undefined) {
            progressFill.style.width = data.progress + '%';
        }
        
        console.log('Selected:', data);
    }
    
    // Set default details for first collection point
    const defaultCollectionPoint = markers.find(m => m.type === 'collection-point');
    if (defaultCollectionPoint) {
        updateDetailsPanel(defaultCollectionPoint);
    }
});
