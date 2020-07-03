import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {  toast} from 'react-toastify';

export default function LinksForm(props) {
  const defaultValues = {
    name: "",
    url: "",
    description: "",
  };
  const [values, setValues] = useState(defaultValues);

  //Changing default state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const validURL = str => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);

  };

  //confing submit
  const handleonSubmit = (e) => {
    e.preventDefault();
if(!validURL(values.url)){
    return toast('Invalid Url',{
        type:'warning',
        autoClose:2000
    })
}

    props.addOrEdit(values);
    //recharge
    setValues({ ...defaultValues });
  };
  const getLinkById = async (id) => {
    const doc = await db.collection("links").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...defaultValues });
    } else {
      getLinkById(props.currentId);
    }
  }, [props.currentId]);

  return (
    <form className="card card-body bg-dark" onSubmit={handleonSubmit}>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">insert_link</i>
        </div>
        <input
          type="tetx"
          className="form-control bg-light"
          placeholder="http://.someurl.com"
          name="url"
          onChange={handleInputChange}
          value={values.url}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">create</i>
        </div>
        <input
          type="tetx"
          className="form-control bg-light"
          placeholder="Website Name"
          name="name"
          onChange={handleInputChange}
          value={values.name}
        />
      </div>
      <div className="form-group">
        <textarea
          name="description"
          rows="3"
          className="form-control bg-light"
          placeholder="Write a description"
          onChange={handleInputChange}
          value={values.description}
        ></textarea>
      </div>
      <button className="btn btn-success">
        {props.currentId === "" ? "Save" : "Update"}
      </button>
    </form>
  );
}
