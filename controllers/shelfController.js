const shelfController = (Shelf) => {
  const get = (req, res) => {
    var query = {};
    Shelf.find({})
      .populate('goods')
      .exec((err, shelfes) => {
        if (err) {
          res.status(404).error(err);
        }
        else res.json(shelfes);
    });
  }
  return {
    get: get,
  };
}
module.exports = shelfController;