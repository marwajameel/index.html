#!/bin/bash

# غلطی آنے پر اسکرپٹ روکنے کے لیے
set -e

echo "--- QuickNode CLI کی تنصیب کا عمل شروع ہو رہا ہے ---"

# 1. لیٹسٹ فائل ڈاؤن لوڈ کرنا
echo "[1/3] QuickNode CLI ڈاؤن لوڈ کیا جا رہا ہے..."
curl -LO https://github.com/quicknode/cli/releases/latest/download/qn_amd64.deb

# 2. پیکج انسٹال کرنا
echo "[2/3] سسٹم میں انسٹالیشن جاری ہے..."
sudo apt update && sudo apt install -y ./qn_amd64.deb

# 3. اتھنٹیکیشن / لاگ ان
echo "[3/3] اکاؤنٹ لاگ ان کرنے کے لیے ہدایات پر عمل کریں..."
qn auth login

echo "--- مبارک ہو! سیٹ اپ کامیابی سے مکمل ہو گیا ہے ---"
