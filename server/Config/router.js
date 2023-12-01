const express = require("express");
const route = express.Router();
const usercontroller = require("../App/controller/usercontroller/usercontroller");
const auth = require("../App/middleware/auth");
const apartmentController = require("../App/controller/apartmentcontroller/apartmentcontroller");
const tenantcontroller = require("../App/controller/tenantcontroller/tenantcontroller");
// importing a upload middleware using Object Destructure method
const { upload } = require("../App/middleware/multer");
//basic registeration
route.post("/register", usercontroller.register);
route.post("/login", usercontroller.login);

//about apartments
route.get("/get_apartments", auth.verify, apartmentController.get);
route.post("/add_apartment", auth.verify, apartmentController.add);
route.delete("/delete_apartment/:id", auth.verify, apartmentController.delete);
route.put("/edit_apartment/:id",auth.verify,apartmentController.update)
//tenant
// upload.single()==> used to recive a single image  , parameter which is declared in the tenant model
route.post(
  "/add_tenant",
  auth.verify,
  upload.single("image"),
  tenantcontroller.add
);
route.get("/all_tenants",auth.verify,tenantcontroller.getAllTenant)
route.delete("/delete_tenant",auth.verify,tenantcontroller.deletetenant)

module.exports = route;
