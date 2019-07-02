## Version 1.4.6 (July 2, 2019)

- Added markdown support using react-markdown npm library

## Version 1.4.5 (Jan 16, 2019)

Revert renaming className to be compatible with people who are overwritting the style.

## Version 1.4.4 (Jan 15, 2019)

- Use the new domain name https://cai.tools.sap

## Version 1.4.3 (Dec 19, 2018)

Improve bundle size
- reduce dist bundle size by 34% (551kb).
- reduce lib bundle size by 61% (527kb).

Fix input height for IE11.
Lodash dependency has been removed.

## Version 1.4.2 (Dec 18, 2018)

Revert by adding `react-slick` dependency temporary for IE11 compatibility.

## Version 1.4.1 (Dec 11, 2018)

Fix style of Slider for Quickreplies message when having not a lot items.

## Version 1.4.0 (Nov 28, 2018)

Action delay behavior has been added.
Bot memory is now available when using the script.
Fix eslint

## Version 1.3.0 (Nov 28, 2018)

The dependency `react-slick` has been removed. It was used for `carousel` and `quickreplies` messages. It is replaced by a component written ourself.

Feature action delay is now supported.

## Version 1.2.0 (Sept 26, 2018)

Before version 1.2.0, the placeholder text displayed in the user's input was 'Write a reply'.
In versions 1.2.0 and above, it's now configurable.
Available as `userInputPlaceholder` (string) in the `preferences` object fetched via `getChannelPreferences()`.

## Version 1.1.1 (Sept 21, 2018)

Patch preventing the apparition of "null" in the webchat's input on Edge

## Version 1.1.0 (Sept 08, 2018)

TL;DR: Improve the way buttons and quickReplies are handled by the webchat.

A button or a quickReply is composed of:

- a title, displayed in the webchat (ex: "Let's the show begin!")
- a value, sent to the Bot Connector when the button is clicked (ex: "RANDOM_BORING_INTERNAL_VALUE")

Previously, the value was sent as a text message, and appeared as such in the webchat as a reply from the user. This mean that when clicking on "Let's the show beging", a user message would appear in the webchat with the content "RANDOM_BORING_INTERNAL_VALUE".

Now, when clicking on a button, both the value and the title are sent. This way, the Bot Connector still receive the value, but the webchat can display the more user-friendly title.

## Version 1.0.0 (Jun 21, 2018)

The first versioned release of the webchat.

Every breaking change, bug fix or improvement will be referenced here.
