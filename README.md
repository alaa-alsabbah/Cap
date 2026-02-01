# Cap Environmental Solutions Dashboard

نظام إدارة النفايات - Cap Environmental Solutions Dashboard

A modern, responsive dashboard for waste management and environmental solutions.

## Features

- 📊 Interactive Dashboard with real-time analytics
- 🚗 Vehicle Management
- 🗺️ Interactive Maps
- 📈 Analytics and Reports
- 👤 Driver Behavior Tracking
- 🛣️ Route Management
- 📱 Mobile Application Integration
- 🔔 Alerts and Notifications
- 💬 Complaints Management

## Technologies Used

- HTML5
- CSS3 (Custom CSS with Variables)
- JavaScript
- Bootstrap 5
- ApexCharts
- RTL (Right-to-Left) Support for Arabic

## GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Initialize Git Repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com/new)
   - Create a new repository
   - Don't initialize with README (since you already have one)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on **Settings**
   - Scroll down to **Pages** section
   - Under **Source**, select **GitHub Actions**
   - The site will be automatically deployed when you push to the `main` branch

5. **Access Your Site**:
   - Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
   - It may take a few minutes for the first deployment to complete

### Manual Deployment

If you prefer to deploy manually, you can use the `gh-pages` branch method:

```bash
# Install gh-pages package (if using npm)
npm install --save-dev gh-pages

# Add deploy script to package.json
# Then run:
npm run deploy
```

## Local Development

Simply open `index.html` in your web browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Project Structure

```
Cap/
├── index.html              # Main dashboard page
├── vehicles.html           # Vehicle management
├── map.html                # Interactive map
├── analytics.html          # Analytics page
├── driver-behavior.html    # Driver behavior tracking
├── routes.html             # Route management
├── stock-market.html       # Stock market data
├── complaints.html         # Complaints management
├── alerts.html             # Alerts and notifications
├── application.html        # Mobile app information
├── css/                    # Custom stylesheets
│   ├── main.css
│   ├── variables.css
│   └── responsive.css
├── js/                     # JavaScript files
│   ├── main.js
│   ├── dashboard.js
│   └── ...
└── assets/                 # Static assets
    ├── bootstrap/          # Bootstrap framework
    ├── apexcharts/         # Chart library
    ├── fonts/              # Custom fonts
    ├── icons/              # Icon fonts
    └── images/             # Images and icons
```

## License

© 2026 CAP environmental solutions | Powered by mangcoding
