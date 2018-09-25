# Version 1.0.0 (Jun 21, 2018)

## Description

The first versioned release of the webchat.

Every breaking change, bug fix or improvement will be referenced here.

# Version 1.1.0 (Sept 08, 2018)

## Description

TL;DR: Improve the way buttons and quickReplies are handled by the webchat.

A button or a quickReply is composed of:

- a title, displayed in the webchat (ex: "Let's the show begin!")
- a value, sent to the Bot Connector when the button is clicked (ex: "RANDOM_BORING_INTERNAL_VALUE")

Previously, the value was sent as a text message, and appeared as such in the webchat as a reply from the user. This mean that when clicking on "Let's the show beging", a user message would appear in the webchat with the content "RANDOM_BORING_INTERNAL_VALUE".

Now, when clicking on a button, both the value and the title are sent. This way, the Bot Connector still receive the value, but the webchat can display the more user-friendly title.

# Version 1.1.1 (Sept 21, 2018)

## Description

Patch preventing the apparition of "null" in the webchat's input on Edge

## Version 1.2.0 (Sept 26, 2018)

Before version 1.2.0, the placeholder text displayed in the user's input was 'Write a reply'.  
In versions 1.2.0 and above, it's now configurable.  
Available as `userInputPlaceholder` (string) in the `preferences` object fetched via `getChannelPreferences()`.
