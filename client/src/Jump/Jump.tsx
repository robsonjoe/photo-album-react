import React from 'react';
import {  JumpProps, Photo} from '../tools/photos.model';

    const Jump = ({photos, showThumbs ,setIndex, index, setPrevEnabled, setNextEnabled }:JumpProps )  => {

    // ------------------------------------------- event handlers
    // click on picture logic
    const onClickPic = (e:any) => {
          setIndex(Number(e.target.id));
          if (index == 0) {
            setPrevEnabled(false);
          } else if ( index == photos.length -1) {
            setNextEnabled(false);
          } else {
            setNextEnabled(true);
            setPrevEnabled(true);
          }
      };
  
    return (
        <div className=" ">
                     
                <div className="photoListThumbs" style={{display: (showThumbs ? 'block' : 'none')}}>
     
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