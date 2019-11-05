const models = require("../models");

const Domo = models.Domo;

const makeDomo = (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.favoriteFood) {
    return res
      .status(400)
      .json({ error: "RAWR! Name, age, and favorite food are required" });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    favoriteFood: req.body.favoriteFood,
    owner: req.session.account._id
  };

  console.log("domoData: ", domoData);

  const newDomo = new Domo.DomoModel(domoData);

  const domoPromise = newDomo.save();

  domoPromise.then(() => res.json({ redirect: "/maker" }));

  domoPromise.catch(err => {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Domo already exists" });
    }

    return res.status(400).json({ error: "An error occurred" });
  });

  console.log("domoPromise", domoPromise);

  return domoPromise;
};

const editDomo = (request, response) => {
  const req = request;
  const res = response;

  // get the id of the domo
  // match it with the account name
  // update the necessary fields

  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: "An error occurred" });
    }

    docs.name = req.body.name;
    docs.age = req.body.age;
    docs.favoriteFood = req.body.favoriteFood;
    return res.json({ domos: docs });
  });
};

const makerPage = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: "An error occurred" });
    }

    console.log("docs", docs);

    return res.render("app", { csrfToken: req.csrfToken(), domos: docs });
  });
  // res.render("app");
};

const getDomos = (request, response) => {
  const req = request;
  const res = response;

  return Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: "An error occurred" });
    }

    return res.json({ domos: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.getDomos = getDomos;
module.exports.make = makeDomo;
module.exports.edit = editDomo;
