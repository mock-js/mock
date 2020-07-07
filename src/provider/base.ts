import {Gender} from '../lib/gender';
import {Loc} from '../lib/locale';

export type Constructable<T = {}> = new (...args: any[]) => T;

export interface IOptions {
    locale: Loc | undefined;
    gender?: Gender;
}

export class BaseProvider {
    protected result: any = '';
    protected modifiers: any = [];
    protected options: IOptions = {
        locale: Loc.en_US,
        gender: Gender.U,
    };

    constructor(options?: Loc | IOptions) {
        if (options !== undefined) {
            if (typeof options === 'string') {
                this.options.locale = options;
            } else if (typeof options === 'object') {
                this.options = options;
            }
        }
    }

    protected process() {
        this.modifiers.forEach((m: any) => m());
        this.modifiers = [];
        return this.val();
    }

    protected val() {
        const val = this.result;
        this.result = '';
        return val;
    }

    get female() {
        this.options.gender = Gender.F;
        return this;
    }

    get male() {
        this.options.gender = Gender.M;
        return this;
    }
}