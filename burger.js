const burgerButton = document.querySelector(".burger");
const header_menu_list = document.querySelector(".header_menu-list");

burgerButton.addEventListener("click",function(){
    header_menu_list.classList.toggle('menu_active');
    burgerButton.classList.toggle("menu_active");
});