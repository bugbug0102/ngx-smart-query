import {Search} from './search';
import {Sort} from './sort';

export interface SmartDataContext<T>
{
    getSort?():Sort;
    getSearch?():Search;
    getColumns?():string[];
    getQuery?():string;
    getExtra?():Map<string,any>;
    isExpended?():boolean;
}
