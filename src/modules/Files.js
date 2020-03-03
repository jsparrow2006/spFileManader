const electron = window.require('electron');
const {execSync} = electron.remote.require('child_process');
const iconv  = electron.remote.require('iconv-lite');
const os = electron.remote.require('os').platform();


export function getFilesSync(path) {
    let fls;
    let fileList = {
        path: '',
        catalogs: [],
        files: [],
    };

    if (os === 'linux'){
        console.log('ddd', path.replace(/\/+/g, '\/'))
        try {
            var result = electron.remote.require('child_process').execSync(`cd ${path.replace(/\/+/g, '\/')} && pwd && ls -l -F -S --time-style="+%Y-%m-%d %H:%M:%S"`);
        } catch (e) {
            console.log(e)
            return {catalogs: [], files: []}
        }

        result = iconv.decode(result, 'UTF-8')
        fls = result.split('\n');
        console.log(fls)
        fileList.path = fls[0];
        let filestemp = fls.map((item, index) => {
            return item.replace(/\s+/g, '&#').split('&#');
        });

        filestemp.forEach(el => {
            if(el.length === 8){
                console.log(el)
                if (el[7][el[7].length-1] === '/') {
                    fileList.catalogs.push({
                        date: el[5],
                        time: el[6],
                        type: 'dir',
                        name: el[7].slice(0, -1),
                    });
                }else {
                    // var ff = el[7].match(/([а-яА-Я\w]+)\s(.*)/).splice(1)
                    var tname = el[7].split('.', 2)[0]
                    var tExt = el[7].split('.', 2)[1]
                    fileList.files.push({
                        date: el[5],
                        time: el[6],
                        type: 'file',
                        size: el[4],
                        name: tname,
                        ext: tExt,
                    });
                }
            }
        })

        console.log(fileList)
    }

    if (os === 'win32'){
        try {
            var result = electron.remote.require('child_process').execSync(`DIR "${path}"\\ /O /-C /n`);
        } catch (e) {
            return {catalogs: [], files: []}
        }
        result = iconv.decode(result, 'cp1125')
        fls = result.split('\n');
        fls = fls.slice(0, -3);
        fileList.path = fls[3].split(':\\')[1].replace(/\r|\n/g, '')

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
    }

    return fileList
}