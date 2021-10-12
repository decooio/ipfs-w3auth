#!/bin/bash

IMAGEID="decooio/ipfs-w3auth-beta:latest"
echo "Building decooio/ipfs-w3auth-beta:latest ..."
docker build -t $IMAGEID .
