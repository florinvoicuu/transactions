import { Injectable } from 'angular2/core';
import { Title, BrowserDomAdapter } from 'angular2/platform/browser';

var DOM = new BrowserDomAdapter;

@Injectable()
abstract class Meta {
    //noinspection JSAnnotator
    protected abstract attribute: string;

    private head: HTMLElement;

    constructor () {
        this.head = DOM.query('head');
    }

    public getMeta (meta: string): string {
        return this[meta].getAttribute('content');
    }

    public setMeta (meta: string, value: string) {
        this[meta].setAttribute('content', value);
    }

    protected meta (name: string): HTMLElement {
        let meta: HTMLElement;
        meta = DOM.query(`meta[${this.attribute}='${name}]'`);
        if (meta === null) {
            meta = DOM.createElement('meta');
            meta.setAttribute(this.attribute, name);
            this.head.appendChild(meta);
        }
        return meta;
    }
}

@Injectable()
export class SEO extends Meta {
    public title: Title;

    private description: HTMLElement;
    private robots: HTMLElement;

    protected get attribute () {
        return 'name';
    }

    constructor () {
        super();
        this.title = new Title;
        this.description = this.meta('description');
        this.robots = this.meta('robots');
    }
}

@Injectable()
export class OpenGraph extends Meta {
    private url: HTMLElement;
    private type: HTMLElement;
    private title: HTMLElement;
    private description: HTMLElement;
    private image: HTMLElement;

    protected get attribute () {
        return 'property';
    }

    constructor () {
        super();
        this.url = this.meta('og:url');
        this.type = this.meta('og:type');
        this.title = this.meta('og:title');
        this.description = this.meta('og:description');
        this.image = this.meta('og:image');
    }
}