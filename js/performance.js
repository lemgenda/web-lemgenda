// Performance monitoring and Core Web Vitals
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        this.monitorCoreWebVitals();
        this.monitorLoadTimes();
        this.monitorLargestContentfulPaint();
    }

    monitorCoreWebVitals() {
        // LCP - Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);

            // Send to analytics
            this.sendToAnalytics('LCP', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // FID - First Input Delay
        const fidObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                const delay = entry.processingStart - entry.startTime;
                console.log('FID:', delay);
                this.sendToAnalytics('FID', delay);
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // CLS - Cumulative Layout Shift
        let clsValue = 0;
        let clsEntries = [];
        const clsObserver = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsEntries.push(entry);
                    clsValue += entry.value;
                    console.log('CLS:', clsValue);
                }
            }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    monitorLoadTimes() {
        window.addEventListener('load', () => {
            // Page load time
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('Page Load Time:', loadTime);
            this.sendToAnalytics('PageLoad', loadTime);

            // DOM content loaded
            const domContentLoaded = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
            console.log('DOM Content Loaded:', domContentLoaded);
            this.sendToAnalytics('DOMContentLoaded', domContentLoaded);
        });
    }

    monitorLargestContentfulPaint() {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            const lcp = lastEntry.renderTime || lastEntry.loadTime;
            console.log('LCP Time:', lcp);

            if (lcp > 2500) {
                console.warn('LCP is above recommended threshold:', lcp);
            }
        }).observe({ entryTypes: ['largest-contentful-paint'] });
    }

    sendToAnalytics(metric, value) {
        // Send to your analytics service
        if (window.gtag) {
            gtag('event', 'performance', {
                'event_category': 'Core Web Vitals',
                'event_label': metric,
                'value': Math.round(value)
            });
        }

        // Send to HubSpot
        if (window._hsq) {
            window._hsq.push(['trackEvent', {
                id: 'performance_metric',
                value: metric + ': ' + value
            }]);
        }
    }
}

// Initialize performance monitoring
document.addEventListener('DOMContentLoaded', () => {
    new PerformanceMonitor();
});