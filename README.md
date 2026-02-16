<div align="center">

# 🔐 Passkey Authenticator AAGUIDs Explorer

<img src="https://raw.githubusercontent.com/marwajameel/passkey-authenticator-aaguids/main/logo.png" alt="Passkey Logo" width="150" onerror="this.src='https://via.placeholder.com/150/0078D4/FFFFFF?text=Passkey+AAGUID'" style="border-radius: 20px; margin-bottom: 20px;" />

### 🚀 A Comprehensive Community-Driven List of Passkey Provider AAGUIDs

**Built by [Jamil Ahmed Kalyal](https://github.com/marwajameel)** 📍

[![GitHub license](https://img.shields.io/github/license/marwajameel/passkey-authenticator-aaguids?style=for-the-badge)](https://github.com/marwajameel/passkey-authenticator-aaguids/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/marwajameel/passkey-authenticator-aaguids?style=for-the-badge)](https://github.com/marwajameel/passkey-authenticator-aaguids/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/marwajameel/passkey-authenticator-aaguids?style=for-the-badge)](https://github.com/marwajameel/passkey-authenticator-aaguids/issues)

---

### 📖 About This Repository

This repository provides a community-sourced mapping of **AAGUIDs** to their respective passkey providers. It helps Relying Parties (RPs) and developers identify and display the correct provider name and icon (e.g., Google Password Manager, Dashlane, or iCloud Keychain) in their user interfaces.

---

### 🛠️ Key Features

* ✅ **Extensive Database:** A growing list of AAGUIDs for various authenticators.
* 🎨 **Icon Support:** Includes SVG icons for dark and light modes.
* 📊 **Developer Friendly:** Simple JSON structure for easy integration.
* 🌍 **Community Driven:** Open for contributions from the global developer community.

---

### 🚀 How to Use

Simply fetch the `aaguid.json` or `combined_aaguid.json` file and map the AAGUID from the WebAuthn response to the provider details in the list.

```json
{
  "ea9b8d66-4d01-1d21-3ce4-b6b48cb575d4": {
    "name": "Google Password Manager",
    "icon_light": "data:image/svg+xml;base64,...",
    "icon_dark": "data:image/svg+xml;base64,..."
  }
}


