// non-critical.js - Non-critical functionality loaded after main content
class NonCriticalApp {
    constructor() {
        this.basePath = this.getBasePath();
        setTimeout(() => this.init(), 100);
    }

    getBasePath() {
        if (window.translationManager && window.translationManager.getBasePath) {
            return window.translationManager.getBasePath();
        }
        return '../';
    }

    init() {
        console.log('🚀 Initializing NonCriticalApp...');

        this.initTestimonialsSlider();
        this.initFAQ();
        this.initContactForm();
        this.initLazyLoading();
        this.initPerformanceMonitoring();
        this.initNewsletterModal();
        this.initContactPageForm();
        this.initHeroButtons();

        // Listen for language changes
        this.initLanguageChangeListener();

        console.log('✅ NonCriticalApp initialized successfully');
    }

    initFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        console.log(`🔍 Found ${faqQuestions.length} FAQ questions`);

        // Ukloni postojeće event listenere (za slučaj duplih)
        faqQuestions.forEach(question => {
            const newQuestion = question.cloneNode(true);
            question.parentNode.replaceChild(newQuestion, question);
        });

        // Ponovno dohvati elemente nakon kloniranja
        const freshFaqQuestions = document.querySelectorAll('.faq-question');

        freshFaqQuestions.forEach((question, index) => {
            const answer = document.getElementById(question.getAttribute('aria-controls'));

            // Postavi početno stanje
            if (answer) {
                answer.style.display = 'none';
            }

            question.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                console.log(`📝 FAQ question ${index + 1} clicked`);

                const answer = document.getElementById(question.getAttribute('aria-controls'));
                const isExpanded = question.getAttribute('aria-expanded') === 'true';
                const newExpandedState = !isExpanded;

                // Toggle stanje
                question.setAttribute('aria-expanded', newExpandedState);

                if (answer) {
                    if (newExpandedState) {
                        answer.style.display = 'block';
                        answer.setAttribute('aria-hidden', 'false');
                    } else {
                        answer.style.display = 'none';
                        answer.setAttribute('aria-hidden', 'true');
                    }
                }

                // Toggle ikona
                const icon = question.querySelector('i');
                if (icon) {
                    icon.className = newExpandedState ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
                }

                console.log(`📖 FAQ ${index + 1} expanded: ${newExpandedState}`);
            });

