export interface IStatuses {
    id: number;
    temperature: number;
    fan: number;
    enabled: boolean;
    mode: Mode;
    loading: boolean;
    powerChange: boolean;
}

export enum Mode {
    cool = 'cool',
    warm = 'warm',
}
