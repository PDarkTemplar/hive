export interface IStatus {
    action: Action;
}

export enum Action {
    off = 'off',
    pc = 'pc',
    server = 'server',
    tvon = 'tvon',
    tvoff = 'tvoff',
    mute = 'mute',
    volPlus = 'vol+',
    volMinus = 'vol-',
}