            // Keyboard support
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        });

        console.log('✅ FAQ functionality initialized');
    }

    initLanguageChangeListener() {
        document.addEventListener('languageChanged', (e) => {
            console.log('🔄 Language changed detected, regenerating content...');
            this.regenerateAboutContent();
            this.regenerateTestimonials();
            this.applyNewsletterTranslations();
            this.initHeroButtons();
        });
    }

    regenerateAboutContent() {
        // Generate expertise items
        const expertiseGrid = document.querySelector('.expertise-grid');
        if (expertiseGrid) {
            const expertiseItems = [
                {
                    icon: 'fas fa-code',
                    title: this.getTranslation('about.customWebDev'),
                    description: this.getTranslation('about.customWebDevDesc'),
                    key: 'customWebDev'
                },
                {
                    icon: 'fas fa-chart-line',
                    title: this.getTranslation('about.digitalGrowth'),
                    description: this.getTranslation('about.digitalGrowthDesc'),
                    key: 'digitalGrowth'
                },
                {
                    icon: 'fas fa-palette',
                    title: this.getTranslation('about.brandIdentity'),
                    description: this.getTranslation('about.brandIdentityDesc'),
                    key: 'brandIdentity'
                },
                {
                    icon: 'fas fa-server',
                    title: this.getTranslation('about.completeIt'),
                    description: this.getTranslation('about.completeItDesc'),
                    key: 'completeIt'
                }
            ];

            expertiseGrid.innerHTML = expertiseItems.map(item => `
                <div class="expertise-item">
                    <i class="${item.icon}" aria-hidden="true"></i>
                    <div>
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                    </div>
                </div>
            `).join('');
        }

        // Generate value propositions
        const valuePropositions = document.querySelector('.value-propositions');
        if (valuePropositions) {
            const values = [
                {
                    icon: 'fas fa-rocket',
                    title: this.getTranslation('about.resultsDriven'),
                    description: this.getTranslation('about.resultsDrivenDesc'),
                    key: 'resultsDriven'
                },
                {
                    icon: 'fas fa-clock',
                    title: this.getTranslation('about.timelyDelivery'),
                    description: this.getTranslation('about.timelyDeliveryDesc'),
                    key: 'timelyDelivery'
                },
                {
                    icon: 'fas fa-headset',
                    title: this.getTranslation('about.ongoingSupport'),
                    description: this.getTranslation('about.ongoingSupportDesc'),
                    key: 'ongoingSupport'
                }
            ];

            valuePropositions.innerHTML = values.map(value => `
                <div class="value-item">
                    <i class="${value.icon}" aria-hidden="true"></i>
                    <h4>${value.title}</h4>
                    <p>${value.description}</p>
                </div>
            `).join('');
        }

        console.log('✅ About content regenerated');
    }

    regenerateTestimonials() {
        const testimonialTrack = document.querySelector('.testimonial-track');
        if (!testimonialTrack) return;

        const testimonials = [
            {
                content: this.getTranslation('testimonials.testimonial1') || "Lemgenda je izradila nevjerojatnu web stranicu za naš posao. Profesionalno, brzo i odlična komunikacija tijekom cijelog projekta.",
                author: "Ivan Horvat",
                company: "Tech Solutions Inc."
            },
            {
                content: this.getTranslation('testimonials.testimonial2') || "Izvrsne SEO usluge! Promet na našoj web stranici povećao se za 200% u samo 3 mjeseca. Toplo preporučujem!",
                author: "Ana Kovač",
                company: "Digital Marketing Pro"
            },
            {
                content: this.getTranslation('testimonials.testimonial3') || "Prilagođena web aplikacija koju su izgradili za nas savršeno je optimizirala naš radni tijek. Izvrsna tehnička stručnost!",
                author: "Marko Petrović",
                company: "Business Systems Ltd."
            }
        ];

        testimonialTrack.innerHTML = testimonials.map((testimonial, index) => `
            <div class="testimonial-slide" ${index > 0 ? 'aria-hidden="true"' : ''}>
                <div class="testimonial-card">
                    <div class="testimonial-content">
                        <p>${testimonial.content}</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="author-avatar">
                            <i class="fas fa-user" aria-hidden="true"></i>
                        </div>
                        <div class="author-info">
                            <h4>${testimonial.author}</h4>
                            <p>${testimonial.company}</p>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Re-initialize slider after regeneration
        this.initTestimonialsSlider();

        console.log('✅ Testimonials regenerated');
    }

    initHeroButtons() {
        const portfolioBtn = document.querySelector('.hero-portfolio-btn');
        const quoteBtn = document.querySelector('.hero-quote-btn');

        if (portfolioBtn && portfolioBtn.hasAttribute('data-translate')) {
            const translation = this.getTranslation(portfolioBtn.getAttribute('data-translate'));
            if (translation && translation !== portfolioBtn.getAttribute('data-translate')) {
                portfolioBtn.textContent = translation;
            }
        }

        if (quoteBtn && quoteBtn.hasAttribute('data-translate')) {
            const translation = this.getTranslation(quoteBtn.getAttribute('data-translate'));
            if (translation && translation !== quoteBtn.getAttribute('data-translate')) {
                quoteBtn.textContent = translation;
            }
        }

        console.log('✅ Hero buttons initialized');
    }

    getTranslation(key) {
        if (window.translationManager && window.translationManager.initialized) {
            return window.translationManager.getTranslation(key);
        }
        return key;
    }

    initTestimonialsSlider() {
        const track = document.querySelector('.testimonial-track');
        const slides = document.querySelectorAll('.testimonial-slide');
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        const dotsContainer = document.querySelector('.testimonial-dots');

        if (!track || !slides.length) return;

        let currentSlide = 0;
        const totalSlides = slides.length;

        // Create dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.className = `testimonial-dot ${i === 0 ? 'active' : ''}`;
                dot.addEventListener('click', () => this.goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }

        this.goToSlide = (slideIndex) => {
            currentSlide = slideIndex;
            track.style.transform = `translateX(-${slideIndex * 100}%)`;

            // Update dots
            document.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });

            // Update aria-hidden
            slides.forEach((slide, index) => {
                slide.setAttribute('aria-hidden', index !== slideIndex);
            });
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            this.goToSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            this.goToSlide(currentSlide);
        };

        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        // Auto-advance slides
        this.sliderInterval = setInterval(nextSlide, 5000);

        console.log('✅ Testimonials slider initialized');
    }

    initContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        if (window.criticalApp) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (window.criticalApp.validateBasicForm(contactForm)) {
                    this.submitContactForm(contactForm, 'contact');
                }
            });
        }

        console.log('✅ Contact form initialized');
    }

    initContactPageForm() {
        const contactPageForm = document.getElementById('contact-page-form');
        if (!contactPageForm) return;

        if (window.criticalApp) {
            contactPageForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (window.criticalApp.validateBasicForm(contactPageForm)) {
                    this.submitContactForm(contactPageForm, 'contact');
                }
            });
        }

        console.log('✅ Contact page form initialized');
    }

    initLazyLoading() {
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

        console.log('✅ Lazy loading initialized');
    }

    initPerformanceMonitoring() {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`🕒 Page load time: ${loadTime}ms`);

            // Report to analytics if available
            if (window.gtag) {
                gtag('event', 'timing_complete', {
                    'name': 'page_load',
                    'value': loadTime,
                    'event_category': 'Performance'
                });
            }
        });

        console.log('✅ Performance monitoring initialized');
    }

    submitContactForm(form, formType = 'contact') {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>
            ${this.getTranslation('contact.sending') || 'Slanje...'}
        `;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Submit to HubSpot
        this.submitToHubSpot(data, formType).then(() => {
            // Redirect to success page for contact forms
            if (formType === 'contact' || formType === 'landing') {
                window.location.href = '../stranice/contact-success.html';
            } else {
                if (window.criticalApp) {
                    window.criticalApp.showNotification(
                        this.getTranslation('contact.success') || 'Poruka uspješno poslana! Javit ćemo vam se uskoro.',
                        'success'
                    );
                }
                form.reset();

                // Reset button
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        }).catch((error) => {
            console.error('Form submission failed:', error);
            if (window.criticalApp) {
                window.criticalApp.showNotification(
                    this.getTranslation('contact.error') || 'Poruka nije poslana. Pokušajte ponovno ili nas kontaktirajte izravno.',
                    'error'
                );
            }

            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        });
    }

    submitToHubSpot(data, formType) {
        return new Promise((resolve, reject) => {
            const formIds = {
                'newsletter': 'c741e7cd0e65',
                'contact': '1e99eeb57eff',
                'landing': 'd94966c3db03'
            };

            const formId = formIds[formType] || formIds['contact'];

            const hubspotFormData = {
                fields: this.prepareHubSpotFields(data, formType),
                context: {
                    pageUri: window.location.href,
                    pageName: document.title,
                    hutk: document.cookie.match(/hubspotutk=([^;]+)/)?.[1]
                }
            };

            console.log(`📤 Submitting to HubSpot form ${formId}:`, hubspotFormData);

            fetch(`https://api.hsforms.com/submissions/v3/integration/submit/147273350/${formId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(hubspotFormData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HubSpot API error: ${response.status}`);
                    }
                    return response.json();
                })
                .then(result => {
                    console.log('✅ HubSpot submission successful:', result);
                    resolve(result);
                })
                .catch(error => {
                    console.error('❌ HubSpot submission error:', error);
                    reject(error);
                });
        });
    }

    prepareHubSpotFields(data, formType) {
        const fields = [];

        if (data.email) {
            fields.push({
                name: "email",
                value: data.email
            });
        }

        if (data.name || data.fullname) {
            const fullName = data.name || data.fullname || '';
            const nameParts = fullName.split(' ');
            fields.push(
                {
                    name: "firstname",
                    value: nameParts[0] || ''
                },
                {
                    name: "lastname",
                    value: nameParts.slice(1).join(' ') || ''
                }
            );
        }

        if (data.phone) {
            fields.push({
                name: "phone",
                value: data.phone
            });
        }

        if (data.company) {
            fields.push({
                name: "company",
                value: data.company
            });
        }

        if (data.project_type) {
            fields.push({
                name: "project_type",
                value: data.project_type
            });
        }

        if (data.budget) {
            fields.push({
                name: "budget",
                value: data.budget
            });
        }

        if (data.message) {
            fields.push({
                name: "message",
                value: data.message
            });
        }

        if (data.subject && !data.message) {
            fields.push({
                name: "message",
                value: data.subject
            });
        }

        fields.push({
            name: "website",
            value: window.location.href
        });

        fields.push({
            name: "form_source",
            value: `${formType}_form_${window.location.pathname}`
        });

        return fields;
    }

    initNewsletterModal() {
        console.log('📧 Initializing newsletter modal...');

        this.createNewsletterModal();

        const newsletterModal = document.getElementById('newsletter-modal');
        if (!newsletterModal) {
            console.error('❌ Newsletter modal not found after creation');
            return;
        }

        this.applyNewsletterTranslations();

        const newsletterShown = sessionStorage.getItem('newsletterShown');
        const cookieConsent = document.getElementById('cookie-consent');
        const isCookieConsentActive = cookieConsent && cookieConsent.classList.contains('active');

        if (!newsletterShown && !isCookieConsentActive) {
            setTimeout(() => {
                const currentCookieConsent = document.getElementById('cookie-consent');
                const isCookieActive = currentCookieConsent && currentCookieConsent.classList.contains('active');

                if (!isCookieActive && document.visibilityState === 'visible') {
                    this.showNewsletterModal();
                    sessionStorage.setItem('newsletterShown', 'true');
                } else {
                    console.log('📧 Newsletter delayed - cookie consent active or tab not visible');
                }
            }, 20000);
        }

        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            this.initNewsletterFormValidation(newsletterForm);
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateNewsletterForm(newsletterForm)) {
                    this.submitNewsletterForm(newsletterForm);
                }
            });
        }

        const closeBtn = newsletterModal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hideNewsletterModal();
            });
        }

        console.log('✅ Newsletter modal initialized');
    }

    createNewsletterModal() {
        if (document.getElementById('newsletter-modal')) return;

        const modalsContainer = document.getElementById('modals-container');
        if (!modalsContainer) {
            console.error('❌ Modals container not found for newsletter');
            return;
        }

        const newsletterModal = document.createElement('div');
        newsletterModal.id = 'newsletter-modal';
        newsletterModal.className = 'modal newsletter-modal';
        newsletterModal.setAttribute('aria-hidden', 'true');
        newsletterModal.setAttribute('aria-labelledby', 'newsletter-modal-title');

        newsletterModal.innerHTML = `
            <div class="modal-content newsletter-content">
                <div class="modal-header">
                    <h2 id="newsletter-modal-title" data-translate="newsletter.title">Ostanite Informirani!</h2>
                    <p data-translate="newsletter.subtitle">Primajte najnovije trendove u web razvoju i ekskluzivne ponude.</p>
                </div>
                <div class="modal-body">
                    <form id="newsletter-form" novalidate aria-label="Newsletter subscription form">
                        <div class="form-group">
                            <label for="newsletter-name" data-translate="newsletter.name">Ime</label>
                            <input type="text" id="newsletter-name" name="name" placeholder="Unesite vaše ime">
                        </div>
                        <div class="form-group">
                            <label for="newsletter-email" data-translate="newsletter.email">Email adresa *</label>
                            <input type="email" id="newsletter-email" name="email" required placeholder="Unesite vašu email adresu">
                            <div class="error-message" id="newsletter-email-error"></div>
                        </div>
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="newsletter-privacy" name="privacy" required>
                                <span data-translate="newsletter.privacy" style="position: absolute; margin-top: 20px;">Slažem se s politikom privatnosti</span>
                            </label>
                            <div class="error-message" id="newsletter-privacy-error"></div>
                        </div>
                        <button type="submit" class="btn btn-primary" data-translate="newsletter.subscribe">
                            <i class="fas fa-envelope" aria-hidden="true"></i>
                            Pretplati se
                        </button>
                    </form>
                </div>
                <button class="modal-close" aria-label="Close newsletter modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        modalsContainer.appendChild(newsletterModal);

        setTimeout(() => {
            if (window.translationManager && window.translationManager.applyTranslations) {
                window.translationManager.applyTranslations();
            }
        }, 100);

        console.log('✅ Newsletter modal created');
    }

    applyNewsletterTranslations() {
        const newsletterModal = document.getElementById('newsletter-modal');
        if (!newsletterModal) return;

        const elements = newsletterModal.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);

            if (translation && translation !== key) {
                this.applyTranslationToElement(element, translation);
            }
        });

        console.log('✅ Newsletter modal translations applied');
    }

    applyTranslationToElement(element, translation) {
        try {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.type !== 'submit' && element.type !== 'button') {
                    element.placeholder = translation;
                } else {
                    element.value = translation;
                }
            } else if (element.hasAttribute('aria-label')) {
                element.setAttribute('aria-label', translation);
            } else {
                element.textContent = translation;
            }
        } catch (error) {
            console.error('Error applying translation to newsletter element:', error);
        }
    }

    showNewsletterModal() {
        const newsletterModal = document.getElementById('newsletter-modal');
        if (!newsletterModal) return;

        const cookieConsent = document.getElementById('cookie-consent');
        const isCookieActive = cookieConsent && cookieConsent.classList.contains('active');

        if (isCookieActive) {
            console.log('📧 Newsletter modal delayed - cookie consent is active');
            setTimeout(() => this.showNewsletterModal(), 5000);
            return;
        }

        if (window.criticalApp && window.criticalApp.showModal) {
            window.criticalApp.showModal(newsletterModal);
        } else {
            newsletterModal.classList.add('active');
            newsletterModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            document.body.classList.add('modal-open');

            setTimeout(() => {
                const firstInput = newsletterModal.querySelector('input');
                if (firstInput) firstInput.focus();
            }, 100);
        }

        console.log('📧 Newsletter modal shown');
    }

    hideNewsletterModal() {
        const newsletterModal = document.getElementById('newsletter-modal');
        if (!newsletterModal) return;

        if (window.criticalApp && window.criticalApp.hideModal) {
            window.criticalApp.hideModal(newsletterModal);
        } else {
            newsletterModal.classList.remove('active');
            newsletterModal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');

            const otherActiveModals = document.querySelectorAll('.modal.active');
            if (otherActiveModals.length === 0) {
                document.body.style.overflow = '';
            }
        }

        console.log('📧 Newsletter modal hidden');
    }

    initNewsletterFormValidation(form) {
        const emailInput = form.querySelector('#newsletter-email');
        const privacyCheckbox = form.querySelector('#newsletter-privacy');
        const emailError = form.querySelector('#newsletter-email-error');
        const privacyError = form.querySelector('#newsletter-privacy-error');

        if (emailInput) {
            emailInput.addEventListener('input', () => {
                if (emailError) emailError.textContent = '';
                emailInput.setAttribute('aria-invalid', 'false');
            });

            emailInput.addEventListener('blur', () => {
                if (!emailInput.value.trim()) {
                    if (emailError) {
                        emailError.textContent = this.getTranslation('newsletter.emailRequired') || 'Email adresa je obavezna';
                    }
                    emailInput.setAttribute('aria-invalid', 'true');
                } else if (!this.isValidEmail(emailInput.value)) {
                    if (emailError) {
                        emailError.textContent = this.getTranslation('newsletter.invalidEmail') || 'Molimo unesite važeću email adresu';
                    }
                    emailInput.setAttribute('aria-invalid', 'true');
                }
            });
        }

        if (privacyCheckbox) {
            privacyCheckbox.addEventListener('change', () => {
                if (privacyError) privacyError.textContent = '';
            });
        }
    }

    validateNewsletterForm(form) {
        let isValid = true;
        const emailInput = form.querySelector('#newsletter-email');
        const privacyCheckbox = form.querySelector('#newsletter-privacy');
        const emailError = form.querySelector('#newsletter-email-error');
        const privacyError = form.querySelector('#newsletter-privacy-error');

        if (emailError) emailError.textContent = '';
        if (privacyError) privacyError.textContent = '';

        if (!emailInput.value.trim()) {
            if (emailError) {
                emailError.textContent = this.getTranslation('newsletter.emailRequired') || 'Email adresa je obavezna';
            }
            emailInput.setAttribute('aria-invalid', 'true');
            isValid = false;
        } else if (!this.isValidEmail(emailInput.value)) {
            if (emailError) {
                emailError.textContent = this.getTranslation('newsletter.invalidEmail') || 'Molimo unesite važeću email adresu';
            }
            emailInput.setAttribute('aria-invalid', 'true');
            isValid = false;
        } else {
            emailInput.setAttribute('aria-invalid', 'false');
        }

        if (!privacyCheckbox.checked) {
            if (privacyError) {
                privacyError.textContent = this.getTranslation('newsletter.privacyRequired') || 'Morate se složiti s politikom privatnosti';
            }
            isValid = false;
        }

        return isValid;
    }

    submitNewsletterForm(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.innerHTML = `
            <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>
            ${this.getTranslation('newsletter.subscribing') || 'Pretplata...'}
        `;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        this.submitToHubSpot(data, 'newsletter').then(() => {
            if (window.criticalApp) {
                window.criticalApp.showNotification(
                    this.getTranslation('newsletter.success') || 'Hvala vam što ste se pretplatili na naš newsletter!',
                    'success'
                );
            }
            form.reset();
            this.hideNewsletterModal();

            submitButton.disabled = false;
            submitButton.innerHTML = originalText;

        }).catch((error) => {
            console.error('Newsletter submission failed:', error);
            if (window.criticalApp) {
                window.criticalApp.showNotification(
                    this.getTranslation('newsletter.error') || 'Pretplata nije uspjela. Pokušajte ponovno.',
                    'error'
                );
            }

            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        });
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Cleanup method to clear intervals
    destroy() {
        if (this.sliderInterval) {
            clearInterval(this.sliderInterval);
        }
    }
}

// Enhanced internal linking
class InternalLinking {
    constructor() {
        this.init();
    }

    init() {
        this.addRelatedServicesLinks();
        this.addServiceToPortfolioLinks();
        this.addCrossServiceReferences();
    }

    addRelatedServicesLinks() {
        const servicesGrid = document.querySelector('.services-grid');
        if (servicesGrid) {
            // Add related service links to service cards
            const serviceLinks = {
                'web-development': ['seo', 'logo-design', 'custom-development'],
                'seo': ['web-development', 'web-marketing', 'sem'],
                'logo-design': ['web-development', 'brand-identity']
            };

            // Implementation would go here based on your specific structure
        }
    }

    addServiceToPortfolioLinks() {
        // Add links from services to relevant portfolio items
        const portfolioLinks = document.querySelectorAll('.service-card');
        portfolioLinks.forEach(card => {
            // Add "View related work" links
        });
    }

    addCrossServiceReferences() {
        // Add cross-references between services
        console.log('✅ Internal linking initialized');
    }
}

// Initialize homepage-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a page that needs non-critical functionality
    const needsNonCritical =
        document.querySelector('.testimonials-slider') ||
        document.querySelector('#contact-form') ||
        document.querySelector('.contact-page-content') ||
        document.querySelector('.faq-content') ||
        document.querySelector('.newsletter-modal');

    if (needsNonCritical) {
        setTimeout(() => {
            console.log('🚀 Starting NonCriticalApp initialization...');
            window.nonCriticalApp = new NonCriticalApp();

            // Initialize internal linking if needed
            if (document.querySelector('.services-grid')) {
                window.internalLinking = new InternalLinking();
            }
        }, 500);
    }
});

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NonCriticalApp, InternalLinking };
}
