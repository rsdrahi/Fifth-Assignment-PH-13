// console.log('connected')

document.getElementById("signin-btn").addEventListener('click', function () {
  const userNameInput = document.getElementById("username-input");
  const admin = userNameInput.value;
  console.log(admin);

  const passwordInput = document.getElementById("password-input");
  const password = passwordInput.value;
  console.log(password);

  if (admin == "admin" && password == "admin123") {
    alert("login successful");
    window.location.assign("./home.html");
  }
  else {
    alert("login failed");
    return
  }
})