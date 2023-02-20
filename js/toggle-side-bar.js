document.body.style.paddingLeft = "225px";

function toggleSideMenu() {
  const sideMenu = document.querySelector(".side-menu");
  if (sideMenu.dataset.sideMenuDisplay == "show") {
    sideMenu.dataset.sideMenuDisplay = "hide";
    hideSideMenu(sideMenu);
  } else {
    sideMenu.dataset.sideMenuDisplay = "show";
    showSideMenu(sideMenu);
  }
}

function hideSideMenu(sideMenu) {
  document.body.style.paddingLeft = "";
  sideMenu.classList.add("hide-side-menu");
}

function showSideMenu(sideMenu) {
  document.body.style.paddingLeft = "225px";
  sideMenu.classList.remove("hide-side-menu");
}
