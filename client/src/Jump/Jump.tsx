import React from 'react';
import {  JumpProps, Photo} from '../tools/photos.model';

    const Jump = ({photos, showThumbs ,setIndex, index, setPrevEnabled, setNextEnabled }:JumpProps )  => {

    // ------------------------------------------- event handlers
    // click on picture logic
    const onClickPic = (e:any) => {
          setIndex(Number(e.target.id));
      };
  
         // use effect for index
      React.useEffect(() => {
        if (index == 0) {
          setPrevEnabled(false);
          setNextEnabled(true);
        } else if ( index == photos.length -1) {
          setPrevEnabled(true);
          setNextEnabled(false);
        } else {
          setNextEnabled(true);
          setPrevEnabled(true);
        }
      }, [index]);  

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