#!/bin/bash
# SDN News auto-update script

echo "Starting update for SDN News portal..."
git add .
git commit -m "Auto-update: $(date)"
git push origin main
echo "SDN News portal successfully updated!"
