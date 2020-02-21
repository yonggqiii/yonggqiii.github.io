// Show and hide app header.
var APP_HEADER = document.getElementById("app-header");
var SIDE_DRAWER = document.getElementById("side-drawer");
var TOGGLE = document.getElementById("toggle");
var TOGGLE_LINES = document.getElementsByClassName("toggle-line");
var lastScrollPosition = 0;
window.addEventListener("scroll", e => {
  var SCROLL_OFFSET = 60;
  var currentScrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;
  if (currentScrollPosition < 0) {
    return;
  }
  if (
    Math.abs(currentScrollPosition - this.lastScrollPosition) < SCROLL_OFFSET
  ) {
    return;
  }
  if (currentScrollPosition < lastScrollPosition) {
    // Show Header
    APP_HEADER.className = "app-header";
  } else {
    // Hide Header
    APP_HEADER.className = "app-header hidden";
  }
  toggleInactive(true);
  lastScrollPosition = currentScrollPosition;
});

// Show and hide side drawer
function toggleInactive(e) {
  SIDE_DRAWER.className = "side-drawer";
  TOGGLE.className = "toggle";
  for (let i = 0; i < TOGGLE_LINES.length; ++i) {
    toggleLine = TOGGLE_LINES[i];
    var classList = toggleLine.className.split(" ");
    toggleLine.className = toggleLine.className
      .split(" ")
      .slice(0, 2)
      .join(" ");
  }
}

function toggleActive(e) {
  SIDE_DRAWER.className = "side-drawer show";
  TOGGLE.className = "toggle active";
  for (let i = 0; i < TOGGLE_LINES.length; ++i) {
    toggleLine = TOGGLE_LINES[i];
    toggleLine.className += " active";
  }
}

function toggle(e) {
  if (SIDE_DRAWER.className.split(" ").length == 1) {
    toggleActive(e);
  } else {
    toggleInactive(e);
  }
}
window.addEventListener("resize", toggleInactive);
