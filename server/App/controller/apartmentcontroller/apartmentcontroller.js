const apartment = require("../../model/apartmentowner/apartmentowner");
const apartmentController = {};

apartmentController.add = (req, res) => {
  const body = req.body;
  const data = req.user;
  let addAppartment = new apartment(body);
  addAppartment.userId = data.user_Id;
  addAppartment
    .save()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json({ error: err });
      console.log("error in owner");
    });
};
//to get apartment owner details
apartmentController.get = (req, res) => {
  const data = req.user;
  apartment
    .find({ userId: data.user_Id })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json({ error: err });
    });
};
apartmentController.delete = (req, res) => {
  const id = req.params.id;
  apartment
    .findOneAndDelete({ _id: id })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json({ error: err });
    });
};
apartmentController.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  apartment
    .findOneAndUpdate({ _id: id }, body, { new: true })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

module.exports = apartmentController;
