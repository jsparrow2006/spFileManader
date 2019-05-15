const electron = window.require('electron');
const {execSync} = electron.remote.require('child_process');
const iconv  = electron.remote.require('iconv-lite')


export function getFilesSync(path) {
    let fls;
    let fileList = {
        path: '',
        catalogs: [],
        files: [],
    };

    try {
        var result = electron.remote.require('child_process').execSync(`DIR "${path}" /O /-C /n`);
    } catch (e) {
        return {catalogs: [], files: []}
    }
    result = iconv.decode(result, 'cp1125')
    fls = result.split('\n');
    fls = fls.slice(0, -3);
    fileList.path = fls[3].split(':\\')[1].replace(/\r|\n/g, '')
    console.log(fileList.path)

    fls.map((item, index) => {
        let filestemp = item.split(/\s\s+/g);
        if (index > 3 && filestemp.length > 1  && (filestemp[3] !== '.\r' && filestemp[3] !== '..\r')) {
            if (filestemp[2] === '<DIR>') {
                fileList.catalogs.push({
                    date: filestemp[0],
                    time: filestemp[1],
                    type: 'dir',
                    name: filestemp[3],
                });
            } else {
                var ff = filestemp[2].match(/([а-яА-Я\w]+)\s(.*)/).splice(1)
                var tname = ff[1].split('.', 2)[0]
                var tExt = ff[1].split('.', 2)[1]
                fileList.files.push({
                    date: filestemp[0],
                    time: filestemp[1],
                    type: 'file',
                    size: ff[0],
                    name: tname,
                    ext: tExt,
                });
            }
        }
    });

    return fileList
    // return {catalogs: [], files: []}
}