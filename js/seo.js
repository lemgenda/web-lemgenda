// seo.js - All SEO related functionality
class BreadcrumbGenerator {
    constructor() {
        this.basePath = this.getBasePath();
        console.log('🍞 BreadcrumbGenerator constructor called');
        console.log('📍 Base path:', this.basePath);
        this.init();
    }

    getBasePath() {
        const currentPath = window.location.pathname;
        console.log('📍 Current path for base:', currentPath);

        if (currentPath.includes('/stranice/')) {
            return '../';
        } else if (currentPath.includes('/web-usluge/') || currentPath.includes('/usluge/')) {
            return '../';
        } else {
            return './';
        }
    }

    init() {
        console.log('🍞 BreadcrumbGenerator init started');

        // Try multiple events to ensure breadcrumbs show
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('🍞 DOMContentLoaded - generating breadcrumbs');
                this.generateBreadcrumbs();
            });
        } else {
            console.log('🍞 DOM already loaded - generating breadcrumbs immediately');
            this.generateBreadcrumbs();
        }

        // Backup in case DOMContentLoaded doesn't fire
        window.addEventListener('load', () => {
            console.log('🍞 Window load - checking breadcrumbs again');
            setTimeout(() => this.generateBreadcrumbs(), 100);
        });
    }

    createBreadcrumbTrail(path) {
        console.log('📍 Creating breadcrumb trail for path:', path);

        const breadcrumbs = [
            {
                name: 'Home',
                url: this.basePath + 'index.html',
                position: 1
            }
        ];

        // Check if this is a service page
        const isServicePage = path.includes('/web-usluge/');
        console.log('🔍 Is service page:', isServicePage);

        if (isServicePage) {
            breadcrumbs.push({
                name: 'Web Usluge',
                url: this.basePath + 'web-usluge/',
                position: 2
            });

            // Get current page name from the page title or h1
            let currentPageName = 'Web Usluge';

            // Try to get from h1 first
            const h1 = document.querySelector('h1');
            if (h1) {
                currentPageName = h1.textContent.trim();
            }
            // Fallback to document title
            else {
                const title = document.title;
                // Remove site name if present (assuming format "Page Name - Lemgenda")
                currentPageName = title.replace(' - Lemgenda', '').trim();
            }

            // Add current page
            breadcrumbs.push({
                name: currentPageName,
                url: window.location.href,
                position: 3
            });
        }

        console.log('🍞 Final breadcrumb trail:', breadcrumbs);
        return breadcrumbs;
    }

    generateBreadcrumbs() {
        const breadcrumbContainer = document.getElementById('breadcrumb-container');
        console.log('📦 Breadcrumb container found:', !!breadcrumbContainer);

        if (!breadcrumbContainer) {
            console.error('❌ Breadcrumb container not found!');
            this.createBreadcrumbContainer();
            return;
        }

        const currentPath = window.location.pathname;
        const breadcrumbs = this.createBreadcrumbTrail(currentPath);

        console.log('🍞 Breadcrumbs to render:', breadcrumbs);

        // Show breadcrumbs for all service pages, not just web-razvoj
        if (currentPath.includes('/web-usluge/')) {
            breadcrumbContainer.style.display = 'block';
            breadcrumbContainer.innerHTML = this.renderBreadcrumbs(breadcrumbs);
            console.log('✅ Breadcrumbs rendered for service page');
        } else {
            breadcrumbContainer.style.display = 'none';
            console.log('👻 Hiding breadcrumbs - not a service page');
        }
    }

    createBreadcrumbContainer() {
        console.log('🛠️ Creating breadcrumb container...');
        const container = document.createElement('div');
        container.id = 'breadcrumb-container';
        container.className = 'breadcrumb-container';

        // Insert after header container
        const headerContainer = document.getElementById('header-container');
        if (headerContainer && headerContainer.parentNode) {
            headerContainer.parentNode.insertBefore(container, headerContainer.nextSibling);
            console.log('✅ Breadcrumb container created');
        } else {
            console.error('❌ Cannot create breadcrumb container - no header container found');
        }
    }

    renderBreadcrumbs(breadcrumbs) {
        if (breadcrumbs.length <= 1) return '';

        return `
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <ol itemscope itemtype="https://schema.org/BreadcrumbList">
                    ${breadcrumbs.map((item, index) => `
                        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                            ${index === breadcrumbs.length - 1 ?
                `<span itemprop="name">${item.name}</span>` :
                `<a href="${item.url}" itemprop="item"><span itemprop="name">${item.name}</span></a>`
            }
                            <meta itemprop="position" content="${item.position}" />
                        </li>
                    `).join('')}
                </ol>
            </nav>
        `;
    }
}

