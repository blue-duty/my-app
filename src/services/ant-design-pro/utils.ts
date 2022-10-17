export const isEmpty = (text:any) => {
    return text === undefined || text == null || text.length === 0;
}

export const PROTOCOL_COLORS = {
    'rdp': 'cyan',
    'ssh': 'blue',
    'telnet': 'geekblue',
    'vnc': 'purple',
    'kubernetes': 'volcano',
    '应用':'#b67ea1'
}


export const MODE_COLORS = {
    'guacd': 'green',
    'naive': 'orange',
    'terminal': 'purple',
}