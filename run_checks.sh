#!/bin/bash
set -e

yarn ts:check
yarn eslint .
yarn format:check
yarn format:fix
# yarn lint:fix