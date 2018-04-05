
const fs            = require('fs'); 
const gulp          = require('gulp');
const path          = require('path');

const config        = require('../config');


///////////////////////////
//
// Taxonomy JS scope file 
// - Generates a file (HTML) containg each taxonomies JS namescope.
//
///////////////////////////

const getFiles = function (dir, files_){
    files_ = files_ || [];
    let files = fs.readdirSync(dir);
    for (let i in files){
        let name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}


const fileSizeOutput = function(){

        let     content         = '\n// FILESIZES - For styleguide dashboard\n\n/* \n   (i)-> Generated file - Gulp task: fab-filesize-data-generator.js \n*/ \n\n';
        const   pathToSrc       = path.join(__dirname, '../../src/ui');  

        const   outFilePath     = path.join(__dirname, '../../fabricator/src/data/UI.filesizes.js');
        const   inFilePath      = path.join(__dirname, '../../src/assets/scripts/inline/UI.inlineGeneratedJsScope.js');

        // Loop over taxonomies
        config.taxonomy.forEach(taxo =>  {
            const taxName  = taxo[0].toLowerCase();      // Name -> All in lower case "1-taxo"
            const taxFolder = 'Folder -> '+taxName+ '\n';
            const fileType = '.html';
            const files = [];
            const taxPath = pathToSrc + '/' + taxName;

            console.log(getFiles(taxPath))

            const taxFiles = getFiles(taxPath);

            content += taxFolder + '\n' + taxFiles + '\n';


            // https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j

            // GLOB
            //https://stackoverflow.com/questions/41462606/get-all-files-recursively-in-directories-nodejs

            // fs.readdirSync(taxPath).forEach(file => {
            //     console.log(file);
            //     const stats = fs.statSync(taxPath + '/' + file);
            //     const fileSizeInBytes = stats.size;

            //     if(path.extname(file)===fileType){
            //         content += file + ' ' +fileSizeInBytes+'\n';
            //     }

            // })




        });

        

        //content += fileSizeInBytes;

        return fs.writeFile(outFilePath, content, (error) => error && console.error('yoyo' +error));

}


// Fabricator default taxonomy file generation
gulp.task('fab-filesize:generate', function() {
    return fileSizeOutput();
});




            // // Check taxonomie folders
            // fs.readdir(taxPath, function(err,list){
            //     console.log(taxFolder);
                
            //     if(err) throw err;
            //     for(var i=0; i<list.length; i++)
            //     {
            //         //console.log('1. list[i] ' + list[i]); //print the file
            //         //console.log('1. fileType ' + fileType); //print the file
            //         //console.log('1. Extname'+path.extname(list[i]));
            //         content += 'yo ' + list[i];
            //         if(path.extname(list[i])===fileType)
            //         {
            //             console.log('2. HTML -> list[i] ' + list[i]); //print the file
            //             files.push(list[i]); //store the file name into the array files
            //             content += 'yoyo' + list[i];
            //         }
            //     }

            //     return files
            // });

            // console.log('files ' + files); //print the file



