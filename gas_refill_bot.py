name: Gas Refill Bot

on:
  schedule:
    - cron: '*/15 * * * *' # ہر 15 منٹ بعد چلے گا
  workflow_dispatch: # خود سے دستی طور پر چلانے کے لیے

jobs:
  run-bot:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.x'
          
      - name: Install dependencies
        run: pip install web3
        
      - name: Run Gas Bot
        env:
          MAIN_WALLET_PRIVATE_KEY: ${{ secrets.MAIN_WALLET_PRIVATE_KEY }}
        run: python gas_refill_bot.py
