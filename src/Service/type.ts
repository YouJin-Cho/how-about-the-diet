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

export interface LikeFoods {
  id: string;
  like: boolean;
  title: string;
  image: string;
  userId: string;
}

export interface TalkingProps {
  userObj: firebase.User | null;
  id: string;
  text: string;
  isOwner: boolean;
  photoUpdate: string;
}

export interface userObjProps {
  isLoggedIn?: boolean;
  userObj: firebase.User | null;
}

export interface HeaderProps {
  isLoggedIn : boolean
}

export interface DetailFoodProps {
  foodId : number
}

export interface DetailNutrientsProps {
  nutrientId?: number
}

export interface categoryTypes {
  name: string
  state: string
}