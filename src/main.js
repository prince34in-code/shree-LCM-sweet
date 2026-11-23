import "./style.css";
import Swiper from "swiper";
import { Autoplay, Mousewheel, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  createIcons,
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  X,
  UserRound,
} from "lucide";

const icons = { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Instagram, MapPin, Menu, MessageCircle, Minus, Plus, Search, ShoppingBag, Sparkles, Trash2, UserRound, X };
createIcons({ icons });

const SOCIAL_PROFILE_URLS = {
  instagram: "",
  facebook: "",
  youtube: "",
};

const socialLinks = Object.entries(SOCIAL_PROFILE_URLS);
for (const [platform, profileUrl] of socialLinks) {
  const link = document.querySelector(`[data-social-link="${platform}"]`);
  if (!link) throw new Error(`Missing footer social link for ${platform}.`);
  if (!profileUrl) continue;

  const parsedUrl = new URL(profileUrl);
  if (parsedUrl.protocol !== "https:") {
    throw new Error(`The ${platform} profile URL must use HTTPS.`);
  }
  link.href = parsedUrl.href;
  link.setAttribute("aria-disabled", "false");
  link.removeAttribute("tabindex");
  link.title = `Visit our ${platform} profile`;
  link.setAttribute("aria-label", `Visit our ${platform} profile (opens in a new tab)`);
}

if (socialLinks.every(([, profileUrl]) => profileUrl)) {
  document.querySelector("[data-social-placeholder]").hidden = true;
}

