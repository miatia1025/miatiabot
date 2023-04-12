const png = require('png-metadata');
const axios = require('axios');
const { response } = require('express');


function print_hello(){
    console.log("hello");
};

function print_miatia(){
    console.log("miatia!");
};

async function read_attachment_metadata(){

};

function parseMetadata(buffer){
    if(buffer.slice(0,8).toString("hex") === '89504e470d0a1a0a'){
        const chunkType = buffer.toString("ascii", 12,16);
        const chunkData = buffer.slice(16,24);

        if(chunkType === "IHDR"){
            const width = buffer.readUInt32BE(16);
            const height = buffer.readUInt32BE(20);

            return width, height;
        }
    }

    return null;
};

function png_to_info(){
    axios.get('https://cdn.discordapp.com/attachments/1086301396934074499/1094454740051574804/00000-20230409114619_linneamix_v74.png', {responseType: "arraybuffer"})
        .then(response => {
            const buffer = response.data;
            const metadata = parseMetadata(buffer);
            console.log(metadata);
        })
        .catch(e => {
            console.log(e);
        });
};

module.exports = {
    print_hello: print_hello,
    print_miatia: print_miatia,
    png_to_info: png_to_info,
};