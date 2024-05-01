import 'https://code.jquery.com/jquery-3.7.1.min.js';

function hrefDelay () {
  $(".href-delay-one").click(function (e) {
    e.preventDefault();
    setTimeout(
      function (url) {
        window.location = url;
      },
      1700,
      this.href
    );
  });
  $(".href-delay-two").click(function (e) {
    e.preventDefault();
    setTimeout(
      function (url) {
        window.location = url;
      },
      3050,
      this.href
    );
  });
  $(".href-delay-three").click(function (e) {
    e.preventDefault();
    setTimeout(
      function (url) {
        window.location = url;
      },
      3650,
      this.href
    );
  });
}
export default hrefDelay;