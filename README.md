| [Default Usage](#usage) | [Self-Hosted Installation](#self-hosted-webchat) | [Getting Started on Recast.AI]( #getting-started-with-recastai) | [License](#license) |
|---|---|---|---|

**[ :speech_balloon: Questions / Comments? Join the discussion on our community Slack channel!](https://slack.recast.ai/)**

# What is Webchat?

Webchat let you **deploy a bot straight to a website**. It will be embed and available through a chat box on your pages.
Webchat is one of the many channels available on [Recast.AI](https://recast.ai), and end-to-end bot building platform.
This webchat is built using the [React](https://github.com/facebook/react) library, along with [Redux](https://github.com/reactjs/redux) for state managment.

<div align="center">
  <img src="assets/webchat-github.png" />
</div>

## Compatibility

Webchat is supported by all mobile and desktop browsers in their latest versions.
Internet Explorer support starts at version 9.0.

## Usage

Two different installations on the webchat module are possible.
- The default is the simplest and fatest route, and offers some customization options.
- The self-hosted webchat offers even more customization option, but you'll have to deal with the hosting and maintenance of the module.

### Default webchat

To use the webchat, you need an account on [Recast.AI](https://recast.ai) and a bot.
Then, go to the **Connect** tab and click on **Webchat**. It will open a window that lets you adjust your webchat settings, including: 
* color scheme, 
* header customization, 
* bot and user pictures, 
* webchat logo and call to action,  
* conversation duration

Once you're satisfied with the settings, click on the **SAVE** button. A script tag appears, and you just have to copy paste it in your web page to embed the webchat. The script must be placed in the `<body>` tag.

<div align="center">
  <img src="https://cdn.recast.ai/webchat/webchat.gif" />
</div>

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

## Getting started with Recast.AI

We build products to help enterprises and developers have a better understanding of user inputs.

-   **NLP API**: a unique API for text processing, and augmented training.
-   **Bot Building Tools**: all you need to create smart bots powered by Recast.AI's NLP API. Design even the most complex conversation flow, use all rich messaging formats and connect to external APIs and services.
-   **Bot Connector API**: standardizes the messaging format across all channels, letting you connect your bots to any channel in minutes.

Learn more about:

| [API Documentation](https://recast.ai/docs/api-reference/) | [Discover the platform](https://recast.ai/docs/create-your-bot) | [First bot tutorial](https://recast.ai/blog/build-your-first-bot-with-recast-ai/) | [Advanced NodeJS tutorial](https://recast.ai/blog/nodejs-chatbot-movie-bot/) | [Advanced Python tutorial](https://recast.ai/blog/python-cryptobot/) |
|---|---|---|---|---|

## License

Copyright (c) [2016] Recast.AI

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