const heroSwiper = new Swiper(".hero-swiper", {
  modules: [Autoplay, Mousewheel, Pagination],
  direction: "vertical",
  loop: true,
  speed: 1100,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  mousewheel: {
    forceToAxis: true,
    sensitivity: 0.6,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const currentSlide = document.querySelector(".current-slide");
heroSwiper.on("slideChange", () => {
  currentSlide.textContent = String(heroSwiper.realIndex + 1).padStart(2, "0");
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "मेन्यू खोलें" : "मेन्यू बंद करें");
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "मेन्यू खोलें");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const STORE_PHONE = "919304044471";
const DELIVERY_RADIUS_KM = 5;
const CART_STORAGE_KEY = "shri-lcm-cart-v1";
const SWEET_PRODUCTS = [
  { id: "dahi", name: "दही", image: `${import.meta.env.BASE_URL}assets/sweets/dahi.jpeg`, price: 122, unit: "kg" },
  { id: "kaju-katli", name: "काजू कतली", image: `${import.meta.env.BASE_URL}assets/sweets/काजू कतली.jpeg`, price: 1000, unit: "kg" },
  { id: "cream-chap", name: "क्रीम चाप", image: `${import.meta.env.BASE_URL}assets/sweets/क्रीम चाप.jpeg`, price: 320, unit: "kg" },
  { id: "khoya-gulab-jamun", name: "खोया गुलाब जामुन", image: `${import.meta.env.BASE_URL}assets/sweets/खोया गुलाब जामुन.jpeg`, price: 320, unit: "kg" },
  { id: "khoya-barfi", name: "खोया बर्फी", image: `${import.meta.env.BASE_URL}assets/sweets/खोया बर्फी.jpeg`, price: 600, unit: "kg" },
  { id: "gulab-jamun", name: "गुलाब जामुन", image: `${import.meta.env.BASE_URL}assets/sweets/गुलाब जामुन.jpeg`, price: 280, unit: "kg" },
  { id: "gond-ladoo", name: "गोंद लड्डू", image: `${import.meta.env.BASE_URL}assets/sweets/गोंद के लड्डू.jpeg`, price: 400, unit: "kg" },
  { id: "chomchom", name: "चमचम", image: `${import.meta.env.BASE_URL}assets/sweets/चमचम.jpeg`, price: 280, unit: "kg" },
  { id: "aloo-jalebi", name: "आलू जलेबी", image: `${import.meta.env.BASE_URL}assets/sweets/जलेबी.jpeg`, price: 280, unit: "kg" },
  { id: "dhoda-barfi", name: "डोडा बर्फी", image: `${import.meta.env.BASE_URL}assets/sweets/डोडा बर्फी.jpeg`, price: 280, unit: "kg" },
  { id: "desi-ghee-ladoo", name: "देसी घी लड्डू", image: `${import.meta.env.BASE_URL}assets/sweets/देसी घी के लड्डू.jpeg`, price: 600, unit: "kg" },
  { id: "coconut-ladoo", name: "नारियल लड्डू", image: `${import.meta.env.BASE_URL}assets/sweets/नारियल लड्डू.jpeg`, price: 360, unit: "kg" },
  { id: "pista-chomchom", name: "पिस्ता चमचम", image: `${import.meta.env.BASE_URL}assets/sweets/पिस्ता चमचम 1.jpeg`, price: 320, unit: "kg" },
  { id: "peda", name: "शुद्ध देसी घी पेड़ा", image: `${import.meta.env.BASE_URL}assets/sweets/पेड़ा.jpeg`, price: 250, unit: "kg" },
  { id: "batisa", name: "बतीसी", image: `${import.meta.env.BASE_URL}assets/sweets/बतिसा.jpeg`, price: 440, unit: "kg" },
  { id: "balushahi", name: "बालूशाही", image: `${import.meta.env.BASE_URL}assets/sweets/बालूशाही.jpeg`, price: 260, unit: "kg" },
  { id: "besan-ladoo", name: "बेसन लड्डू", image: `${import.meta.env.BASE_URL}assets/sweets/बेसन लड्डू.jpeg`, price: 360, unit: "kg" },
  { id: "motichoor-ladoo", name: "मोतीचूर लड्डू", image: `${import.meta.env.BASE_URL}assets/sweets/मोतीचूर लड्डू.jpeg`, price: 180, unit: "kg" },
  { id: "rabadi", name: "रबड़ी", image: `${import.meta.env.BASE_URL}assets/sweets/रबड़ी.jpeg`, price: 550, unit: "kg" },
  { id: "rasgulla", name: "शुद्ध रसगुल्ला", image: `${import.meta.env.BASE_URL}assets/sweets/रसगुल्ला.jpeg`, price: 280, unit: "kg" },
  { id: "rasmalai", name: "रस मलाई", image: `${import.meta.env.BASE_URL}assets/sweets/रसमलाई.jpeg`, price: 400, unit: "piece" },
  { id: "rajbhog", name: "राजभोग", image: `${import.meta.env.BASE_URL}assets/sweets/राजभोग.jpeg`, price: 300, unit: "kg" },
  { id: "lalmohan", name: "लाल मोहन", image: `${import.meta.env.BASE_URL}assets/sweets/लालमोहन.jpeg`, price: 260, unit: "kg" },
  { id: "soan-papdi", name: "सोन पापड़ी", image: `${import.meta.env.BASE_URL}assets/sweets/सोन पापड़ी.jpeg`, price: 300, unit: "kg" },
  { id: "pgt", name: "PGT", image: `${import.meta.env.BASE_URL}assets/sweets/PGT.jpeg`, price: 320, unit: "kg" },
  { id: "kalakand", name: "कालाकंद", image: `${import.meta.env.BASE_URL}assets/sweets/kalakand.jpeg`, price: 450, unit: "kg" },
  { id: "balthar-gaja", name: "बलथर का फेमस गाजा", image: "", price: 180, unit: "kg" },
];
const SWEET_PLACEHOLDER_IMAGE = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><path d="M22 51h52c0 16-12 28-26 28S22 67 22 51Z" fill="#d77f3f"/><circle cx="36" cy="39" r="8" fill="#b96c36"/><circle cx="51" cy="34" r="9" fill="#e1ae61"/><circle cx="64" cy="41" r="7" fill="#c98543"/><path d="M16 82h64" fill="none" stroke="#8a603e" stroke-linecap="round" stroke-width="4"/></svg>',
)}`;
const sweetProductCards = SWEET_PRODUCTS.map(({ id, name, image, price, unit }) => {
  const inquiryUrl = new URL(`https://wa.me/${STORE_PHONE}`);
  inquiryUrl.searchParams.set("text", `नमस्ते, कृपया ${name} के सही दाम और उपलब्धता बताइए।`);
  const isPlaceholder = !image;
  const askPrice = price === null;
  const isPiece = unit === "piece";
  const kgPrices = isPiece || askPrice ? null : {
    250: Math.round(price * 0.25),
    500: Math.round(price * 0.5),
    1000: price,
  };
  const priceDisplay = askPrice
    ? "दाम पूछें"
    : isPiece
      ? `₹${price} / पीस`
      : `₹${price} / किलो`;

  return `
    <article class="product-card" data-product-id="${id}" data-category="sweets" data-name="${name}" ${askPrice ? 'data-inquiry-only="true"' : isPiece ? `data-price="${price}"` : `data-price="${kgPrices[500]}" data-base-grams="500" data-price-250="${kgPrices[250]}" data-price-500="${kgPrices[500]}" data-price-1000="${kgPrices[1000]}"`}>
      <div class="product-image${isPlaceholder ? " product-image-placeholder" : ""}"${isPlaceholder ? ` role="img" aria-label="${name} की तस्वीर जल्द आएगी"` : ""}>
        <img src="${image || SWEET_PLACEHOLDER_IMAGE}" alt="${image ? name : ""}" />
        ${isPlaceholder ? "<span>तस्वीर जल्द आएगी</span>" : ""}
      </div>
      <div class="product-info">
        <h3>${name}</h3>
        <span class="price" data-product-price>${priceDisplay}</span>
        ${askPrice || isPiece ? "" : `<label class="weight-select-label">वजन
          <select class="weight-select" data-weight-select aria-label="${name} का वजन चुनें">
            <option value="250">250 ग्राम</option>
            <option value="500" selected>500 ग्राम</option>
            <option value="1000">1 किलो</option>
          </select>
        </label>`}
      </div>
      ${askPrice ? "" : '<button class="add-to-cart" type="button" data-add-to-cart>टोकरी में डालें</button>'}
      <a class="product-whatsapp-link" href="${inquiryUrl.href}" data-product-inquiry target="_blank" rel="noopener noreferrer">WhatsApp पर पूछें</a>
    </article>
  `;
}).join("");
document.querySelector("#popular-product-grid").insertAdjacentHTML("afterbegin", sweetProductCards);
const productCards = [...document.querySelectorAll(".product-card[data-category]")];
const purchasableProductCards = productCards.filter((card) => card.dataset.productId);
const products = new Map(
  purchasableProductCards.map((card) => [
    card.dataset.productId,
    {
      id: card.dataset.productId,
      name: card.dataset.name,
      price: Number(card.dataset.price),
      baseGrams: Number(card.dataset.baseGrams) || null,
      prices: Object.fromEntries([250, 500, 1000].flatMap((grams) => {
        const price = Number(card.getAttribute(`data-price-${grams}`));
        return Number.isFinite(price) && price > 0 ? [[grams, price]] : [];
      })),
      category: card.dataset.category,
      image: card.querySelector("img")?.src || "",
      available: card.dataset.availability !== "unavailable"
        && !(card.dataset.stock !== undefined && Number(card.dataset.stock) <= 0),
    },
  ]),
);
const cartDialog = document.querySelector("#cart-dialog");
const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("[data-cart-count]");
const storageStatus = document.querySelector("#cart-storage-status");
const checkoutForm = document.querySelector("#checkout-form");
const deliveryAreaStatus = document.querySelector("#delivery-area-status");
const checkoutStatus = document.querySelector("#checkout-status");
document.querySelectorAll("[data-delivery-radius]").forEach((element) => {
  element.textContent = String(DELIVERY_RADIUS_KM);
});
const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});
let storageWarning = "";
let selectedCategory = "sweets";
let searchQuery = "";

