const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'styles');
let allContent = "";
const bundlePath = path.join(__dirname, 'project-dist/bundle.css');


(async() => {

    const files = await fs.promises.readdir(filePath, { withFileTypes: true });
    for( let item of files){
        if ( item.isFile() && item.name.slice(-3) === "css" ){
            allContent = allContent + await fs.promises.readFile(path.join(filePath, item.name), { encoding: 'utf8' });
        }
    }

    let content = await fs.promises.writeFile(bundlePath, allContent);
    //console.log( "styles, stat ", await fs.promises.stat(filePath));
    //console.log( "bundle css, stat ", await fs.promises.stat(bundlePath));

})();