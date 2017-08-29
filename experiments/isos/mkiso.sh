#!/bin/bash

# Convert flash drive into linux iso

# List available disks. HDD is listed as /dev/disk0
# and external drives are listed as /dev/diskN
diskutil list

# Convert iso indo dmg
# hdiutil convert -format UDRW -o destino.img origen.iso

# Unmount disk
diskutil unmountDisk /dev/diskN

# Write iso to disk.
# Mac external mounts are prefixed with "r"'s?
sudo dd if=destino.img.dmg of=/dev/rdiskN bs=1m

# Eject disk
diskutil eject /dev/diskN


