const Shelf = require('../models/index').Shelf;
const async = require('async');

const getShelfById = shelfId => new Promise((resolve, reject) => {
  Shelf.findById(shelfId, (err, shelf) => {
    if (err) {
      reject(err);
    }
    else resolve(shelf);
  });
});

const updateShelvesArray = shelves => new Promise((resolve, reject) => {
  const tasks = shelves.map(shelve => callback => {
    if (shelve._id !== undefined && Number(shelve._id) !== -1) { // shelve should be updated
      updateShelf(shelve).then(
        shelveUpdated => callback(null, shelveUpdated),
        error => callback(null)
      );
    }
    else { // else shelve shoudl be created
      createShelf(shelve).then(
        shelfCreated => callback(null, shelfCreated),
        error => callback(null),
      );
    }
  });
  async.parallel(tasks, (err, result) => {
    if (err) {
      reject(err);
    }
    else resolve(result);
  })
});

const createShelf = data => new Promise((resolve, reject) => {
  const { coor, rad, height, width } = data;
  if (Array.isArray(coor) && coor.length == 2) {
    if (rad === undefined || height === undefined || width === undefined) {
      reject('One of rad, height, width property is not allow missing');
    }
    let shelf = new Shelf({
      coor,
      rad,
      height,
      width,
      goods: []
    });
    shelf.save(err => {
      if (err) {
        reject(err);
      }
      else resolve(shelf);
    })
  }
  else {
    reject('Coor required array have two number');
  }
  
  
});
const updateShelf = data => new Promise((resolve, reject) => {
  getShelfById(data._id).then(
    shelf => {
      if (!shelf) {
        reject('Shelf is not found');
        return;
      }
      const { coor, rad, height, width } = data;
      if (Array.isArray(coor) && coor.length === 2) {
        shelf.coor = coor;
      } 
      if (rad !== undefined) {
        shelf.rad = rad;
      }
      if (height !== undefined) {
        shelf.height = height;
      }
      if (width !== undefined) {
        shelf.width = width;
      }
      shelf.save(err => {
        if (err) {
          reject(err);
        }
        else resolve(shelf);
      }); 
    },
    err => {
      reject(err);
    }
  )
});



const shelfController = () => {

  const get = (req, res) => {
    const query = {};
    Shelf.find({})
      .populate('goods')
      .exec((err, shelfes) => {
        if (err) {
          res.status(404).send(err);
        } else res.json(shelfes);
      });
  };
  const getById = (req, res) => {
    res.json(req.shelf);
  };
  const put = (req, res) => {
    const { body } = req;
    const { coor, rad, height, width } = body;
    if (req.shelf.goods.length === 0) {
      if (coor !== undefined && Array.isArray(coor) && coor.length === 2) {
        req.shelf.coor = coor;
      }
      if (rad !== undefined) {
        req.shelf.rad = rad;
      }
      if (height !== undefined) {
        req.shelf.height = height;
      }
      if (width !== undefined) {
        req.shelf.width = width;
      }
      req.shelf.save((err) => {
        if (err) {
          res.status(404);
        } else res.json(req.shelf);
      });
    }
    res.status(404).send('Shelf have goods can not update');
  };

  const updateShelves = (req, res) => {
    const { shelves } = req.body;
    if (Array.isArray(shelves) && shelves.length > 0) {
      updateShelvesArray(shelves).then(
        result => {
          res.json({ success: true});
        },
        error => {
          res.status(500).send(error);
        }
      )
    }
    else res.status(404).send('No found any shelve in your request payload !');

  }
  return {
    get,
    getById,
    put,
    updateShelves,
  };
};
module.exports = shelfController;
