#!/bin/bash
# Build and package for itch.io upload
# Requires: python build.py to be run first
# Upload dist/ledger-of-ash-itchio.zip to itch.io manually or via butler

set -e

OUTFILE="dist/ledger-of-ash-itchio.zip"

echo "Building..."
python build.py

echo "Packaging for itch.io..."
cd dist
cp ledger-of-ash.html index.html
zip -j "$OLDPWD/$OUTFILE" index.html
cd ..
rm dist/index.html

echo "Package ready: $OUTFILE"
echo "Upload to itch.io: https://itch.io/dashboard (or use butler push)"
