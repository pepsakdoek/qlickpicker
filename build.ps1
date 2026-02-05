# 1. Delete the existing bundle if it exists
if (Test-Path "./qlikpickerviz.js") { Remove-Item "./qlikpickerviz.js" }

# 2. Concatenate files in order
# We use -Raw to ensure no extra newlines are injected between files
$files = @(
    "./dscc.min.js",
    "./main.js"
)

Get-Content $files -Raw | Out-File -FilePath "./qlikpickerviz.js" -Encoding utf8

Write-Host "Build Complete: qlikpickerviz.js created in root." -ForegroundColor Green
