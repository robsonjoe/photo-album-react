import React from 'react';
import Jump from "./Jump/Jump";
import Content from "./Content/Content";
import Comments from "./Comments/Comments";
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";
import { getJSONData } from "./tools/Toolkit";
import { PhotoData, Photo ,Comment} from "./tools/photos.model";

const RETRIEVE_SCRIPT:string = "http://localhost/retrieveAlbum.php?count=11";

const App = () => {


  // ---------------------------------------------- event handers
  // click jump button 
      const onJumpClick = (e:any) => {
        setShowThumbs(!showThumbs);
    };
  // click comment button   
    const onCommentClick = (e:any) => {
        setShowAddComments(!showAddComments);
    };
 // click next button add 1 to index
    const getNext = () => {
     setIndex (index +1);   
  };
       
  // click prev button seubtract 1 from index
  const getPrev = () => {
      setIndex (index -1);
  };

  // load photo data to array
  const onResponse = (result:PhotoData) => {
    // data received from Web API
    console.table(result);
    // store received JSON samples array in state variable since samples is used heavily in JSX of App and SelectedView
    setPhotos(result.photos);  
    setIndex(index);
    setLoading(false);
  };
  // return error
  const onError = (message:string) => console.log("*** Error has occured during AJAX data transmission: " + message);

  // ---------------------------------------------- state variables

  const [photos, setPhotos] = React.useState<Photo[]>([]);
  const [showThumbs, setShowThumbs] = React.useState<boolean>(false);
  const [showAddComments, setShowAddComments] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [index, setIndex] = React.useState<number>(0);
  const [prevEnabled, setPrevEnabled] = React.useState<boolean>(false);
  const [nextEnabled, setNextEnabled] = React.useState<boolean>(true);
  
 
  //add use effevct to set buttons when index changes
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


  //use effect for JSON data
  React.useEffect(() => {
    // component mounted - loading JSON data when root component mounts
    getJSONData(RETRIEVE_SCRIPT, onResponse, onError); 
   
  }, [ ]);
  

  return (
    <div className="App">
      <header className="App-header px-5">
     
     <div className="headertitle text-5xl">_Photo.Album </div>
     <div className="headersubtitle text-xs pt-5 pl-5">V2.0 React/Tailwind </div>
       <LoadingOverlay spinnerColor="#FFFFFF" bgColor="#b82308" enabled={loading} />
      
       <div className="main">
            <div className="buttonGroup pt-3">
                <button className="intro__button rounded-md mr-1 mb-1 p-2 text-white bg-[#568fea] disabled:opacity-50" onClick={getPrev}  disabled={!prevEnabled}>Previous</button>
                <button className="intro__button rounded-md mr-1 mb-1 p-2 text-white bg-[#568fea] disabled:opacity-50" onClick={getNext} disabled={!nextEnabled}>Next</button>
                <button className="intro__button rounded-md mr-1 mb-1 p-2 text-white bg-[#e8b74e]" onClick={onJumpClick}>Jump</button>
                <button className="intro__button rounded-md mr-1 mb-1 p-2 text-white bg-[#e8b74e]" onClick={onCommentClick}>Comment</button>
                
              {  (photos.length > 0) ?
                      <div className="photoCount"> Photo {(index +1)} of {photos.length}</div>
                      :
                      <div className="photoCount"> Photo 0 of 0 </div>
               }

            </div>
        </div>

      <Jump  photos = {photos} showThumbs = {showThumbs} setIndex={setIndex} index ={index} setPrevEnabled ={setPrevEnabled} setNextEnabled={setNextEnabled}/> 
      
      <Comments showAddComments = {showAddComments} photos = {photos} index={index} setPhotos = {setPhotos}  setLoading ={setLoading} setShowAddComments = {setShowAddComments}/>
   
      <Content  photos = {photos} index={index}  />
     
    
       
      </header>
    </div>
  );
}

export default App;
