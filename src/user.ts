import { ScoreObject } from './scoreObject';

export class User{
    public username : string;
    public password : string;
    public scoreObjectArray : ScoreObject[];
    constructor( username : string, password :  string,scoreObjectArray : ScoreObject[]){
        this.username=username;
        this.password=password;
        this.scoreObjectArray=scoreObjectArray;
    }
}