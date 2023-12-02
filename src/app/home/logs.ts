export class logs{
    log_id:number;
    log_url_api:string;
    time:string;

    constructor( log_id:number,log_url_api:string,time:string){
        this.log_id= log_id;
        this.log_url_api = log_url_api;
        this.time = time;
    }
}