# TypeScript Handbook
A tutorial for learning TypeScript on VSCode

## Setup
1. Clone the repo
2. Open VSCode and install Code Runner
3. Go to `Settings > Run Code configuration > Executor Map` and click on **Edit in settings.json**
4. Search for `"code-runner.executorMap"` and go to the line that says `"typescript"` and replace the value with `"tsc $fileName && node $fileNameWithoutExt.js && rm $fileNameWithoutExt.js"`

## Reference
[The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
