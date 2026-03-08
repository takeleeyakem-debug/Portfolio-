// ===== ASCENDA MARKETPLACE - COMPLETE FUNCTIONALITY =====
// ===== FUTURISTIC EDITION WITH FULL FEATURES =====

// ===== GLOBAL STATE =====
let currentUser = null;
let appData = {
    users: [],
    products: [],
    transactions: [],
    categories: ['ebooks', 'courses', 'templates', 'graphics', 'audio', 'software']
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    setupEventListeners();
    checkAuthentication();
    loadPageContent();
    initializeAnimations();
});

// ===== DATA MANAGEMENT =====
function initializeData() {
    // Load from localStorage or create default
    const savedData = localStorage.getItem('ascendaData');
    if (savedData) {
        appData = JSON.parse(savedData);
    } else {
        // Create sample data
        appData = {
            users: [
                {
                    id: 1,
                    name: "Abebe Kebede",
                    email: "seller@ascenda.com",
                    phone: "+251911234567",
                    password: "password123",
                    role: "seller",
                    language: "en",
                    verified: true,
                    balance: 2500.00,
                    profile_pic: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200",
                    joinDate: "2024-01-15",
                    totalSales: 47
                },
                {
                    id: 2,
                    name: "Almaz Worku",
                    email: "buyer@ascenda.com",
                    phone: "+251922345678",
                    password: "password123",
                    role: "buyer",
                    language: "am",
                    verified: true,
                    balance: 1500.00,
                    profile_pic: "https://images.unsplash.com/photo-1494790108777-466fd0c56504?w=200",
                    joinDate: "2024-02-20",
                    totalSales: 0
                }
            ],
            products: [
                {
                    id: 1,
                    seller_id: 1,
                    title: "Complete Web Development Bootcamp",
                    category: "courses",
                    description: "Master HTML, CSS, JavaScript, React, and Node.js with this comprehensive course. Includes 50+ hours of video, projects, and lifetime access.",
                    price: 89.99,
                    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600",
                    download_link: "https://example.com/course.zip",
                    preview_video: "https://youtube.com/watch?v=...",
                    createdAt: "2024-03-01",
                    sales: 234,
                    rating: 4.8
                },
                {
                    id: 2,
                    seller_id: 1,
                    title: "Ethiopian History E-Book Collection",
                    category: "ebooks",
                    description: "Complete collection of Ethiopian history books from ancient times to modern day. PDF format, 15 books included.",
                    price: 29.99,
                    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600",
                    download_link: "https://example.com/ebooks.zip",
                    preview_video: "",
                    createdAt: "2024-03-05",
                    sales: 156,
                    rating: 4.9
                },
                {
                    id: 3,
                    seller_id: 1,
                    title: "Modern Business Website Template",
                    category: "templates",
                    description: "Fully responsive HTML5/CSS3 template perfect for businesses. Includes 5 pages, contact form, and animations.",
                    price: 49.99,
                    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600",
                    download_link: "https://example.com/template.zip",
                    preview_video: "",
                    createdAt: "2024-03-10",
                    sales: 89,
                    rating: 4.7
                },
                {
                    id: 4,
                    seller_id: 1,
                    title: "Logo Design Masterclass",
                    category: "courses",
                    description: "Learn professional logo design from scratch. Includes Adobe Illustrator tutorials, design principles, and real-world projects.",
                    price: 59.99,
                    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600",
                    download_link: "https://example.com/logo-course.zip",
                    preview_video: "",
                    createdAt: "2024-03-12",
                    sales: 67,
                    rating: 4.6
                }
            ],
            transactions: [
                {
                    id: 1,
                    buyer_id: 2,
                    product_id: 1,
                    amount: 89.99,
                    date: "2024-03-15T10:30:00Z",
                    status: "completed"
                },
                {
                    id: 2,
                    buyer_id: 2,
                    product_id: 2,
                    amount: 29.99,
                    date: "2024-03-16T14:20:00Z",
                    status: "completed"
                }
            ]
        };
        saveData();
    }
}

function saveData() {
    localStorage.setItem('ascendaData', JSON.stringify(appData));
}

// ===== AUTHENTICATION =====
function checkAuthentication() {
    const currentPage = window.location.pathname.split('/').pop();
    const protectedPages = ['dashboard.html', 'add-product.html', 'my-products.html', 'profile.html'];
    
    // Check for logged in user
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForLoggedInUser();
    }
    
    // Redirect if needed
    if (protectedPages.includes(currentPage) && !currentUser) {
        window.location.href = 'login.html';
    }
}

