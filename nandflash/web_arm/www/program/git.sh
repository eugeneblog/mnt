#!/usr/bin/env bash

read -p "input a val:"  val
sh run.sh
echo $val
git add .
git commit -m $val
git push origin master

