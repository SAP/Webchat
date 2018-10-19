<div align="center">
  <img src="assets/header.png" />
</div>

# Recast.AI Webchat
| [Default Usage](#usage) | [Self-Hosted Installation](#self-hosted-webchat) | [Getting Started on Recast.AI]( #getting-started-with-recastai) | [License](#license) |
|---|---|---|---|
<div>
<a href="https://slack.recast.ai/">💬 Questions / Comments? Join the discussion on our community Slack channel!</a>
</div>

## What is a webchat?

The Recast.AI webchat let you **deploy a bot straight to a website**. It will be embed and available through a chat box on your pages.
The webchat is one of the many channels available on [Recast.AI](https://recast.ai), and end-to-end bot building platform.
This webchat is built using the [React](https://github.com/facebook/react) library, along with [Redux](https://github.com/reactjs/redux) for state managment.

<div align="center">
  <img src="assets/webchat-github.png" />
</div>

## Compatibility

This webchat is supported by all mobile and desktop browsers in their latest versions.
Internet Explorer support starts at version 9.0.

## Usage

Three different installations on the webchat module are possible.
- The default is the simplest and fatest route, and offers some customization options.
- The self-hosted webchat offers even more customization option, but you'll have to deal with the hosting and maintenance of the module.
- Use it as a React component

### Default webchat

To use the webchat, you need an account on [Recast.AI](https://recast.ai) and a bot.
Then, go to the **CONNECT** tab and click on **Webchat**. It will open a window that lets you adjust your webchat settings, including:
* color scheme,
* header customization,
* bot and user pictures,
* webchat logo and call to action,
* conversation duration

Once you're satisfied with the settings, click on the **SAVE** button. A script tag appears, and you just have to copy paste it in your web page to embed the webchat. The script must be placed in the `<body>` tag.

<div align="center">
  <img src="assets/webchat-600.gif" />
</div>


### Self-hosted webchat

If you want to customize your webchat even more, you can opt for a self-hosted installatiton. Just fork this project to get started!

#### Installation

Clone the repository you forked, and install the dependencies.

```
$> git clone YOUR_REPO_URL
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

#### Use your webchat

Once you're done, build it and host it.
To use it instead of the default one provided by Recast.AI, you need to set up the Webchat channel in the **CONNECT** tab of your bot.
You'll be using the same script as the default installation, but you have **to replace the src field by your own URL**.


```
<script
  src="YOUR_WEBCHAT_URL"
  ...
></script>
```

### React component
You can import the webchat as a React component like the following example:
``` js
import RecastWebchat from 'webchat';

export default class ReactWebchat extends Component {
  render() {
    return (
      <RecastWebchat
        onRef={ref => {
          this.webchat = ref;
        }}
        channelId={YOUR_CHANNEL_ID}
        token={YOUR_TOKEN}
        preferences={{
          accentColor: '#E05A47',
          complementaryColor: '#FFFFFF',
          botMessageColor: '#707070',
          botMessageBackgroundColor: '#F6F6F6',
          backgroundColor: '#FFFFFF',
          headerLogo: 'https://cdn.recast.ai/webchat/webchat-logo.svg',
          headerTitle: 'My awesome chatbot',
          botPicture: 'https://cdn.recast.ai/webchat/bot.png',
          userPicture: 'https://cdn.recast.ai/webchat/user.png',
          onboardingMessage: 'Come speak to me!',
          expanderLogo: 'https://cdn.recast.ai/webchat/webchat-logo.svg',
          expanderTitle: 'Click on me!',
          conversationTimeToLive: 24,
          openingType: 'never',
          welcomeMessage: 'Hello world !',
        }}
        getLastMessage={message => {
          console.log(message)
        }}
      />
    );
  }
}
```

#### Props
|Name|Type|Required|Description|
|---|---|---|--|
|onRef|function|false| Function which returns ref of the webchat|
|channelId|string|true|Channel id (you can get in Recast.ai)|
|token|string|true|Token (you can get in React.ai)|
|preferences|object|true| Object containing some settings|
|getLastMessage|function|false|Function which returns the last message sent by the webchat

#### Methods
You can access these methods by using the reference of the component (use `OnRef`)
```
<RecastWebchat
  onRef={ref => this.webchat = ref }
>
...

this.webchat.clearMessages();
```
|Name|Description|
|---|---|
|clearMessages()|Clear all messages in the webchat|



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
