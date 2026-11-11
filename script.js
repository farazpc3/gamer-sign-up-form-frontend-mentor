const passwordInput = document.getElementById("password");
const progress = document.querySelector(".form__password-strength");

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

  if (score > 4) score = 4;

  return score;
}

// ✅ THIS IS THE MISSING PIECE
passwordInput.addEventListener("input", function () {
  const currentValue = passwordInput.value;
  progress.value = passwordStrength(currentValue);
});
