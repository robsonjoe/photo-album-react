import React from 'react';
import {  JumpProps, Photo} from '../tools/photos.model';

    const Jump = ({photos, showThumbs ,setIndex }:JumpProps )  => {

    // ------------------------------------------- event handlers

    const onClickPic = (e:any) => {
          setIndex(Number(e.target.id));
      };
  
    return (
        <div className=" ">
     
                {/* <div className="no-Pics" style="display: none;">There are currently no photos in this album.</div>              */}
                
                <div className="photoListThumbs" style={{display: (showThumbs ? 'block' : 'none')}}>
               {/* </div> <div className="photoListThumbs  inline-flex flex-row"> */}
                    <div className="photoList ">
                          {photos.map((data:Photo,n:number) => {
                            return <img className = "inline-flex flex-row rounded-md w-24 h-20 object-cover m-2 opacity-60 cursor-pointer hover:opacity-100 " alt = "thumbnailpics" key={n}  onClick={onClickPic} id={n.toString()} src ={"/lib/" + data.source} />
                           
                            })}
                    </div>
                </div>    
       
       
                </div>
    
        

     );
}
  
export default Jump;