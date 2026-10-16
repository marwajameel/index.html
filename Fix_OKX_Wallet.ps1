# 1. OKX Wallet Extension ID درج کریں (اگر مختلف ہو تو تبدیل کر لیں)
$extID = "mcohilncbfahbmgdjkbpemcciiolgcge"

# 2. Paths سیٹ کریں
$chromePath = "$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Local Extension Settings"
$backupPath = "$env:USERPROFILE\Desktop\OKX_Wallet_Backup"

# 3. بیک اپ بنائیں
Write-Host "1. ایکسٹینشن کا بیک اپ بنایا جا رہا ہے..." -ForegroundColor Yellow
if (Test-Path "$chromePath\$extID") {
    New-Item -ItemType Directory -Force -Path $backupPath | Out-Null
    Copy-Item -Path "$chromePath\$extID\*" -Destination $backupPath -Recurse -Force
    Write-Host "بیک اپ آپ کے Desktop پر 'OKX_Wallet_Backup' کے نام سے محفوظ ہو گیا ہے۔" -ForegroundColor Green
} else {
    Write-Host "خرابی: ایکسٹینشن کا فولڈر نہیں ملا! براہ کرم Extension ID چیک کریں۔" -ForegroundColor Red
    exit
}

# 4. یوزر کو ریپئر کرنے کی ہدایت
Write-Host "`n--------------------------------------------------" -ForegroundColor Cyan
Write-Host "2. اب chrome://extensions/ پر جائیں اور OKX Wallet کے 'Repair' پر کلک کریں۔" -ForegroundColor Yellow
Write-Host "3. ریپئر کرنے کے بعد Google Chrome کو مکمل بند (Close) کر دیں۔" -ForegroundColor Yellow
Write-Host "--------------------------------------------------" -ForegroundColor Cyan
Read-Host "جب آپ Chrome بند کر لیں، تو آگے بڑھنے کے لیے Enter دبائیں..."

# 5. ڈیٹا کو بحال (Restore) کریں
Write-Host "`n4. بیک اپ ڈیٹا بحال کیا جا رہا ہے..." -ForegroundColor Yellow
if (Test-Path "$chromePath\$extID") {
    Remove-Item -Path "$chromePath\$extID\*" -Recurse -Force
    Copy-Item -Path "$backupPath\*" -Destination "$chromePath\$extID" -Recurse -Force
    Write-Host "ڈیٹا کامیابی کے ساتھ بحال ہو گیا ہے!" -ForegroundColor Green
    Write-Host "اب Chrome کھولیں اور OKX Wallet پر اپنا پاسورڈ لگا کر Seed Phrase محفوظ کریں۔" -ForegroundColor Green
} else {
    Write-Host "خرابی: بحالی کے لیے منزل کا فولڈر نہیں ملا۔" -ForegroundColor Red
}
