// Enhanced Contact Page JavaScript - COMPLETE VERSION
class ContactEnhancements {
    constructor() {
        this.chatOpen = false;
        this.init();
    }

    init() {
        this.initClickToCall();
        this.initEnhancedLiveChat();
        this.initFormEnhancements();
        this.initSocialMediaTracking();
        this.initTrustSignalsAnimation();
        this.initMapInteractions();
    }

    // ===== CLICK TO CALL FUNCTIONALITY =====
    initClickToCall() {
        const phoneLinks = document.querySelectorAll('.click-to-call');

        phoneLinks.forEach(link => {
            // Add click event for analytics
            link.addEventListener('click', (e) => {
                this.trackPhoneCall();
            });

            // Add touch event for mobile devices
            link.addEventListener('touchend', (e) => {
                this.trackPhoneCall();
            });
        });

        // Detect if device is mobile
        this.detectMobileDevice();
    }

    trackPhoneCall() {
        // Track phone call in analytics
        if (window.gtag) {
            gtag('event', 'click', {
                'event_category': 'Contact',
                'event_label': 'Phone Call'
            });
        }

        // HubSpot tracking
        if (window._hsq) {
            window._hsq.push(['trackEvent', {
                id: 'phone_call_clicked',
                value: 'Phone number clicked'
            }]);
        }

        console.log('Phone call tracked');
    }

    detectMobileDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            document.body.classList.add('mobile-device');
            // Enhance click-to-call visibility on mobile
            const clickHints = document.querySelectorAll('.click-to-call-hint');
            clickHints.forEach(hint => {
                hint.style.display = 'inline';
            });
        }
    }

    // ===== ENHANCED LIVE CHAT FUNCTIONALITY =====
    initEnhancedLiveChat() {
        const chatToggle = document.querySelector('.chat-toggle');
        const chatWindow = document.querySelector('.chat-window');
        const chatClose = document.querySelector('.chat-close');
        const chatInput = document.querySelector('.chat-input input');
        const chatSend = document.querySelector('.chat-input button');
        const chatBody = document.querySelector('.chat-body');

        if (!chatToggle || !chatWindow) return;

        // Create typing indicator
        const typingIndicator = this.createTypingIndicator();
        if (chatBody) {
            chatBody.appendChild(typingIndicator);
        }

        chatToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleChat(chatWindow, chatToggle);
        });

        if (chatClose) {
            chatClose.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeChat(chatWindow, chatToggle);
            });
        }

        // Send message functionality
        if (chatSend && chatInput) {
            chatSend.addEventListener('click', () => this.sendChatMessage(chatInput, chatBody, typingIndicator));
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendChatMessage(chatInput, chatBody, typingIndicator);
                }
            });
        }

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (this.chatOpen &&
                !chatToggle.contains(e.target) &&
                !chatWindow.contains(e.target)) {
                this.closeChat(chatWindow, chatToggle);
            }
        });

        // Prevent chat window clicks from closing
        chatWindow.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Auto-open chat after delay (optional)
        setTimeout(() => {
            if (!this.chatOpen && Math.random() > 0.7) { // 30% chance
                this.showChatNotification();
            }
        }, 10000);
    }

    createTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <span>Agent is typing...</span>
        `;
        return indicator;
    }

    toggleChat(chatWindow, chatToggle) {
        this.chatOpen = !this.chatOpen;
        chatWindow.setAttribute('aria-hidden', !this.chatOpen);
        chatToggle.setAttribute('aria-expanded', this.chatOpen);

        if (this.chatOpen) {
            this.trackLiveChatOpen();
            // Focus on input when opening
            const chatInput = chatWindow.querySelector('input');
            if (chatInput) {
                setTimeout(() => chatInput.focus(), 300);
            }
        }
    }

    closeChat(chatWindow, chatToggle) {
        this.chatOpen = false;
        chatWindow.setAttribute('aria-hidden', 'true');
        chatToggle.setAttribute('aria-expanded', 'false');
    }

    async sendChatMessage(input, chatBody, typingIndicator) {
        const message = input.value.trim();
        if (!message) return;

        // Add user message
        this.addChatMessage(chatBody, message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator(typingIndicator);

        // Simulate agent response after delay
        setTimeout(() => {
            this.hideTypingIndicator(typingIndicator);
            this.sendAutoResponse(chatBody, message);
        }, 1500 + Math.random() * 1000);
    }

    addChatMessage(chatBody, message, sender = 'user') {
        const messageEl = document.createElement('p');
        messageEl.textContent = message;

        if (sender === 'user') {
            messageEl.style.marginLeft = 'auto';
            messageEl.style.marginRight = '0';
            messageEl.style.background = 'linear-gradient(135deg, var(--primary-color), #1a2d42)';
            messageEl.style.color = 'white';
            messageEl.style.borderRadius = '18px 18px 4px 18px';
            messageEl.style.maxWidth = '80%';
        } else {
            messageEl.style.background = 'white';
            messageEl.style.color = 'var(--text-color)';
            messageEl.style.borderRadius = '18px 18px 18px 4px';
            messageEl.style.maxWidth = '80%';
        }

        if (chatBody) {
            chatBody.appendChild(messageEl);
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }

    showTypingIndicator(indicator) {
        if (indicator) {
            indicator.classList.add('active');
            const chatBody = indicator.parentElement;
            if (chatBody) {
                chatBody.scrollTop = chatBody.scrollHeight;
            }
        }
    }

    hideTypingIndicator(indicator) {
        if (indicator) {
            indicator.classList.remove('active');
        }
    }

    sendAutoResponse(chatBody, userMessage) {
        const responses = [
            "Thanks for your message! Our team will get back to you shortly.",
            "I understand you're interested in our services. Let me connect you with a specialist.",
            "Great question! We offer comprehensive web development services tailored to your needs.",
            "I can help you with that! What specific service are you most interested in?",
            "Thank you for reaching out! We typically respond within 1-2 business hours.",
            "That's a great question! Let me provide you with more information about our services."
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];
        this.addChatMessage(chatBody, response, 'agent');
    }

    showChatNotification() {
        // Create a subtle notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            background: white;
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            border-left: 4px solid var(--primary-color);
            z-index: 10001;
            max-width: 250px;
            animation: slideInRight 0.3s ease;
            font-family: 'Noto Sans', sans-serif;
        `;

        notification.innerHTML = `
            <strong>Need help?</strong>
            <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; color: #666;">
                We're here to answer your questions!
            </p>
        `;

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // ===== TRUST SIGNALS ANIMATION =====
    initTrustSignalsAnimation() {
        const trustItems = document.querySelectorAll('.trust-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
                    }, 100);
                }
            });
        }, { threshold: 0.1 });

        trustItems.forEach(item => {
            item.style.opacity = '0';
            observer.observe(item);
        });
    }

    // ===== FORM ENHANCEMENTS =====
    initFormEnhancements() {
        const form = document.getElementById('contact-page-form');
        if (!form) return;

        // Add real-time validation
        this.initRealTimeValidation(form);

        // Add form analytics
        form.addEventListener('submit', (e) => {
            this.trackFormSubmission();
        });

        // Track form interactions
        this.trackFormInteractions(form);
    }

    initRealTimeValidation(form) {
        const emailInput = form.querySelector('input[type="email"]');
        const phoneInput = form.querySelector('input[type="tel"]');

        if (emailInput) {
            emailInput.addEventListener('blur', () => {
                this.validateEmail(emailInput);
            });
        }

        if (phoneInput) {
            phoneInput.addEventListener('blur', () => {
                this.validatePhone(phoneInput);
            });
        }
    }

    validateEmail(input) {
        const email = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && !emailRegex.test(email)) {
            this.showValidationError(input, 'Please enter a valid email address');
        } else {
            this.clearValidationError(input);
        }
    }

    validatePhone(input) {
        const phone = input.value.trim();
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;

        if (phone && !phoneRegex.test(phone)) {
            this.showValidationError(input, 'Please enter a valid phone number');
        } else {
            this.clearValidationError(input);
        }
    }

    showValidationError(input, message) {
        this.clearValidationError(input);

        const error = document.createElement('div');
        error.className = 'validation-error';
        error.textContent = message;
        error.style.color = 'var(--error-color)';
        error.style.fontSize = '0.8rem';
        error.style.marginTop = '0.25rem';
        error.style.fontWeight = '500';

        input.parentNode.appendChild(error);
        input.style.borderColor = 'var(--error-color)';
    }

    clearValidationError(input) {
        const existingError = input.parentNode.querySelector('.validation-error');
        if (existingError) {
            existingError.remove();
        }
        input.style.borderColor = '';
    }

    // ===== SOCIAL MEDIA TRACKING =====
    initSocialMediaTracking() {
        const socialLinks = document.querySelectorAll('.social-link');

        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = link.classList[1]; // facebook, instagram, etc.
                this.trackSocialClick(platform);

                // Add slight delay for analytics to fire before navigation
                setTimeout(() => {
                    // Allow natural navigation
                }, 100);
            });
        });
    }

    // ===== MAP INTERACTIONS =====
    initMapInteractions() {
        const mapIframe = document.querySelector('.map-container iframe');
        if (mapIframe) {
            // Add loading state
            mapIframe.addEventListener('load', () => {
                console.log('Google Maps loaded successfully');
                this.trackMapView();
            });

            // Add error handling
            mapIframe.addEventListener('error', () => {
                console.error('Failed to load Google Maps');
                this.showMapFallback();
            });
        }
    }

    showMapFallback() {
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div style="padding: 2rem; text-align: center; background: #f8f9fa; border-radius: 8px;">
                    <h4>Location Map</h4>
                    <p>Ulica Jurja Križanića 6, 44000 Sisak, Croatia</p>
                    <a href="https://maps.google.com/?q=Ulica+Jurja+Križanića+6,+44000+Sisak,+Croatia"
                       target="_blank"
                       style="color: var(--primary-color); text-decoration: underline;">
                        Open in Google Maps
                    </a>
                </div>
            `;
        }
    }

    // ===== ANALYTICS TRACKING METHODS =====
    trackLiveChatOpen() {
        if (window.gtag) {
            gtag('event', 'live_chat_open', {
                'event_category': 'Engagement',
                'event_label': 'Live Chat Started'
            });
        }

        if (window._hsq) {
            window._hsq.push(['trackEvent', {
                id: 'live_chat_opened',
                value: 'User opened live chat'
            }]);
        }

        console.log('Live chat opened - analytics tracked');
    }

    trackFormSubmission() {
        if (window.gtag) {
            gtag('event', 'form_submit', {
                'event_category': 'Contact',
                'event_label': 'Contact Form Submitted'
            });
        }

        if (window._hsq) {
            window._hsq.push(['trackEvent', {
                id: 'contact_form_submitted',
                value: 'Contact form completed'
            }]);
        }

        console.log('Form submission tracked');
    }

    trackFormInteractions(form) {
        const fields = form.querySelectorAll('input, textarea, select');

        fields.forEach(field => {
            field.addEventListener('focus', () => {
                this.trackFieldFocus(field.name);
            });

            field.addEventListener('change', () => {
                this.trackFieldChange(field.name);
            });
        });
    }

    trackFieldFocus(fieldName) {
        if (window.gtag) {
            gtag('event', 'form_field_focus', {
                'event_category': 'Form Interaction',
                'event_label': fieldName
            });
        }
        console.log('Field focused:', fieldName);
    }

    trackFieldChange(fieldName) {
        if (window.gtag) {
            gtag('event', 'form_field_change', {
                'event_category': 'Form Interaction',
                'event_label': fieldName
            });
        }
        console.log('Field changed:', fieldName);
    }

    trackSocialClick(platform) {
        if (window.gtag) {
            gtag('event', 'social_click', {
                'event_category': 'Social Media',
                'event_label': platform
            });
        }

        if (window._hsq) {
            window._hsq.push(['trackEvent', {
                id: 'social_media_click',
                value: platform
            }]);
        }

        console.log('Social media click tracked:', platform);
    }

    trackMapView() {
        if (window.gtag) {
            gtag('event', 'map_view', {
                'event_category': 'Engagement',
                'event_label': 'Google Maps Viewed'
            });
        }

        console.log('Map view tracked');
    }
}

// ===== CSS ANIMATIONS =====
const contactStyles = document.createElement('style');
contactStyles.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }

    /* Validation error styles */
    .validation-error {
        color: var(--error-color) !important;
        font-size: 0.8rem !important;
        margin-top: 0.25rem !important;
        font-weight: 500 !important;
    }

    /* Mobile device enhancements */
    body.mobile-device .click-to-call-hint {
        display: inline !important;
        font-size: 0.75rem;
        color: var(--text-muted);
    }
`;
document.head.appendChild(contactStyles);

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other scripts to initialize
    setTimeout(() => {
        try {
            new ContactEnhancements();
            console.log('✅ Contact enhancements initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize contact enhancements:', error);
        }
    }, 100);
});

// Export for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactEnhancements;
}