import firebase from "firebase/compat";

export interface filteredData {
  id: number;
  title: string;
  desc: string;
  nutrients: string;
  efficacy: string;
  kcal: number;
  cooking: {
      ingredient: string;
      recipe: string;
  };
  image: string;
  kind: string;
  like: boolean;
}[]

export interface Talks {
  id: string;
  text: string;
  createdAt: number;
  creatorId: string;
  photoUrl: string;
}

export interface userObjProps {
  isLoggedIn: boolean;
  userObj: firebase.User | null;
}


