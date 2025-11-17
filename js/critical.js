class CriticalApp {
    constructor() {
        this.basePath = this.getBasePath();
        this.initialized = false;
        this.init();
    }

    getBasePath() {
        // Delegate to TranslationManager for consistent path resolution
        if (window.translationManager && window.translationManager.getBasePath) {
            return window.translationManager.getBasePath();
        }
        return '../';
    }

    async init() {
        if (this.initialized) return;

        console.log('🚀 CriticalApp initializing...');

        // Generate components first (they use data-translate attributes)
        await this.generateSharedComponents();

        // Initialize functionality that doesn't depend on translations
        this.initTheme();
        this.initNavigation();
        this.initLanguageSwitcher();
        this.initBackToTop();
        this.initModals();
        this.initAccessibility();
        this.initContactForms();
        this.initBasicFAQ();

        // Initialize cookie consent with proper delay
        setTimeout(() => {
            this.initCookieConsent();
        }, 2000);

        this.initialized = true;
        console.log('✅ CriticalApp initialized successfully');
    }

    generateSharedComponents() {
        return new Promise((resolve) => {
            console.log('📦 Generating shared components...');
            this.generateHeader();
            this.generateFooter();
            this.generateModals();

            setTimeout(() => {
                console.log('✅ Shared components generated');
                resolve();
            }, 100);
        });
    }

    generateHeader() {
        const headerContainer = document.getElementById('header-container');
        if (!headerContainer) {
            console.error('❌ Header container not found');
            return;
        }

        const isInPagesFolder = window.location.pathname.includes('/pages/');
        const isInServicesFolder = window.location.pathname.includes('/services/');
        const basePath = this.basePath;

        let kontaktPath;
        if (isInPagesFolder) {
            kontaktPath = 'kontakt.html';
        } else if (isInServicesFolder) {
            kontaktPath = '../pages/kontakt.html';
        } else {
            kontaktPath = 'pages/kontakt.html';
        }

        let servicesBasePath;
        if (isInPagesFolder) {
            servicesBasePath = '../services/';
        } else if (isInServicesFolder) {
            servicesBasePath = './';
        } else {
            servicesBasePath = 'services/';
        }

        let landingPath;
        if (isInPagesFolder) {
            landingPath = 'landing-page.html';
        } else if (isInServicesFolder) {
            landingPath = '../pages/landing-page.html';
        } else {
            landingPath = 'pages/landing-page.html';
        }

        headerContainer.innerHTML = `
    <header class="header" role="banner">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <a href="${basePath}index.html" aria-label="Lemgenda Home">
                        <img src="${basePath}images/lemgenda-logo.svg" alt="Lemgenda Web Development" width="150" height="40">
                    </a>
                </div>

                <nav class="nav" role="navigation" aria-label="Main navigation">
                    <button class="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Toggle menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <ul class="nav-menu" id="nav-menu">
                        <li><a href="${basePath}index.html" class="nav-link" data-translate="navigation.home">Početna</a></li>

                        <li class="nav-item-dropdown">
                            <a href="#services" class="nav-link nav-link-dropdown" aria-expanded="false" aria-haspopup="true">
                                <span data-translate="navigation.services">Usluge</span>
                                <i class="fas fa-chevron-down dropdown-arrow" aria-hidden="true"></i>
                            </a>
                            <ul class="dropdown-menu" role="menu">
                                <li class="dropdown-category">
                                    <span class="dropdown-category-title" data-translate="servicesMenu.webVisibility">WEB VISIBILITY SERVICES</span>
                                </li>
                                <li><a href="${servicesBasePath}web-development.html" class="dropdown-link" data-translate="servicesMenu.webDevelopment">Izrada Web Stranica</a></li>
                                <li><a href="${servicesBasePath}seo.html" class="dropdown-link" data-translate="servicesMenu.seo">SEO / SEM</a></li>

                                <li class="dropdown-divider"></li>

                                <li class="dropdown-category">
                                    <span class="dropdown-category-title" data-translate="servicesMenu.specialized">SPECIJALIZIRANE USLUGE</span>
                                </li>
                                <li><a href="${servicesBasePath}logo-design.html" class="dropdown-link" data-translate="servicesMenu.logoDesign">Dizajn Logotipa</a></li>
                                <li><a href="${servicesBasePath}custom-development.html" class="dropdown-link" data-translate="servicesMenu.customDevelopment">Prilagođeni Razvoj</a></li>

                                <li class="dropdown-divider"></li>

                                <li class="dropdown-category">
                                    <span class="dropdown-category-title" data-translate="servicesMenu.service">SERVISNE USLUGE</span>
                                </li>
                                <li><a href="${servicesBasePath}data-cleaning.html" class="dropdown-link" data-translate="servicesMenu.dataCleaning">Čišćenje Podataka</a></li>
                                <li><a href="${servicesBasePath}os-installation.html" class="dropdown-link" data-translate="servicesMenu.osInstallation">Instalacija OS-a</a></li>
                            </ul>
                        </li>

                        <li><a href="${basePath}portfolio.html" class="nav-link" data-translate="navigation.portfolio">Portfolio</a></li>
                        <li><a href="${landingPath}" class="nav-link cta-link" style="background: var(--gold-color); color: var(--primary-color); font-weight: bold;" data-translate="navigation.freeConsultation">Besplatna Konsultacija</a></li>
                        <li><a href="${kontaktPath}" class="nav-link" data-translate="navigation.contact">Kontakt</a></li>
                    </ul>
                </nav>

                <div class="header-controls">
                    <button class="theme-toggle" aria-label="Switch theme">
                        <i class="fas fa-moon theme-icon"></i>
                    </button>

                    <div class="language-switcher">
                        <button class="language-btn" aria-expanded="false" aria-haspopup="true">
                            <span class="current-lang">HR</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <ul class="language-dropdown">
                            <li><button data-lang="hr">HR</button></li>
                            <li><button data-lang="en">EN</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
    `;
    }

    generateFooter() {
        const footerContainer = document.getElementById('footer-container');
        if (!footerContainer) {
            console.error('❌ Footer container not found');
            return;
        }

        const isInPagesFolder = window.location.pathname.includes('/pages/');
        const isInServicesFolder = window.location.pathname.includes('/services/');
        const basePath = this.basePath;

        let kontaktPath;
        if (isInPagesFolder) {
            kontaktPath = 'kontakt.html';
        } else if (isInServicesFolder) {
            kontaktPath = '../pages/kontakt.html';
        } else {
            kontaktPath = 'pages/kontakt.html';
        }

        let privacyPath, termsPath;
        if (isInPagesFolder) {
            privacyPath = 'privacy-policy.html';
            termsPath = 'terms-of-service.html';
        } else if (isInServicesFolder) {
            privacyPath = '../pages/privacy-policy.html';
            termsPath = '../pages/terms-of-service.html';
        } else {
            privacyPath = 'pages/privacy-policy.html';
            termsPath = 'pages/terms-of-service.html';
        }

        footerContainer.innerHTML = `
        <footer class="footer" role="contentinfo">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-brand">
                        <div class="footer-logo">
                            <img src="${basePath}images/lemgenda-logo.svg" alt="Lemgenda Web Development" width="150" height="40">
                        </div>
                        <p>Professional web development and IT services in Sisak, Croatia.</p>
                    </div>

                    <div class="footer-links">
                        <h3 data-translate="footer.quickLinks">Quick Links</h3>
                        <ul>
                            <li><a href="${basePath}index.html" data-translate="navigation.home">Home</a></li>
                            <li><a href="${basePath}index.html#services" data-translate="navigation.services">Services</a></li>
                            <li><a href="${basePath}index.html#portfolio" data-translate="navigation.portfolio">Portfolio</a></li>
                            <li><a href="${kontaktPath}" data-translate="navigation.contact">Contact</a></li>
                            <li><a href="${privacyPath}" data-translate="privacy.title">Privacy Policy</a></li>
                            <li><a href="${termsPath}" data-translate="terms.title">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div class="footer-contact">
                        <h3 data-translate="contact.info">Contact Information</h3>
                        <p><i class="fas fa-map-marker-alt"></i> Ulica Jurja Križanića 6, 44000 Sisak</p>
                        <p><i class="fas fa-phone"></i> <a href="tel:+385953831325">+385 95 383 1325</a></p>
                        <p><i class="fas fa-envelope"></i> <a href="mailto:lemgenda.obrt@gmail.com">lemgenda.obrt@gmail.com</a></p>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p data-translate="footer.copyright">© 2025 Lemgenda - Web Development & IT Services. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
    }

    generateModals() {
        const modalsContainer = document.getElementById('modals-container');
        if (!modalsContainer) {
            console.error('❌ Modals container not found');
            return;
        }

        console.log('📦 Generating modals...');

        modalsContainer.innerHTML = `
            <!-- Cookie Consent Modal -->
            <div id="cookie-consent" class="modal" aria-hidden="true" aria-labelledby="cookie-consent-title">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="cookie-consent-title" data-translate="cookie.title">Cookie Consent</h2>
                        <p data-translate="cookie.message">We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.</p>
                    </div>
                    <div class="modal-body">
                        <div class="cookie-options">
                            <label class="cookie-option">
                                <input type="checkbox" id="necessary-cookies" checked disabled>
                                <span data-translate="cookie.necessary">Necessary Cookies</span>
                                <small data-translate="cookie.necessaryDesc">Required for the website to function properly</small>
                            </label>
                            <label class="cookie-option">
                                <input type="checkbox" id="analytics-cookies">
                                <span data-translate="cookie.analytics">Analytics Cookies</span>
                                <small data-translate="cookie.analyticsDesc">Help us understand how visitors interact with our website</small>
                            </label>
                            <label class="cookie-option">
                                <input type="checkbox" id="marketing-cookies">
                                <span data-translate="cookie.marketing">Marketing Cookies</span>
                                <small data-translate="cookie.marketingDesc">Used to track visitors across websites for marketing</small>
                            </label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="cookie-customize" class="btn btn-secondary" data-translate="cookie.customize">Save Preferences</button>
                        <button id="cookie-accept-all" class="btn btn-primary" data-translate="cookie.acceptAll">Accept All</button>
                    </div>
                    <button class="modal-close" aria-label="Close cookie consent">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>

            <!-- Contact Modal -->
            <div id="contact-modal" class="modal" aria-hidden="true" aria-labelledby="contact-modal-title">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="contact-modal-title" data-translate="contact.title">Contact Lemgenda</h2>
                        <p data-translate="contact.text">Ready to start your project? Get in touch with us today!</p>
                    </div>
                    <div class="modal-body">
                        <form id="contact-modal-form" novalidate aria-label="Contact form">
                            <div class="form-group">
                                <label for="contact-modal-name" data-translate="contact.name">Name *</label>
                                <input type="text" id="contact-modal-name" name="name" required>
                            </div>
                            <div class="form-group">
                                <label for="contact-modal-email" data-translate="contact.email">Email *</label>
                                <input type="email" id="contact-modal-email" name="email" required>
                            </div>
                            <div class="form-group">
                                <label for="contact-modal-subject" data-translate="contact.subject">Subject *</label>
                                <input type="text" id="contact-modal-subject" name="subject" required>
                            </div>
                            <div class="form-group">
                                <label for="contact-modal-message" data-translate="contact.message">Message *</label>
                                <textarea id="contact-modal-message" name="message" rows="5" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary" data-translate="contact.sendMessage">
                                <i class="fas fa-paper-plane" aria-hidden="true"></i>
                                Send Message
                            </button>
                        </form>
                    </div>
                    <button class="modal-close" aria-label="Close contact modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;

        console.log('✅ Modals generated successfully');
    }

    initTheme() {
        const themeToggle = document.querySelector('.theme-toggle');
        const themeIcon = document.querySelector('.theme-icon');

        if (!themeToggle || !themeIcon) {
            console.warn('⚠️ Theme toggle elements not found');
            return;
        }

        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        const themeIcon = document.querySelector('.theme-icon');
        const themeToggle = document.querySelector('.theme-toggle');

        if (themeIcon && themeToggle) {
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-sun theme-icon';
                themeToggle.setAttribute('aria-label', 'Switch to light mode');
            } else {
                themeIcon.className = 'fas fa-moon theme-icon';
                themeToggle.setAttribute('aria-label', 'Switch to dark mode');
            }
        }
    }

    initNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (!navToggle || !navMenu) {
            console.warn('⚠️ Navigation elements not found');
            return;
        }

        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.nav-link:not(.nav-link-dropdown)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.querySelectorAll('.nav-item-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            });
        });

        const dropdownParents = document.querySelectorAll('.nav-item-dropdown');
        dropdownParents.forEach(parent => {
            const dropdownLink = parent.querySelector('.nav-link-dropdown');
            const dropdownMenu = parent.querySelector('.dropdown-menu');

            if (dropdownLink && dropdownMenu) {
                dropdownLink.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        parent.classList.toggle('active');
                        dropdownParents.forEach(otherParent => {
                            if (otherParent !== parent) {
                                otherParent.classList.remove('active');
                            }
                        });
                    }
                });
            }
        });

        document.addEventListener('click', (event) => {
            if (!event.target.closest('.nav') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.querySelectorAll('.nav-item-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.nav-item-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }

    initLanguageSwitcher() {
        const languageButtons = document.querySelectorAll('.language-dropdown button');
        const languageSwitcher = document.querySelector('.language-switcher');
        const languageBtn = document.querySelector('.language-btn');

        if (!languageButtons.length || !languageSwitcher || !languageBtn) {
            console.warn('⚠️ Language switcher elements not found');
            return;
        }

        languageButtons.forEach(button => {
            button.addEventListener('click', () => {
                const lang = button.getAttribute('data-lang');
                if (window.translationManager) {
                    window.translationManager.setLanguage(lang);
                }
                languageSwitcher.classList.remove('open');
            });
        });

        languageBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                languageSwitcher.classList.add('open');
                const firstItem = languageSwitcher.querySelector('.language-dropdown button');
                if (firstItem) firstItem.focus();
            }
        });

        languageSwitcher.addEventListener('focusout', (e) => {
            if (!languageSwitcher.contains(e.relatedTarget)) {
                languageSwitcher.classList.remove('open');
            }
        });
    }

    initContactForms() {
        const contactModalForm = document.getElementById('contact-modal-form');
        if (contactModalForm) {
            contactModalForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateBasicForm(contactModalForm)) {
                    this.submitBasicForm(contactModalForm, 'contact-modal');
                }
            });
        }

        const contactPageForm = document.getElementById('contact-page-form');
        if (contactPageForm) {
            contactPageForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateBasicForm(contactPageForm)) {
                    this.submitBasicForm(contactPageForm, 'contact-page');
                }
            });
        }

        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateBasicForm(contactForm)) {
                    this.submitBasicForm(contactForm, 'contact');
                }
            });
        }

        console.log('✅ Contact forms initialized');
    }

    validateBasicForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.setAttribute('aria-invalid', 'true');
                field.style.borderColor = 'var(--error-color)';
            } else {
                field.setAttribute('aria-invalid', 'false');
                field.style.borderColor = '';
            }
        });

        return isValid;
    }

    submitBasicForm(form, formType) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        console.log(`📧 ${formType} form submitted:`, data);
        this.showNotification('Message sent successfully! We will get back to you soon.', 'success');
        form.reset();
    }

    initBasicFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';
                const answer = document.getElementById(question.getAttribute('aria-controls'));

                question.setAttribute('aria-expanded', !isExpanded);
                if (answer) {
                    answer.setAttribute('aria-hidden', isExpanded);
                }
            });
        });

        console.log('✅ Basic FAQ initialized');
    }

    initCookieConsent() {
        console.log('🍪 Initializing cookie consent...');

        // Ensure cookie modal exists first
        this.ensureCookieModal();

        // Give DOM time to be ready
        setTimeout(() => {
            const cookieConsent = document.getElementById('cookie-consent');

            if (!cookieConsent) {
                console.error('❌ Cookie consent modal not found after creation!');
                this.ensureCookieModal(); // Try again
                setTimeout(() => this.initCookieConsent(), 500); // Retry
                return;
            }

            // Check if user already made a choice
            const cookieChoice = localStorage.getItem('cookieConsent');
            console.log('📝 Existing cookie choice:', cookieChoice);

            if (!cookieChoice) {
                console.log('👤 New user - showing cookie consent');
                // Show after a short delay to ensure everything is loaded
                setTimeout(() => {
                    this.showCookieConsent();
                }, 3000); // Show after 3 seconds
            } else {
                console.log('👤 Returning user - applying preferences');
                try {
                    const preferences = JSON.parse(cookieChoice);
                    this.applyCookiePreferences(preferences);
                } catch (e) {
                    console.error('❌ Error parsing saved preferences:', e);
                    // Show consent modal if preferences are corrupted
                    setTimeout(() => {
                        this.showCookieConsent();
                    }, 3000);
                }
            }

            // Initialize event listeners
            this.initCookieEventListeners();

            console.log('✅ Cookie consent initialized successfully');
        }, 1000); // Wait 1 second before starting
    }

    // Add this missing method to handle event listeners:
    initCookieEventListeners() {
        setTimeout(() => {
            const cookieAcceptAll = document.getElementById('cookie-accept-all');
            const cookieCustomize = document.getElementById('cookie-customize');
            const modalClose = document.querySelector('#cookie-consent .modal-close');
            const cookieConsent = document.getElementById('cookie-consent');

            // Accept All button
            if (cookieAcceptAll) {
                cookieAcceptAll.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('✅ Accept all cookies clicked');
                    this.acceptAllCookies();
                });
            } else {
                console.error('❌ cookie-accept-all button not found');
            }

            // Customize button
            if (cookieCustomize) {
                cookieCustomize.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('⚙️ Customize cookies clicked');
                    this.customizeCookies();
                });
            } else {
                console.error('❌ cookie-customize button not found');
            }

            // Close button
            if (modalClose) {
                modalClose.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('❌ Cookie modal closed');
                    this.hideCookieConsent();
                });
            } else {
                console.error('❌ Cookie modal close button not found');
            }

            // Backdrop click
            if (cookieConsent) {
                cookieConsent.addEventListener('click', (e) => {
                    if (e.target === cookieConsent) {
                        console.log('🎯 Cookie backdrop clicked');
                        this.hideCookieConsent();
                    }
                });
            }

            // Initialize cookie options state
            this.initCookieOptions();

        }, 100);
    }

    // ADD THIS MISSING METHOD:
    initCookieOptions() {
        setTimeout(() => {
            const necessaryCookies = document.getElementById('necessary-cookies');
            const analyticsCookies = document.getElementById('analytics-cookies');
            const marketingCookies = document.getElementById('marketing-cookies');

            const savedPreferences = localStorage.getItem('cookieConsent');

            if (savedPreferences) {
                try {
                    const preferences = JSON.parse(savedPreferences);
                    if (analyticsCookies) analyticsCookies.checked = preferences.analytics || false;
                    if (marketingCookies) marketingCookies.checked = preferences.marketing || false;
                } catch (e) {
                    console.error('❌ Error parsing saved preferences:', e);
                }
            } else {
                if (analyticsCookies) analyticsCookies.checked = false;
                if (marketingCookies) marketingCookies.checked = false;
            }
        }, 200);
    }

    ensureCookieModal() {
        let cookieConsent = document.getElementById('cookie-consent');

        if (!cookieConsent) {
            console.log('🛠️ Creating cookie modal...');
            const modalsContainer = document.getElementById('modals-container');

            if (!modalsContainer) {
                console.error('❌ Modals container not found for cookie modal creation');
                // Create modals container if it doesn't exist
                const newModalsContainer = document.createElement('div');
                newModalsContainer.id = 'modals-container';
                document.body.appendChild(newModalsContainer);
                this.ensureCookieModal(); // Try again
                return;
            }

            const cookieModal = document.createElement('div');
            cookieModal.id = 'cookie-consent';
            cookieModal.className = 'modal';
            cookieModal.setAttribute('aria-hidden', 'true');
            cookieModal.setAttribute('aria-labelledby', 'cookie-consent-title');

            cookieModal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="cookie-consent-title" data-translate="cookie.title">Cookie Consent</h2>
                        <p data-translate="cookie.message">We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.</p>
                    </div>
                    <div class="modal-body">
                        <div class="cookie-options">
                            <label class="cookie-option">
                                <input type="checkbox" id="necessary-cookies" checked disabled>
                                <span data-translate="cookie.necessary">Necessary Cookies</span>
                                <small data-translate="cookie.necessaryDesc">Required for the website to function properly</small>
                            </label>
                            <label class="cookie-option">
                                <input type="checkbox" id="analytics-cookies">
                                <span data-translate="cookie.analytics">Analytics Cookies</span>
                                <small data-translate="cookie.analyticsDesc">Help us understand how visitors interact with our website</small>
                            </label>
                            <label class="cookie-option">
                                <input type="checkbox" id="marketing-cookies">
                                <span data-translate="cookie.marketing">Marketing Cookies</span>
                                <small data-translate="cookie.marketingDesc">Used to track visitors across websites for marketing</small>
                            </label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="cookie-customize" class="btn btn-secondary" data-translate="cookie.customize">Save Preferences</button>
                        <button id="cookie-accept-all" class="btn btn-primary" data-translate="cookie.acceptAll">Accept All</button>
                    </div>
                    <button class="modal-close" aria-label="Close cookie consent">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;

            modalsContainer.appendChild(cookieModal);
            console.log('✅ Cookie modal created successfully');
        } else {
            console.log('✅ Cookie modal already exists');
        }
    }

    showCookieConsent() {
        const cookieConsent = document.getElementById('cookie-consent');
        console.log('🎪 Showing cookie consent:', cookieConsent);

        if (!cookieConsent) {
            console.error('❌ Cookie consent modal not found for showing');
            this.ensureCookieModal();
            // Try again after modal is created
            setTimeout(() => this.showCookieConsent(), 500);
            return;
        }

        cookieConsent.classList.add('active');
        cookieConsent.setAttribute('aria-hidden', 'false');

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');

        // Focus management for accessibility
        setTimeout(() => {
            const firstButton = cookieConsent.querySelector('#cookie-customize, #cookie-accept-all');
            if (firstButton) firstButton.focus();
        }, 300);

        console.log('✅ Cookie consent shown successfully');
    }

    hideCookieConsent() {
        const cookieConsent = document.getElementById('cookie-consent');
        console.log('🎪 Hiding cookie consent');

        if (cookieConsent) {
            cookieConsent.classList.remove('active');
            cookieConsent.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');

            // Only reset overflow if no other modals are active
            const otherActiveModals = document.querySelectorAll('.modal.active');
            if (otherActiveModals.length === 0) {
                document.body.style.overflow = '';
            }
        }
    }

    acceptAllCookies() {
        console.log('✅ Accepting all cookies');
        const preferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString()
        };

        this.saveCookiePreferences(preferences);
        this.hideCookieConsent();
        this.showNotification('Cookie preferences saved! All cookies accepted.', 'success');
    }

    customizeCookies() {
        console.log('⚙️ Customizing cookies');

        const analyticsCookies = document.getElementById('analytics-cookies');
        const marketingCookies = document.getElementById('marketing-cookies');

        const preferences = {
            necessary: true,
            analytics: analyticsCookies ? analyticsCookies.checked : false,
            marketing: marketingCookies ? marketingCookies.checked : false,
            timestamp: new Date().toISOString()
        };

        this.saveCookiePreferences(preferences);
        this.hideCookieConsent();
        this.showNotification('Cookie preferences customized and saved!', 'success');
    }

    saveCookiePreferences(preferences) {
        console.log('💾 Saving cookie preferences:', preferences);
        try {
            localStorage.setItem('cookieConsent', JSON.stringify(preferences));
            this.applyCookiePreferences(preferences);
        } catch (e) {
            console.error('❌ Error saving cookie preferences:', e);
            this.showNotification('Error saving preferences. Please try again.', 'error');
        }
    }

    applyCookiePreferences(preferences) {
        console.log('🔧 Applying cookie preferences:', preferences);

        if (preferences.analytics) {
            this.enableAnalytics();
        } else {
            this.disableAnalytics();
        }

        if (preferences.marketing) {
            this.enableMarketing();
        } else {
            this.disableMarketing();
        }
    }

    enableAnalytics() {
        console.log('📊 Analytics cookies enabled');
    }

    disableAnalytics() {
        console.log('📊 Analytics cookies disabled');
    }

    enableMarketing() {
        console.log('📈 Marketing cookies enabled');
    }

    disableMarketing() {
        console.log('📈 Marketing cookies disabled');
    }

    showNotification(message, type = 'info') {
        console.log(`📢 ${type.toUpperCase()}: ${message}`);
        this.createToastNotification(message, type);
    }

    createToastNotification(message, type) {
        const existingNotification = document.querySelector('.cookie-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `cookie-notification cookie-notification-${type}`;
        notification.innerHTML = `
            <div class="cookie-notification-content">
                <span>${message}</span>
                <button class="cookie-notification-close" aria-label="Close notification">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        notification.querySelector('.cookie-notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOutDown 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });

        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutDown 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;

        const toggleBackToTop = () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        };

        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        window.addEventListener('scroll', toggleBackToTop);
        backToTopBtn.addEventListener('click', scrollToTop);
    }

    initModals() {
        const closeButtons = document.querySelectorAll('.modal-close');
        const modals = document.querySelectorAll('.modal');

        closeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const modal = button.closest('.modal');
                if (modal) this.hideModal(modal);
            });
        });

        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.hideModal(modal);
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) this.hideModal(activeModal);
            }
        });
    }

    showModal(modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
    }

    hideModal(modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');

        const otherActiveModals = document.querySelectorAll('.modal.active');
        if (otherActiveModals.length === 0) {
            document.body.style.overflow = '';
        }
    }

    initAccessibility() {
        this.initKeyboardNavigation();
        this.initReducedMotion();
    }

    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const navMenu = document.querySelector('.nav-menu');
                const navToggle = document.querySelector('.nav-toggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.focus();
                }

                const languageSwitcher = document.querySelector('.language-switcher');
                if (languageSwitcher && languageSwitcher.classList.contains('open')) {
                    languageSwitcher.classList.remove('open');
                    document.querySelector('.language-btn').focus();
                }
            }
        });
    }

    initReducedMotion() {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (reducedMotion.matches) {
            document.documentElement.classList.add('reduced-motion');
        }
        reducedMotion.addEventListener('change', () => {
            if (reducedMotion.matches) {
                document.documentElement.classList.add('reduced-motion');
            } else {
                document.documentElement.classList.remove('reduced-motion');
            }
        });
    }
}

// Initialize CriticalApp
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM loaded, initializing CriticalApp...');
    try {
        window.criticalApp = new CriticalApp();
    } catch (error) {
        console.error('❌ CriticalApp initialization failed:', error);
    }
});