const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'secret-folder');

fs.readdir(filePath, { withFileTypes: true }, function(err, files){
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    for( let item of files){
        if ( item.isFile() ){
            let extension = path.extname(item.name).slice(1);
            let fileName = path.parse(item.name).name;
            fs.stat(path.join(filePath, item.name), function(err, stats){
                if (err) {
                    return console.log('Unable to read file stats: ' + err);
                } 
                console.log(`${fileName} - ${extension} - ${stats.size} b`); 
            });
        }
    }
});