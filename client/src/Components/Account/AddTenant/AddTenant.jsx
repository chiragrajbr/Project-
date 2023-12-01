import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../AxiosInstance/AxiosInstance";
import SideNav from "../SideNav/SideNav";
import "./AddTenant.css";

const AddTenant = () => {
  const [apartments, setApartment] = React.useState([]);
  const [tenantName, setTenantName] = React.useState("");
  const [phoneNo, setPhoneNo] = React.useState("");
  const [idType, setIdType] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [idNumber, setIdNumber] = React.useState("");
  const [selectApartment, setSelectApartment] = React.useState("");
  const [roomNo, setRoomNo] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("http://localhost:3001/get_apartments")
      .then((res) => {
        setApartment(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formData = {
    tenantName: tenantName,
    phoneNo: phoneNo,
    idType: idType,
    image: image,
    idNumber: idNumber,
    selectApartment: selectApartment,
    roomNo: roomNo,
  };

  const fromValidate = () => {
    if (
      tenantName.length === 0 ||
      phoneNo.length === 0 ||
      idType.length === 0 ||
      image.length === 0 ||
      idNumber.length === 0 ||
      selectApartment.length === 0 ||
      roomNo.length === 0
    ) {
      toast.warning("please fill all the fields", {
        position: "top-center",
        autoClose: 2000,
      });
      return false;
    } else if (phoneNo.length > 10 || phoneNo.length < 10) {
      toast.warning("phone number should be in 10 digit", {
        position: "top-center",
        autoClose: 2000,
      });
      return false;
    } else if (
      (idNumber === "aadhar" && idNumber.length > 10) ||
      (idNumber === "aadhar" && idNumber.length < 10)
    ) {
      toast.warning("aadhar number should be in 10 digit", {
        position: "top-center",
        autoClose: 2000,
      });
      return false;
    } else if (
      (idType === "ration card" && idNumber.length > 12) ||
      (idType === "ration card" && idNumber.length < 12)
    ) {
      toast.warning("ration card number should be in 12 digit", {
        position: "top-center",
        autoClose: 2000,
      });
      return false;
    } else {
      return true;
    }
  };

  const selectHandler = () => {
    if (apartments.length === 0) {
      toast.warning("please select apartment", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const sendData = () => {
    axiosInstance
      .post("http://localhost:3001/add_tenant", formData)
      .then((res) => {
        console.log(res);
        let result = res.data;
        if (result.hasOwnProperty("error")) {
          toast.warning("server error", {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.success("tenant added successfully", {
            position: "top-center",
            autoClose: 2000,
          });

          setTimeout(() => {
            navigate("/account");
          }, [2000]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const trueBlock = () => {
    sendData();
    setImage(null);
    setTenantName("");
    setPhoneNo("");
    setIdType("");
    setIdNumber("");
    setSelectApartment("");
    setRoomNo("");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    /* fromValidate() ? trueBlock() : console.log("validation error"); */
    sendData();
  };

  return (
    <div>
      <SideNav />

      <div className="addTenant-form">
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <h2 className="addTenant-header ">Add Tenant</h2>
          <div className=" addTenant-field">
            <label className="addTenant-label">Tenant Name :</label>
            <input
              type="text"
              className="addTenant-input"
              value={tenantName}
              onChange={(e) => {
                setTenantName(e.target.value);
              }}
              autoFocus
            />
          </div>
          <div className=" addTenant-field">
            <label className="addTenant-label">Phone No :</label>
            <input
              type="number"
              className="addTenant-input"
              value={phoneNo}
              onChange={(e) => {
                setPhoneNo(e.target.value);
              }}
            />
          </div>
          <div className="addTenant-field">
            <label className="addTenant-label">ID Type :</label>
            <select
              className="addTenant-input"
              value={idType}
              onChange={(e) => {
                setIdType(e.target.value);
              }}
            >
              <option value="">-- Please select --</option>
              <option value="aadhar">Aadhar</option>
              <option value="pan card">Pan Card</option>
              <option value="ration card">Ration Card</option>
            </select>
          </div>
          <div className=" addTenant-field">
            <label className="addTenant-label">ID No :</label>
            <input
              type="text"
              className=" addTenant-input"
              value={idNumber}
              onChange={(e) => {
                setIdNumber(e.target.value);
              }}
            />
          </div>
          <div className=" addTenant-field">
            <label className="addTenant-label">Image :</label>
            <input
              type="file"
              className="addTenant-image"
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>
          <div className="addTenant-field">
            <label className="addTenant-label">Select Apartment :</label>
            <select
              className="ml-8"
              value={selectApartment}
              onChange={(e) => {
                setSelectApartment(e.target.value);
              }}
              onClick={selectHandler}
            >
              <option value="">-- Please select --</option>
              {apartments.map((apartment, index) => {
                return (
                  <option value={apartment.building_name} key={index}>
                    {apartment.building_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className=" addTenant-field">
            <label className="addTenant-label"> Room Number :</label>
            <input
              type="text"
              className=" addTenant-input"
              value={roomNo}
              onChange={(e) => {
                setRoomNo(e.target.value);
              }}
            />
          </div>
          <button
            className="addTenant-back"
            onClick={() => {
              navigate("/account");
            }}
          >
            Back
          </button>
          <button className=" addTenat-add ">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddTenant;