class FAQSchemaGenerator {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.generateFAQSchema();
        });
    }

    generateFAQSchema() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (faqItems.length === 0) return;

        const faqData = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": []
        };

        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question span');
            const answer = item.querySelector('.faq-answer p');

            if (question && answer) {
                faqData.mainEntity.push({
                    "@type": "Question",
                    "name": question.textContent.trim(),
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": answer.textContent.trim()
                    }
                });
            }
        });

        if (faqData.mainEntity.length > 0) {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(faqData);
            document.head.appendChild(script);
        }
    }
}

class EnhancedStructuredData {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.generateOrganizationSchema();
            this.generateWebsiteSchema();
            this.generateLocalBusinessSchema();
            this.generateServiceSchema();
            this.generateWebPageSchema();
        });
    }

    generateOrganizationSchema() {
        const organizationData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Lemgenda",
            "description": "Professional web development, SEO optimization, logo design, and IT services in Sisak, Croatia.",
            "url": "https://lemgenda.com",
            "logo": "https://lemgenda.com/images/lemgenda-logo.svg",
            "sameAs": [
                "https://www.facebook.com/lemgenda",
                "https://www.linkedin.com/company/lemgenda"
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+385-95-383-1325",
                "contactType": "customer service",
                "email": "lemgenda.obrt@gmail.com",
                "areaServed": "HR",
                "availableLanguage": ["hr", "en"]
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Ulica Jurja Križanića 6",
                "addressLocality": "Sisak",
                "postalCode": "44000",
                "addressCountry": "HR"
            }
        };

        this.addStructuredData(organizationData);
    }

    generateWebsiteSchema() {
        const websiteData = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Lemgenda",
            "url": "https://lemgenda.com",
            "description": "Professional web development and IT services in Sisak, Croatia",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://lemgenda.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
            },
            "inLanguage": ["hr", "en"]
        };

        this.addStructuredData(websiteData);
    }

    generateLocalBusinessSchema() {
        const localBusinessData = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Lemgenda",
            "description": "Professional web development, SEO optimization, logo design, and IT services in Sisak, Croatia.",
            "url": "https://lemgenda.com",
            "logo": "https://lemgenda.com/images/lemgenda-logo.svg",
            "telephone": "+385-95-383-1325",
            "email": "lemgenda.obrt@gmail.com",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Ulica Jurja Križanića 6",
                "addressLocality": "Sisak",
                "postalCode": "44000",
                "addressCountry": "HR"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "45.4853",
                "longitude": "16.3739"
            },
            "openingHours": "Mo-Fr 09:00-17:00",
            "areaServed": ["Sisak", "Zagreb", "Croatia"],
            "serviceType": ["Web Development", "SEO Services", "Graphic Design", "IT Support"],
            "founder": {
                "@type": "Person",
                "name": "Lem Treursić",
                "jobTitle": "Founder & Lead Developer"
            }
        };

        this.addStructuredData(localBusinessData);
    }

    generateServiceSchema() {
        // Generate service schema for services pages
        if (document.querySelector('.services-grid') || window.location.pathname.includes('/web-usluge/') || window.location.pathname.includes('/usluge/')) {
            const serviceData = {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Web Development",
                "provider": {
                    "@type": "Organization",
                    "name": "Lemgenda"
                },
                "areaServed": "Croatia",
                "availableChannel": {
                    "@type": "ServiceChannel",
                    "serviceUrl": "https://lemgenda.com"
                }
            };

            this.addStructuredData(serviceData);
        }
    }

    generateWebPageSchema() {
        const webPageData = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": document.title,
            "description": document.querySelector('meta[name="description"]')?.content || "Professional web development services",
            "url": window.location.href,
            "inLanguage": document.documentElement.lang || "hr",
            "isPartOf": {
                "@type": "WebSite",
                "name": "Lemgenda",
                "url": "https://lemgenda.com"
            }
        };

        this.addStructuredData(webPageData);
    }

    addStructuredData(data) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    }
}

