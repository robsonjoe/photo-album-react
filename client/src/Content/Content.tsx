import React  from 'react';
import { ContentProps} from '../tools/photos.model';

const Content = ({ photos, index , comments}:ContentProps )  => {
        
           return (  
             <>   
    {  (photos.length > 0) ?
        <div className="content">                                
             <div>
                <img src={"/lib/" + photos[index].source} alt = "sfsss" />
                <div className="font-title font-bold text-xl pb-2" >{photos[index].title}</div>
                <div className="font-title text-xl pb-2">{photos[index].caption}</div>
            </div>
          
    

            <div className="font-bold max-w-[600px] border-b">Comments:</div>
            <div className="font-title text-xl pb-2" > 
    
            {/* {photos[index].comments.map(element => {
               return ( element.comment)
                 ;
            })}    */}
            
            {
          (<div>
             {photos[index].comments.map((comments, key) => (
              <div> 
             <div>  Author: {comments.author} </div>
            
                <div className="border-b max-w-[600px]">  Comments: {comments.comment} </div>
             
             
               </div>
               
             ))}
            </div>)
            }


            </div>

       
            
    
            {/* <div className="font-bold max-w-[600px]">Author:</div>
            <div className="font-title text-xl pb-2" >{photos[index].comments[0].author}</div> */}

            
        </div>   
             
        :
         <div>
             No portfolio samples available :(
         </div>
              }   

          </>   
             );      
 
}

export default Content;