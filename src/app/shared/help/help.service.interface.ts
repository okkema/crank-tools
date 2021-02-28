import { Observable } from 'rxjs';

export interface IHelpService {
    show: Observable<boolean>;
    toggle(): void;
}
