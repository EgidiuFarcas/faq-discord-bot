### FAQ Bot

A Bot that auto-replies to FAQs with the ability to link multiple questions per answer.

## Usage

**Sick of replying to the same question again and again and again? FAQ Bot got your back.**

First you need to decide where you want the bot to reply (the bot needs to have read/send perms in the channels). If you want the bot to work in all the channels skip this part, otherwise:

> To add one or more channels use `f?channel add #mentionAtLeastOneChannel`

> To remove one or more channels use `f?channel rem #mentionAtLeastOneChannel`

> To see in which channels the bot works use `f?channel list`

**Here's how to create a FAQ**

Create the response:

`f?faq create [Response]`

After you create the response you'll get an ID.
Create the questions (special characters (,.?!) do matter):

`f?faq attach [FAQ_ID] question one`

`f?faq attach [FAQ_ID] question two`

You can also attach shortcuts that people can use in the channels to trigger the bot, here's how:

`f?faq shortcut [FAQ_ID] word`

`f?faq shortcut [FAQ_ID] word-two`

To use the shortcut just do:

`f?word`

That's all, now the bot will pickup the questions and auotmatically reply!