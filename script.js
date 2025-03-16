// Validate User Input
function validateInput() {
  const username = document.getElementById('username').value.trim();
  const sessionId = document.getElementById('sessionId').value.trim();
  const captcha = document.getElementById('captcha').checked;

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
  // Disable the "Scan Account" button
  document.getElementById('scanButton').disabled = true;

  // Show hacking section
  document.getElementById('hacking').classList.remove('hidden');

  // Fake progress bar
  const progressBar = document.getElementById('progress-bar-fill');
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      showCookieSuccess();
    } else {
      width++;
      progressBar.style.width = width + '%';
    }
  }, 30); // Adjust speed of progress bar

  // Fake terminal output
  const terminal = document.getElementById('terminal');
  const messages = [
    '[*] Scanning target account...',
    '[*] Bypassing firewall...',
    '[*] Decrypting session data...',
    '[*] Session ID detected. Verification required.'
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

// Show Cookie Success or 2FA Error
function showCookieSuccess() {
  // Array of 10 pre-defined session IDs for success
  const sessionIds_success = [
    '_|SUCCESS:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_A1B2C3D4E5F6G7H8I9J0********',
    '_|SUCCESS:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_K1L2M3N4O5P6Q7R8S9T0********',
    '_|SUCCESS:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_U1V2W3X4Y5Z6A7B8C9D0********',
    '_|SUCCESS:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_E1F2G3H4I5J6K7L8M9N0********',
    '_|SUCCESS:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_O1P2Q3R4S5T6U7V8W9X0********',
    '_|SUCCESS:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_Y1Z2A3B4C5D6E7F8G9H0********',
    '_|SUCCESS:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_I1J2K3L4M5N6O7P8Q9R0********',
    '_|SUCCESS:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_S1T2U3V4W5X6Y7Z8A9B0********',
    '_|SUCCESS:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_C1D2E3F4G5H6I7J8K9L0********',
    '_|SUCCESS:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_M1N2O3P4Q5R6S7T8U9V0********'
  ];

  // Array of 10 pre-defined session IDs for 2FA error
  const sessionIds = [
    '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_A1B2C3D4E5F6G7H8I9J0********',
    '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_K1L2M3N4O5P6Q7R8S9T0********',
    '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_U1V2W3X4Y5Z6A7B8C9D0********',
    '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_E1F2G3H4I5J6K7L8M9N0********',
    '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_O1P2Q3R4S5T6U7V8W9X0********',
    '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_Y1Z2A3B4C5D6E7F8G9H0********',
    '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_I1J2K3L4M5N6O7P8Q9R0********',
    '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_S1T2U3V4W5X6Y7Z8A9B0********',
    '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_C1D2E3F4G5H6I7J8K9L0********',
    '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_M1N2O3P4Q5R6S7T8U9V0********'
  ];

  // Randomly select a session ID
  const randomSessionId = isSuccess ? sessionIds_success[Math.floor(Math.random() * sessionIds_success.length)] : sessionIds[Math.floor(Math.random() * sessionIds.length)];

  // 50/50 chance of success or 2FA error
  const isSuccess = Math.random() < 0.5;

  if (isSuccess) {
    // Show success table
    const successTable = `
      <div class="success-table">
        <h3>Success! Account Hacked</h3>
        <table>
          <tr>
            <th>Session ID</th>
          </tr>
          <tr>
            <td style="color: green;">${randomSessionId}</td>
          </tr>
        </table>
      </div>
    `;

    // Inject the success table into the DOM
    const cookieElement = document.getElementById('cookie');
    cookieElement.innerHTML = successTable;
    cookieElement.classList.remove('hidden');

    // Hide the 2FA error section
    document.getElementById('twoFaError').classList.add('hidden');

    // Update terminal output
    const terminal = document.getElementById('terminal');
    terminal.innerHTML += '[*] Session ID verified.\n';
    terminal.innerHTML += '<span style="color: green;">[*] SUCCESS! Account hacked successfully.</span>\n';
    terminal.scrollTop = terminal.scrollHeight;
  } else {
    // Show 2FA error table (existing design)
    const cookieElement = document.getElementById('cookie');
    cookieElement.innerHTML = `Session ID: <span style="color: red;">${randomSessionId}</span>`;
    cookieElement.classList.remove('hidden');

    const twoFaErrorElement = document.getElementById('twoFaError');
    twoFaErrorElement.innerHTML = `<p class="error-message" style="color: red;">ERROR! User has 2FA enabled. Full access prevented.</p>`;
    twoFaErrorElement.classList.remove('hidden');

    // Update terminal output
    const terminal = document.getElementById('terminal');
    terminal.innerHTML += '[*] Session ID verified.\n';
    terminal.innerHTML += '<span style="color: red;">[*] ERROR! User has 2FA enabled. Full access prevented.</span>\n';
    terminal.scrollTop = terminal.scrollHeight;
  }
}

// Show Terms of Service Modal
function showTerms() {
  const modal = document.getElementById('termsModal');
  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('visible'), 10); // Small delay to trigger CSS transition
}

// Close Terms of Service Modal
function closeTerms() {
  const modal = document.getElementById('termsModal');
  modal.classList.remove('visible');
  setTimeout(() => modal.classList.add('hidden'), 300); // Wait for transition to finish
}

// Add event listener for the close button
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.close').addEventListener('click', closeTerms);
});
