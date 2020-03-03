const electron = window.require('electron');
const {execSync} = electron.remote.require('child_process');
const iconv  = electron.remote.require('iconv-lite')
const os = electron.remote.require('os').platform();


export function getDrivesSync() {
    let drt;
    let drives = [];

    if (os === 'linux'){
        let result = electron.remote.require('child_process').execSync('lsblk --fs --ascii -b -m');
        result = iconv.decode(result, 'UTF-8')
        drt = result.split('\n');
        drt.shift();
        drt.map((item, index) => {
            let drivestemp = item.replace('|-', '')
                .replace('|-', '')
                .replace('`-', '')
                .replace(/\s+/g, '&#')
                .split('&#');
            if(drivestemp.length === 9){
                drivestemp.splice(2, 0, 'No label')
            }
            if(drivestemp.length === 10 && !drivestemp[4].includes('[SWAP]') && !drivestemp[4].includes('/boot')){
                drives.push({
                    Caption: drivestemp[0].replace('sd', '').replace(/\d{1,2}/, ''),
                    Description: drivestemp[2],
                    DeviceId: drivestemp[4],
                    DriveType: '',
                    FileSystem: drivestemp[1],
                    FreeSpace: 0,
                    Name: drivestemp[0],
                    Size: drivestemp[6],
                    VolumeName: drivestemp[5],
                });
            }
            if (drivestemp[0]){

            }
        });
    }
    if (os === 'win32'){
        let result = electron.remote.require('child_process').execSync('wmic logicaldisk get deviceid, volumename, description, Caption, Size, FreeSpace, FileSystem, Name, DriveType');
        result = iconv.decode(result, 'cp1125')
        // console.log(result)
        drt = result.split('\n');
        drt.map((item, index) => {
            let drivestemp = item.split(/\s\s+/g);
            if (drivestemp[0] !== '' && index !== 0){
                drives.push({
                    Caption: drivestemp[0],
                    Description: drivestemp[1],
                    DeviceId: drivestemp[2],
                    DriveType: drivestemp[3],
                    FileSystem: drivestemp[4],
                    FreeSpace: drivestemp[5],
                    Name: drivestemp[6],
                    Size: drivestemp[7],
                    VolumeName: drivestemp[8],
                });
            }
        });
    }

    return drives.sort((a, b) => {
        if(a.Caption > b.Caption) return 1
        if(a.Caption === b.Caption) return 0
        if(a.Caption < b.Caption) return -1
    })
}