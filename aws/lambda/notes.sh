#!/usr/bin/env bash

function_name=example-handler

# List all functions
aws lambda list-functions

# Get configuration information for function
aws lambda get-function --function-name ${function_name}


# Download zip file for a particular function
get_function_by_name() {
  [[ $# != 1 ]] && echo "Wrong Arity" && return 1
  function_name=aws lambda get-function --function-name ${function_name} | \
	python3 -c 'import json, sys; print(json.loads(sys.stdin.read())["Code"]["Location"])'
  echo ${function_name}
}

# Download and unzip a function
download_function() {
  local output_file=example-handler.zip
  curl $(get_function_by_name) >> ${output_file}
  unzip ${output_file}
}

push_function() {
  local zip_file=example-handler.zip
  local handler_file=lambda_function.py
  zip ${zip_file} ${handler_file}
  aws lambda update-function-code \
	--function-name ${function_name} \
	--zip-file fileb://${PWD}/${zip_file}
}

