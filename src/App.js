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
   const Data = await fetch("https://teenyurl-arm.vercel.app/url/shorten", {
      method: "POST",
      mode: "cors", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        longUrl: longUrl,
      })
    })

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
