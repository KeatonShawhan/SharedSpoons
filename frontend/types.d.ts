export {}; 

declare global {
  type Post = {
    caption:string,
    rating:number,
    dish:string,
    username:string,
    place:string,
    image:string,
    categories: string[],
    notes: string
  };
}