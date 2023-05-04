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