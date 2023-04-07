# これは何
index.jsと同じ階層に`.env`  
というファイルを設置して  
```
BOT_TOKEN = shiukfnweytbrc87yf9mx8myef98byew98rcjfyiyfcjrehyt873s4ycg
PUBLIC_KEY = 98eyrc8934ym29t8234ym8x9ry3m289wyr983x2yr98x3yn29r8
USER_TOKEN = MzY2ODE0NTA3Nzg1MjU2OTcw.G9ckgY.iyU5u7-Ziq7Eo0yduFpNCCQSBQU_jrn_ZmlbBQ

CHANNEL_ID = 2513817364861287562

GUILD_ID = 4124123536576735
GUILD_ID_NAN = 879651489375632

PINNING_EMOJI = 234567523523
PINNING_EMOJI_NAN = 569712386945
```
みたいな感じに記述することで  
discordjsを使ってdiscordのbotが  
・BOT_TOKENで起動し  
・GUILD_IDの鯖から全チャンネル、スレッド、トピックのIDを取得し
・PINNIN_EMOJIまたはPINNING_EMOJI_NANで指定したリアクションがGUILD_IDまたはGUILD_ID_NANの鯖で付いたとき  
・DMでリアクションがつけられたメッセージをリアクションを付けた本人に飛ばす  

# 稼働に必要なこと  
`git clone https://github.com/miatia1025/miatiabot`  
`cd miatiabot`  
`npm install`  
  
前述の`.env`の各値を記入  
  
`node index`  
