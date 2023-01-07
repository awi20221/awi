const navSlider = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active"); //wysuwanie sie menu bocznego

    //animacja dla el menu
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 5 + 0.8
        }s`;
      }
    });

    //animacja burgera
    burger.classList.toggle("rotate");
  });
};

navSlider();

