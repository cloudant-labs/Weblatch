/**
 * http://docs.couchdb.org/en/latest/couchapp/ddocs.html#update-functions
 *
 * `doc` is the existing document in the database
 * `req` http://docs.couchdb.org/en/latest/json-structure.html#request-object
 **/
function(doc, req) {
  var new_doc = {};

  if (doc !== null) {
    // The "callback" nature of Webhooks lends more toward "appending" than
    // overwriting, so we're going to prevent that this time around.
    return [doc, 'A document already exists. No updates made.'];
  } else {
    // This section, more than any area will change based on the Webhook being
    // used with Weblatch.
    // This first section handles Github's particular way of sending Webhooks.
    if ('form' in req && 'payload' in req.form) {
      // Github-style Webhook...with URI encoded payload...
      new_doc = JSON.parse(decodeURIComponent(req.form.payload));
    } else {
      // The `req.body` key contains anything that came in the body of the HTTP
      // request. Let's see if it's JSON first, and if it is, make that our
      // new document.
      try {
        new_doc = JSON.parse(req.body);
      } catch(e) {
        // If it's not, we still want to know what came in via the Webhook.
        new_doc['body'] = req.body;
      }
    }
    // Now we need to either use the requested `id` or a generated `uuid`.
    new_doc['_id'] = req.id || req.uuid;
    // However! If we make it here, we save the document and return a useful
    // message (for anyone that may be watching (likely just robots...).
    return [new_doc, 'Document ' + new_doc['_id'] + ' stored successfully!'];
    // Now check your database contents.
  }
}
