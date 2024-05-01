function reloadOnResize() {
  let mediaQuery = window.matchMedia('(hover: none)');

  if (mediaQuery.matches) {
    return
  } else {
    window.onresize = function(){ location.reload() };
  }
}

export default reloadOnResize;