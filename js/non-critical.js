class NonCriticalApp {
    constructor() {
        // Use TranslationManager's base path or fallback
        this.basePath = this.getBasePath();
        setTimeout(() => this.init(), 100);
    }

    getBasePath() {
        // Delegate to TranslationManager for consistent path resolution
        if (window.translationManager && window.translationManager.getBasePath) {
            return window.translationManager.getBasePath();
        }
        return '../';
    }

    init() {
        this.generateHomepageContent();
        this.generateContactPageFAQ();
        this.initTestimonialsSlider();
        this.initFAQ();
        this.initContactForm();
        this.initLazyLoading();
        this.initPerformanceMonitoring();
        this.initNewsletterModal();
        this.initContactPageForm();
    }

    generateHomepageContent() {
        if (!document.querySelector('.services-grid') && !document.querySelector('.testimonial-track') && !document.querySelector('.faq-content')) {
            return;
        }

        this.generateServices();
        this.generateAboutContent();
        this.generateTestimonials();
        this.generateFAQ();
    }

    generateServices() {
        const servicesGrid = document.querySelector('.services-grid');
        if (!servicesGrid) return;

        const services = [
            {
                icon: 'fas fa-laptop-code',
                title: this.getTranslation('services.responsiveWebsites'),
                description: this.getTranslation('services.responsiveWebsitesDesc'),
                key: 'responsiveWebsites'
            },
            {
                icon: 'fas fa-search',
                title: this.getTranslation('services.seoOptimization'),
                description: this.getTranslation('services.seoOptimizationDesc'),
                key: 'seoOptimization'
            },
            {
                icon: 'fas fa-palette',
                title: this.getTranslation('services.logoDesign'),
                description: this.getTranslation('services.logoDesignDesc'),
                key: 'logoDesign'
            },
            {
                icon: 'fas fa-code',
                title: this.getTranslation('services.customDevelopment'),
                description: this.getTranslation('services.customDevelopmentDesc'),
                key: 'customDevelopment'
            },
            {
                icon: 'fas fa-mobile-alt',
                title: this.getTranslation('services.mobileCleanup'),
                description: this.getTranslation('services.mobileCleanupDesc'),
                key: 'mobileCleanup'
            },
            {
                icon: 'fas fa-desktop',
                title: this.getTranslation('services.osInstallation'),
                description: this.getTranslation('services.osInstallationDesc'),
                key: 'osInstallation'
            },
            {
                icon: 'fas fa-shield-virus',
                title: this.getTranslation('services.pcCleanup'),
                description: this.getTranslation('services.pcCleanupDesc'),
                key: 'pcCleanup'
            }
        ];

        servicesGrid.innerHTML = services.map(service => `
            <div class="service-card">
                <div class="service-icon">
                    <i class="${service.icon}" aria-hidden="true"></i>
                </div>
                <h3 class="service-title">${service.title}</h3>
                <p class="service-description">${service.description}</p>
            </div>
        `).join('');

        console.log('✅ Services generated');
    }

    generateAboutContent() {
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

        console.log('✅ About content generated');
    }

    generateTestimonials() {
        const testimonialTrack = document.querySelector('.testimonial-track');
        if (!testimonialTrack) return;

        const testimonials = [
            {
                content: "Lemgenda created an amazing website for our business. Professional, fast, and great communication throughout the project.",
                author: "Ivan Horvat",
                company: "Tech Solutions Inc."
            },
            {
                content: "Excellent SEO services! Our website traffic increased by 200% in just 3 months. Highly recommended!",
                author: "Ana Kovač",
                company: "Digital Marketing Pro"
            },
            {
                content: "The custom web application they built for us has streamlined our workflow perfectly. Great technical expertise!",
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

        console.log('✅ Testimonials generated');
    }

    generateFAQ() {
        const faqContent = document.querySelector('.faq-content');
        if (!faqContent) return;

        const faqs = [
            {
                question: this.getTranslation('faq.q1'),
                answer: this.getTranslation('faq.a1'),
                key: 'q1'
            },
            {
                question: this.getTranslation('faq.q2'),
                answer: this.getTranslation('faq.a2'),
                key: 'q2'
            },
            {
                question: this.getTranslation('faq.q3'),
                answer: this.getTranslation('faq.a3'),
                key: 'q3'
            },
            {
                question: this.getTranslation('faq.q4'),
                answer: this.getTranslation('faq.a4'),
                key: 'q4'
            },
            {
                question: this.getTranslation('faq.q5'),
                answer: this.getTranslation('faq.a5'),
                key: 'q5'
            }
        ];

        faqContent.innerHTML = faqs.map((faq, index) => `
            <div class="faq-item">
                <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${index}">
                    <span>${faq.question}</span>
                    <i class="fas fa-chevron-down" aria-hidden="true"></i>
                </button>
                <div class="faq-answer" id="faq-answer-${index}" aria-hidden="true">
                    <p>${faq.answer}</p>
                </div>
            </div>
        `).join('');

        console.log('✅ FAQ generated');
    }

    generateContactPageFAQ() {
        const contactFaqContent = document.querySelector('.contact-page-content .faq-content');
        if (!contactFaqContent) return;

        const contactFaqs = [
            {
                question: this.getTranslation('contact.faq1'),
                answer: this.getTranslation('contact.faq1answer'),
                key: 'faq1'
            },
            {
                question: this.getTranslation('contact.faq2'),
                answer: this.getTranslation('contact.faq2answer'),
                key: 'faq2'
            },
            {
                question: this.getTranslation('contact.faq3'),
                answer: this.getTranslation('contact.faq3answer'),
                key: 'faq3'
            }
        ];

        contactFaqContent.innerHTML = contactFaqs.map((faq, index) => `
            <div class="faq-item">
                <button class="faq-question" aria-expanded="false" aria-controls="contact-faq-answer-${index}">
                    <span>${faq.question}</span>
                    <i class="fas fa-chevron-down" aria-hidden="true"></i>
                </button>
                <div class="faq-answer" id="contact-faq-answer-${index}" aria-hidden="true">
                    <p>${faq.answer}</p>
                </div>
            </div>
        `).join('');

        console.log('✅ Contact FAQ generated');
    }

    // PROPER TRANSLATION FALLBACK
    getTranslation(key) {
        // Use the translation manager if available and initialized
        if (window.translationManager && window.translationManager.initialized) {
            return window.translationManager.getTranslation(key);
        }
        // Fallback to key if translations aren't ready
        return key;
    }

    // Add the missing methods
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
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }

        const goToSlide = (slideIndex) => {
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
            goToSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(currentSlide);
        };

        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        // Auto-advance slides
        setInterval(nextSlide, 5000);

        console.log('✅ Testimonials slider initialized');
    }

    initFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';
                const answer = document.getElementById(question.getAttribute('aria-controls'));

                // Close all other FAQ items
                faqQuestions.forEach(q => {
                    if (q !== question) {
                        q.setAttribute('aria-expanded', 'false');
                        const otherAnswer = document.getElementById(q.getAttribute('aria-controls'));
                        if (otherAnswer) {
                            otherAnswer.setAttribute('aria-hidden', 'true');
                        }
                    }
                });

                // Toggle current item
                question.setAttribute('aria-expanded', !isExpanded);
                if (answer) {
                    answer.setAttribute('aria-hidden', isExpanded);
                }
            });
        });

        console.log('✅ FAQ initialized');
    }

    initContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateContactForm(contactForm)) {
                this.submitContactForm(contactForm, 'contact');
            }
        });

        console.log('✅ Contact form initialized');
    }

    initContactPageForm() {
        const contactPageForm = document.getElementById('contact-page-form');
        if (!contactPageForm) return;

        contactPageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateContactPageForm(contactPageForm)) {
                this.submitContactForm(contactPageForm, 'contact');
            }
        });

        console.log('✅ Contact page form initialized');
    }

    initLazyLoading() {
        // Simple lazy loading for images
        const images = document.querySelectorAll('img[loading="lazy"]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));

        console.log('✅ Lazy loading initialized');
    }

    initPerformanceMonitoring() {
        // Basic performance monitoring
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`🕒 Page load time: ${loadTime}ms`);
        });

        console.log('✅ Performance monitoring initialized');
    }

    validateContactForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.setAttribute('aria-invalid', 'true');
            } else {
                field.setAttribute('aria-invalid', 'false');
            }
        });

        return isValid;
    }

    validateContactPageForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.setAttribute('aria-invalid', 'true');
            } else {
                field.setAttribute('aria-invalid', 'false');
            }
        });

        return isValid;
    }

    // Updated submitContactForm method with HubSpot integration
    submitContactForm(form, formType = 'contact') {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>
            Sending...
        `;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Submit to HubSpot with correct form type
        this.submitToHubSpot(data, formType).then(() => {
            this.showNotification('Message sent successfully! We will get back to you soon.', 'success');
            form.reset();

            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }).catch((error) => {
            console.error('Form submission failed:', error);
            this.showNotification('Message failed to send. Please try again or contact us directly.', 'error');

            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        });
    }

    // HubSpot submission method with your actual form IDs
    submitToHubSpot(data, formType) {
        return new Promise((resolve, reject) => {
            // Map form types to HubSpot form IDs
            const formIds = {
                'newsletter': 'c741e7cd0e65',      // Newsletter Subscription
                'contact': '1e99eeb57eff',         // General Contact
                'landing': 'd94966c3db03'          // Website Consultation
            };

            const formId = formIds[formType] || formIds['contact'];

            // Prepare form data for HubSpot
            const hubspotFormData = {
                fields: this.prepareHubSpotFields(data, formType),
                context: {
                    pageUri: window.location.href,
                    pageName: document.title,
                    hutk: document.cookie.match(/hubspotutk=([^;]+)/)?.[1] // User token
                }
            };

            console.log(`📤 Submitting to HubSpot form ${formId}:`, hubspotFormData);

            // Use HubSpot Forms API
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

    // Helper method to prepare HubSpot fields
    prepareHubSpotFields(data, formType) {
        const fields = [];

        // Email field (common to all forms)
        if (data.email) {
            fields.push({
                name: "email",
                value: data.email
            });
        }

        // Name fields
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

        // Phone field
        if (data.phone) {
            fields.push({
                name: "phone",
                value: data.phone
            });
        }

        // Company field
        if (data.company) {
            fields.push({
                name: "company",
                value: data.company
            });
        }

        // Project type (for landing page)
        if (data.project_type) {
            fields.push({
                name: "project_type",
                value: data.project_type
            });
        }

        // Budget (for landing page)
        if (data.budget) {
            fields.push({
                name: "budget",
                value: data.budget
            });
        }

        // Message/description
        if (data.message) {
            fields.push({
                name: "message",
                value: data.message
            });
        }

        // Subject (for contact forms)
        if (data.subject && !data.message) {
            fields.push({
                name: "message",
                value: data.subject
            });
        }

        // Website URL
        fields.push({
            name: "website",
            value: window.location.href
        });

        // Form source
        fields.push({
            name: "form_source",
            value: `${formType}_form_${window.location.pathname}`
        });

        return fields;
    }

    // Fixed Newsletter Modal functionality
    initNewsletterModal() {
        // Create newsletter modal if it doesn't exist
        this.createNewsletterModal();

        const newsletterModal = document.getElementById('newsletter-modal');
        if (!newsletterModal) return;

        // Check if user already saw the modal in this session AND no cookie consent is active
        const newsletterShown = sessionStorage.getItem('newsletterShown');
        const cookieConsent = document.getElementById('cookie-consent');
        const isCookieConsentActive = cookieConsent && cookieConsent.classList.contains('active');

        if (!newsletterShown && !isCookieConsentActive) {
            // Show newsletter modal after 15 seconds (increased from 10)
            setTimeout(() => {
                // Double-check cookie consent isn't active
                const currentCookieConsent = document.getElementById('cookie-consent');
                const isCookieActive = currentCookieConsent && currentCookieConsent.classList.contains('active');

                if (!isCookieActive) {
                    this.showNewsletterModal();
                    sessionStorage.setItem('newsletterShown', 'true');
                } else {
                    console.log('📧 Newsletter delayed - cookie consent active');
                }
            }, 15000);
        }

        // Newsletter form handling
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

        // Close button event
        const closeBtn = newsletterModal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hideNewsletterModal();
            });
        }

        console.log('✅ Newsletter modal initialized');
    }

    // Updated newsletter form submission
    submitNewsletterForm(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>
            Subscribing...
        `;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Submit to HubSpot newsletter form
        this.submitToHubSpot(data, 'newsletter').then(() => {
            this.showNotification('Thank you for subscribing to our newsletter!', 'success');
            form.reset();
            this.hideNewsletterModal();

            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;

        }).catch((error) => {
            console.error('Newsletter submission failed:', error);
            this.showNotification('Subscription failed. Please try again.', 'error');

            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        });
    }

    createNewsletterModal() {
        // Check if modal already exists
        if (document.getElementById('newsletter-modal')) return;

        const modalsContainer = document.getElementById('modals-container');
        if (!modalsContainer) return;

        const newsletterModal = document.createElement('div');
        newsletterModal.id = 'newsletter-modal';
        newsletterModal.className = 'modal newsletter-modal';
        newsletterModal.setAttribute('aria-hidden', 'true');
        newsletterModal.setAttribute('aria-labelledby', 'newsletter-modal-title');

        newsletterModal.innerHTML = `
            <div class="modal-content newsletter-content">
                <div class="modal-header">
                    <h2 id="newsletter-modal-title" data-translate="newsletter.title">Stay Informed!</h2>
                    <p data-translate="newsletter.subtitle">Receive the latest web development trends and exclusive offers.</p>
                </div>
                <div class="modal-body">
                    <form id="newsletter-form" novalidate aria-label="Newsletter subscription form">
                        <div class="form-group">
                            <label for="newsletter-name" data-translate="newsletter.name">Name</label>
                            <input type="text" id="newsletter-name" name="name">
                        </div>
                        <div class="form-group">
                            <label for="newsletter-email" data-translate="newsletter.email">Email Address *</label>
                            <input type="email" id="newsletter-email" name="email" required>
                            <div class="error-message" id="newsletter-email-error"></div>
                        </div>
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="newsletter-privacy" name="privacy" required>
                                <span data-translate="newsletter.privacy">I agree to the privacy policy and terms of use</span>
                            </label>
                            <div class="error-message" id="newsletter-privacy-error"></div>
                        </div>
                        <button type="submit" class="btn btn-primary" data-translate="newsletter.subscribe">
                            <i class="fas fa-envelope" aria-hidden="true"></i>
                            Subscribe
                        </button>
                    </form>
                </div>
                <button class="modal-close" aria-label="Close newsletter modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        modalsContainer.appendChild(newsletterModal);

        console.log('✅ Newsletter modal created');
    }

    showNewsletterModal() {
        const newsletterModal = document.getElementById('newsletter-modal');
        if (!newsletterModal) return;

        // Check if cookie consent is currently active
        const cookieConsent = document.getElementById('cookie-consent');
        const isCookieActive = cookieConsent && cookieConsent.classList.contains('active');

        if (isCookieActive) {
            console.log('📧 Newsletter modal delayed - cookie consent is active');
            // Try again in 5 seconds
            setTimeout(() => this.showNewsletterModal(), 5000);
            return;
        }

        newsletterModal.classList.add('active');
        newsletterModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        console.log('📧 Newsletter modal shown');
    }

    hideNewsletterModal() {
        const newsletterModal = document.getElementById('newsletter-modal');
        if (!newsletterModal) return;

        newsletterModal.classList.remove('active');
        newsletterModal.setAttribute('aria-hidden', 'true');

        // Only reset body overflow if no other modals are active
        const otherActiveModals = document.querySelectorAll('.modal.active');
        if (otherActiveModals.length === 0) {
            document.body.style.overflow = '';
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
                        emailError.textContent = this.getTranslation('newsletter.emailRequired') || 'Email address is required';
                    }
                    emailInput.setAttribute('aria-invalid', 'true');
                } else if (!this.isValidEmail(emailInput.value)) {
                    if (emailError) {
                        emailError.textContent = this.getTranslation('newsletter.invalidEmail') || 'Please enter a valid email address';
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

        // Clear previous errors
        if (emailError) emailError.textContent = '';
        if (privacyError) privacyError.textContent = '';

        // Validate email
        if (!emailInput.value.trim()) {
            if (emailError) {
                emailError.textContent = this.getTranslation('newsletter.emailRequired') || 'Email address is required';
            }
            emailInput.setAttribute('aria-invalid', 'true');
            isValid = false;
        } else if (!this.isValidEmail(emailInput.value)) {
            if (emailError) {
                emailError.textContent = this.getTranslation('newsletter.invalidEmail') || 'Please enter a valid email address';
            }
            emailInput.setAttribute('aria-invalid', 'true');
            isValid = false;
        } else {
            emailInput.setAttribute('aria-invalid', 'false');
        }

        // Validate privacy checkbox
        if (!privacyCheckbox.checked) {
            if (privacyError) {
                privacyError.textContent = this.getTranslation('newsletter.privacyRequired') || 'You must agree to the privacy policy';
            }
            isValid = false;
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type = 'info') {
        if (window.criticalApp && window.criticalApp.showNotification) {
            window.criticalApp.showNotification(message, type);
        } else {
            // Fallback
            alert(message);
        }
    }
}

// Initialize homepage-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.testimonials-slider') ||
        document.querySelector('#contact-form') ||
        document.querySelector('.services-grid') ||
        document.querySelector('.contact-page-content')) {
        // Wait for critical app and translations
        setTimeout(() => {
            window.nonCriticalApp = new NonCriticalApp();
        }, 500);
    }
});