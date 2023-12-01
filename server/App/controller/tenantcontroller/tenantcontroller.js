const tenant = require("../../model/tenant/tenant");
const tenantcontroller = {};
tenantcontroller.add = async (req, res) => {
  const imagePath = req.file.filename;
  const { tenant_Name, ph_No, id_Type, id_Number, apartment_Name, room_No } =
    req.body;
  const data = req.user;
  const addtenant = new tenant({
    tenant_Name,
    ph_No,
    id_Type,
    id_Number,
    image: imagePath,
    apartment_Name,
    room_No,
    userId: data.userId,
  });
  try {
    await addtenant.save();
    res.json({ message: "tenant details added successfully" });
  } catch (error) {
    res.json({ error: "Internal server error" });
  }
};

tenantcontroller.getAllTenant = (req, res) => {
  const data = req.user;
  tenant
    .find({ userId: data.user_Id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

tenantcontroller.getByApartment = (req, res) => {
  const apartmentName = req.params.apartmentName;
  tenant
    .find({ apartment_Name: apartmentName })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

tenantcontroller.deletetenant = (req, res) => {
  const id = req.params.id;
  tenant
    .findByIdAndDelete(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

module.exports = tenantcontroller;
