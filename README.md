# React Native (Expo) Mobile UI + Node.js (Express) Backend Demo

## Start Development

Start server.

```
cd server
npm i 
npm run dev
```

Start client.

``` 
cd client
npm i
npx expo start
```

## [ONE-TIME] Initialize Project

<details>
<summary> Initialize server. </summary>

```
cd server

npm init

npm i --save-dev typescript
npx tsc --init

npm i express cors body-parser
npm i --save-dev @types/express @types/cors @types/body-parser

npm i --save-dev nodemon ts-node @types/node

mkdir -p src
vi package.json
vi tsconfig.json
```
</details>

<details>
<summary> Install watchman for iOS simulator. </summary>

Watchman is a tool for watching changes in the filesystem. Installing it will result in better performance. Read more: https://docs.expo.dev/workflow/ios-simulator/

``` 
brew update
brew install watchman
```

</details>

<details>
<summary> Initialize client. </summary>

```
npx create-expo-app@latest client

cd client
npx expo start

npm run reset-project 
rm -rf app-example
```
</details>

