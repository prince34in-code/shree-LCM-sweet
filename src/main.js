import "./style.css";
import Swiper from "swiper";
import { Autoplay, Mousewheel, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { createIcons, ArrowDown, ArrowUpRight, Instagram, Menu, MessageCircle, Sparkles } from "lucide";

createIcons({
  icons: { ArrowDown, ArrowUpRight, Instagram, Menu, MessageCircle, Sparkles },
});

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
  menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
