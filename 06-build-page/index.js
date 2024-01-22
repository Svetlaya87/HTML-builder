const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'styles');
let allContent = "";
const projectDistPath = path.join(__dirname, 'project-dist');
const stylePath = path.join( projectDistPath, 'style.css');
const assetsPathNew = path.join( projectDistPath, 'assets');
const assetsPathCurr = path.join(__dirname, 'assets');
const templatePath = path.join(__dirname, 'template.html');
const componentsPath  = path.join(__dirname, 'components');
const indexHtmlPath = path.join(projectDistPath, "index.html");


(async() => {
    let projectDist = await fs.promises.mkdir( projectDistPath, {recursive: true} ); // create project-dist
    const files = await fs.promises.readdir(filePath, { withFileTypes: true });
    for( let item of files){
        if ( item.isFile() && item.name.slice(-3) === "css" ){
            allContent = allContent + await fs.promises.readFile(path.join(filePath, item.name), { encoding: 'utf8' });
        }
    }

    let content = await fs.promises.writeFile(stylePath, allContent);//agregating all css in style.css
    //console.log( "styles, stat ", await fs.promises.stat(filePath));
    //console.log( "bundle css, stat ", await fs.promises.stat(bundlePath));
    let assetsDir =  await fs.promises.mkdir( assetsPathNew, {recursive: true} );
    const filesAssets = await fs.promises.readdir(assetsPathNew, { withFileTypes: true });
    for( let item of filesAssets){
        if ( item.isFile() ){
            await fs.promises.unlink(path.join(assetsPathNew, item.name));
        }
    }


    const filesToCopyAssets = await fs.promises.readdir(assetsPathCurr, { withFileTypes: true });

    for( let item of filesToCopyAssets){ 
       //copying all subdirectories and files
        if ( item.isFile() ){
          await fs.promises.copyFile(path.join(assetsPathCurr, item.name), path.join(assetsPathNew, item.name));
        }else{

            let newSubDirPath = path.join( assetsPathNew, item.name);
            let SubDirPath = path.join(assetsPathCurr, item.name);
            let subDir = await fs.promises.readdir(SubDirPath, { withFileTypes: true });
            await fs.promises.mkdir( newSubDirPath, {recursive: true} );

            for (let item of subDir){
                //console.log("SubDir item", item.name);
                //console.log("SubDirPath ", SubDirPath);
                await fs.promises.copyFile(path.join( SubDirPath, item.name), path.join( newSubDirPath, item.name));

            }

        }
    }

    let contentTemplate = await fs.promises.readFile(templatePath, 'utf-8');
    let res = contentTemplate.match(/{{([^}]+)}}/g).filter(el=> el !== "{" || el !== "}");
    //console.log("contentTemplate ", contentTemplate);
    //console.log("res ", res);

    let writeHtmlContent = await fs.promises.writeFile(indexHtmlPath, contentTemplate);
    let readHtmlContent =  await fs.promises.readFile(indexHtmlPath, 'utf-8');

    let componetsFiles = await fs.promises.readdir(componentsPath, { withFileTypes: true });
    //console.log("componetsFiles ", componetsFiles, typeof componetsFiles );
    let newTemplateContent = readHtmlContent;
    for( let item of componetsFiles){
        //console.log(item.name.slice(0,-5));
        //console.log( readHtmlContent.includes( item.name.slice(0,-5)) );
        if( readHtmlContent.includes( item.name.slice(0,-5))){
            let chunkToReplacePath = path.join(componentsPath, item.name);
            let chunkToReplace = await fs.promises.readFile(chunkToReplacePath, 'utf-8');
            //console.log("chunkToReplace ", chunkToReplace);
            newTemplateContent = newTemplateContent.replace(`{{${item.name.slice(0,-5)}}}`, chunkToReplace);
            //maybe change replace to replaceAll method, if it is neccessary
            await fs.promises.writeFile(indexHtmlPath, newTemplateContent);
        }

    }


})();