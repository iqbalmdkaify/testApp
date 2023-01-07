const btn = document.querySelector(".change-text");

btn.addEventListener("click", () => {
    document.querySelector(".text").textContent = "Express sucks!";
    btn.style.display = "None";
});
