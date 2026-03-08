name: Update Crypto News
on:
  schedule:
    - cron: '0 * * * *' # ہر گھنٹے بعد چلے گا
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.9'
      - name: Run script
        run: python binance_auth.py
