export class Story{
    id: number;
    title: string;
    desc: string;
    type: string;
    level: string;
    level_icon: string;

    constructor(id, title, desc, type, level, level_icon){
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.type = type;
        this.level = level;
        this.level_icon = level_icon;
    }
}