function readCart() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) return {};

    const parsedCart = JSON.parse(savedCart);
    if (!parsedCart || typeof parsedCart !== "object" || Array.isArray(parsedCart)) {
      throw new TypeError("Saved cart data must be an object.");
    }

    return Object.fromEntries(Object.entries(parsedCart).flatMap(([savedKey, quantity]) => {
      if (!Number.isInteger(quantity) || quantity <= 0 || quantity > 99) return [];

      const separator = savedKey.indexOf("::");
      const productId = separator === -1 ? savedKey : savedKey.slice(0, separator);
      const product = products.get(productId);
      if (!product || !product.available) return [];

      const grams = separator === -1
        ? product.baseGrams
        : Number(savedKey.slice(separator + 2));
      if (product.baseGrams && ![250, 500, 1000].includes(grams)) return [];
      if (!product.baseGrams && separator !== -1) return [];

      const cartKey = product.baseGrams ? `${productId}::${grams}` : productId;
      return [[cartKey, quantity]];
    }));
  } catch (error) {
    storageWarning = "टोकरी का पुराना सामान नहीं खुला। नई टोकरी शुरू की गई है।";
    console.error("Unable to read the saved shopping cart:", error);
    return {};
  }
}

let cart = readCart();

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    storageWarning = "";
  } catch (error) {
    storageWarning = "इस ब्राउज़र में टोकरी का सामान सेव नहीं हो पाया।";
    console.error("Unable to save the shopping cart:", error);
  }
}

