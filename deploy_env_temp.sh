#!/bin/bash

readonly LARAVEL_APP_NAME=laravel-react-practice-app

declare -ar ENVIRONMENT_ARR=(
    "APP_NAME=laravel"
)

for environment_data in "${ENVIRONMENT_ARR[@]}"; do
  heroku config:set "${environment_data}" -a ${LARAVEL_APP_NAME}
done

# 書き換えて下さい
heroku config:set APP_KEY=[TODO] -a ${LARAVEL_APP_NAME}