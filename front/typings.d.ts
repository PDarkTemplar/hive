declare module '*.scss' {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.svg' {
    const svgContent: (props: any) => JSX.Element;
    export = svgContent;
}

declare module 'js-sha1' {
    const func: (props: string) => string;
    export = func;
}

declare module '@hot-loader/react-dom' {
    const hl: { render: any };
    export = hl;
}

declare const MQTT_PATH: string;
declare const LOGIN_PATH: string;
