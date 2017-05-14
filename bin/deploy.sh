#!/usr/bin/env sh

BASE_DIR=$1
APP_SERVER=$JORNET_APP_SERVER

# stop all running jornet processes
ssh jornet@$APP_SERVER 'bash -s' < bin/stop-all.sh

# scp all necessary artifacts
scp -r $BASE_DIR/dist jornet@$APP_SERVER:/home/jornet/workspace/jornet
scp -r $BASE_DIR/src/assets/img jornet@$APP_SERVER:/home/jornet/workspace/jornet/dist/assets
scp -r $BASE_DIR/package.json jornet@$APP_SERVER:/home/jornet/workspace/jornet
scp -r $BASE_DIR/src/server jornet@$APP_SERVER:/home/jornet/workspace/jornet/src
scp -r $BASE_DIR/.babelrc jornet@$APP_SERVER:/home/jornet/workspace/jornet
scp -r $BASE_DIR/webpack.config.js jornet@$APP_SERVER:/home/jornet/workspace/jornet

# start jornet on app server
ssh jornet@$APP_SERVER 'bash -s' < bin/redeploy.sh
