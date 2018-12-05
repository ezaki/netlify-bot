# Netlify Bot

## 概要
Netlify Bot は Netlify のデプロイをコントロールするための
Slack Bot です

## 使用方法

### Slack へのデプロイ
以下の URL より、 Slack へ Slash Command を追加します。
https://slack.com/apps/A0F82E8CA-slash-commands

`Add Configuration` ボタンをクリックし、
`Choose a Command` へ `/deploy` と入力し、 `Add Slash Command Integration` をクリックします。

![image](https://user-images.githubusercontent.com/13980441/49519141-aa1b9880-f8e3-11e8-83b0-40b95b323ce6.png)

Integration Settings 内の URL は後ほど設定します。
また、 Token についても後ほど使用します。

![image](https://user-images.githubusercontent.com/13980441/49519326-15fe0100-f8e4-11e8-8806-ee3e168e9c23.png)

### Heroku へのデプロイ

以下のボタンよりデプロイできます

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/ezaki/netlify-bot)

画面中以下の項目を記入します

- `App name`: 任意のアプリ名
- `BUILD_WEBHOOK`: Netlify の `Build & deploy` ページから生成された `Build hooks` の URL
- `TOKEN`: 先ほど作成した Slack の Token

![image](https://user-images.githubusercontent.com/13980441/49519691-f0252c00-f8e4-11e8-94af-aa9fe4c506e6.png)
![image](https://user-images.githubusercontent.com/13980441/49519609-b94f1600-f8e4-11e8-91a1-f918827d2804.png)

`Deploy app` を押してアプリのデプロイを実施します

アプリがデプロイできたら `Manage App` から設定画面を開き、
Installed add-ons の `Heroku Scheduler` を選択します

Add new job を選択し、以下の設定をします

- `DYNO SIZE`: Free
- `FREQUENCY`: Every 10 minutes

一番上のコマンド入力部に以下のコマンドをペーストします
(URL 部分は Netlify の Build webhook のものに差し替える)

```
node src/index.js
```


![2018-12-05 23 49 26](https://user-images.githubusercontent.com/13980441/49521273-70995c00-f8e8-11e8-9e6d-8b25034783e0.png)

`Save` をクリックして、設定を保存します

## Slack への URL の設定
Heroku のデプロイしたアプリの URL を控えます
(https://(アプリ名).herokuapp.com になります)

Slack の Integration Settings に戻り、 URL に以下を指定して保存します

```
https://(アプリ名).herokuapp.com/deploy
```

以上で設定は完了です。

## 使い方

Slack の適当なチャンネルから `/deploy` と入力することでデプロイが実施されます。
また、10 分に 1 回自動的にデプロイが実施されます。
