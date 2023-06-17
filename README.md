<h1 align="center">Stable Diffusion Discord Bot</h1>

<p align="center">
<img width="400px" src="https://github.com/itskdhere/Stable-Diffusion-Discord-Bot/blob/main/screenshots/ss-imagine-0.png" >
<img width="420px" src="https://github.com/itskdhere/Stable-Diffusion-Discord-Bot/blob/main/screenshots/ss-imagine-1.png" >
</p>
<h4 align="center"><a href="https://github.com/itskdhere/Stable-Diffusion-Discord-Bot/tree/main/screenshots">More ScreenShots 📸</a></h4>
<hr>
<p align="center">
<a href="https://redirect.itskdhere.workers.dev/server/support/invite" target="_blank" title="Join Support Server"><img alt="Discord" src="https://img.shields.io/discord/917792741054894131?color=%235865F2&label=Chat&logo=discord&logoColor=%23FFFFFF&style=for-the-badge"></a>
</p>

Generate Images From A Text Prompt Using Various Stable Diffusion Models Right Inside Discord Chat 😀

Only Host The Bot, No Need Self-Host Any Resource Consuming Models 😉

# 📰 Available Models:
- (4 Images) Stable Diffusion v1.4
- (4 Images) Stable Diffusion v2.1
- (1 Image) Stable Diffusion v1.4
- (1 Image) Stable Diffusion v2.0
- (1 Image) Stable Diffusion v2.1
- (1 Image) Stable Diffusion v2.1 Base

# 🌠 Slash Commands:

- `/imagine` - Generate Image From Text Prompt
    - `prompt` - Text Prompt
    - `negative_prompt` - Negative Text Prompt
    <!-- - `model` - Select Model (comming soon) -->

- `/settings` - View or Change Settings
    - `model` - Select Default Model
    - `guidance_scale` - Set Default Guidance Scale

- `/ping` - Check Websocket Heartbeat && Roundtrip Latency

- `/help` - Show Help Message



# 🥏 Self-Hosting Guide:
> You Can Either Use The [Dockerized Setup](https://github.com/itskdhere/Stable-Diffusion-Discord-Bot#-dockerized-setup) Or Use [Non-Dockerized Setup](https://github.com/itskdhere/Stable-Diffusion-Discord-Bot#-non-dockerized-setup) 🙃

## 🐳 Dockerized Setup:
### 🧾 Requirements:
<li>
<a href="https://docs.docker.com/engine/install/" target="_blank">Docker</a>    
</li>
<li>
<a href="https://docs.docker.com/compose/install/" target="_blank">Docker-Compose</a>
</li>
<li>
Atleast 1vCPU , 0.5GB RAM & 1GB Storage For The Bot.    
</li>

### 📝 Steps:

0. **Create A Discord Bot:**

Create A Discord Bot From [Discord Developer Portal](https://discord.com/developers/applications). Keep The Client ID and Bot Token Handy. Add It To Your Server With Sample Invite URL Replacing `BOT_CLIENT_ID` With Bot's Client ID
```
https://discord.com/api/oauth2/authorize?client_id=BOT_CLIENT_ID&permissions=414464724032&scope=applications.commands%20bot
```

1. **Clone This Repo:**
```bash
git clone https://github.com/itskdhere/Stable-Diffusion-Discord-Bot
```

2. **Create `.env` File In Root Directory:**
```bash
cp .env.example .env
```

3. **Fill `.env` File With Required Values:**
```bash
vim .env
```

4. **Start The Bot In Production Mode:**
```bash
docker-compose up -d
```
> Learn More About Docker [Here](https://docs.docker.com/) & Docker-Compose [Here](https://docs.docker.com/compose/)

5. Use The Bot 🎉


## 🟢 Non-Dockerized Setup:
### 🧾 Requirements:
<li>
<a href="https://git-scm.com/" target="_blank">Git</a>
</li>
<li>
<a href="https://nodejs.org/" target="_blank">Node.js v18</a>
</li>
<li>
Atleast 1vCPU , 0.5GB RAM & 1GB Storage For The Bot.
</li>

### 📝 Steps:

0. **Create A Discord Bot:**

Create A Discord Bot From <a href="https://discord.com/developers/applications" target="_blank">Discord Developer Portal</a>. Keep The Client ID and Bot Token Handy. Add It To Your Server With Sample Invite URL Replacing `BOT_CLIENT_ID` With Bot's Client ID
```
https://discord.com/api/oauth2/authorize?client_id=BOT_CLIENT_ID&permissions=414464724032&scope=applications.commands%20bot
```

1. **Clone This Repo:**
```bash
git clone https://github.com/itskdhere/Stable-Diffusion-Discord-Bot
```

2. **Navigate To The Repo Directory:**
```bash
cd Stable-Diffusion-Discord-Bot
```

3. **Install Dependencies:**
```bash
npm install
```

4. **Create `.env` File In Root Directory:**
```bash
cp .env.example .env
```

5. **Fill `.env` File With Required Variables:**

Use Your Favourite GUI Text Editor To Edit The File or If You've No Access To GUI Text Editor, Use Nano:
```bash
nano .env
```

6. **Start The Bot:**
```bash
npm run start
```
***Or,*** **If You Want To Run The Bot In Production Mode:**
```bash
npm install pm2 -g
```
```bash
npm run prod
```
> Learn More About PM2 [Here](https://pm2.keymetrics.io/docs/usage/quick-start/)

7. Use The Bot 🎉

# 💬 Support:
- [Join Discord Server](https://redirect.itskdhere.workers.dev/server/support/invite)

- [Open New Issue](https://github.com/itskdhere/Stable-Diffusion-Discord-Bot/issues/new/choose)

# ⛓ Others:
- 📚 License: [MIT](https://github.com/itskdhere/Stable-Diffusion-Discord-Bot/blob/main/LICENSE)
- 💫 Stable Diffusion: [stability.ai](https://stability.ai/)
- 🤗 HuggingFace: [huggingface.co](https://huggingface.co/)


<p align="center">🙂</p>
