import {Search} from './search';
import {Sort} from './sort';
import {Pagination} from './pagination';

export class SmartTableRequest
{
    constructor(public pagination:Pagination
        ,public search:Search
        ,public sort:Sort
        ,public columns:string[]
        ,public query:string
        ,public extra:Map<string,any>) {}
}