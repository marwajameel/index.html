# =================================================================
# 1. Administrator Check (ایڈمنسٹریٹر کی تصدیق)
# =================================================================
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "براہ کرم اس اسکرپٹ کو Run as Administrator کے طور پر چلائیں۔" -ForegroundColor Red
    exit
}

Clear-Host
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "      سسٹم اپ ڈیٹ اور OKX Wallet فکسنگ ٹول       " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# =================================================================
# 2. Windows and Software Updates (سسٹم اور ایپلیکیشنز کی اپ ڈیٹ)
# =================================================================
Write-Host "`n[1/2] تمام انسٹال شدہ سافٹ وئیرز اور ایپلیکیشنز اپ ڈیٹ کی جا رہی ہیں..." -ForegroundColor Yellow

if (Get-Command winget -ErrorAction SilentlyContinue) {
    winget upgrade --all --include-unknown --accept-package-agreements --accept-source-agreements
    Write-Host "تمام سافٹ ویئر کامیابی کے ساتھ اپ ڈیٹ ہو گئے ہیں۔" -ForegroundColor Green
} else {
    Write-Host "Winget دستیاب نہیں ہے۔ براہ کرم Windows App Installer اپ ڈیٹ کریں۔" -ForegroundColor Red
}

# =================================================================
# 3. OKX Wallet Corrupted Extension Fix (او کے ایکس والیٹ فکس)
# =================================================================
Write-Host "`n[2/2] OKX Wallet کے ڈیٹا کا بیک اپ اور فکسنگ پروسیس..." -ForegroundColor Yellow

$extID = "mcohilncbfahbmgdjkbpemcciiolgcge"
$chromePath = "$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Local Extension Settings"
$backupPath = "$env:USERPROFILE\Desktop\OKX_Wallet_Backup"

if (Test-Path "$chromePath\$extID") {
    # بیک اپ بنانا
    New-Item -ItemType Directory -Force -Path $backupPath | Out-Null
    Copy-Item -Path "$chromePath\$extID\*" -Destination $backupPath -Recurse -Force
    Write-Host "بیک اپ آپ کے Desktop پر 'OKX_Wallet_Backup' کے نام سے محفوظ کر لیا گیا ہے۔" -ForegroundColor Green

    Write-Host "`n--------------------------------------------------" -ForegroundColor Cyan
    Write-Host "ہداہت:" -ForegroundColor Yellow
    Write-Host "1. اپنے Chrome براؤزر میں chrome://extensions/ پر جائیں۔" -ForegroundColor White
    Write-Host "2. OKX Wallet ایکسٹینشن کے پاس 'Repair' پر کلک کریں۔" -ForegroundColor White
    Write-Host "3. ریپئر کرنے کے بعد Google Chrome کو مکمل بند (Close) کر دیں۔" -ForegroundColor White
    Write-Host "--------------------------------------------------" -ForegroundColor Cyan

    Read-Host "جب آپ Chrome بند کر لیں، تو ڈیٹا بحال کرنے کے لیے Enter دبائیں..."

    # ڈیٹا بحال کرنا
    Write-Host "`nبیک اپ ڈیٹا بحال (Restore) کیا جا رہا ہے..." -ForegroundColor Yellow
    if (Test-Path "$chromePath\$extID") {
        Remove-Item -Path "$chromePath\$extID\*" -Recurse -Force
        Copy-Item -Path "$backupPath\*" -Destination "$chromePath\$extID" -Recurse -Force
        Write-Host "OKX Wallet کا ڈیٹا کامیابی کے ساتھ بحال ہو گیا ہے!" -ForegroundColor Green
        Write-Host "اب Chrome کھولیں اور OKX Wallet پر اپنا پاسورڈ لگا کر Seed Phrase فوری محفوظ کر لیں۔" -ForegroundColor Green
    } else {
        Write-Host "خرابی: بحالی کے لیے منزل کا فولڈر نہیں ملا۔" -ForegroundColor Red
    }
} else {
    Write-Host "OKX Wallet کی ایکسٹینشن ڈائریکٹری نہیں ملی۔ اگر یہ انسٹال نہیں ہے تو اس مرحلے کو چھوڑ دیا گیا ہے۔" -ForegroundColor Red
}

Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host "              تمام پروسیس مکمل ہو گیا!             " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
