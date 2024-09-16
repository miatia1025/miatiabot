# もくじ

- はじめに
- 使い方
- その他
- スラッシュコマンド追加
- 挙動追加

## はじめに

miatiabot は discord の汎用 bot です  
旧 miatiabot をちょっとメンテナンスしやすくしたものともいう  
index.js に千行詰め込んだあの頃が懐かしい

## 前準備

- Nodejs のインストール
- VSCode のインストール
- Bot の準備

## 初回起動

1.  git clone でリポジトリをローカルにコピー  
    `git clone https://github.com/miatia1025/miatiabot`

2.  cd でカレントディレクトリをリポジトリに移動  
    `cd ./miatiadev`

3.  npm run bot で bot 起動  
    `npm run bot`

4.  おわり。余った時間でラーメンでも食べよ

## スラッシュコマンド追加

bot/commands/commands.js  
bot/reacts/reacts.js  
bot/constants.js  
を編集

## 挙動追加

そのうち
