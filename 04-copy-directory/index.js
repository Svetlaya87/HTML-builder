const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'files');
const filesCopy = path.join(__dirname, `files-copy`);

(async() => {
 
    await fs.promises.mkdir( filesCopy, {recursive: true} );
    const files = await fs.promises.readdir(filesCopy, { withFileTypes: true });
    for( let item of files){
        if ( item.isFile() ){
            await fs.promises.unlink(path.join(filesCopy, item.name));
        }
    }
/*
    fs.readdir( filesCopy, { withFileTypes: true }, function(err, files){
     
        for( let item of files){
            console.log(path.join(filesCopy, item.name));
            if ( item.isFile() ){

                fs.unlink( path.join(filesCopy, item.name), (err)=> {console.log()} );
            }
        }
    
    });*/

    const filesToCopy = await fs.promises.readdir(filePath, { withFileTypes: true });
    
    for( let item of filesToCopy){ 
        if ( item.isFile() ){
            await fs.promises.copyFile(path.join(filePath, item.name), path.join(filesCopy, item.name));
        }
    }

    /*
    let item =fs.readdir( filePath, { withFileTypes: true }, function(err, files){
    
        for( let item of files){
            console.log("item ", item.name);
            console.log("44-filesCopy ", filesCopy);
            if ( item.isFile() ){

                fs.copyFile( path.join(filePath, item.name), path.join(filesCopy, item.name), (err)=> {console.log()} );
                
            }
        }
    });*/

})();







