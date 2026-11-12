const passwordInput = document.getElementById("password");
const progress = document.querySelector(".form__password-strength");
const callSign = document.getElementById("callsign");
const callSignCheck = document.querySelector(".form__callsign--checked");
const email = document.querySelector(".form__email");
const emailChecked = document.querySelector(".form__email--checked");
const passwordChecked = document.querySelector(".form__pass--checked");
const passwordConfirm = document.getElementById("password-confirm");
const passwordConfirmChecked = document.querySelector(
  ".form__pass-confirm--checked",
);
let passwordValid = false;
let passwordConfirmValid = false;
let callSignValid = false;
let emailValid = false;

function passwordStrength(pass) {
  let score = 0;
  if (pass.length === 0) return 0;

  if (pass.length > 0 && pass.length < 8) {
    score++;
  } else if (pass.length >= 8) {
    score++;
    if (pass.length >= 12) score++;
    if (pass.toUpperCase() !== pass && pass.toLowerCase() !== pass) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
  }

  return Math.min(score, 4);
}

passwordInput.addEventListener("input", () => {
  progress.value = passwordStrength(passwordInput.value);
  if (passwordInput.value.length !== 0) {
    passwordValid = passwordInput.value.length >= 8;
    passwordChecked.style.display = passwordValid ? "block" : "none";
    passwordInput.style.outline = !passwordValid
      ? "2px solid var(--color-red-400)"
      : "none";
    if (passwordValid) {
      document.getElementById("password-status").innerText = "OK";
      document.getElementById("password-status").style.color =
        "var(--color-neutral-400)";
    } else {
      document.getElementById("password-status").innerText = "TOO SHORT";
      document.getElementById("password-status").style.color =
        "var(--color-red-400)";
    }
  } else {
    passwordInput.style.outline = "none";
    document.getElementById("password-status").innerText = "PENDING";
    document.getElementById("password-status").style.color =
      "var(--color-neutral-400)";
  }
});

callSign.addEventListener("input", () => {
  const value = callSign.value.trim();

  callSignValid =
    value.length >= 3 && value.length <= 20 && /^[A-Za-z0-9_-]+$/.test(value);

  callSignCheck.style.display = callSignValid ? "block" : "none";

  if (!callSignValid && value.length > 0) {
    callSign.style.outline = "2px solid var(--color-red-400)";

    document.getElementById("callsign-status").innerText = "TOO SHORT";
    document.getElementById("callsign-status").style.color =
      "var(--color-red-400)";
  } else if (value.length > 0 && callSignValid) {
    document.getElementById("callsign-status").innerText = "OK";
    document.getElementById("callsign-status").style.color =
      "var(--color-neutral-400)";
    callSign.style.outline = "none";
  } else {
    callsign.style.outline = "none";
    document.getElementById("callsign-status").innerText = "PENDING";
    document.getElementById("callsign-status").style.color =
      "var(--color-neutral-400)";
  }
});

email.addEventListener("input", () => {
  if (email.value.length !== 0) {
    emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);

    if (emailValid) {
      email.style.outline = "none";
      emailChecked.style.display = "block";
      document.getElementById("email-status").innerText = "OK";
      document.getElementById("email-status").style.color =
        "var(--color-neutral-400)";
    } else {
      email.style.outline = "2px solid var(--color-red-400)";
      emailChecked.style.display = "none";
      document.getElementById("email-status").innerText = "MALFORMED";
      document.getElementById("email-status").style.color =
        "var(--color-red-400)";
    }
  } else {
    email.style.outline = "none";
    document.getElementById("email-status").innerText = "PENDING";
    document.getElementById("email-status").style.color =
      "var(--color-neutral-400)";
  }
});

passwordConfirm.addEventListener("input", () => {
  if (passwordConfirm.value.length !== 0) {
    passwordConfirmValid = passwordInput.value === passwordConfirm.value;

    if (passwordConfirmValid) {
      passwordConfirmChecked.style.display = "block";
      passwordConfirm.style.outline = "none";
      document.getElementById("password-confirm-status").innerText = "OK";
      document.getElementById("password-confirm-status").style.color =
        "var(--color-neutral-400)";
    } else {
      passwordConfirmChecked.style.display = "none";
      passwordConfirm.style.outline = "2px solid var(--color-red-400)";
      document.getElementById("password-confirm-status").innerText = "MISMATCH";
      document.getElementById("password-confirm-status").style.color =
        "var(--color-red-400)";
    }
  } else {
    passwordConfirm.style.outline = "none";
    document.getElementById("password-confirm-status").innerText = "PENDING";
    document.getElementById("password-confirm-status").style.color =
      "var(--color-neutral-400)";
  }
});
