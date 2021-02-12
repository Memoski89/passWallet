function myFunction(input) {
  /* Get the text field */
  let copyText = document.getElementById(input);
  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the password: " + copyText.value);
}
