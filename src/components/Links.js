import React, { useState,useEffect } from "react";
import LinksForm from "./LinkForm";
import { db } from "../firebase";
import {toast} from 'react-toastify';
export default function Links() {

    const [links,setLinks] = useState([]);
    const [currentId,setCurrentId] = useState('')

  const addOrEdit = async (linkObject) => {
   if (currentId === '') {
          //creeamos la coleccion en firebase
    await db.collection("links").doc().set(linkObject);
    toast('New link added',{
        type:'success'
    })
   } else{
    await db.collection('links').doc(currentId).update(linkObject);
    toast('Links Update Succesfully',{
    type:'info'
    });
    setCurrentId('');
}
  };
  const  onDeleteLinks  =async (id) => {
        if (window.confirm(`Are you sure you want to delete this link`)) {
             await db.collection('links').doc(id).delete();
             toast('Link Deleted Succesfully',{
                 type:'error'
             })
             
        }
        
  }
 

const getLinks = () => {
 db.collection('links').onSnapshot((querySnapshot) =>{
    const docs = [];
    querySnapshot.forEach(doc => {
       docs.push({...doc.data(), id: doc.id}) 
    });
    setLinks(docs);
    
 });

  
}
  //cada vez que la app inicie se ejecutara
  useEffect (() =>{
    getLinks()
  },[])

  return (
    <div>
      <div className="col-md-4 p-2">
      <LinksForm {...{ addOrEdit, currentId, links }} />
      </div>
      <div className="col-md-8">
          {links.map(links=> (
            <div className="car-mb-1" key={links.id}>
                 <div className="card-body card border-primary mb-3">
          <div className="d-flex justify-content-between">
          <h4>{links.name}</h4>
         <div>
         <i 
          className="material-icons text-danger"
          onClick={() => onDeleteLinks(links.id)}
          >close</i>
          <i className="material-icons" onClick={() => setCurrentId(links.id)}> create</i>
         </div>
          </div>
          <p>{links.description}</p>
          <a href={links.url} target="_blank"  rel="noopener noreferrer">Go to Website</a>
                 </div>
            </div>
          ))}
      </div>
    </div>
  );
}
