// Valid Session IDs (pass the hack)
const validSessionIds = [
  '|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|42',
  '|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|73',
  '|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|15',
  '|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|89',
  '|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|64'
];

// Invalid Session IDs (fail due to 2FA)
const invalidSessionIds = [
  '|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|27',
  '|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|36',
  '|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|51',
  '|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|98',
  '|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|12'
];

// Validate User Input
function validateInput() {
  const username = document.getElementById('username').value.trim();
  const sessionId = document.getElementById('sessionId').value.trim();
  const captcha = document.getElementById('captcha').checked;

  // Disable the button to prevent spamming
  const scanButton = document.querySelector('button');
  scanButton.disabled = true;

  // Check for invalid inputs
  let errorMessage = "";

  if (username.length < 3 && sessionId.length < 100 && !captcha) {
    errorMessage = "Please check your inputs: username, session ID, and CAPTCHA.";
  } else if (username.length < 3 && sessionId.length < 100) {
    errorMessage = "Username must be at least 3 characters, and session ID must be 100+ characters.";
  } else if (username.length < 3 && !captcha) {
    errorMessage = "Username must be at least 3 characters, and CAPTCHA must be completed.";
  } else if (sessionId.length < 100 && !captcha) {
    errorMessage = "Session ID must be 100+ characters, and CAPTCHA must be completed.";
  } else if (username.length < 3) {
    errorMessage = "Username must be at least 3 characters long.";
  } else if (sessionId.length < 100) {
    errorMessage = "Session ID must be at least 100 characters long.";
  } else if (!captcha) {
    errorMessage = "Please complete the CAPTCHA to proceed.";
  }

  // Show error message if any input is invalid
  if (errorMessage) {
    showError(errorMessage);
    scanButton.disabled = false; // Re-enable the button if there's an error
    return;
  }

  // Hide error and start fake hacking process
  hideError();
  startHack();
}

// Show Error Message
function showError(message) {
  const errorElement = document.getElementById('error');
  errorElement.innerHTML = `<p class="error-message">${message}</p>`;
  errorElement.classList.remove('hidden');
}

// Hide Error Message
function hideError() {
  document.getElementById('error').classList.add('hidden');
}

// Start Fake Hacking Process
function startHack() {
  // Show hacking section
  document.getElementById('hacking').classList.remove('hidden');

  // Clear the terminal
  const terminal = document.getElementById('terminal');
  terminal.innerHTML = '';

  // Fake progress bar
  const progressBar = document.getElementById('progress-bar-fill');
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      showCookieSuccess(); // Call the function to show the result
    } else {
      width++;
      progressBar.style.width = width + '%';
    }
  }, 30); // Adjust speed of progress bar

  // Fake terminal output
  const messages = [
    '[*] Scanning target account...',
    '[*] Initiating man-in-the-middle (MITM) exploit...',
    '[*] Redirecting target traffic through proxy server...',
    '[*] Intercepted encrypted session ID.',
    '[*] Decrypting session ID using brute-force module...',
    '[*] Cracking AES-256 encryption...',
    '[*] Extracting _ROBLOSECURITY cookie...',
    '[*] Verifying cookie validity...'
  ];
  let i = 0;
  const terminalInterval = setInterval(() => {
    if (i >= messages.length) {
      clearInterval(terminalInterval);
    } else {
      terminal.innerHTML += messages[i] + '\n';
      terminal.scrollTop = terminal.scrollHeight; // Auto-scroll
      i++;
    }
  }, 1500); // Adjust speed of terminal output
}

// Show Fake Cookie Success
function showCookieSuccess() {
  // Randomly decide success or failure (50% chance)
  const success = Math.random() < 0.5;

  // Select a session ID based on success or failure
  const sessionId = success
    ? validSessionIds[Math.floor(Math.random() * validSessionIds.length)]
    : invalidSessionIds[Math.floor(Math.random() * invalidSessionIds.length)];

  // Show session ID in red
  const terminal = document.getElementById('terminal');
  terminal.innerHTML += `[*] Extracted Session ID: <span style="color: red;">${sessionId}</span>\n`;

  if (success) {
    terminal.innerHTML += '[*] Cookie successfully injected. Full access granted.\n';
  } else {
    terminal.innerHTML += '[*] ERROR! User has 2FA enabled. Full access prevented.\n';
  }

  terminal.scrollTop = terminal.scrollHeight;
}
