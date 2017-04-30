export class Pagination
{
    private start:number;
    private 'number':number;
    constructor(start:number, limit:number)
    {
        this.start = start;
        this['number'] = limit;
    }
}