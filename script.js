// Global state
let currentUser = null;
let appData = {
    users: [],
    products: [],
    transactions: []
};

// Translations
const translations = {
    en: {
        // Index page
        heroTitle: "Ascenda Marketplace",
        heroSubtitle: "Empowering Ethiopian Digital Creators",
        heroText: "The first local platform for buying and selling digital products in Ethiopia",
        signupBtn: "Sign Up",
        loginBtn: "Login",
        marketplaceBtn: "View Marketplace",
        feature1Title: "Sell Locally",
        feature1Text: "Reach Ethiopian customers directly",
        feature2Title: "Easy Product Listing",
        feature2Text: "List your digital products in minutes",
        feature3Title: "Buyer Marketplace",
        feature3Text: "Discover unique Ethiopian digital content",
        feature4Title: "Bilingual Support",
        feature4Text: "English and Amharic interface",
        
        // Signup page
        signupTitle: "Create Account",
        fullNameLabel: "Full Name",
        emailLabel: "Email",
        phoneLabel: "Phone",
        passwordLabel: "Password",
        roleLabel: "Role",
        sellerRole: "Seller",
        buyerRole: "Buyer",
        prefLanguageLabel: "Preferred Language",
        signupSubmitBtn: "Sign Up",
        
        // Login page
        loginTitle: "Login to Ascenda",
        emailOrPhoneLabel: "Email or Phone",
        loginPasswordLabel: "Password",
        loginSubmitBtn: "Login",
        noAccountText: "Don't have an account?",
        signupLink: "Sign Up",
        
        // Verify page
        verifyTitle: "Verify Your Account",
        verifyText: "Enter the verification code sent to your email/phone (Demo: use 1234)",
        codeLabel: "Verification Code",
        verifyBtn: "Verify",
        
        // Dashboard
        welcomeUser: "Welcome,",
        userRole: "Role:",
        userBalance: "Balance:",
        addProductCard: "➕ Add Product",
        myProductsCard: "📦 My Products",
        marketplaceCard: "🛒 Marketplace",
        profileCard: "👤 Profile",
        
        // Common
        backToDashboard: "← Dashboard",
        logout: "Logout"
    },
    am: {
        // Index page
        heroTitle: "አስሴንዳ ገበያ",
        heroSubtitle: "የኢትዮጵያ ዲጂታል ፈጣሪዎችን ማበረታቻ",
        heroText: "በኢትዮጵያ ውስጥ ዲጂታል ምርቶችን ለመግዛት እና ለመሸጥ የመጀመሪያው የአገር ውስጥ መድረክ",
        signupBtn: "ይመዝገቡ",
        loginBtn: "ይግቡ",
        marketplaceBtn: "ገበያውን ይመልከቱ",
        feature1Title: "በአገር ውስጥ ይሽጡ",
        feature1Text: "የኢትዮጵያ ደንበኞችን በቀጥታ ያግኙ",
        feature2Title: "ቀላል ምርት መዘርዘር",
        feature2Text: "ዲጂታል ምርቶችዎን በደቂቃዎች ውስጥ ይዘርዝሩ",
        feature3Title: "ገዢ ገበያ",
        feature3Text: "ልዩ የኢትዮጵያ ዲጂታል ይዘትን ያግኙ",
        feature4Title: "ሁለት ቋንቋ ድጋፍ",
        feature4Text: "እንግሊዝኛ እና አማርኛ በይነገጽ",
        
        // Signup page
        signupTitle: "መለያ ይፍጠሩ",
        fullNameLabel: "ሙሉ ስም",
        emailLabel: "ኢሜይል",
        phoneLabel: "ስልክ",
        passwordLabel: "የይለፍ ቃል",
        roleLabel: "ሚና",
        sellerRole: "ሻጭ",
        buyerRole: "ገዢ",
        prefLanguageLabel: "የሚመርጡት ቋንቋ",
        signupSubmitBtn: "ይመዝገቡ",
        
        // Login page
        loginTitle: "ወደ አስሴንዳ ይግቡ",
        emailOrPhoneLabel: "ኢሜይል ወይም ስልክ",
        loginPasswordLabel: "የይለፍ ቃል",
        loginSubmitBtn: "ይግቡ",
        noAccountText: "መለያ የለዎትም?",
        signupLink: "ይመዝገቡ",
        
        // Verify page
        verifyTitle: "መለያዎን ያረጋግጡ",
        verifyText: "ወደ ኢሜይል/ስልክዎ የተላከውን የማረጋገጫ ኮድ ያስገቡ (ማሳያ: 1234 ይጠቀሙ)",
        codeLabel: "የማረጋገጫ ኮድ",
        verifyBtn: "አረጋግጥ",
        
        // Dashboard
        welcomeUser: "እንኳን ደህና መጡ,",
        userRole: "ሚና:",
        userBalance: "ቀሪ ሂሳብ:",
        addProductCard: "➕ ምርት ያክሉ",
        myProductsCard: "📦 የእኔ ምርቶች",
        marketplaceCard: "🛒 ገበያ",
        profileCard: "👤 መገለጫ",
        
        // Common
        backToDashboard: "← ወደ ዳሽቦርድ",
        logout: "ውጣ"
    }
};

