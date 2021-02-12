// function toggler() {
//   let x = document.getElementById("footer");
//   if (x.style.display === "none") {
//     x.style.display = "block";
//   } else {
//     x.style.display = "none";
//   }
// }

$(document).ready(function () {
  $(".nav-bar .nav-far-right .footer-toggle").click(function () {
    // let clickable = $(".nav-bar .nav-bar-right .footer-toggle");
    // console.log(clickable)
    $("#footer")
      .slideToggle(600);

  });
  $(".nav-bar .to-the-right .footer-toggle").click(function () {
    // let clickable = $(".nav-bar .nav-bar-right .footer-toggle");
    // console.log(clickable)
    $("#footer")
      .slideToggle(600);

  });

});
