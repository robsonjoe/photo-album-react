import React,  { useMemo } from 'react';
import { getJSONData, sendJSONData } from "../tools/Toolkit";
import { PhotoData, Photo ,Comment} from "../tools/photos.model";
import {  CommentProps } from '../tools/photos.model';

const SUBMIT_SCRIPT:string = "http://localhost/addComment.php";
const RETRIEVE_SCRIPT:string = "http://localhost/retrieveAlbum.php?count=11";



// const Content = ({ orders, toppings, notes, visible }:ContentProps) => {
  const Comments = ({ showAddComments, photos, index, setPhotos, setLoading, setShowAddComments }:CommentProps) => {
    
    // hide comments  section when cancelled
    const cancelComments = (e:any) => {
      setShowAddComments(false);
  };
 
 // send comments to database when form submitted 

        const sendComment = (e:any) => {
          
          e.preventDefault();
          setLoading(true);
          console.log ("here");
          
          //check if both text fields are filled in 
          if ((e.target.txtAuthor.value === "" ) || (e.target.txtComment.value === "")) {         
          //returns popup message
            return alert("Both NAME and COMMENT fields need to be filled in");
          }else{ 
            
         // send comments to database 
         console.log("click" +  photos[index].id)

          let sendJSON = {
             "photoId" : photos[index].id,
             "author" : e.target.txtAuthor.value,
              "comment" : e.target.txtComment.value
        }; 
       

        // convert the JSON object to a string - serialization
        let sendString = JSON.stringify(sendJSON);
      
       sendJSONData(SUBMIT_SCRIPT, sendString, onSubmitResponse, onError);   
       //resets fields
       e.target.reset();
       //hides comment area
       setShowAddComments (false);
          };
        };
          const onSubmitResponse = () => {
            // get updated data from database           
            getJSONData(RETRIEVE_SCRIPT, onResponse, onError); 
    
          };
          // get reload data 
          const onResponse = (result:PhotoData) => {
            // data received from DB
            console.table(result);
            // store received JSON samples array in state variable 
            setPhotos(result.photos);  
             setLoading(false);
          };
          const onError = (message:string) => console.log("*** Error has occured during AJAX data transmission: " + message);


        
    return (  


      <form onSubmit = {sendComment}>

        <div className="commentForm flex flex-col flex-no-wrap" style={{display: (showAddComments ? 'block' : 'none')}} >
       
        <div className="commentForm__sectionOne">
            <label className="form__label">Author:</label>
            <div><input type="text" id="txtAuthor" name="txtAuthor" className="text rounded  border border-solid border-gray-300 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none h-8 pt-px w-40  maxLength={50}"  />
                
                </div>

           {/* <input className="form__textbox" id="commentAuthor" type="text" maxlength="30" value=""> */}
        </div>
        <div className="commentForm__sectionTwo">
            <label className="form__label" >Comment (max 200 characters):</label>
            <br></br>

            <textarea className="
            form-control block h-[100px] w-[400px] px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 resize-none focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"  id="txtComment" name="txtComment"  maxLength={200}></textarea>
        </div>
        <div className="commentForm__buttons">
          <button className="intro__button rounded-md mr-2 mb-2 p-2  text-white bg-[#568fea] disabled:opacity-50" type="submit">OK</button>
          <button className="intro__button rounded-md mr-2 mb-2 p-2  text-white bg-[#568fea]" onClick = {cancelComments} type="reset">Cancel</button>
        </div>
        </div>
        </form>
    

   


       
    );

}

export default Comments;