function login(emailOrPhone, password) {
    const user = appData.users.find(u => 
        (u.email === emailOrPhone || u.phone === emailOrPhone) && 
        u.password === password
    );
    
    if (user) {
        currentUser = { ...user };
        delete currentUser.password; // Don't store password
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Log the login
        console.log(`User logged in: ${user.name}`);
        
        return { success: true, user: currentUser };
    }
    return { success: false, message: 'Invalid credentials' };
}

function signup(userData) {
    // Check if user exists
    const existingUser = appData.users.find(u => 
        u.email === userData.email || u.phone === userData.phone
    );
    
    if (existingUser) {
        return { success: false, message: 'User already exists' };
    }
    
    // Create new user
    const newUser = {
        id: appData.users.length + 1,
        ...userData,
        verified: false,
        balance: 0,
        profile_pic: userData.profile_pic || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200',
        joinDate: new Date().toISOString().split('T')[0],
        totalSales: 0
    };
    
    appData.users.push(newUser);
    saveData();
    
    // Store for verification
    localStorage.setItem('pendingUser', JSON.stringify(newUser));
    
    return { success: true, user: newUser };
}

function verifyUser(code) {
    if (code === '1234') {
        const pendingUser = JSON.parse(localStorage.getItem('pendingUser'));
        if (pendingUser) {
            const userIndex = appData.users.findIndex(u => u.id === pendingUser.id);
            if (userIndex !== -1) {
                appData.users[userIndex].verified = true;
                saveData();
                
                currentUser = { ...appData.users[userIndex] };
                delete currentUser.password;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                localStorage.removeItem('pendingUser');
                
                return { success: true };
            }
        }
    }
    return { success: false, message: 'Invalid verification code' };
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// ===== PRODUCT MANAGEMENT =====
function addProduct(productData) {
    if (!currentUser) return { success: false, message: 'Not logged in' };
    
    const newProduct = {
        id: appData.products.length + 1,
        seller_id: currentUser.id,
        ...productData,
        sales: 0,
        rating: 0,
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    appData.products.push(newProduct);
    saveData();
    
    return { success: true, product: newProduct };
}

function updateProduct(productId, updatedData) {
    const index = appData.products.findIndex(p => p.id === productId);
    if (index !== -1) {
        // Check ownership
        if (appData.products[index].seller_id !== currentUser.id) {
            return { success: false, message: 'Unauthorized' };
        }
        
        appData.products[index] = { ...appData.products[index], ...updatedData };
        saveData();
        return { success: true };
    }
    return { success: false, message: 'Product not found' };
}

function deleteProduct(productId) {
    const index = appData.products.findIndex(p => p.id === productId);
    if (index !== -1) {
        // Check ownership
        if (appData.products[index].seller_id !== currentUser.id) {
            return { success: false, message: 'Unauthorized' };
        }
        
        appData.products.splice(index, 1);
        saveData();
        return { success: true };
    }
    return { success: false, message: 'Product not found' };
}

function getProductsBySeller(sellerId) {
    return appData.products.filter(p => p.seller_id === sellerId);
}

function getProductsByCategory(category) {
    if (category === 'all') return appData.products;
    return appData.products.filter(p => p.category === category);
}

function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return appData.products.filter(p => 
        p.title.toLowerCase().includes(searchTerm) || 
        p.description.toLowerCase().includes(searchTerm)
    );
}

// ===== TRANSACTIONS =====
function purchaseProduct(productId, buyerId) {
    const product = appData.products.find(p => p.id === productId);
    const buyer = appData.users.find(u => u.id === buyerId);
    const seller = appData.users.find(u => u.id === product.seller_id);
    
    if (!product || !buyer) {
        return { success: false, message: 'Product or buyer not found' };
    }
    
    if (buyer.balance < product.price) {
        return { success: false, message: 'Insufficient balance' };
    }
    
    // Process transaction
    buyer.balance -= product.price;
    seller.balance += product.price;
    product.sales += 1;
    
    const transaction = {
        id: appData.transactions.length + 1,
        buyer_id: buyerId,
        product_id: productId,
        amount: product.price,
        date: new Date().toISOString(),
        status: 'completed'
    };
    
    appData.transactions.push(transaction);
    saveData();
    
    // Update current user if it's the buyer
    if (currentUser && currentUser.id === buyerId) {
        currentUser.balance = buyer.balance;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    return { success: true, transaction };
}

function getUserTransactions(userId) {
    return appData.transactions.filter(t => t.buyer_id === userId);
}

// ===== USER MANAGEMENT =====
function updateUserProfile(userId, updates) {
    const index = appData.users.findIndex(u => u.id === userId);
    if (index !== -1) {
        appData.users[index] = { ...appData.users[index], ...updates };
        saveData();
        
        // Update current user if needed
        if (currentUser && currentUser.id === userId) {
            currentUser = { ...appData.users[index] };
            delete currentUser.password;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        
        return { success: true };
    }
    return { success: false, message: 'User not found' };
}

// ===== LANGUAGE MANAGEMENT =====
const translations = {
    en: {
        // Navigation
        home: "Home",
        marketplace: "Marketplace",
        dashboard: "Dashboard",
        signIn: "Sign In",
        joinNow: "Join Now",
        logout: "Logout",
        
        // Hero Section
        heroBadge: "🚀 Ethiopia's #1 Digital Marketplace",
        heroTitle: "Ascenda Marketplace",
        heroSubtitle: "Empowering Ethiopian Digital Creators",
        heroDescription: "The first platform built for Ethiopian creators to sell digital products globally. Join the future of digital commerce today.",
        getStarted: "Get Started",
        exploreMarketplace: "Explore Marketplace",
        creators: "Creators",
        products: "Products",
        buyers: "Buyers",
        
        // Features
        featuresTitle: "Why Choose Ascenda?",
        featuresSubtitle: "The future of digital commerce in Ethiopia",
        feature1Title: "Sell Digital Products",
        feature1Desc: "E-books, courses, templates & more. Reach customers worldwide instantly.",
        feature2Title: "Lightning Fast",
        feature2Desc: "Instant uploads, seamless checkout, immediate downloads.",
        feature3Title: "Secure Payments",
        feature3Desc: "Your earnings are protected with blockchain-level security.",
        feature4Title: "Bilingual Platform",
        feature4Desc: "Full support for English and Amharic. Connect in your language.",
        
        // How It Works
        howItWorks: "How It Works",
        step1: "Create Account",
        step1Desc: "Sign up in seconds",
        step2: "List Products",
        step2Desc: "Upload your digital products",
        step3: "Start Earning",
        step3Desc: "Get paid instantly",
        
        // Dashboard
        welcomeBack: "Welcome back,",
        readyMessage: "Ready to create something amazing?",
        availableBalance: "Available Balance",
        totalSales: "Total Sales",
        totalProducts: "Total Products",
        totalCustomers: "Total Customers",
        quickActions: "Quick Actions",
        addProduct: "Add Product",
        addProductDesc: "List a new digital product",
        myProducts: "My Products",
        myProductsDesc: "Manage your listings",
        browseMarketplace: "Browse Marketplace",
        browseDesc: "Discover new products",
        profileSettings: "Profile Settings",
        profileDesc: "Update your information",
        recentActivity: "Recent Activity",
        
        // Marketplace
        marketplaceTitle: "Digital Marketplace",
        marketplaceSubtitle: "Discover amazing digital products from Ethiopian creators",
        allCategories: "All Categories",
        ebooks: "E-books",
        courses: "Courses",
        templates: "Templates",
        graphics: "Graphics",
        audio: "Audio",
        software: "Software",
        newest: "Newest First",
        priceLow: "Price: Low to High",
        priceHigh: "Price: High to Low",
        popular: "Most Popular",
        
        // Product
        seller: "Seller",
        category: "Category",
        description: "Description",
        price: "Price",
        buyNow: "Buy Now",
        viewDetails: "View Details",
        edit: "Edit",
        delete: "Delete",
        confirmDelete: "Are you sure you want to delete this product?",
        
        // Forms
        fullName: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        password: "Password",
        confirmPassword: "Confirm Password",
        role: "I want to",
        seller: "Sell Products",
        buyer: "Buy Products",
        preferredLanguage: "Preferred Language",
        createAccount: "Create Account",
        alreadyHaveAccount: "Already have an account?",
        dontHaveAccount: "Don't have an account?",
        signIn: "Sign In",
        signUp: "Sign Up",
        
        // Profile
        personalInfo: "Personal Information",
        statistics: "Statistics",
        transactionHistory: "Transaction History",
        editProfile: "Edit Profile",
        saveChanges: "Save Changes",
        cancel: "Cancel",
        verified: "Verified Creator",
        
        // Messages
        loginSuccess: "Login successful!",
        loginError: "Invalid email/phone or password",
        signupSuccess: "Account created successfully!",
        signupError: "User already exists",
        verifySuccess: "Account verified!",
        verifyError: "Invalid verification code",
        purchaseSuccess: "Purchase successful!",
        purchaseError: "Insufficient balance",
        productAdded: "Product added successfully!",
        productUpdated: "Product updated!",
        productDeleted: "Product deleted!",
        
        // Footer
        about: "About Us",
        help: "Help Center",
        contact: "Contact",
        terms: "Terms of Service",
        privacy: "Privacy Policy",
        rights: "All rights reserved.",
        madeIn: "Made with ❤️ in Ethiopia"
    },
    
    am: {
        // Navigation
        home: "መነሻ",
        marketplace: "ገበያ",
        dashboard: "ዳሽቦርድ",
        signIn: "ግባ",
        joinNow: "ተቀላቀል",
        logout: "ውጣ",
        
        // Hero Section
        heroBadge: "🚀 የኢትዮጵያ ቁጥር 1 ዲጂታል ገበያ",
        heroTitle: "አሴንዳ ገበያ",
        heroSubtitle: "የኢትዮጵያ ዲጂታል ፈጣሪዎችን ማብቃት",
        heroDescription: "ለኢትዮጵያ ፈጣሪዎች ዲጂታል ምርቶችን በዓለም አቀፍ ደረጃ ለመሸጥ የተሰራ የመጀመሪያው መድረክ። ዛሬ ወደ ዲጂታል ንግድ ወደፊት ይቀላቀሉ።",
        getStarted: "ጀምር",
        exploreMarketplace: "ገበያውን ያስሱ",
        creators: "ፈጣሪዎች",
        products: "ምርቶች",
        buyers: "ገዢዎች",
        
        // Features
        featuresTitle: "አሴንዳን ለምን ይምረጡ?",
        featuresSubtitle: "በኢትዮጵያ ውስጥ የዲጂታል ንግድ የወደፊት",
        feature1Title: "ዲጂታል ምርቶችን ይሸጡ",
        feature1Desc: "ኢ-መጽሐፍት፣ ኮርሶች፣ አብነቶች እና ሌሎችም። ደንበኞችን በአለም አቀፍ ደረጃ ወዲያውኑ ያግኙ።",
        feature2Title: "በማሰብ ፈጣን",
        feature2Desc: "ፈጣን ጭነት፣ እንከን የለሽ ቼክአውት፣ ፈጣን ማውረድ።",
        feature3Title: "አስተማማኝ ክፍያዎች",
        feature3Desc: "ገቢዎ በ blockchain ደረጃ ደህንነት የተጠበቀ ነው።",
        feature4Title: "ሁለት ቋንቋ ተናጋሪ መድረክ",
        feature4Desc: "ሙሉ የእንግሊዝኛ እና የአማርኛ ድጋፍ። በምርጫ ቋንቋዎ ይገናኙ።",
        
        // How It Works
        howItWorks: "እንዴት እንደሚሰራ",
        step1: "መለያ ይፍጠሩ",
        step1Desc: "በሰከንዶች ውስጥ ይመዝገቡ",
        step2: "ምርቶችን ይዘርዝሩ",
        step2Desc: "ዲጂታል ምርቶችዎን ይስቀሉ",
        step3: "መግዛት ይጀምሩ",
        step3Desc: "ወዲያውኑ ይክፈሉ",
        
        // Dashboard
        welcomeBack: "እንኳን ደህና መጡ,",
        readyMessage: "አስደናቂ ነገር ለመፍጠር ዝግጁ ነዎት?",
        availableBalance: "ያለዎት ቀሪ ሂሳብ",
        totalSales: "ጠቅላላ ሽያጭ",
        totalProducts: "ጠቅላላ ምርቶች",
        totalCustomers: "ጠቅላላ ደንበኞች",
        quickActions: "ፈጣን እርምጃዎች",
        addProduct: "ምርት ጨምር",
        addProductDesc: "አዲስ ዲጂታል ምርት ይዘርዝሩ",
        myProducts: "የእኔ ምርቶች",
        myProductsDesc: "ዝርዝሮችዎን ያስተዳድሩ",
        browseMarketplace: "ገበያውን ያስሱ",
        browseDesc: "አዳዲስ ምርቶችን ያግኙ",
        profileSettings: "የመገለጫ ቅንብሮች",
        profileDesc: "መረጃዎን ያዘምኑ",
        recentActivity: "የቅርብ ጊዜ እንቅስቃሴ",
        
        // Marketplace
        marketplaceTitle: "ዲጂታል ገበያ",
        marketplaceSubtitle: "ከኢትዮጵያ ፈጣሪዎች አስደናቂ ዲጂታል ምርቶችን ያግኙ",
        allCategories: "ሁሉም ምድቦች",
        ebooks: "ኢ-መጽሐፍት",
        courses: "ኮርሶች",
        templates: "አብነቶች",
        graphics: "ግራፊክስ",
        audio: "ኦዲዮ",
        software: "ሶፍትዌር",
        newest: "አዲሱ መጀመሪያ",
        priceLow: "ዋጋ፡ ከዝቅተኛ ወደ ከፍተኛ",
        priceHigh: "ዋጋ፡ ከከፍተኛ ወደ ዝቅተኛ",
        popular: "በጣም ተወዳጅ",
        
        // Product
        seller: "ሻጭ",
        category: "ምድብ",
        description: "መግለጫ",
        price: "ዋጋ",
        buyNow: "አሁን ግዛ",
        viewDetails: "ዝርዝሮችን ተመልከት",
        edit: "አርትዕ",
        delete: "ሰርዝ",
        confirmDelete: "ይህን ምርት መሰረዝ እንደሚፈልጉ እርግጠኛ ነዎት?",
        
        // Forms
        fullName: "ሙሉ ስም",
        email: "ኢሜይል አድራሻ",
        phone: "ስልክ ቁጥር",
        password: "የይለፍ ቃል",
        confirmPassword: "የይለፍ ቃል አረጋግጥ",
        role: "እፈልጋለሁ",
        seller: "ምርቶችን መሸጥ",
        buyer: "ምርቶችን መግዛት",
        preferredLanguage: "የሚመረጥ ቋንቋ",
        createAccount: "መለያ ፍጠር",
        alreadyHaveAccount: "መለያ አለዎት?",
        dontHaveAccount: "መለያ የለዎትም?",
        signIn: "ግባ",
        signUp: "ተመዝገብ",
        
        // Profile
        personalInfo: "የግል መረጃ",
        statistics: "ስታቲስቲክስ",
        transactionHistory: "የግብይት ታሪክ",
        editProfile: "መገለጫ አርትዕ",
        saveChanges: "ለውጦችን አስቀምጥ",
        cancel: "ሰርዝ",
        verified: "የተረጋገጠ ፈጣሪ",
        
        // Messages
        loginSuccess: "በስኬት ገብተዋል!",
        loginError: "ልክ ያልሆነ ኢሜይል/ስልክ ወይም የይለፍ ቃል",
        signupSuccess: "መለያ በስኬት ተፈጥሯል!",
        signupError: "ተጠቃሚው አስቀድሞ አለ",
        verifySuccess: "መለያ ተረጋግጧል!",
        verifyError: "ልክ ያልሆነ የማረጋገጫ ኮድ",
        purchaseSuccess: "ግዢ ተሳክቷል!",
        purchaseError: "በቂ ገንዘብ የለም",
        productAdded: "ምርት በስኬት ተጨምሯል!",
        productUpdated: "ምርት ተዘምኗል!",
        productDeleted: "ምርት ተሰርዟል!",
        
        // Footer
        about: "ስለ እኛ",
        help: "የእርዳታ ማዕከል",
        contact: "አግኙን",
        terms: "የአገልግሎት ውል",
        privacy: "የግላዊነት ፖሊሲ",
        rights: "መብቱ በህግ የተጠበቀ ነው።",
        madeIn: "በኢትዮጵያ በፍቅር የተሰራ"
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updatePageContent();
}

function updatePageContent() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });
    
    // Update language selector
    const langSelect = document.getElementById('languageToggle');
    if (langSelect) {
        langSelect.value = currentLanguage;
    }
}

// ===== UI RENDERING FUNCTIONS =====
function renderMarketplaceProducts(category = 'all', sortBy = 'newest') {
    const grid = document.getElementById('marketplaceGrid');
    if (!grid) return;
    
    let products = getProductsByCategory(category);
    
    // Sort products
    switch(sortBy) {
        case 'priceLow':
            products.sort((a, b) => a.price - b.price);
            break;
        case 'priceHigh':
            products.sort((a, b) => b.price - a.price);
            break;
        case 'popular':
            products.sort((a, b) => b.sales - a.sales);
            break;
        default: // newest
            products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    grid.innerHTML = '';
    
    if (products.length === 0) {
        grid.innerHTML = '<div class="no-products">No products found</div>';
        return;
    }
    
    products.forEach(product => {
        const seller = appData.users.find(u => u.id === product.seller_id);
        const card = createProductCard(product, seller);
        grid.appendChild(card);
    });
}

function createProductCard(product, seller) {
    const card = document.createElement('div');
    card.className = 'product-card futuristic-card';
    card.setAttribute('data-product-id', product.id);
    
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
            <div class="product-overlay">
                <button class="quick-view-btn" onclick="viewProductDetails(${product.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-seller">${seller ? seller.name : 'Unknown'}</p>
            <div class="product-rating">
                ${generateStars(product.rating)}
                <span>(${product.sales})</span>
            </div>
            <div class="product-price-row">
                <span class="product-price">$${product.price}</span>
                <button class="btn-buy-small" onclick="buyProduct(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    return stars;
}

function renderMyProducts() {
    const grid = document.getElementById('myProductsGrid');
    if (!grid || !currentUser) return;
    
    const products = getProductsBySeller(currentUser.id);
    
    grid.innerHTML = '';
    
    if (products.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <h3>No products yet</h3>
                <p>Start selling by adding your first product</p>
                <a href="add-product.html" class="btn-primary">Add Product</a>
            </div>
        `;
        return;
    }
    
    products.forEach(product => {
        const card = createManageProductCard(product);
        grid.appendChild(card);
    });
}

function createManageProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card manage-card';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="product-info">
            <h3>${product.title}</h3>
            <p class="product-price">$${product.price}</p>
            <p class="product-sales">${product.sales} sales</p>
            <div class="product-actions">
                <button class="btn-edit" onclick="openEditModal(${product.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-delete" onclick="confirmDelete(${product.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function renderDashboard() {
    if (!currentUser) return;
    
    // Update welcome message
    const userNameEl = document.getElementById('userName');
    if (userNameEl) userNameEl.textContent = currentUser.name;
    
    // Update balance
    const balanceEl = document.getElementById('userBalance');
    if (balanceEl) balanceEl.textContent = `$${currentUser.balance.toFixed(2)}`;
    
    // Update stats
    const userProducts = getProductsBySeller(currentUser.id);
    const userTransactions = getUserTransactions(currentUser.id);
    const totalSales = userProducts.reduce((sum, p) => sum + (p.sales * p.price), 0);
    
    const salesEl = document.getElementById('salesAmount');
    if (salesEl) salesEl.textContent = totalSales.toFixed(2);
    
    const productsCountEl = document.getElementById('productsCount');
    if (productsCountEl) productsCountEl.textContent = userProducts.length;
    
    const customersCountEl = document.getElementById('customersCount');
    const uniqueCustomers = new Set(userTransactions.map(t => t.buyer_id)).size;
    if (customersCountEl) customersCountEl.textContent = uniqueCustomers;
    
    // Render recent activity
    renderRecentActivity();
}

function renderRecentActivity() {
    const activityList = document.getElementById('activityList');
    if (!activityList || !currentUser) return;
    
    const transactions = getUserTransactions(currentUser.id).slice(-5);
    
    activityList.innerHTML = '';
    
    if (transactions.length === 0) {
        activityList.innerHTML = '<p class="no-activity">No recent activity</p>';
        return;
    }
    
    transactions.forEach(t => {
        const product = appData.products.find(p => p.id === t.product_id);
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-icon">
                <i class="fas fa-shopping-bag"></i>
            </div>
            <div class="activity-details">
                <p>Purchased <strong>${product ? product.title : 'Product'}</strong></p>
                <small>${new Date(t.date).toLocaleDateString()}</small>
            </div>
            <div class="activity-amount">$${t.amount}</div>
        `;
        activityList.appendChild(item);
    });
}

function renderProfile() {
    if (!currentUser) return;
    
    // Update profile fields
    const profileName = document.getElementById('profileName');
    if (profileName) profileName.textContent = currentUser.name;
    
    const profileRole = document.getElementById('profileRole');
    if (profileRole) profileRole.textContent = currentUser.role === 'seller' ? 'Seller' : 'Buyer';
    
    const profileEmail = document.getElementById('profileEmail');
    if (profileEmail) profileEmail.textContent = currentUser.email;
    
    const profilePhone = document.getElementById('profilePhone');
    if (profilePhone) profilePhone.textContent = currentUser.phone;
    
    const profileLanguage = document.getElementById('profileLanguage');
    if (profileLanguage) profileLanguage.textContent = currentUser.language === 'en' ? 'English' : 'አማርኛ';
    
    const profileBalance = document.getElementById('profileBalance');
    if (profileBalance) profileBalance.textContent = `$${currentUser.balance.toFixed(2)}`;
    
    const profileImage = document.getElementById('profileImage');
    if (profileImage) profileImage.src = currentUser.profile_pic;
    
    // Update stats
    const userProducts = getProductsBySeller(currentUser.id);
    const totalProductsEl = document.getElementById('totalProductsValue');
    if (totalProductsEl) totalProductsEl.textContent = userProducts.length;
    
    const totalSalesEl = document.getElementById('totalSalesValue');
    const totalSales = userProducts.reduce((sum, p) => sum + (p.sales * p.price), 0);
    if (totalSalesEl) totalSalesEl.textContent = `$${totalSales.toFixed(2)}`;
    
    // Render transactions
    renderTransactionHistory();
}

function renderTransactionHistory() {
    const transactionList = document.getElementById('transactionList');
    if (!transactionList || !currentUser) return;
    
    const transactions = getUserTransactions(currentUser.id).reverse();
    
    transactionList.innerHTML = '';
    
    if (transactions.length === 0) {
        transactionList.innerHTML = '<p class="no-transactions">No transactions yet</p>';
        return;
    }
    
    transactions.forEach(t => {
        const product = appData.products.find(p => p.id === t.product_id);
        const item = document.createElement('div');
        item.className = 'transaction-item';
        item.innerHTML = `
            <div class="transaction-info">
                <h4>${product ? product.title : 'Product'}</h4>
                <small>${new Date(t.date).toLocaleDateString()}</small>
            </div>
            <div class="transaction-amount">$${t.amount}</div>
            <div class="transaction-status ${t.status}">${t.status}</div>
        `;
        transactionList.appendChild(item);
    });
}

// ===== MODAL FUNCTIONS =====
function viewProductDetails(productId) {
    const product = appData.products.find(p => p.id === productId);
    const seller = appData.users.find(u => u.id === product.seller_id);
    
    const modal = document.getElementById('productModal');
    const detailDiv = document.getElementById('productDetail');
    
    if (!modal || !detailDiv) return;
    
    detailDiv.innerHTML = `
        <div class="product-detail-modal">
            <img src="${product.image}" alt="${product.title}" class="modal-image">
            <div class="modal-details">
                <h2>${product.title}</h2>
                <div class="modal-meta">
                    <span class="modal-category">${product.category}</span>
                    <span class="modal-seller">By ${seller ? seller.name : 'Unknown'}</span>
                </div>
                <div class="modal-rating">
                    ${generateStars(product.rating)}
                    <span>${product.rating} (${product.sales} sold)</span>
                </div>
                <p class="modal-description">${product.description}</p>
                <div class="modal-price-row">
                    <span class="modal-price">$${product.price}</span>
                    ${currentUser ? `
                        <button class="btn-primary btn-large" onclick="buyProduct(${product.id})">
                            Buy Now
                        </button>
                    ` : `
                        <a href="login.html" class="btn-outline btn-large">Login to Buy</a>
                    `}
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function openEditModal(productId) {
    const product = appData.products.find(p => p.id === productId);
    if (!product || product.seller_id !== currentUser.id) return;
    
    // Fill form fields
    document.getElementById('editProductId').value = product.id;
    document.getElementById('editTitle').value = product.title;
    document.getElementById('editCategory').value = product.category;
    document.getElementById('editDescription').value = product.description;
    document.getElementById('editPrice').value = product.price;
    document.getElementById('editImageUrl').value = product.image;
    document.getElementById('editDownloadLink').value = product.download_link;
    
    // Show modal
    document.getElementById('editModal').style.display = 'block';
}

function confirmDelete(productId) {
    if (confirm(translations[currentLanguage].confirmDelete)) {
        const result = deleteProduct(parseInt(productId));
        if (result.success) {
            showNotification('Product deleted successfully!', 'success');
            renderMyProducts();
        }
    }
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// ===== TRANSACTION FUNCTIONS =====
function buyProduct(productId) {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    const result = purchaseProduct(parseInt(productId), currentUser.id);
    
    if (result.success) {
        showNotification('Purchase successful!', 'success');
        closeModals();
        
        // Update UI
        if (document.getElementById('userBalance')) {
            document.getElementById('userBalance').textContent = `$${currentUser.balance.toFixed(2)}`;
        }
    } else {
        showNotification(result.message, 'error');
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.futuristic-card, .feature-card, .product-card').forEach(el => {
        observer.observe(el);
    });
    
    // Parallax effect for background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.gradient-orb, .gradient-orb-2').forEach(orb => {
            orb.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    });
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Language toggle
    const langToggle = document.getElementById('languageToggle');
    if (langToggle) {
        langToggle.addEventListener('change', (e) => setLanguage(e.target.value));
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailOrPhone = document.getElementById('emailOrPhone').value;
            const password = document.getElementById('password').value;
            
            const result = login(emailOrPhone, password);
            
            if (result.success) {
                showNotification(translations[currentLanguage].loginSuccess, 'success');
                
                if (result.user.verified) {
                    window.location.href = 'dashboard.html';
                } else {
                    window.location.href = 'verify.html';
                }
            } else {
                document.getElementById('loginError').textContent = 
                    translations[currentLanguage].loginError;
            }
        });
    }
    
    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const userData = {
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                password: document.getElementById('password').value,
                role: document.querySelector('input[name="role"]:checked').value,
                language: document.getElementById('language').value
            };
            
            const result = signup(userData);
            
            if (result.success) {
                showNotification(translations[currentLanguage].signupSuccess, 'success');
                window.location.href = 'verify.html';
            } else {
                showNotification(result.message, 'error');
            }
        });
    }
    
    // Verify form
    const verifyForm = document.getElementById('verifyForm');
    if (verifyForm) {
        verifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const code = document.getElementById('code').value;
            const result = verifyUser(code);
            
            if (result.success) {
                showNotification(translations[currentLanguage].verifySuccess, 'success');
                window.location.href = 'dashboard.html';
            } else {
                document.getElementById('verifyError').textContent = 
                    translations[currentLanguage].verifyError;
            }
        });
    }
    
    // Add product form
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const productData = {
                title: document.getElementById('title').value,
                category: document.getElementById('category').value,
                description: document.getElementById('description').value,
                price: parseFloat(document.getElementById('price').value),
                image: document.getElementById('imageUrl').value,
                download_link: document.getElementById('downloadLink').value,
                preview_video: document.getElementById('previewVideo')?.value || ''
            };
            
            const result = addProduct(productData);
            
            if (result.success) {
                showNotification('Product added successfully!', 'success');
                window.location.href = 'my-products.html';
            }
        });
    }
    
    // Edit form
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const productId = parseInt(document.getElementById('editProductId').value);
            const updatedData = {
                title: document.getElementById('editTitle').value,
                category: document.getElementById('editCategory').value,
                description: document.getElementById('editDescription').value,
                price: parseFloat(document.getElementById('editPrice').value),
                image: document.getElementById('editImageUrl').value,
                download_link: document.getElementById('editDownloadLink').value
            };
            
            const result = updateProduct(productId, updatedData);
            
            if (result.success) {
                showNotification('Product updated!', 'success');
                closeModals();
                renderMyProducts();
            }
        });
    }
    
    // Edit profile form
    const editProfileForm = document.getElementById('editProfileForm');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const updates = {
                name: document.getElementById('editProfileName').value,
                profile_pic: document.getElementById('editProfileImage').value,
                phone: document.getElementById('editProfilePhone').value,
                language: document.getElementById('editProfileLanguage').value
            };
            
            const result = updateUserProfile(currentUser.id, updates);
            
            if (result.success) {
                showNotification('Profile updated!', 'success');
                closeModals();
                renderProfile();
            }
        });
    }
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const category = e.target.dataset.category;
            const sortBy = document.getElementById('sortSelect')?.value || 'newest';
            renderMarketplaceProducts(category, sortBy);
        });
    });
    
    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'all';
            renderMarketplaceProducts(activeCategory, e.target.value);
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    // Modal close buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModals();
        }
    });
    
    // Image preview for add product
    const imageUrlInput = document.getElementById('imageUrl');
    const imagePreview = document.getElementById('imagePreview');
    if (imageUrlInput && imagePreview) {
        imageUrlInput.addEventListener('input', (e) => {
            const url = e.target.value;
            if (url) {
                imagePreview.innerHTML = `<img src="${url}" alt="Preview">`;
            }
        });
    }
}

// ===== PAGE LOAD HANDLER =====
function loadPageContent() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'index.html':
        case '':
            loadHomePage();
            break;
        case 'marketplace.html':
            renderMarketplaceProducts();
            break;
        case 'my-products.html':
            renderMyProducts();
            break;
        case 'dashboard.html':
            renderDashboard();
            break;
        case 'profile.html':
            renderProfile();
            break;
    }
    
    // Update language
    updatePageContent();
}

function loadHomePage() {
    // Load featured products
    const featuredGrid = document.getElementById('featuredGrid');
    if (featuredGrid) {
        const featured = appData.products.slice(0, 4);
        featured.forEach(product => {
            const seller = appData.users.find(u => u.id === product.seller_id);
            const card = createProductCard(product, seller);
            featuredGrid.appendChild(card);
        });
    }
}

// ===== EXPORT FUNCTIONS FOR GLOBAL USE =====
window.viewProductDetails = viewProductDetails;
window.openEditModal = openEditModal;
window.confirmDelete = confirmDelete;
window.buyProduct = buyProduct;
window.closeModals = closeModals;
window.logout = logout;
window.setLanguage = setLanguage;