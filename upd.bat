@echo off
git add .
git commit -m "your local changes"
git pull origin main --ff-only
git push origin main

pause