import {SmartTableRequest} from './smart-table-request';
import {SmartTableResponse} from './smart-table-response';
import { Observable } from 'rxjs/Observable';

export type SmartDataIo<T> = (srt:SmartTableRequest) => Observable<SmartTableResponse<T>>;