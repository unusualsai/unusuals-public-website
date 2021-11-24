rm -rf ./dist
mkdir dist

cp index.js dist/index.js
cp -R src dist/src

./node_modules/.bin/babel --presets @babel/preset-react --presets @babel/preset-env --plugins @babel/plugin-proposal-class-properties dist --out-dir dist
yarn build-storybook -o docs

cp -R docs dist/docs
cp package.json dist/package.json
cp components.json dist/components.json
cp gatsby-node.js dist/gatsby-node.js
cp cli.js dist/cli.js
cp next.config.js dist/next.config.js
cp webpack.config.js dist/webpack.config.js
cp -R .storybook dist/.storybook

yarn config set version-git-tag false
yarn publish dist --"$1"

yarn config set version-git-message "[skip ci] v%s"
yarn config set version-git-tag true
yarn version --"$1"