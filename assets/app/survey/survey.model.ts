export class Survey {
    // adminkey: string; // needed to pass to backend when we edit the survey
    // rawtext: string; // required
    // closed: boolean; // required, default = true

    constructor(public rawtext: string, 
                public adminkey?: string, 
                public closed?: boolean){}
}