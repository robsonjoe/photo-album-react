import React,  { useMemo } from 'react';
import { getJSONData, sendJSONData } from "../tools/Toolkit";
import { PhotoData, Photo ,Comment} from "../tools/photos.model";
import {  CommentProps } from '../tools/photos.model';

const SUBMIT_SCRIPT:string = "http://localhost/addComment.php";
const RETRIEVE_SCRIPT:string = "http://localhost/retrieveAlbum.php?count=11";



// const Content = ({ orders, toppings, notes, visible }:ContentProps) => {
  const Comments = ({ showAddComments, photos, index, setPhotos, setLoading, comments }:CommentProps) => {
    
  // const [okEnabled, setOkEnabled] = React.useState<boolean>(false);
 

        const sendComment = (e:any) => {
      
          e.preventDefault();

          console.log ("here");
          
          
          if ((e.target.txtAuthor.value === "" ) || (e.target.txtComment.value === "")) {         
            
            
            return alert("both fields need to be filled in");
          }else{ 
            

         console.log("click" +  photos[index].id)

          let sendJSON = {
             "photoId" : photos[index].id,
             "author" : e.target.txtAuthor.value,
              "comment" : e.target.txtComment.value
        }; 
       

        // convert the JSON object to a string - serialization
        let sendString = JSON.stringify(sendJSON);
      
       sendJSONData(SUBMIT_SCRIPT, sendString, onSubmitResponse, onError);   

       e.target.reset();

          };


        };
          const onSubmitResponse = () => {
            // data received from Web API
            
            getJSONData(RETRIEVE_SCRIPT, onResponse, onError); 
            // store received JSON samples array in state variable since samples is used heavily in JSX of App and SelectedView
            // setPhotos(result.photos);  
            //  setLoading(false);
          };

          const onResponse = (result:PhotoData) => {
            // data received from Web API
            console.table(result);
            // store received JSON samples array in state variable since samples is used heavily in JSX of App and SelectedView
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
          <button className="intro__button rounded-md mr-2 mb-2 p-2  text-white bg-[#568fea]" type="reset">Cancel</button>
        </div>
        </div>
        </form>
    

   


       
    );

}

export default Comments;