function cartEntries() {
  return Object.entries(cart)
    .map(([key, quantity]) => {
      const separator = key.indexOf("::");
      const productId = separator === -1 ? key : key.slice(0, separator);
      const product = products.get(productId);
      if (!product) return null;

      const grams = separator === -1 ? null : Number(key.slice(separator + 2));
      const unitPrice = product.prices[grams]
        ?? (product.baseGrams
          ? Math.round(product.price * grams / product.baseGrams)
          : product.price);
      return { key, product, quantity, grams, unitPrice };
    })
    .filter((entry) => entry !== null);
}

function renderCart() {
  const entries = cartEntries();
  const itemCount = entries.reduce((sum, entry) => sum + entry.quantity, 0);
  const subtotal = entries.reduce((sum, entry) => sum + entry.unitPrice * entry.quantity, 0);

  cartCount.textContent = String(itemCount);
  cartCount.setAttribute("aria-label", `टोकरी में ${itemCount} सामान`);
  document.querySelector("#cart-subtotal").textContent = currency.format(subtotal);
  document.querySelector("#cart-total").textContent = currency.format(subtotal);
  document.querySelector(".checkout-submit").disabled = itemCount === 0;
  storageStatus.textContent = storageWarning;

  if (entries.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">आपकी टोकरी खाली है। सामान देखने के लिए नीचे जाएँ।</p>';
    return;
  }

  cartItems.innerHTML = entries.map(({ key, product, quantity, grams, unitPrice }) => `
    <article class="cart-row" data-cart-row="${product.id}">
      <img src="${product.image}" alt="" />
      <div class="cart-row-info">
        <h3>${product.name}${grams ? ` · ${grams >= 1000 ? `${grams / 1000} किलो` : `${grams} ग्राम`}` : ""}</h3>
        <span>${currency.format(unitPrice)} <small>अंदाज़े का दाम</small></span>
        <div class="quantity-control" aria-label="${product.name}${grams ? ` ${grams} ग्राम` : ""} की गिनती">
          <button type="button" data-cart-action="decrease" data-product-id="${product.id}" data-cart-key="${key}" aria-label="${product.name} की गिनती घटाएँ" ${quantity <= 1 ? "disabled" : ""}><i data-lucide="minus"></i></button>
          <span>${quantity}</span>
          <button type="button" data-cart-action="increase" data-product-id="${product.id}" data-cart-key="${key}" aria-label="${product.name} की गिनती बढ़ाएँ" ${quantity >= 99 ? "disabled" : ""}><i data-lucide="plus"></i></button>
        </div>
      </div>
      <div class="cart-row-end">
        <strong>${currency.format(unitPrice * quantity)}</strong>
        <button class="remove-item" type="button" data-cart-action="remove" data-product-id="${product.id}" data-cart-key="${key}" aria-label="${product.name} टोकरी से हटाएँ"><i data-lucide="trash-2"></i></button>
      </div>
    </article>
  `).join("");

  createIcons({ icons });
}

function updateCart(productId, action, grams = null) {
  if (!products.has(productId)) return;
  const product = products.get(productId);
  if (!product.available && (action === "add" || action === "increase")) return;
  const key = product.baseGrams ? `${productId}::${grams || product.baseGrams}` : productId;

  if (action === "add" || action === "increase") {
    cart[key] = Math.min((cart[key] || 0) + 1, 99);
  } else if (action === "decrease" && cart[key] > 1) {
    cart[key] -= 1;
  } else if (action === "remove") {
    delete cart[key];
  }

  saveCart();
  renderCart();
}

