class TranslationManager {
    constructor() {
        this.currentLang = 'hr';
        this.translations = {
            'hr': {},
            'en': {}
        };
        this.initialized = false;
        this.basePath = this.getBasePath();
        this.initPromise = this.init();
    }

    async init() {
        if (this.initialized) return;

        console.log('🌐 Initializing TranslationManager...');
        console.log(`📁 Base path resolved to: ${this.basePath}`);

        try {
            await Promise.all([
                this.loadTranslationFile('hr', `${this.basePath}translations/hr.json`),
                this.loadTranslationFile('en', `${this.basePath}translations/en.json`)
            ]);

            // Get saved language with proper fallback
            const savedLang = localStorage.getItem('preferredLanguage');
            console.log('💾 Saved language from localStorage:', savedLang);

            // Validate saved language exists in our translations
            if (savedLang && this.translations[savedLang] && Object.keys(this.translations[savedLang]).length > 0) {
                this.currentLang = savedLang;
                console.log(`✅ Using saved language: ${savedLang}`);
            } else {
                this.currentLang = 'hr'; // Default to Croatian
                localStorage.setItem('preferredLanguage', 'hr');
                console.log(`🔧 Using default language: hr`);
            }

            this.initialized = true;
            console.log('✅ TranslationManager initialized successfully');

            // Apply translations immediately
            this.applyTranslations();

            // Update language switcher UI
            this.updateLanguageSwitcher();

        } catch (error) {
            console.error('❌ Error initializing TranslationManager:', error);
            this.initialized = true;
        }
    }

    getBasePath() {
        const currentPath = window.location.pathname;
        console.log(`📍 Current path: ${currentPath}`);

        if (currentPath.includes('/stranice/')) {
            return '../';
        } else if (currentPath.includes('/web-usluge/') || currentPath.includes('/usluge/')) {
            return '../';
        } else if (currentPath.includes('/websites/')) {
            if (currentPath.includes('/web-lemgenda/')) {
                return './';
            }
            return './web-lemgenda/';
        } else {
            return './';
        }
    }

