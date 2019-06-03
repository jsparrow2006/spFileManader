export const IMAGE = 'IMAGE';
export const EXECUTE = 'EXECUTE';
export const VIDEO = 'VIDEO';
export const AUDIO = 'AUDIO';
export const ARCHIVE = 'ARCHIVE';
export const TEXT = 'TEXT';

let linkTypes = {}
linkTypes[IMAGE] = {exts: ['png', 'jpg', 'jpeg', 'gif', 'ico'], description: 'Файл картинка'};
linkTypes[EXECUTE] = {exts: ['exe', 'bat'], description: 'Исполняемый файл'};
linkTypes[VIDEO] = {exts: ['mpg', 'avi', 'mov'], description: 'Видео файл'};
linkTypes[AUDIO] = {exts: ['mp3', 'vaw', 'ogg', 'mid'], description: 'Аудио Файл'};
linkTypes[ARCHIVE] = {exts: ['rar', 'zip', '7zip', 'iso'], description: 'Файл архив'};
linkTypes[TEXT] = {exts: ['txt', 'json', 'js', 'html', 'css'], description: 'Файл с текстом'};

console.log(linkTypes)


export const getTypeFromExt = (ext = 'none') => {
    for (var key in linkTypes) {
        if (linkTypes[key].exts.indexOf(ext.toLowerCase()) !== -1) return {type: key, description: linkTypes[key].description}
    }
    return {type: null}
}