function createOrderReference() {
  const date = new Date();
  const datePart = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");
  const randomPart = globalThis.crypto?.randomUUID
    ? globalThis.crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()
    : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`.slice(-8).toUpperCase();

  return `LCM-${datePart}-${randomPart}`;
}

purchasableProductCards.forEach((card) => {
  const button = card.querySelector("[data-add-to-cart]");
  const weightSelect = card.querySelector("[data-weight-select]");
  const product = products.get(card.dataset.productId);
  const priceLabel = card.querySelector("[data-product-price]");
  const inquiryLink = card.querySelector("[data-product-inquiry]");
  if (weightSelect) {
    weightSelect.addEventListener("change", () => {
      const grams = Number(weightSelect.value);
      if (priceLabel && product.prices[grams]) {
        priceLabel.textContent = currency.format(product.prices[grams]);
      }
      if (inquiryLink) {
        const inquiryUrl = new URL(inquiryLink.href);
        inquiryUrl.searchParams.set("text", `नमस्ते, कृपया ${product.name} के ${grams >= 1000 ? "1 किलो" : `${grams} ग्राम`} के सही दाम और उपलब्धता बताइए।`);
        inquiryLink.href = inquiryUrl.href;
      }
    });
  }
  if (!button) return;
  if (!product.available) {
    button.disabled = true;
    button.textContent = "अभी उपलब्ध नहीं";
  }
  button.addEventListener("click", () => {
    updateCart(card.dataset.productId, "add", weightSelect ? Number(weightSelect.value) : null);
    button.textContent = "टोकरी में डाल दिया";
    window.setTimeout(() => {
      button.textContent = "टोकरी में डालें";
    }, 1200);
  });
});

function applyProductFilters() {
  let visibleCount = 0;
  productCards.forEach((card) => {
    const categoryMatches = selectedCategory === "all" || card.dataset.category === selectedCategory;
    const searchableText = `${card.dataset.name} ${card.querySelector(".product-info")?.textContent || ""}`.toLowerCase();
    const searchMatches = !searchQuery || searchableText.includes(searchQuery);
    card.hidden = !categoryMatches || !searchMatches;
    if (!card.hidden) visibleCount += 1;
  });

  const results = document.querySelector("#search-results");
  results.hidden = !searchQuery;
  results.textContent = searchQuery
    ? `"${searchQuery}" खोजने पर ${visibleCount} सामान मिले।`
    : "";
}

function selectCategory(category) {
  selectedCategory = category;
  setProductGridExpanded(false);
  document.querySelectorAll("[data-category-filter]").forEach((filter) => {
    const active = filter.dataset.categoryFilter === category;
    filter.classList.toggle("is-active", active);
    filter.setAttribute("aria-pressed", String(active));
  });
  applyProductFilters();
}

applyProductFilters();

document.querySelectorAll("[data-category-filter]").forEach((button) => {
  button.addEventListener("click", () => selectCategory(button.dataset.categoryFilter));
});

const productGrid = document.querySelector(".product-grid");
const bestsellers = document.querySelector("#bestsellers");
const viewSweetsButton = document.querySelector("[data-view-sweets]");

function setProductGridExpanded(isExpanded) {
  productGrid.classList.toggle("is-expanded", isExpanded);
  bestsellers.classList.toggle("is-expanded", isExpanded);
  viewSweetsButton.setAttribute("aria-expanded", String(isExpanded));
  viewSweetsButton.textContent = isExpanded
    ? "कम दिखाएँ / Show Less"
    : "View All Sweets / सभी मिठाइयाँ";
}

document.querySelectorAll("[data-scroll-products]").forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.scrollProducts === "next" ? 1 : -1;
    productGrid.scrollBy({
      left: direction * Math.max(productGrid.clientWidth * 0.8, 160),
      behavior: "smooth",
    });
  });
});

document.querySelectorAll("[data-category-shortcut]").forEach((shortcut) => {
  shortcut.addEventListener("click", () => {
    selectCategory(shortcut.dataset.categoryShortcut);
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "मेन्यू खोलें");
  });
});

const searchForm = document.querySelector("#product-search");
const searchToggle = document.querySelector(".search-toggle");
const searchInput = document.querySelector("#product-search-input");

viewSweetsButton.addEventListener("click", () => {
  const shouldExpand = !productGrid.classList.contains("is-expanded");
  searchInput.value = "";
  searchQuery = "";
  selectCategory("sweets");
  setProductGridExpanded(shouldExpand);
  bestsellers.scrollIntoView({ behavior: "smooth", block: "start" });
});

function setSearchOpen(isOpen) {
  searchForm.classList.toggle("is-open", isOpen);
  searchToggle.setAttribute("aria-expanded", String(isOpen));
  searchToggle.setAttribute("aria-label", isOpen ? "खोज बंद करें" : "खोज खोलें");
  if (isOpen) searchInput.focus();
}

searchToggle.addEventListener("click", () => {
  setSearchOpen(searchToggle.getAttribute("aria-expanded") !== "true");
});
searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value.trim().toLowerCase();
  applyProductFilters();
});
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = searchInput.value.trim().toLowerCase();
  applyProductFilters();
  document.querySelector("#bestsellers").scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll("[data-open-cart]").forEach((button) => {
  button.addEventListener("click", () => cartDialog.showModal());
});
document.querySelector("[data-close-cart]").addEventListener("click", () => cartDialog.close());
cartDialog.addEventListener("click", (event) => {
  if (event.target === cartDialog) cartDialog.close();
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-cart-action]");
  if (!button) return;
  const separator = button.dataset.cartKey.indexOf("::");
  const grams = separator === -1 ? null : Number(button.dataset.cartKey.slice(separator + 2));
  updateCart(button.dataset.productId, button.dataset.cartAction, grams);
});

checkoutForm.querySelectorAll('input[name="deliveryArea"]').forEach((choice) => {
  choice.addEventListener("change", () => {
    deliveryAreaStatus.textContent = choice.value === "within"
      ? `आपने ${DELIVERY_RADIUS_KM} किलोमीटर के अंदर होने की पुष्टि की है। दुकान WhatsApp पर दूरी और डिलीवरी पक्की करेगी।`
      : `क्षमा करें, अभी ${DELIVERY_RADIUS_KM} किलोमीटर से बाहर डिलीवरी उपलब्ध नहीं है। जगह के बारे में पूछने के लिए दुकान से WhatsApp पर बात करें।`;
  });
});

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const requiredFields = ["customerName", "mobile", "locality", "address"];
  requiredFields.forEach((name) => {
    const field = checkoutForm.elements.namedItem(name);
    field.setCustomValidity(field.value.trim() ? "" : "कृपया यह जानकारी भरें।");
  });
  if (!checkoutForm.reportValidity()) return;

  const entries = cartEntries();
  if (entries.length === 0) {
    renderCart();
    return;
  }

  const formData = new FormData(checkoutForm);
  if (formData.get("deliveryArea") !== "within") {
    deliveryAreaStatus.textContent = `${DELIVERY_RADIUS_KM} किलोमीटर के बाहर डिलीवरी उपलब्ध नहीं है। ऑर्डर आगे नहीं भेजा गया।`;
    return;
  }

  const subtotal = entries.reduce((sum, entry) => sum + entry.unitPrice * entry.quantity, 0);
  const orderReference = createOrderReference();
  const messageValue = (value) => typeof value === "string"
    ? value.trim().replace(/\s+/g, " ")
    : "";
  const customerName = messageValue(formData.get("customerName")) || "Not provided";
  const customerPhone = messageValue(formData.get("mobile")) || "Not provided";
  const deliveryAddress = [
    messageValue(formData.get("locality")),
    messageValue(formData.get("address")),
  ]
    .filter(Boolean)
    .join(", ") || "Not provided";
  const lines = [
    "🛍️ *NEW ORDER – SHREE LCM SWEETS*",
    "",
    "👤 *Customer Details*",
    `Name: ${customerName}`,
    `Phone: ${customerPhone}`,
    `Address: ${deliveryAddress}`,
    "",
    "🧾 *Order Details*",
    "",
    ...entries.map(({ product, quantity, grams, unitPrice }, index) => {
      const weight = grams ? (grams >= 1000 ? `${grams / 1000}kg` : `${grams}g`) : "N/A";
      const amount = (unitPrice * quantity).toLocaleString("en-IN");
      return `${index + 1}. ${product.name} – ${weight} × ${quantity} = ₹${amount}`;
    }),
    `*Total Amount: ₹${subtotal.toLocaleString("en-IN")}*`,
    "",
    "Payment: Cash on Delivery",
    "",
    "Please confirm this order.",
  ];

  const whatsappUrl = new URL(`https://wa.me/${STORE_PHONE}`);
  whatsappUrl.searchParams.set("text", lines.join("\n"));
  checkoutStatus.hidden = false;
  checkoutStatus.textContent = `ऑर्डर संदर्भ ${orderReference} का संदेश तैयार है। WhatsApp में देखकर खुद भेजें; दुकान की पुष्टि तक ऑर्डर पक्का नहीं है।`;
  window.location.assign(whatsappUrl.toString());
});

renderCart();