// Web Razvoj Specific Structured Data
class WebRazvojStructuredData {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            if (window.location.pathname.includes('web-razvoj')) {
                this.generateServiceSchema();
                this.generateFAQSchema();
                this.generateBreadcrumbSchema();
                this.generateProductSchemas();
            }
        });
    }

    generateServiceSchema() {
        const serviceData = {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Web Razvoj i Izrada Responzivnih Web Stranica",
            "description": "Profesionalni web razvoj i izrada responzivnih web stranica u Sisku, Hrvatska. Moderni, brzi i prilagodljivi web dizajn za sve uređaje.",
            "provider": {
                "@type": "Organization",
                "name": "Lemgenda",
                "url": "https://lemgenda.com"
            },
            "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "latitude": "45.4853",
                    "longitude": "16.3739"
                },
                "geoRadius": "50000"
            },
            "serviceType": ["Web Development", "Responsive Web Design", "Mobile-First Development"],
            "offers": {
                "@type": "AggregateOffer",
                "offerCount": "4",
                "lowPrice": "290",
                "highPrice": "7800",
                "priceCurrency": "EUR",
                "offers": [
                    {
                        "@type": "Offer",
                        "name": "tinyWeb Paket",
                        "price": "290",
                        "priceCurrency": "EUR",
                        "description": "Osnovni paket web razvoja - idealno za male obrte i freelancere"
                    },
                    {
                        "@type": "Offer",
                        "name": "midWeb Paket",
                        "price": "650",
                        "priceCurrency": "EUR",
                        "description": "Srednji paket web razvoja s naprednim funkcionalnostima"
                    },
                    {
                        "@type": "Offer",
                        "name": "proWeb Paket",
                        "price": "1450",
                        "priceCurrency": "EUR",
                        "description": "Napredni paket web razvoja s CMS sustavom"
                    },
                    {
                        "@type": "Offer",
                        "name": "enterpriseWeb Paket",
                        "price": "4200",
                        "priceCurrency": "EUR",
                        "description": "Enterprise paket web razvoja po mjeri"
                    }
                ]
            }
        };

        this.addStructuredData(serviceData);
    }

    generateFAQSchema() {
        const faqData = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Koliko dugo traje izrada web stranice?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Vrijeme izrade ovisi o kompleksnosti projekta. tinyWeb paket se isporučuje u 2 radna dana, midWeb u 5 radnih dana, proWeb u 10 radnih dana, a enterpriseWeb paket u 15-30 radnih dana."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Je li uključeno održavanje web stranice?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Svi paketi uključuju osnovno postavljanje i testiranje. Za redovno održavanje nudimo posebne pakete održavanja koji uključuju sigurnosne ažuriranje, backup i tehničku podršku."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Možete li preuzeti postojeću web stranicu?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Da, nudimo usluge migracije postojećih web stranica na nove tehnologije s poboljšanim performansama i sigurnošću."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Što je uključeno u cijenu paketa?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Svaki paket uključuje responzivni dizajn, SEO optimizaciju, sigurnosne značajke i tehničku podršku. Detaljne specifikacije svakog paketa možete pronaći na stranici."
                    }
                }
            ]
        };

        this.addStructuredData(faqData);
    }

    generateBreadcrumbSchema() {
        const breadcrumbData = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Početna",
                    "item": "https://lemgenda.com"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Web Usluge",
                    "item": "https://lemgenda.com/web-usluge/"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Web Razvoj",
                    "item": "https://lemgenda.com/web-usluge/web-razvoj.html"
                }
            ]
        };

        this.addStructuredData(breadcrumbData);
    }

    generateProductSchemas() {
        const packages = [
            {
                name: "tinyWeb Paket",
                description: "Osnovni paket web razvoja za male obrte i freelancere",
                price: "290",
                priceCurrency: "EUR",
                deliveryTime: "P2D"
            },
            {
                name: "midWeb Paket",
                description: "Srednji paket web razvoja s naprednim funkcionalnostima",
                price: "650",
                priceCurrency: "EUR",
                deliveryTime: "P5D"
            },
            {
                name: "proWeb Paket",
                description: "Napredni paket web razvoja s CMS sustavom",
                price: "1450",
                priceCurrency: "EUR",
                deliveryTime: "P10D"
            },
            {
                name: "enterpriseWeb Paket",
                description: "Enterprise paket web razvoja po mjeri",
                price: "4200",
                priceCurrency: "EUR",
                deliveryTime: "P15D"
            }
        ];

        packages.forEach(pkg => {
            const productData = {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": pkg.name,
                "description": pkg.description,
                "offers": {
                    "@type": "Offer",
                    "price": pkg.price,
                    "priceCurrency": pkg.priceCurrency,
                    "availability": "https://schema.org/InStock",
                    "deliveryLeadTime": pkg.deliveryTime
                }
            };

            this.addStructuredData(productData);
        });
    }

    addStructuredData(data) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    }
}