    async loadTranslationFile(lang, filePath) {
        try {
            console.log(`📥 Loading ${lang} translations from: ${filePath}`);
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}: ${response.status}`);
            }
            const translations = await response.json();
            this.translations[lang] = translations;
            console.log(`✅ Loaded ${lang} translations successfully`);
            return true;
        } catch (error) {
            console.error(`❌ Error loading ${lang} translations:`, error);
            this.translations[lang] = {};
            return false;
        }
    }

    getBasePathForComponents() {
        return this.basePath;
    }

    getTranslation(key) {
        if (!this.initialized) {
            console.warn('TranslationManager not initialized yet, returning key:', key);
            return key;
        }

        const keys = key.split('.');
        let value = this.translations[this.currentLang];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                value = undefined;
                break;
            }
        }

        if (value === undefined && this.currentLang !== 'en') {
            value = this.translations['en'];
            for (const k of keys) {
                if (value && typeof value === 'object' && k in value) {
                    value = value[k];
                } else {
                    value = undefined;
                    break;
                }
            }
        }

        if (value === undefined) {
            console.warn(`🚫 Translation not found for key: ${key}`);
            return key;
        }

        return value;
    }

    setLanguage(lang) {
        console.log(`🔤 Setting language to: ${lang}`);

        if (this.translations[lang] && Object.keys(this.translations[lang]).length > 0) {
            this.currentLang = lang;

            // Save to localStorage immediately
            localStorage.setItem('preferredLanguage', lang);
            console.log(`💾 Saved language preference: ${lang}`);

            // Apply translations
            this.applyTranslations();

            // Update language switcher UI
            this.updateLanguageSwitcher();

            // Trigger custom event for other components
            this.triggerLanguageChange();

            console.log(`✅ Language set to: ${lang}`);
        } else {
            console.warn(`⚠️ Language ${lang} not available or empty`);
        }
    }

    applyTranslations() {
        if (!this.initialized) {
            console.warn('Cannot apply translations - TranslationManager not initialized');
            return;
        }

        const elements = document.querySelectorAll('[data-translate]');
        console.log(`🔄 Applying translations to ${elements.length} elements`);

        let appliedCount = 0;
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);

            if (translation && translation !== key) {
                this.applyTranslationToElement(element, translation);
                appliedCount++;
            }
        });

        // Apply placeholder translations
        const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            const translation = this.getTranslation(key);

            if (translation && translation !== key) {
                element.setAttribute('placeholder', translation);
            }
        });

        console.log(`✅ Applied ${appliedCount} translations and ${placeholderElements.length} placeholders`);

        // Trigger services regeneration if nonCriticalApp exists
        if (window.nonCriticalApp && typeof window.nonCriticalApp.regenerateServices === 'function') {
            window.nonCriticalApp.regenerateServices();
        }
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
            } else if (element.hasAttribute('title')) {
                element.setAttribute('title', translation);
            } else if (element.hasAttribute('alt')) {
                element.setAttribute('alt', translation);
            } else {
                if (typeof translation === 'string' && translation.includes('<') && translation.includes('>')) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        } catch (error) {
            console.error('Error applying translation to element:', error, element);
        }
    }

    updateLanguageSwitcher() {
        const currentLangSpan = document.querySelector('.current-lang');
        if (currentLangSpan) {
            currentLangSpan.textContent = this.currentLang.toUpperCase();
            console.log(`🎯 Updated language switcher to: ${this.currentLang.toUpperCase()}`);
        }

        // Update dropdown buttons active state
        const dropdownButtons = document.querySelectorAll('.language-dropdown button');
        dropdownButtons.forEach(button => {
            const lang = button.getAttribute('data-lang');
            button.textContent = lang.toUpperCase();

            // Update active state
            if (lang === this.currentLang) {
                button.setAttribute('aria-current', 'true');
                button.classList.add('active');
            } else {
                button.removeAttribute('aria-current');
                button.classList.remove('active');
            }
        });
    }

    // New method to trigger language change event
    triggerLanguageChange() {
        const event = new CustomEvent('languageChanged', {
            detail: { language: this.currentLang }
        });
        document.dispatchEvent(event);
        console.log(`📢 Dispatched languageChanged event: ${this.currentLang}`);
    }

    // Method to check if a specific key exists
    hasTranslation(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return false;
            }
        }
        return value !== undefined;
    }

    // Method to get available languages
    getAvailableLanguages() {
        return Object.keys(this.translations).filter(lang =>
            this.translations[lang] && Object.keys(this.translations[lang]).length > 0
        );
    }

    // Method to reload translations (useful for development)
    async reloadTranslations() {
        this.initialized = false;
        this.translations = { 'hr': {}, 'en': {} };
        await this.init();
    }

    // Method to get current language
    getCurrentLanguage() {
        return this.currentLang;
    }

    // Method to check if translations are loaded
    isInitialized() {
        return this.initialized;
    }

    // Method to get translation stats (for debugging)
    getTranslationStats() {
        const stats = {};
        Object.keys(this.translations).forEach(lang => {
            stats[lang] = {
                loaded: this.translations[lang] && Object.keys(this.translations[lang]).length > 0,
                keyCount: this.translations[lang] ? this.countKeys(this.translations[lang]) : 0
            };
        });
        return stats;
    }

    // Helper method to count keys in nested object
    countKeys(obj) {
        let count = 0;
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                count++;
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    count += this.countKeys(obj[key]);
                }
            }
        }
        return count;
    }
}

// SINGLE initialization point
if (!window.translationManager) {
    console.log('🚀 Creating TranslationManager instance...');
    window.translationManager = new TranslationManager();

    // Listen for storage events to sync language across tabs
    window.addEventListener('storage', (e) => {
        if (e.key === 'preferredLanguage' && e.newValue) {
            console.log('🔄 Storage event - language changed in another tab:', e.newValue);
            if (window.translationManager) {
                window.translationManager.setLanguage(e.newValue);
            }
        }
    });
} else {
    console.log('⚠️ TranslationManager already exists');
}

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationManager;
}