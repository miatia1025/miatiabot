# これは何
index.jsと同じ階層に`.env`  
というファイルを設置して  
```
PUBLIC_KEY = 98eyrc8934ym29t8234ym8x9ry3m289wyr983x2yr98x3yn29r8
BOT_TOKEN = shiukfnweytbrc87yf9mx8myef98byew98rcjfyiyfcjrehyt873s4ycg
CHANNEL_ID = 2513817364861287562
GUILD_ID = 4124123536576735

PINNING_EMOJI = 234567523523
```
みたいな感じに記述することで  
discordjsを使ってdiscordのbotが  
・BOT_TOKENで起動し  
・PINNIN_EMOJIで指定したリアクションが付いたとき  
・GUILD_IDとCHANNEL_IDで指定したところに  
リアクションを付けたメッセージが飛んでくる  
