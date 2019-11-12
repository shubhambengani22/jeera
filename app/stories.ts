export class Story{
    id: number;
    title: string;
    desc: string;
    type: string;
    level: string;
    level_icon: string;
    project_id: number;
    weightage: number;
    progress: number;

    constructor(id, title, desc, type, level, level_icon, project_id, weightage, progress){
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.type = type;
        this.level = level;
        this.level_icon = level_icon;
        this.project_id = project_id;
        this.weightage = weightage;
        this.progress = progress;
    }
}