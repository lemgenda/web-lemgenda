class CriticalApp {
    constructor() {
        this.basePath = this.getBasePath();
        this.initialized = false;
        this.init();
    }

    getBasePath() {
        if (window.translationManager && window.translationManager.getBasePath) {
            return window.translationManager.getBasePath();
        }
        return '../';
    }

    async init() {
        if (this.initialized) return;

        console.log('🚀 CriticalApp initializing...');
        await this.generateSharedComponents();
        this.initTheme();
        this.initNavigation();
        this.initLanguageSwitcher();
        this.initBackToTop();
        this.initModals();
        this.initAccessibility();
        this.initContactForms();

        // Initialize cookie consent after a short delay
        setTimeout(() => {
            this.initCookieConsent();
        }, 1000);

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

        console.log('🏗️ Generating header...');

        const currentPath = window.location.pathname;
        const basePath = this.basePath;

        // PATH VARIJABLE
        let kontaktPath;
        if (currentPath.includes('/stranice/')) {
            kontaktPath = 'kontakt.html';
        } else if (currentPath.includes('/web-usluge/') || currentPath.includes('/usluge/')) {
            kontaktPath = '../stranice/kontakt.html';
        } else {
            kontaktPath = 'stranice/kontakt.html';
        }

        let webUslugeBasePath, uslugeBasePath;
        if (currentPath.includes('/stranice/')) {
            webUslugeBasePath = '../web-usluge/';
            uslugeBasePath = '../usluge/';
        } else if (currentPath.includes('/web-usluge/') || currentPath.includes('/usluge/')) {
            webUslugeBasePath = './';
            uslugeBasePath = '../usluge/';
        } else {
            webUslugeBasePath = 'web-usluge/';
            uslugeBasePath = 'usluge/';
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

                        <!-- WEB USLUGE DROPDOWN -->
                        <li class="nav-item-dropdown">
                            <a href="#web-usluge" class="nav-link nav-link-dropdown" aria-expanded="false" aria-haspopup="true">
                                <span data-translate="navigation.webServices">Web Usluge</span>
                                <i class="fas fa-chevron-down dropdown-arrow" aria-hidden="true"></i>
                            </a>
                            <ul class="dropdown-menu" role="menu">
                                <li class="dropdown-category">
                                    <span class="dropdown-category-title" data-translate="servicesMenu.webDevelopmentCategory">WEB RAZVOJ</span>
                                </li>
                                <li><a href="${webUslugeBasePath}web-razvoj.html" class="dropdown-link" data-translate="servicesMenu.webDevelopment">Izrada Web Stranica</a></li>
                                <li><a href="${webUslugeBasePath}e-commerce-razvoj.html" class="dropdown-link" data-translate="servicesMenu.ecommerce">E-commerce Razvoj</a></li>

                                <li class="dropdown-divider"></li>

                                <li class="dropdown-category">
                                    <span class="dropdown-category-title" data-translate="servicesMenu.digitalMarketing">DIGITALNI MARKETING</span>
                                </li>
                                <li><a href="${webUslugeBasePath}seo.html" class="dropdown-link" data-translate="servicesMenu.seo">SEO Optimizacija</a></li>
                                <li><a href="${webUslugeBasePath}sem.html" class="dropdown-link" data-translate="servicesMenu.sem">SEM Marketing</a></li>

                                <li class="dropdown-divider"></li>

                                <li class="dropdown-category">
                                    <span class="dropdown-category-title" data-translate="servicesMenu.designCategory">DIZJN & PRILAGODBE</span>
                                </li>
                                <li><a href="${webUslugeBasePath}logo-design.html" class="dropdown-link" data-translate="servicesMenu.logoDesign">Dizajn Logotipa</a></li>
                                <li><a href="${webUslugeBasePath}pristupacnost.html" class="dropdown-link" data-translate="servicesMenu.accessibility">Pristupačnost (a11y)</a></li>
                            </ul>
                        </li>

                        <!-- OSTALE USLUGE DROPDOWN -->
                        <li class="nav-item-dropdown">
                            <a href="#ostale-usluge" class="nav-link nav-link-dropdown" aria-expanded="false" aria-haspopup="true">
                                <span data-translate="navigation.otherServices">Ostale Usluge</span>
                                <i class="fas fa-chevron-down dropdown-arrow" aria-hidden="true"></i>
                            </a>
                            <ul class="dropdown-menu" role="menu">
                                <li class="dropdown-category">
                                    <span class="dropdown-category-title" data-translate="servicesMenu.specializedDevelopment">SPECIJALIZIRANI RAZVOJ</span>
                                </li>
                                <li><a href="${uslugeBasePath}prilagodeni-razvoj.html" class="dropdown-link" data-translate="servicesMenu.customDevelopment">Prilagođeni Razvoj</a></li>

                                <li class="dropdown-divider"></li>

                                <li class="dropdown-category">
                                    <span class="dropdown-category-title" data-translate="servicesMenu.serviceCategory">SERVISNE USLUGE</span>
                                </li>
                                <li><a href="${uslugeBasePath}ciscenje-smartphona.html" class="dropdown-link" data-translate="servicesMenu.phoneCleaning">Čišćenje Smartphona</a></li>
                                <li><a href="${uslugeBasePath}ciscenje-racunala.html" class="dropdown-link" data-translate="servicesMenu.pcCleaning">Čišćenje Računala</a></li>
                                <li><a href="${uslugeBasePath}os-instalacija.html" class="dropdown-link" data-translate="servicesMenu.osInstallation">Instalacija OS-a</a></li>
                            </ul>
                        </li>

                        <!-- PORTFOLIO LINK -->
                        <li><a href="${basePath}stranice/pregled-radova.html" class="nav-link" data-translate="navigation.portfolio">Portfolio</a></li>

                        <!-- KONTAKT LINK -->
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

        console.log('✅ Header generated successfully');
    }

    generateFooter() {
        const footerContainer = document.getElementById('footer-container');
        if (!footerContainer) {
            console.error('❌ Footer container not found');
            return;
        }

        const currentPath = window.location.pathname;
        const basePath = this.basePath;

        let kontaktPath;
        if (currentPath.includes('/stranice/')) {
            kontaktPath = 'kontakt.html';
        } else if (currentPath.includes('/web-usluge/') || currentPath.includes('/usluge/')) {
            kontaktPath = '../stranice/kontakt.html';
        } else {
            kontaktPath = 'stranice/kontakt.html';
        }

        // ✅ ISPRAVLJENI LINKOVI
        let privacyPath, termsPath;
        if (currentPath.includes('/stranice/')) {
            privacyPath = 'politika-privatnosti.html';
            termsPath = 'uvjeti-koristenja.html';
        } else if (currentPath.includes('/web-usluge/') || currentPath.includes('/usluge/')) {
            privacyPath = '../stranice/politika-privatnosti.html';
            termsPath = '../stranice/uvjeti-koristenja.html';
        } else {
            privacyPath = 'stranice/politika-privatnosti.html';
            termsPath = 'stranice/uvjeti-koristenja.html';
        }

        footerContainer.innerHTML = `
    <footer class="footer" role="contentinfo">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <div class="footer-logo">
                        <img src="${basePath}images/lemgenda-logo.svg" alt="Lemgenda Web Development" width="150" height="40">
                    </div>
                    <p data-translate="footer.brandDescription">Professional web development and IT services in Sisak, Croatia.</p>
                </div>

                <div class="footer-links">
                    <h3 data-translate="footer.quickLinks">Quick Links</h3>
                    <ul>
                        <li><a href="${basePath}index.html" data-translate="navigation.home">Home</a></li>
                        <li><a href="${basePath}index.html#services" data-translate="navigation.services">Usluge</a></li>
                        <li><a href="${basePath}stranice/pregled-radova.html" data-translate="navigation.portfolio">Portfolio</a></li>
                        <li><a href="${kontaktPath}" data-translate="navigation.contact">Contact</a></li>
                        <li><a href="${privacyPath}" data-translate="footer.privacyPolicy">Privacy Policy</a></li>
                        <li><a href="${termsPath}" data-translate="footer.termsOfService">Terms of Service</a></li>
                    </ul>
                </div>

                <div class="footer-contact">
                    <h3 data-translate="contact.info">Contact Information</h3>
                    <p><i class="fas fa-map-marker-alt"></i> <span data-translate="contact.addressContent">Ulica Jurja Križanića 6, 44000 Sisak</span></p>
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
                            <input type="text" id="contact-modal-name" name="name" required
                                   aria-required="true" data-translate-placeholder="contact.namePlaceholder">
                        </div>
                        <div class="form-group">
                            <label for="contact-modal-email" data-translate="contact.email">Email *</label>
                            <input type="email" id="contact-modal-email" name="email" required
                                   aria-required="true" data-translate-placeholder="contact.emailPlaceholder">
                        </div>
                        <div class="form-group">
                            <label for="contact-modal-phone" data-translate="contact.phone">Phone</label>
                            <input type="tel" id="contact-modal-phone" name="phone"
                                   data-translate-placeholder="contact.phonePlaceholder">
                        </div>
                        <div class="form-group">
                            <label for="contact-modal-company" data-translate="contact.company">Company</label>
                            <input type="text" id="contact-modal-company" name="company"
                                   data-translate-placeholder="contact.companyPlaceholder">
                        </div>
                        <div class="form-group">
                            <label for="contact-modal-subject" data-translate="contact.subject">Subject *</label>
                            <input type="text" id="contact-modal-subject" name="subject" required
                                   aria-required="true" data-translate-placeholder="contact.subjectPlaceholder">
                        </div>
                        <div class="form-group">
                            <label for="contact-modal-message" data-translate="contact.message">Message *</label>
                            <textarea id="contact-modal-message" name="message" rows="5" required
                                      aria-required="true" data-translate-placeholder="contact.messagePlaceholder"></textarea>
                        </div>
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="contact-modal-privacy" name="privacy" required>
                                <span data-translate="contact.privacyAgreement">I agree to the privacy policy and terms of service</span>
                            </label>
                        </div>
                        <button type="submit" class="btn btn-primary" data-translate="contact.sendMessage">
                            <i class="fas fa-paper-plane" aria-hidden="true"></i>
                            <span data-translate="contact.sendMessage">Send Message</span>
                        </button>
                    </form>
                </div>
                <div class="modal-footer">
                    <div class="contact-info">
                        <h4 data-translate="contact.info">Contact Information</h4>
                        <div class="contact-details">
                            <p>
                                <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                                <strong data-translate="contact.address">Address:</strong>
                                <span data-translate="contact.addressContent">Ulica Jurja Križanića 6, 44000 Sisak</span>
                            </p>
                            <p>
                                <i class="fas fa-phone" aria-hidden="true"></i>
                                <strong data-translate="contact.phone">Phone:</strong>
                                <a href="tel:+385953831325">+385 95 383 1325</a>
                            </p>
                            <p>
                                <i class="fas fa-envelope" aria-hidden="true"></i>
                                <strong data-translate="contact.email">Email:</strong>
                                <a href="mailto:lemgenda.obrt@gmail.com">lemgenda.obrt@gmail.com</a>
                            </p>
                        </div>
                    </div>
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
                console.log(`🌐 Language button clicked: ${lang}`);

                if (window.translationManager) {
                    window.translationManager.setLanguage(lang);
                }

                // Close dropdown
                languageSwitcher.classList.remove('open');
                languageBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Toggle dropdown on button click
        languageBtn.addEventListener('click', () => {
            const isOpen = languageSwitcher.classList.contains('open');
            languageSwitcher.classList.toggle('open', !isOpen);
            languageBtn.setAttribute('aria-expanded', !isOpen);
        });

        // Keyboard navigation
        languageBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                languageSwitcher.classList.add('open');
                languageBtn.setAttribute('aria-expanded', 'true');
                const firstItem = languageSwitcher.querySelector('.language-dropdown button');
                if (firstItem) firstItem.focus();
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!languageSwitcher.contains(e.target)) {
                languageSwitcher.classList.remove('open');
                languageBtn.setAttribute('aria-expanded', 'false');
            }
        });

        languageSwitcher.addEventListener('focusout', (e) => {
            if (!languageSwitcher.contains(e.relatedTarget)) {
                languageSwitcher.classList.remove('open');
                languageBtn.setAttribute('aria-expanded', 'false');
            }
        });

        console.log('✅ Language switcher initialized');
    }

    initContactForms() {
        const contactModalForm = document.getElementById('contact-modal-form');
        if (contactModalForm) {
            contactModalForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateContactModalForm(contactModalForm)) {
                    this.submitContactModalForm(contactModalForm);
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

    validateContactModalForm(form) {
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

        // Validate email format
        const emailField = form.querySelector('input[type="email"]');
        if (emailField && emailField.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                emailField.setAttribute('aria-invalid', 'true');
                emailField.style.borderColor = 'var(--error-color)';
            }
        }

        return isValid;
    }

    submitContactModalForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        console.log('📧 Contact modal form submitted:', data);
        this.showNotification(this.getTranslation('contact.success'), 'success');
        form.reset();

        // Close modal after successful submission
        const contactModal = document.getElementById('contact-modal');
        if (contactModal) {
            this.hideModal(contactModal);
        }
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

    initCookieConsent() {
        console.log('🍪 Initializing cookie consent...');

        // Create cookie modal immediately
        this.ensureCookieModal();

        // Initialize with a slight delay to ensure DOM is ready
        setTimeout(() => {
            const cookieConsent = document.getElementById('cookie-consent');
            if (!cookieConsent) {
                console.error('❌ Cookie consent modal not found!');
                this.ensureCookieModal();
                return;
            }

            // Check if user has already made a choice
            const cookieChoice = localStorage.getItem('cookieConsent');
            console.log('📝 Existing cookie choice:', cookieChoice);

            if (!cookieChoice) {
                console.log('👤 New user - will show cookie consent');
                // Show after page load
                setTimeout(() => {
                    this.showCookieConsent();
                }, 3000);
            } else {
                console.log('👤 Returning user - applying saved preferences');
                try {
                    const preferences = JSON.parse(cookieChoice);
                    this.applyCookiePreferences(preferences);
                } catch (e) {
                    console.error('❌ Error parsing saved preferences:', e);
                    // Clear invalid preference and show consent modal
                    localStorage.removeItem('cookieConsent');
                    setTimeout(() => {
                        this.showCookieConsent();
                    }, 3000);
                }
            }

            this.initCookieEventListeners();
            console.log('✅ Cookie consent initialized successfully');
        }, 1000);
    }

    ensureCookieModal() {
        let cookieConsent = document.getElementById('cookie-consent');
        if (!cookieConsent) {
            console.log('🛠️ Creating cookie modal...');

            // Ensure modals container exists
            let modalsContainer = document.getElementById('modals-container');
            if (!modalsContainer) {
                console.log('📦 Creating modals container...');
                modalsContainer = document.createElement('div');
                modalsContainer.id = 'modals-container';
                document.body.appendChild(modalsContainer);
            }

            // Create cookie modal
            cookieConsent = document.createElement('div');
            cookieConsent.id = 'cookie-consent';
            cookieConsent.className = 'modal';
            cookieConsent.setAttribute('aria-hidden', 'true');
            cookieConsent.setAttribute('aria-labelledby', 'cookie-consent-title');

            cookieConsent.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="cookie-consent-title" data-translate="cookie.title">Cookie Consent</h2>
                        <p data-translate="cookie.message">We use cookies to enhance your browsing experience.</p>
                    </div>
                    <div class="modal-body">
                        <div class="cookie-options">
                            <label class="cookie-option">
                                <input type="checkbox" id="necessary-cookies" checked disabled>
                                <span data-translate="cookie.necessary">Necessary Cookies</span>
                                <small data-translate="cookie.necessaryDesc">Required for website functionality</small>
                            </label>
                            <label class="cookie-option">
                                <input type="checkbox" id="analytics-cookies">
                                <span data-translate="cookie.analytics">Analytics Cookies</span>
                                <small data-translate="cookie.analyticsDesc">Help us understand visitor interactions</small>
                            </label>
                            <label class="cookie-option">
                                <input type="checkbox" id="marketing-cookies">
                                <span data-translate="cookie.marketing">Marketing Cookies</span>
                                <small data-translate="cookie.marketingDesc">Used for tracking across websites</small>
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

            modalsContainer.appendChild(cookieConsent);
            console.log('✅ Cookie modal created successfully');
        }

        return cookieConsent;
    }

    initCookieEventListeners() {
        setTimeout(() => {
            const cookieAcceptAll = document.getElementById('cookie-accept-all');
            const cookieCustomize = document.getElementById('cookie-customize');
            const modalClose = document.querySelector('#cookie-consent .modal-close');
            const cookieConsent = document.getElementById('cookie-consent');

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

            if (cookieConsent) {
                cookieConsent.addEventListener('click', (e) => {
                    if (e.target === cookieConsent) {
                        console.log('🎯 Cookie backdrop clicked');
                        this.hideCookieConsent();
                    }
                });
            }

            this.initCookieOptions();
        }, 100);
    }

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

    showCookieConsent() {
        const cookieConsent = document.getElementById('cookie-consent');
        console.log('🎪 Showing cookie consent:', cookieConsent);

        if (!cookieConsent) {
            console.error('❌ Cookie consent modal not found for showing');
            this.ensureCookieModal();
            setTimeout(() => this.showCookieConsent(), 500);
            return;
        }

        this.showModal(cookieConsent);
        console.log('✅ Cookie consent shown successfully');
    }

    hideCookieConsent() {
        const cookieConsent = document.getElementById('cookie-consent');
        console.log('🎪 Hiding cookie consent');

        if (cookieConsent) {
            this.hideModal(cookieConsent);
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

            // Add keyboard event listener for focus trapping
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.hideModal(modal);
                }

                // Trap focus within modal when Tab is pressed
                if (e.key === 'Tab' && modal.classList.contains('active')) {
                    this.trapFocus(modal, e);
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) this.hideModal(activeModal);
            }
        });
    }

    trapFocus(modal, event) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                lastElement.focus();
                event.preventDefault();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                firstElement.focus();
                event.preventDefault();
            }
        }
    }

    showModal(modal) {
        // Spremi trenutno fokusirani element
        this.lastFocusedElement = document.activeElement;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        modal.removeAttribute('inert');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');

        // Trap focus inside modal
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
            setTimeout(() => {
                focusableElements[0].focus();
            }, 100);
        }
    }

    hideModal(modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('inert', '');
        document.body.classList.remove('modal-open');

        // Ukloni fokus sa close buttona prije nego što sakrijemo modal
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.blur();
        }

        const otherActiveModals = document.querySelectorAll('.modal.active');
        if (otherActiveModals.length === 0) {
            document.body.style.overflow = '';
            // Vrati fokus na prethodno aktivni element
            if (this.lastFocusedElement) {
                this.lastFocusedElement.focus();
                this.lastFocusedElement = null;
            }
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

    getTranslation(key) {
        if (window.translationManager && window.translationManager.getTranslation) {
            return window.translationManager.getTranslation(key);
        }
        return key;
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