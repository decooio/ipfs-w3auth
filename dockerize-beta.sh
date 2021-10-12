#!/bin/bash

IMAGEID="ghcr.io/decooio/ipfs-w3auth-beta:latest"
echo "Building ghcr.io/decooio/ipfs-w3auth-beta:latest ..."
docker build -t $IMAGEID .
