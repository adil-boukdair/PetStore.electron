export class Pet{ 
    public _id:string;//Primary key
    public customerID:string;// foreign key
    public name:string=""; 
    public type:string="";
    public nextVaccine:Date;
    public created:Date;
    public modified:Date;


    constructor(){}
}