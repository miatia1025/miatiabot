# これは何
index.jsと同じ階層に`.env`  
というファイルを設置して  
```
BOT_TOKEN = shiu41241251351531515jfyiyfcjrehyt873s4ycg

CLIENT_ID = 1091993549362430053
PUBLIC_KEY = 98eyrc8934ym29t8234ym821415121583x2yr98x3yn29r8

CHANNEL_ID = 2513817364861287562

GUILD_ID = 4124123536576735
GUILD_ID_NAN = 879651489375632

PINNING_EMOJI = 234567523523
PINNING_EMOJI_NAN = 569712386945

MIATIA = 3897491827410

```
みたいな感じに記述することで  
discordjsを使ってdiscordのbotが  
・BOT_TOKENで起動し  
・CLIENT_IDを使って仮アプリケーションコマンドを登録し
・GUILD_IDの鯖から全チャンネル、スレッド、トピックのIDを取得し  
・PINNIN_EMOJIまたはPINNING_EMOJI_NANで指定したリアクションがGUILD_IDまたはGUILD_ID_NANの鯖で付いたとき  
・DMでリアクションがつけられたメッセージをリアクションを付けた本人に飛ばす  

基本的にこれで出てくるbotのメッセージはbotのメッセージを呼び出した本人しか削除できないが  
`MIATIA = `のところにユーザーIDを入れるとそのユーザーはすべてのこのbotのメッセージを✕リアクションで削除できるようになる  

# 稼働に必要なこと  
`git clone https://github.com/miatia1025/miatiabot`  
`cd miatiabot`  
`npm install`  
  
前述の`.env`の各値を記入  
  
`node index`  
