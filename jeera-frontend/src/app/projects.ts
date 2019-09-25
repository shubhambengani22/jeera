export class Project{
    id: number;
    name: string;
    git: string;

    constructor(id,name,git){
        this.id=id;
        this.name=name;
        this.git=git;
    }
}