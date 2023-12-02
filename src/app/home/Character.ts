export class Character{
    public id:number; 
    public name:string;
    public description:string;
    public modified:string;
    public thumbnail:string;

    constructor(id:number,name:string,description:string,
        modified:string,thumbnail:string){
            this.id=id;
            this.name=name;
            this.description=description;
            this.modified=modified;
            this.thumbnail=thumbnail;

    }
}