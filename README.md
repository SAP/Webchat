# Webchat

You can use this webchat to talk with your bot created on [Recast.AI](https://recast.ai).

## Usage

To use this webchat, you first need to create a **Webchat** channel on [Recast.AI](https://recast.ai).
Go on your bot, in the **Connect** tab, and click on **Webchat**. A modal where you can modify your preferences opens.
You can set the colors of the webchat, the icons used, the onboarding message and much more.

Once you're satisfied with the settings, click on the **SAVE** button. A script tag appears, and you just have to copy paste it
in your web page to embed the webchat.

```
<script
  src="https://cdn.recast.ai/webchat/webchat.js"
  channelId="YOUR_CHANNEL_ID"
  token="YOUR_CHANNEL_TOKEN"
  id="recast-webchat"
></script>
```

However, if you want to customize the webchat in more details, you can fork this project! Once you're done, build it,
host it, and modify the *src* field of the script.


