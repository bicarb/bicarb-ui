#!/usr/bin/env bash

# WARNING: This script only work for ubuntu 16.04
# It is not a good script, you should not trust it. :(
command -v apt > /dev/null 2>&1 || { echo >&2 "No command 'apt' found."; exit 1; }

workDir="/usr/local/bicarb"
user="bicarb"

if ! id -u ${user} > /dev/null 2>&1; then
  adduser --home ${workDir} --shell /bin/false --no-create-home --disabled-password --disabled-login bicarb
fi

if [[ ! -d "${workDir}" ]]; then
  mkdir ${workDir}
  chown -R bicarb:bicarb ${workDir}
fi

function initNodeJs() {
  if type -p node; then
    echo "[node][skip]found node executable in PATH"
  else
    echo "[node]install node"
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    sudo apt update && sudo apt install -y nodejs
  fi
}

function initYarn() {
  if type -p yarn; then
    echo "[yarn][skip]found yarn executable in PATH"
  else
    echo "[node]install node"
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt update && sudo apt install -y yarn
  fi
}

function initUI() {
  type -p git || apt install git
  cd ${workDir}

  if [[ ! -d "public" ]]; then
    mkdir public
  fi

  if [[ ! -d "bicarb-ui" ]]; then
    git clone https://github.com/bicarb/bicarb-ui.git
    cd bicarb-ui
    yarn
  else
    cd bicarb-ui
    git pull
  fi

  yarn build

  rm -R ../public/static/
  cp -a build/. ../public/
  cd ../
  mv public/index.html templates/index.html
  chown -R bicarb:bicarb public

  cd ${workDir}
}

# start init
initNodeJs
initYarn
initUI
