import React,{ useState } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import {useCopyToClipboard} from "usehooks-ts"
import Layout from "./layout";
const UrlHandler = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [value, copy] = useCopyToClipboard();
  const [globalError,setGlobalError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const postData = async() => {
   const Data = await fetch("https://teenyurl.onrender.com/url/shorten", {
      method: "POST",
      mode: "cors", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        longUrl: longUrl,
      })
    })
    // 2 year contract; Company provided Visa. JD - 
    // • Design and build applications/systems based on wireframes and product requirements documents.
    //  • Work on back-end of core scripts using NodeJS/ MongoDB/React.js//Express.
    //  • Unit test code for robustness, including edge cases, usability and general reliability. 
    // • Write reusable, easy to maintain, versioned code using DRY principles 
    // • Integrate existing tools and business systems (in-house tools) 
    // • // Good exposure in creating dynamic web pages 
    // • Familiarity with Server-Oriented Architecture and RESTful Web Services 
    // • Mentor junior team members on system architecture, coding styles and inculcate 
    // an attitude of continuous improvement in the team members. 1 year experienced candidates to apply. To be good with MERN Stack 
    const storedData =await Data.json();
    console.log(storedData.data);
    if(storedData.status===false){
      setGlobalError(storedData.message)
    }else{   
      setShortUrl(storedData.data.shortUrl);
  }
    setLongUrl("");
    setIsCopied(false);
  }

  return (
    <div>
        <Layout/>
    <div className="background-image-container">     
           
      <div className="input">        
          <label className="heading" htmlFor="longurl">Short Your LongUrl : </label><br/>
          <input className="box" type="text" size={50} placeholder="Paste here longUrl"  value={longUrl}  onChange={(e) => {setLongUrl(e.target.value);setGlobalError("")}}/><br/>
          <div className="errorMessage">{globalError && <span>{globalError}</span>}</div>
          <button type="submit" className="btn btn-outline-primary" onClick={postData}>Convert</button><br />
         
          <h5 className="output">{shortUrl}</h5> 
          <button  className="btn btn-outline-primary" onClick={() => {
      if (shortUrl) {
        copy(shortUrl);
        setIsCopied(true);
      }
    }}> {isCopied ? "Copied" : "Copy"}</button>

      </div>
    </div>
    </div>
  );
};
export default UrlHandler;
