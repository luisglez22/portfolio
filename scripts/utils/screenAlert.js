function screenAlert() {
  if(window.innerWidth <= 350) {
    document.querySelector('body').innerHTML = `
    <div class="resize-alert">
      <p>Please use a bigger screen</p>
    </div>
    `;
  }
}

export default screenAlert;