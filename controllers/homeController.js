const async = require('async');
const _ = require('underscore');
const fs = require('fs');
var Apriori = require('../libs/apriori');

const { Transaction } = require('../models/index');
const TRANSACTION_FILE_PATH = 'transactions.csv';
const MIN_SUPP = 0.3;
const MIN_CONF = 0.6;


const convertToCSVString = (trans) => {
  let csvStringResult = '';
  trans.forEach((tran, index) => {
    csvStringResult += `${tran.join(',')}\n`;
  }); 
  return csvStringResult;
};

const homeController = () => {
  const get = (req, res) => {
    const minSupp = req.query.minsupp || MIN_SUPP;
    const minConf = req.query.minconf || MIN_CONF;
    async.waterfall([
      // Read all transcations and filter and remove duplicated item
      (callback) => {
        Transaction.find()
        .populate('goods')
        .exec((err, trans) => {
          if (err) callback(err);
          else
          {
            trans = trans.map((tran, index) => _.uniq(tran.goods.map(good => good.cat)));
            callback(null, trans); 
          }
        })
      },
      // Export fil csv 
      (trans, callback) => {
        fs.writeFile(TRANSACTION_FILE_PATH, convertToCSVString(trans), function(err) {
          if(err) {
              callback(err);
          }
          else callback(null, TRANSACTION_FILE_PATH);
        }); 
      },
      // Process and get result from apriori alogithms
      (filePath, callback) => {
        const analysisResult = new Apriori.Algorithm(minSupp, minConf, false)
          .getAnalysisResult(filePath);
        analysisResult.then(
          (dataAnalysis) => callback(null, dataAnalysis),
          (err) => callback(err));
      }
    ], (err, result) => {
      if (err) {
        res.status(500).send('Error !');
      }
      const { frequentItemSets, associationRules } = result;
      res.render('index', { frequentItemSets, associationRules, minSupp, minConf });
    });

    
  }
  return {
    get: get,
  };
}
module.exports = homeController;