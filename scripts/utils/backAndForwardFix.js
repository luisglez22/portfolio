function backAndForwardFix () {
  window.onpageshow = function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  };
}

export default backAndForwardFix;