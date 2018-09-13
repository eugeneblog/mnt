#!/usr/bin/env bash
cd build/production
ftp  -n<<!
open 192.168.1.88
user Administrator a5461789
cd Desktop
ls
cd program
ls
put program.tar.gz
close
bye

