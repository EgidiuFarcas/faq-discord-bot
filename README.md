### FAQ Bot

## Usage

**Sick of replying to the same question again and again and again? FAQ Bot got your back.**

First you need to decide where you want the bot to reply (the bot needs to have read/send perms in the channels). If you want the bot to work in all the channels skip this part, otherwise:

> To add one or more channels use `f?channel add #mentionAtLeastOneChannel`

> To remove one or more channels use `f?channel rem #mentionAtLeastOneChannel`

> To see in which channels the bot works use `f?channel list`

Here's how to create a FAQ

Create the response:

`f?faq create [Response]`

After you create the response you'll get an ID.
Create the questions (special characters (,.?!) do matter):

`f?faq attach [FAQ_ID] question one`

`f?faq attach [FAQ_ID] question two`

That's all, now the bot will pickup the questions and auotmatically reply!



## Todo

Commands: 

- [X] Add Channel
- [X] Remove Channel
- [X] Add FAQ
- [X] List FAQs
- [X] List FAQ info
- [X] Remove FAQ
- [X] Add question to FAQ
- [X] Remove question from FAQ
- [X] Edit response to FAQ
- [X] Change Prefix
- [X] Help
- [X] List Channels
- [X] Look for FAQs