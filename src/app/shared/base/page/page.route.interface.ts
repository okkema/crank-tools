import { Route } from '@angular/router';

export interface IPageRoute extends Route {
    data: {
        title: string;
        icon: string;
    };
};
