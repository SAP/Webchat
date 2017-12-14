![Bot Connector Logo](https://cdn.recast.ai/bot-connector/bot-connector-logo.png)

| [Usage](#usage) | [Installation](#installation) | [License](#license) | [NLP API Documentation](https://recast.ai/docs/api-reference/) | [Contribute](https://github.com/RecastAI/Recast.AI/blob/master/README.md#contribute-or-create-new-sdks-for-our-api) | [Service Status](https://status.recast.ai/)
|---|---|---|---|---|---|

**[ :speech_balloon: Questions / Comments? Join the discussion on our community Slack channel!](https://slack.recast.ai/)**

# What is Webchat?

With webchat, you can deploy a bot straight to a website. It will be embed and available through a chat box on your pages.
Webchat is one of the many channels available on [Recast.AI](https://recast.ai), and end-to-end bot building platform.
This webchat is built using the [React](https://github.com/facebook/react) library, along with [Redux](https://github.com/reactjs/redux) for state managment.

![Webchat screenshot](https://cdn.recast.ai/webchat/webchat-github.png)

## Usage

Two different installations on the webchat module are possible.
- The default is the simplest and fatest route, and offers some customization options.
- The self-hosted webchat offers even more customization option, but you'll have to deal with the hosting and maintenance of the module.

### Default webchat

To use the webchat, you need an account on [Recast.AI](https://recast.ai) and a bot.
Then, go to the **Connect** tab and click on **Webchat**. It will open a window that lets you adjust your webchat settings, including: color scheme, header customization, bot and user pictures, webchat logo and call to action, and conversation duration.

Once you're satisfied with the settings, click on the **SAVE** button. A script tag appears, and you just have to copy paste it
in your web page to embed the webchat.

```
<script>
  src="https://cdn.recast.ai/webchat/webchat.js"
  channelId="YOUR_CHANNEL_ID"
  token="YOUR_CHANNEL_TOKEN"
  id="recast-webchat"
</script>
```

However, if you want to customize the webchat in more details, you can fork this project!

### Self-hosted webchat

Once you're done, build it, host it, and modify the *src* field of the script.

#### Installation

Clone the repository and install the dependencies.

```
$> git clone GITHUB_URL
$> cd webchat
$> npm install
```

#### Run in development mode

```
$> npm run start
```

#### Eslint + prettier

```
$> npm run prettier
```

#### Build for production

```
$> npm run build
```

## License

Copyright (c) [2016] Recast.AI

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
