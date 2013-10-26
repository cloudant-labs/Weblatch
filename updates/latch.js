function(doc, req) {
  if (!doc) {
    if ('id' in req) {
      new_doc = JSON.parse(req.body);
      new_doc['_id'] = req['id'];
      // [document to store, message to display in the response]
      return [new_doc, 'Empty Body.'];
    }
    // TODO: open this wider? We can certainly handle non-id including requests
    // but do we want to? Knowing the ID in the other system is super handy.
    return [null, 'No ID specified. Send me something meaningful next time.'];
  }
  // TODO: handle document updates? Most Webhooks are "appends"
  return [doc, 'A document already exists. No updates made.'];
}