// Initialize data
function initializeData() {
    const savedData = localStorage.getItem('ascendaData');
    if (savedData) {
        appData = JSON.parse(savedData);
    } else {
        // Sample data
        appData = {
            users: [
                {
                    id: 1,
                    name: "Demo Seller",
                    email: "seller@demo.com",
                    phone: "1234567890",
                    password: "password",
                    role: "seller",
                    language: "en",
                    verified: true,
                    balance: 1000,
                    profile_pic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
                },
                {
                    id: 2,
                    name: "Demo Buyer",
                    email: "buyer@demo.com",
                    phone: "0987654321",
                    password: "password",
                    role: "buyer",
                    language: "en",
                    verified: true,
                    balance: 500,
                    profile_pic: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                }
            ],
            products: [
                {
                    id: 1,
                    seller_id: 1,
                    title: "Web Development Course",
                    category: "courses",
                    description: "Complete web development course for beginners",
                    price: 49.99,
                    image: "https://images.unsplash.com/photo-1581092795364-8aea94d545d4",
                    download_link: "https://example.com/download1"
                },
                {
                    id: 2,
                    seller_id: 1,
                    title: "E-book: Ethiopian History",
                    category: "ebooks",
                    description: "Comprehensive guide to Ethiopian history",
                    price: 19.99,
                    image: "https://images.pexels.com/photos/459654/pexels-photo-459654.jpeg",
                    download_link: "https://example.com/download2"
                }
            ],
            transactions: []
        };
        saveData();
    }
}

function saveData() {
    localStorage.setItem('ascendaData', JSON.stringify(appData));
}

// Language management
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('ascendaLanguage', lang);
    updatePageText();
}

function updatePageText() {
    const elements = document.querySelectorAll('[id]');
    elements.forEach(element => {
        const id = element.id;
        if (translations[currentLanguage] && translations[currentLanguage][id]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[currentLanguage][id];
            } else {
                element.textContent = translations[currentLanguage][id];
            }
        }
    });
}

// User authentication
function login(emailOrPhone, password) {
    const user = appData.users.find(u => 
        (u.email === emailOrPhone || u.phone === emailOrPhone) && 
        u.password === password
    );
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials' };
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function checkAuth() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        return true;
    }
    return false;
}

// Product management
function addProduct(product) {
    product.id = appData.products.length + 1;
    product.seller_id = currentUser.id;
    appData.products.push(product);
    saveData();
}

function updateProduct(id, updatedProduct) {
    const index = appData.products.findIndex(p => p.id === id);
    if (index !== -1) {
        appData.products[index] = { ...appData.products[index], ...updatedProduct };
        saveData();
    }
}

function deleteProduct(id) {
    appData.products = appData.products.filter(p => p.id !== id);
    saveData();
}

function getProductsBySeller(sellerId) {
    return appData.products.filter(p => p.seller_id === sellerId);
}

