# Weblatch

[Connect your Webhooks to Weblatch](https://cloudant.com/blog/weblatch-connect-your-webhooks/)

## Installation

0. [Sign-up for a Cloudant account](http://cloudant.com/sign-up/)
1. Create a `weblatch` database in your new account.
2. `git clone` this repo
3. `cd` into that directory
4. `couchapp push . http://{user}:{pass}@{your}.cloudant.com/weblatch`
  * you can also do `erica push . {url}` if you'd prefer.
5. Verify that Weblatch is installed by visiting your Cloudant Dashboard.

## Webhook Setup

Set your Webhook to `POST` to...

    http://{your}.cloudant.com/weblatch/_design/weblatch/_update/latch

If the body of your POST request is JSON and includes and `_id` field, the new
document will use that `_id` field for its value. If it does not include an
`_id` field, then Cloudant will generate a UUID.

Alternatively, you can use `PUT` like so...

    http://{your}.cloudant.com/weblatch/_design/weblatch/_update/latch/{doc_id}

Where `doc_id` is your preferred document ID (aka, `doc._id`). Depending on the
system you're using, PUT may be easier to setup than POST as the sender does
not need to include an `_id` key--the `latch` update handler will do that.

## License

[Apache License 2.0](http://choosealicense.com/licenses/apache)
