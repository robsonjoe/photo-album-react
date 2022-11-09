import React from 'react';
import Jump from "./Jump/Jump";
import Content from "./Content/Content";
import Comments from "./Comments/Comments";
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";
import { getJSONData } from "./tools/Toolkit";
import { PhotoData, Photo ,Comment} from "./tools/photos.model";
import logo from './logo.svg'

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
// click next button
    const getNext = () => {

      if (index ==  (photos.length -1)) {
        
        setPrevEnabled(true);
        setNextEnabled(false);
        console.log(index)
      }else {
        console.log(index)
      setPrevEnabled(true);
      setNextEnabled(true);
      setIndex (index +1);
      console.log("innexthere" + index)   
      }
  };
       
  // click prev button
  const getPrev = () => {
    if (index == 0) {  
      setPrevEnabled(false);
      setNextEnabled(true);
      console.log("zero" + index)
    }else {
      
      setPrevEnabled(true);
      setNextEnabled(true);
      setIndex (index -1);
      console.log("inprevhere" + index)
      //HandleOnChange();
    }
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
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [showThumbs, setShowThumbs] = React.useState<boolean>(false);
  const [showAddComments, setShowAddComments] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  // const [selected, setSelected] = React.useState<Photo>(photos[0]);
  const [index, setIndex] = React.useState<number>(0);
  const [prevEnabled, setPrevEnabled] = React.useState<boolean>(true);
  const [nextEnabled, setNextEnabled] = React.useState<boolean>(true);
  // const [disable, setDisable] = React.useState(true);
 

    // use effect for index
  React.useEffect(() => {
    
    console.log("component updated");
    setIndex(index);
    console.log("component update:" + index);
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
                
                <div className="photoCount"> Photo {(index +1)} of {photos.length}</div>
            </div>
        </div>
      
      <Jump  photos = {photos} showThumbs = {showThumbs} setIndex={setIndex} index ={index} setPrevEnabled ={setPrevEnabled} setNextEnabled={setNextEnabled}/> 
      
      <Comments showAddComments = {showAddComments} photos = {photos} index={index} setPhotos = {setPhotos}  setLoading ={setLoading} comments = {comments}/>
   
      <Content  photos = {photos} index={index} comments={comments}   />
     
    
       
      </header>
    </div>
  );
}

export default App;
