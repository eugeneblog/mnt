#!/usr/bin/env bash
rm -rf resources/devsinfo
rm -rf resources/devxml
cp -R devsinfo/ resources/devsinfo
cp -R devxml/ resources/devxml

chmod -R 777 *
rm -rf build
sencha app build
cp active.json build/production/program
cp log.text build/production/program
chmod -R 777 *
cd build/production
rm -rf modern
rm -rf program/resources/font-awesome/
rm -rf program/resources/fonts/
rm -rf program/modern
tar czvf program.tar.gz program

#/Users/liuzhencai/bin/Sencha/Cmd/6.1.3.42/sencha app build testing
