export default function activeLink(navLink) {
       let activeLink = document.querySelector("[data-active-link]");

       if (activeLink) {
              delete activeLink.dataset.activeLink;
       }
       let link = document.getElementsByClassName("link");
       for (let i = 0; i < link.length; ++i) {
              if (link[i].innerHTML.toLowerCase() === navLink)
                     link[i].dataset.activeLink = true;
       }
}
