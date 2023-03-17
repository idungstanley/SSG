#!/bin/bash
set -e

yarn ts:check
yarn lint:check
yarn format:check
yarn format:fix
yarn lint:fix