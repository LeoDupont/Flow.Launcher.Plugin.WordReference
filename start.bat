@echo off
SET plugin_dir=%~dp0%
SET icon=%plugin_dir%images\favicon-32x32.png
:: JSON doesn't like backslashes so we convert them to forward slashes
SET "icon=%icon:\=/%"
SET title="Error: Node.js is not installed on your system."
SET subtitle="Please install node.js to use the WordReference Plugin!"
%@Try%
  node %plugin_dir%/src/main.js %*
%@EndTry%
:@Catch
  echo {"result": [{"Title": %title%, "Subtitle": %subtitle%, "IcoPath": "%icon%"}]}
:@EndCatch