// Transaction management
function createTransaction(buyerId, productId) {
    const product = appData.products.find(p => p.id === productId);
    const buyer = appData.users.find(u => u.id === buyerId);
    
    if (buyer && product && buyer.balance >= product.price) {
        // Update buyer balance
        buyer.balance -= product.price;
        
        // Update seller balance
        const seller = appData.users.find(u => u.id === product.seller_id);
        if (seller) {
            seller.balance = (seller.balance || 0) + product.price;
        }
        
        // Add transaction
        const transaction = {
            id: appData.transactions.length + 1,
            buyer_id: buyerId,
            product_id: productId,
            amount: product.price,
            date: new Date().toISOString()
        };
        appData.transactions.push(transaction);
        saveData();
        
        return { success: true, transaction };
    }
    return { success: false, message: 'Insufficient balance' };
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    
    // Check authentication
    const currentPage = window.location.pathname.split('/').pop();
    const protectedPages = ['dashboard.html', 'add_product.html', 'my_products.html', 'profile.html'];
    
    if (protectedPages.includes(currentPage)) {
        if (!checkAuth()) {
            window.location.href = 'login.html';
        }
    }
    
    // Language toggle
    const langToggle = document.getElementById('languageToggle');
    if (langToggle) {
        langToggle.addEventListener('change', function(e) {
            setLanguage(e.target.value);
        });
    }
    
    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newUser = {
                id: appData.users.length + 1,
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                password: document.getElementById('password').value,
                role: document.querySelector('input[name="role"]:checked').value,
                language: document.getElementById('language').value,
                verified: false,
                balance: 0,
                profile_pic: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
            };
            
            appData.users.push(newUser);
            saveData();
            
            // Store user for verification
            localStorage.setItem('pendingUser', JSON.stringify(newUser));
            window.location.href = 'verify.html';
        });
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailOrPhone = document.getElementById('emailOrPhone').value;
            const password = document.getElementById('password').value;
            
            const result = login(emailOrPhone, password);
            
            if (result.success) {
                if (result.user.verified) {
                    window.location.href = 'dashboard.html';
                } else {
                    localStorage.setItem('pendingUser', JSON.stringify(result.user));
                    window.location.href = 'verify.html';
                }
            } else {
                document.getElementById('loginError').textContent = result.message;
            }
        });
    }
    
    // Verify form
    const verifyForm = document.getElementById('verifyForm');
    if (verifyForm) {
        verifyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const code = document.getElementById('code').value;
            
            if (code === '1234') {
                const pendingUser = JSON.parse(localStorage.getItem('pendingUser'));
                if (pendingUser) {
                    const user = appData.users.find(u => u.id === pendingUser.id);
                    if (user) {
                        user.verified = true;
                        saveData();
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        localStorage.removeItem('pendingUser');
                        window.location.href = 'dashboard.html';
                    }
                }
            } else {
                document.getElementById('verifyError').textContent = 'Invalid code. Use 1234';
            }
        });
    }
    
    // Dashboard
    if (currentPage === 'dashboard.html' && currentUser) {
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userRoleValue').textContent = currentUser.role;
        document.getElementById('balanceValue').textContent = `$${currentUser.balance || 0}`;
    }
    
    // Add product form
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm && currentUser) {
        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const product = {
                title: document.getElementById('title').value,
                category: document.getElementById('category').value,
                description: document.getElementById('description').value,
                price: parseFloat(document.getElementById('price').value),
                image: document.getElementById('imageUrl').value,
                download_link: document.getElementById('downloadLink').value
            };
            
            addProduct(product);
            window.location.href = 'my_products.html';
        });
    }
    
    // My products page
    if (currentPage === 'my_products.html' && currentUser) {
        displayMyProducts();
        
        // Edit modal close
        const modal = document.getElementById('editModal');
        const span = document.getElementsByClassName('close')[0];
        
        span.onclick = function() {
            modal.style.display = 'none';
        };
        
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
        
        // Edit form
        const editForm = document.getElementById('editForm');
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const productId = parseInt(document.getElementById('editProductId').value);
            const updatedProduct = {
                title: document.getElementById('editTitle').value,
                category: document.getElementById('editCategory').value,
                description: document.getElementById('editDescription').value,
                price: parseFloat(document.getElementById('editPrice').value),
                image: document.getElementById('editImageUrl').value,
                download_link: document.getElementById('editDownloadLink').value
            };
            
            updateProduct(productId, updatedProduct);
            modal.style.display = 'none';
            displayMyProducts();
        });
    }
    
    // Marketplace page
    if (currentPage === 'marketplace.html') {
        displayMarketplace();
        
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                displayMarketplace(this.dataset.category);
            });
        });
        
        // Sort
        document.getElementById('sortBy').addEventListener('change', function() {
            const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
            displayMarketplace(activeCategory, this.value);
        });
        
        // Product modal close
        const modal = document.getElementById('productModal');
        const span = document.getElementsByClassName('close')[1];
        
        span.onclick = function() {
            modal.style.display = 'none';
        };
    }
    
    // Profile page
    if (currentPage === 'profile.html' && currentUser) {
        displayProfile();
        
        // Edit profile modal
        const modal = document.getElementById('editProfileModal');
        const editBtn = document.getElementById('editProfileBtn');
        const span = document.getElementsByClassName('close')[0];
        
        editBtn.onclick = function() {
            document.getElementById('editProfileName').value = currentUser.name;
            document.getElementById('editProfileImage').value = currentUser.profile_pic || '';
            document.getElementById('editProfileLanguage').value = currentUser.language || 'en';
            modal.style.display = 'block';
        };
        
        span.onclick = function() {
            modal.style.display = 'none';
        };
        
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
        
        // Edit profile form
        const editForm = document.getElementById('editProfileForm');
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            currentUser.name = document.getElementById('editProfileName').value;
            currentUser.profile_pic = document.getElementById('editProfileImage').value;
            currentUser.language = document.getElementById('editProfileLanguage').value;
            
            // Update in users array
            const userIndex = appData.users.findIndex(u => u.id === currentUser.id);
            if (userIndex !== -1) {
                appData.users[userIndex] = currentUser;
                saveData();
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
            
            modal.style.display = 'none';
            displayProfile();
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

// Display functions
function displayMyProducts() {
    const products = getProductsBySeller(currentUser.id);
    const grid = document.getElementById('productsGrid');
    
    grid.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3>${product.title}</h3>
                <p class="product-category">${product.category}</p>
                <p>${product.description.substring(0, 100)}...</p>
                <p class="product-price">$${product.price}</p>
                <div class="product-actions">
                    <button onclick="editProduct(${product.id})">Edit</button>
                    <button onclick="deleteProductConfirm(${product.id})">Delete</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function editProduct(productId) {
    const product = appData.products.find(p => p.id === productId);
    
    document.getElementById('editProductId').value = product.id;
    document.getElementById('editTitle').value = product.title;
    document.getElementById('editCategory').value = product.category;
    document.getElementById('editDescription').value = product.description;
    document.getElementById('editPrice').value = product.price;
    document.getElementById('editImageUrl').value = product.image;
    document.getElementById('editDownloadLink').value = product.download_link;
    
    document.getElementById('editModal').style.display = 'block';
}

function deleteProductConfirm(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        deleteProduct(productId);
        displayMyProducts();
    }
}

function displayMarketplace(category = 'all', sortBy = 'newest') {
    let products = [...appData.products];
    
    // Filter by category
    if (category !== 'all') {
        products = products.filter(p => p.category === category);
    }
    
    // Sort
    if (sortBy === 'priceLow') {
        products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHigh') {
        products.sort((a, b) => b.price - a.price);
    } else {
        products.sort((a, b) => b.id - a.id); // Newest first
    }
    
    const grid = document.getElementById('marketplaceGrid');
    grid.innerHTML = '';
    
    products.forEach(product => {
        const seller = appData.users.find(u => u.id === product.seller_id);
        
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3>${product.title}</h3>
                <p class="product-category">${product.category}</p>
                <p>Seller: ${seller ? seller.name : 'Unknown'}</p>
                <p class="product-price">$${product.price}</p>
                <button onclick="viewProductDetails(${product.id})" class="btn btn-primary">View Details</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function viewProductDetails(productId) {
    const product = appData.products.find(p => p.id === productId);
    const seller = appData.users.find(u => u.id === product.seller_id);
    
    const modal = document.getElementById('productModal');
    const detailDiv = document.getElementById('productDetail');
    
    detailDiv.innerHTML = `
        <div class="product-detail">
            <img src="${product.image}" alt="${product.title}" style="width:100%; max-height:400px; object-fit:cover; border-radius:8px; margin-bottom:20px;">
            <h2>${product.title}</h2>
            <p class="product-category">Category: ${product.category}</p>
            <p><strong>Seller:</strong> ${seller ? seller.name : 'Unknown'}</p>
            <p><strong>Description:</strong> ${product.description}</p>
            <p class="product-price" style="font-size:24px;">$${product.price}</p>
            ${currentUser && currentUser.role === 'buyer' ? 
                `<button onclick="buyProduct(${product.id})" class="btn btn-primary">Buy Now</button>` : 
                '<p>Login as buyer to purchase</p>'}
        </div>
    `;
    
    modal.style.display = 'block';
}

function buyProduct(productId) {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    const result = createTransaction(currentUser.id, productId);
    
    if (result.success) {
        alert('Purchase successful!');
        document.getElementById('productModal').style.display = 'none';
        
        // Update user balance in localStorage
        currentUser.balance = appData.users.find(u => u.id === currentUser.id).balance;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
        alert(result.message);
    }
}

function displayProfile() {
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileRoleValue').textContent = currentUser.role;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profilePhone').textContent = currentUser.phone;
    document.getElementById('profileLanguage').textContent = currentUser.language === 'en' ? 'English' : 'አማርኛ';
    document.getElementById('profileBalance').textContent = `$${currentUser.balance || 0}`;
    
    if (currentUser.profile_pic) {
        document.getElementById('profileImage').src = currentUser.profile_pic;
    }
    
    // Display transactions
    const userTransactions = appData.transactions.filter(t => t.buyer_id === currentUser.id);
    const transactionList = document.getElementById('transactionList');
    
    if (userTransactions.length === 0) {
        transactionList.innerHTML = '<p>No transactions yet</p>';
    } else {
        transactionList.innerHTML = '';
        userTransactions.forEach(t => {
            const product = appData.products.find(p => p.id === t.product_id);
            const item = document.createElement('div');
            item.className = 'transaction-item';
            item.innerHTML = `
                <span>${product ? product.title : 'Product'}</span>
                <span>$${t.amount}</span>
                <span>${new Date(t.date).toLocaleDateString()}</span>
            `;
            transactionList.appendChild(item);
        });
    }
}