# Node.js Keylogger POC

This project is a proof-of-concept Node.js keylogger that captures and analyzes keyboard and mouse input events and sends the data to a Discord webhook. The keylogger includes features for analyzing key patterns to identify potentially sensitive information.

## Features

- **Capture Keyboard Input**: Captures keyboard input events.
- **Capture Mouse Input**: Captures mouse input events.
- **Key Pattern Analysis**: Analyzes key patterns for potentially sensitive information.
- **Discord Webhook Integration**: Sends analyzed data to a Discord webhook.

## Screenshots

<img src="https://i.imgur.com/Cn3Ghke.png" alt="Console Output" width="100%">
<img src="https://i.imgur.com/91QaphO.png" alt="Discord Output" width="100%">

## Installation

1. Ensure that [Node.js](https://nodejs.org/) is installed on your machine. This project requires Node.js version 12.22.11, which can be installed via `nvm` (Node Version Manager).

 ```bash
    # Install nvm
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

    # Load nvm
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

    # Install Node.js version 12.22.11
    nvm install 12.22.11

    # Use Node.js version 12.22.11
    nvm use 12.22.11
 ```

2. Clone the repository:

 ```bash
    git clone https://github.com/YourUsername/Node.js-Keylogger-POC.git
 ```

3. Navigate to the project directory:

 ```bash
    cd Node.js-Keylogger-POC
 ```

4. Install dependencies:

 ```bash
    npm install
 ```

5. **Important**: Change the `webhookUrl` variable in `index.js` to your Discord webhook URL. You can follow [this Discord article](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) to learn how to create a webhook URL.

## Usage

### Production

To run the keylogger in production mode:

```bash
npm start
```

## Contributing
We welcome contributions to improve the `Node.js Keylogger POC` project! Please fork the repository and submit pull requests.

## Disclaimer
This project is intended for educational purposes only and should not be used maliciously. It serves as a proof of concept to demonstrate how a keylogger can be implemented in Node.js. Use responsibly and ensure proper authorization before running this software on any machine.
