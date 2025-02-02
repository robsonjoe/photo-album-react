// Generated by https://quicktype.io

export interface PhotoData {
    photos: Photo[];
}

export interface Photo {
    id:       string;
    title:    string;
    caption:  string;
    source:   string;
    comments: Comment[];
}

export interface Comment {
    comment: string;
    author:  string;
}

export interface CommentProps {
        showAddComments:boolean;  
        photos: Photo[];
        index:number;
        setPhotos: Function;
        setLoading: Function;
        setShowAddComments: Function;

}
export interface JumpProps {   
     showThumbs:boolean;
     photos: Photo[];
     setIndex:Function;
     index:number;
     setPrevEnabled:Function;
     setNextEnabled:Function;
}

export interface ContentProps {
   photos: Photo[];
    index:number;
}

export interface LoadingProps {
    enabled:boolean;
    bgColor:string;
    spinnerColor:string;
}