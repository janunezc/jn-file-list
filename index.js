#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');
const { format } = require('date-fns');

// Recursive function to list all files in directory and subdirectories
const listFilesRecursively = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            listFilesRecursively(fullPath, fileList);
        } else {
            fileList.push(fullPath);
        }
    });
    return fileList;
};

const listFilesAndSave = async () => {
    const ora = (await import('ora')).default;
    const spinner = ora({
        text: 'Scanning directories and generating CSV...',
        spinner: 'dots',
        color: 'yellow'
    }).start();
        
    const currentDir = process.cwd();
    const allFiles = listFilesRecursively(currentDir);

    const fileStats = allFiles.map(file => {
        const stats = fs.statSync(file);
        return {
            path: file,
            accessTime: format(stats.atime, 'yyyy-MM-dd HH:mm:ss'),
            modifyTime: format(stats.mtime, 'yyyy-MM-dd HH:mm:ss')
        };
    });

    const sortedFiles = fileStats.sort((a, b) => new Date(b.modifyTime) - new Date(a.modifyTime));

    const csvWriter = createObjectCsvWriter({
        path: 'file-list.csv',
        header: [
            { id: 'path', title: 'PATH' },
            { id: 'accessTime', title: 'LAST ACCESS DATE' },
            { id: 'modifyTime', title: 'LAST MODIFICATION DATE' }
        ]
    });

    await csvWriter.writeRecords(sortedFiles)
        .then(() => {
            console.log('CSV file has been written successfully.')
            spinner.succeed('CSV file has been generated successfully.');
        });
};

listFilesAndSave().catch(err => console.error(err));
