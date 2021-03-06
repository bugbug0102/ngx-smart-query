import { Observable } from 'rxjs/Observable';

import {Search} from './search';
import {Sort} from './sort';
import {Pagination} from './pagination';

import {SmartTableRequest} from './smart-table-request';
import {SmartTableResponse} from './smart-table-response';
import {SmartDataContext} from './smart-data-context';
import {SmartDataIo} from './smart-data-io';

export class SmartDataSource<T>
{
    rows:T[] = [];
    count:number = 0;
    limit:number = 20;
	offset:number = 0;
    currentSort:Sort = null;

    constructor(private io:SmartDataIo<T>, private context:SmartDataContext<T> = {})
    {

    }

    private page(offset:number, limit:number):void
    {
        const owner = this;
        const start = offset * limit;
        const end = start + limit;
        const p = new Pagination(start ,limit);
        const search = (this.context.getSearch) ? this.context.getSearch() : null;
        const sort = (this.context.getSort) ? this.context.getSort() : null;
        const columns = (this.context.getColumns) ? this.context.getColumns(): null;
        const query = (this.context.getQuery) ? this.context.getQuery() : null;
        const extra = (this.context.getExtra) ? this.context.getExtra() : null;
        const str = new SmartTableRequest(p, (search==undefined) ? null : search
            , (sort==undefined) ? this.currentSort : sort, (columns==undefined) ? null : columns, (query==undefined) ? null : query, (extra==undefined) ? null : extra);
        this.io(str).subscribe(res =>
        {
            this.count = res.totalRecords;
            this.rows = res.rows;
        }, function(err:any) {


        }, function() {
            if(owner.context.onComplete!==undefined && owner.context.onComplete!==null)
            {
              owner.context.onComplete();
            }
        });
    }

    public onPage(event:any):void
    {
		this.offset = event.offset;
        this.page(event.offset, event.limit);
    }

    public onSort(event:any):void
    {
        this.currentSort = new Sort(event.column.prop, !("asc" === event.newValue));
        this.fetch();
    }

    public fetch():void
    {
		this.offset = 0;
        this.page(this.offset, this.limit);
    }
}
