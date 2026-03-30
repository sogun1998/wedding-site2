import {home} from "./js/home.js";
import {bride} from "./js/bride.js";
import {galeri} from "./js/galeri.js";
import {memories} from "./js/memories.js";
import {wishas} from "./js/wishas.js";
import {navbar} from "./js/navbar.js";
import {welcome} from "./js/welcome.js";

// load content
document.addEventListener('DOMContentLoaded', () => {
    AOS.init();

    welcome();
    navbar();
    home();
    bride();
    galeri();
    memories();
    wishas();
});