// Meta Tag Management
class MetaTagManager {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.ensureMetaTags();
            this.generateHreflangTags();
            this.generateCanonicalTag();
            this.generateRobotsTag();
        });
    }

    ensureMetaTags() {
        // Ensure essential meta tags exist
        const essentialTags = {
            'viewport': 'width=device-width, initial-scale=1.0',
            'description': this.getPageDescription(),
            'keywords': this.getPageKeywords(),
            'author': 'Lem Treursić, Lemgenda'
        };

        Object.entries(essentialTags).forEach(([name, content]) => {
            if (!document.querySelector(`meta[name="${name}"]`)) {
                const meta = document.createElement('meta');
                meta.name = name;
                meta.content = content;
                document.head.appendChild(meta);
            }
        });
    }

    getPageDescription() {
        const currentPath = window.location.pathname;

        const descriptions = {
            '/web-usluge/web-razvoj.html': 'Profesionalni web razvoj i izrada responzivnih web stranica u Sisku, Hrvatska. Moderni, brzi i prilagodljivi web dizajn za sve uređaje.',
            '/web-usluge/seo.html': 'SEO optimizacija web stranica za bolju vidljivost u pretraživačima. Poboljšajte svoj Google ranking s našim SEO uslugama.',
            '/web-usluge/e-commerce-razvoj.html': 'Razvoj e-commerce trgovina i online prodajnih sustava. Prilagođena rješenja za vaš online biznis.',
            '/stranice/kontakt.html': 'Kontaktirajte Lemgenda za web development usluge u Sisku. Besplatne konsultacije i ponude za vaš web projekt.'
        };

        return descriptions[currentPath] || 'Professional web development, SEO optimization, logo design, and IT services in Sisak, Croatia.';
    }

    getPageKeywords() {
        const currentPath = window.location.pathname;

        const keywords = {
            '/web-usluge/web-razvoj.html': 'web razvoj, izrada responzivnih web stranica, izrada responzivnih internet stranica, izrada web stranica, responzivne stranice, mobile-first stranice, web dizajn, Sisak, Hrvatska',
            '/web-usluge/seo.html': 'seo optimizacija, google optimizacija, poboljšanje rangiranja, seo usluge, optimizacija web stranica',
            '/web-usluge/e-commerce-razvoj.html': 'e-commerce razvoj, online trgovina, web shop, internet prodaja, e-trgovina'
        };

        return keywords[currentPath] || 'web development, SEO optimization, logo design, IT services, Sisak, Croatia';
    }

    generateHreflangTags() {
        const languages = [
            { lang: 'en', url: 'https://lemgenda.com/en/' },
            { lang: 'hr', url: 'https://lemgenda.com/' },
            { lang: 'x-default', url: 'https://lemgenda.com/' }
        ];

        // Get current page path without language prefix
        const currentPath = window.location.pathname;
        let enPath = currentPath;
        let hrPath = currentPath;

        // Adjust paths for language versions
        if (currentPath.includes('/en/')) {
            hrPath = currentPath.replace('/en/', '/');
            enPath = currentPath;
        } else if (!currentPath.includes('/en/') && currentPath !== '/') {
            enPath = '/en' + currentPath;
            hrPath = currentPath;
        }

        languages.forEach(({ lang, url }) => {
            let pageUrl = url;
            if (currentPath !== '/') {
                if (lang === 'en') {
                    pageUrl = 'https://lemgenda.com' + enPath;
                } else {
                    pageUrl = 'https://lemgenda.com' + hrPath;
                }
            }

            if (!document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`)) {
                const link = document.createElement('link');
                link.rel = 'alternate';
                link.hreflang = lang;
                link.href = pageUrl;
                document.head.appendChild(link);
            }
        });
    }

    generateCanonicalTag() {
        const canonicalUrl = 'https://lemgenda.com' + window.location.pathname;

        if (!document.querySelector('link[rel="canonical"]')) {
            const link = document.createElement('link');
            link.rel = 'canonical';
            link.href = canonicalUrl;
            document.head.appendChild(link);
        }
    }

    generateRobotsTag() {
        const robotsContent = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

        if (!document.querySelector('meta[name="robots"]')) {
            const meta = document.createElement('meta');
            meta.name = 'robots';
            meta.content = robotsContent;
            document.head.appendChild(meta);
        }
    }
}

// Performance and SEO Monitoring
class SEOMonitor {
    constructor() {
        this.init();
    }

    init() {
        this.monitorCoreWebVitals();
        this.trackUserEngagement();
        this.optimizeImages();
    }

    monitorCoreWebVitals() {
        // LCP (Largest Contentful Paint)
        const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);

            // Report to analytics
            this.reportMetric('LCP', lastEntry.startTime);
        });

        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // FID (First Input Delay)
        const fidObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                const delay = entry.processingStart - entry.startTime;
                console.log('FID:', delay);
                this.reportMetric('FID', delay);
            });
        });

        fidObserver.observe({ entryTypes: ['first-input'] });

        // CLS (Cumulative Layout Shift)
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

        // Report CLS on page hide
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.reportMetric('CLS', clsValue);
            }
        });
    }

    reportMetric(name, value) {
        // Send to analytics service
        if (window.gtag) {
            window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: name,
                value: Math.round(name === 'CLS' ? value * 1000 : value),
                non_interaction: true
            });
        }
    }

    trackUserEngagement() {
        let scrollDepth = 0;
        let timeOnPage = 0;

        // Track scroll depth
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollDepth = Math.max(scrollDepth, scrollPercent);
        });

        // Track time on page
        const startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            timeOnPage = Date.now() - startTime;

            // Report engagement metrics
            this.reportEngagementMetrics(scrollDepth, timeOnPage);
        });
    }

    reportEngagementMetrics(scrollDepth, timeOnPage) {
        // Send to analytics
        console.log('User Engagement - Scroll Depth:', scrollDepth + '%, Time on Page:', timeOnPage + 'ms');
    }

    optimizeImages() {
        // Lazy load images
        const images = document.querySelectorAll('img[loading="lazy"]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Main SEO Initializer
class SEOInitializer {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('🚀 Initializing SEO components...');

            // Initialize all SEO components
            new BreadcrumbGenerator();
            new FAQSchemaGenerator();
            new EnhancedStructuredData();
            new MetaTagManager();
            new WebRazvojStructuredData();
            new SEOMonitor();

            // Listen for language changes to regenerate SEO elements
            this.initLanguageChangeListener();

            // Initialize social media meta tags
            this.initSocialMetaTags();

            console.log('✅ SEO components initialized');
        });
    }

    initLanguageChangeListener() {
        document.addEventListener('languageChanged', (e) => {
            console.log('🔄 Language changed - regenerating SEO elements...', e.detail);

            // Regenerate breadcrumbs
            const breadcrumbGenerator = new BreadcrumbGenerator();
            breadcrumbGenerator.generateBreadcrumbs();

            // Regenerate meta tags
            const metaTagManager = new MetaTagManager();
            metaTagManager.ensureMetaTags();
            metaTagManager.generateHreflangTags();

            // Regenerate FAQ schema if FAQ exists
            const faqSchemaGenerator = new FAQSchemaGenerator();
            faqSchemaGenerator.generateFAQSchema();

            // Update page language attribute
            document.documentElement.lang = e.detail.language;
        });
    }

    initSocialMetaTags() {
        // Ensure Open Graph tags
        const ogTags = {
            'og:title': document.title,
            'og:description': document.querySelector('meta[name="description"]')?.content || '',
            'og:url': window.location.href,
            'og:type': 'website',
            'og:image': 'https://lemgenda.com/images/lemgenda-og-image.jpg',
            'og:locale': document.documentElement.lang === 'hr' ? 'hr_HR' : 'en_US'
        };

        Object.entries(ogTags).forEach(([property, content]) => {
            if (!document.querySelector(`meta[property="${property}"]`)) {
                const meta = document.createElement('meta');
                meta.property = property;
                meta.content = content;
                document.head.appendChild(meta);
            }
        });

        // Ensure Twitter Card tags
        const twitterTags = {
            'twitter:card': 'summary_large_image',
            'twitter:title': document.title,
            'twitter:description': document.querySelector('meta[name="description"]')?.content || '',
            'twitter:image': 'https://lemgenda.com/images/lemgenda-twitter-image.jpg'
        };

        Object.entries(twitterTags).forEach(([name, content]) => {
            if (!document.querySelector(`meta[name="${name}"]`)) {
                const meta = document.createElement('meta');
                meta.name = name;
                meta.content = content;
                document.head.appendChild(meta);
            }
        });
    }
}

// Initialize SEO
new SEOInitializer();