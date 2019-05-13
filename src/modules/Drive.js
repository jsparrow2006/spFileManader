const electron = window.require('electron');
const {execSync} = electron.remote.require('child_process');
const iconv  = electron.remote.require('iconv-lite')


export const driveEvent = (function(){
    var topics = {};

    return {
        subscribe: function(topic, listener) {
            // создаем объект topic, если еще не создан
            if(!topics[topic]) topics[topic] = { queue: [] };

            // добавляем listener в очередь
            var index = topics[topic].queue.push(listener) -1;

            // предоставляем возможность удаления темы
            return {
                remove: function() {
                    delete topics[topic].queue[index];
                }
            };
        },
        publish: function(topic, info) {
            // если темы не существует или нет подписчиков, не делаем ничего
            if(!topics[topic] || !topics[topic].queue.length) return;

            // проходим по очереди и вызываем подписки
            var items = topics[topic].queue;
            items.forEach(function(item) {
                item(info || {});
            });
        }
    };
})();


export function getDrivesSync() {
    let drt;
    let drives = [];

    // var iconv = new iconv('windows-1251', 'utf-8')
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
                // VolumeName: iconv.decode(iconv.encode(drivestemp[8], 'win1251'), 'win1251')
                VolumeName: drivestemp[8],
                // VolumeName: iconv.decode(iconv.encode(drivestemp[8], 'CP1252'), 'utf8').toString()
            });
        }
    });

    return drives
}