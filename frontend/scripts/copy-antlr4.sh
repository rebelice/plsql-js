#!/bin/sh

echo "copying antlr4 sources"

mkdir -p src/3rd-party/antlr4
cp -r node_modules/antlr4/src/antlr4/* src/3rd-party/antlr4/