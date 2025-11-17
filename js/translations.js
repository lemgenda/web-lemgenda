class TranslationManager {
    constructor() {
        this.currentLang = 'hr';
        this.translations = {
            'hr': {},
            'en': {}
        };
        this.initialized = false;
        this.basePath = this.getBasePath(); // Calculate once
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

            const savedLang = localStorage.getItem('preferredLanguage') || 'hr';
            this.currentLang = savedLang;

            this.initialized = true;
            console.log('✅ TranslationManager initialized successfully');

            this.applyTranslations();

        } catch (error) {
            console.error('❌ Error initializing TranslationManager:', error);
            this.initialized = true;
        }
    }

    // SINGLE SOURCE OF TRUTH for base path resolution
    getBasePath() {
        const currentPath = window.location.pathname;
        console.log(`📍 Current path: ${currentPath}`);

        // Handle various URL structures
        if (currentPath.includes('/pages/')) {
            return '../';
        } else if (currentPath.includes('/services/')) {
            return '../';
        } else if (currentPath.includes('/websites/')) {
            // Handle your specific development structure
            if (currentPath.includes('/web-lemgenda/')) {
                return './';
            }
            return './web-lemgenda/';
        } else {
            return '../';
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

    // Make base path available to other components
    getBasePathForComponents() {
        return this.basePath;
    }

    // SYNCHRONOUS - no async/await
    getTranslation(key) {
        if (!this.initialized) {
            console.warn('TranslationManager not initialized yet, returning key:', key);
            return key;
        }

        // Handle nested keys like "navigation.home", "services.title", etc.
        const keys = key.split('.');
        let value = this.translations[this.currentLang];

        // Traverse the nested object
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                value = undefined;
                break;
            }
        }

        // If not found in current language, try English fallback
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

        // If still not found, return the key itself
        if (value === undefined) {
            console.warn(`🚫 Translation not found for key: ${key}`);
            return key;
        }

        return value;
    }

    setLanguage(lang) {
        if (this.translations[lang] && Object.keys(this.translations[lang]).length > 0) {
            this.currentLang = lang;
            localStorage.setItem('preferredLanguage', lang);
            this.applyTranslations();
            this.updateLanguageSwitcher();
            console.log(`🔤 Language set to: ${lang}`);
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

        console.log(`✅ Applied ${appliedCount} translations`);
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
                // Handle HTML content safely - only if translation contains HTML tags
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
        }

        // Update dropdown buttons
        const dropdownButtons = document.querySelectorAll('.language-dropdown button');
        dropdownButtons.forEach(button => {
            const lang = button.getAttribute('data-lang');
            button.textContent = lang.toUpperCase();
        });
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
} else {
    console.log('⚠️ TranslationManager already exists');
}

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationManager;
}