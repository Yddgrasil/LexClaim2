

const startButton = document.querySelector('.start1');
startButton.style.display="none";
const pop_info  = document.querySelector(".pop-info");
const close = document.querySelector(".close");
const wrapper = document.querySelector(".wrapper");
document.addEventListener("DOMContentLoaded",()=>{
        setTimeout(()=>{
            pop_info.classList.add("active");
            startButton.style.display="block";
        },300);
       

});


close.addEventListener("click",()=>{
    pop_info.classList.remove("active");
    wrapper.classList.add("Unblure");
});

console.log(window);

