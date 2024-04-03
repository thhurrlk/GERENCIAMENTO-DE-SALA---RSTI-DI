
document.getElementById("iniciar").addEventListener("click", displayDate);
function displayDate (){
    
    
    changeText("Seja bem vindo!");
    iniciarPrograma();
}


function objectToPlaintext(obj, indent = 0) {
    const indentation = '  '.repeat(indent);
    let plaintext = '';

    for (const key in obj) {
        if (Array.isArray(obj[key])) {
            plaintext += `${indentation}${key}:\n`;
            obj[key].forEach((item) => {
                if (typeof item === 'object') {
                    plaintext += objectToPlaintext(item, indent + 1);
                } else {
                    plaintext += `${indentation}  - ${item}\n`;
                }
            });
        } else if (typeof obj[key] === 'object') {
            plaintext += `${indentation}${key}:\n`;
            plaintext += objectToPlaintext(obj[key], indent + 1);
        } else {
            plaintext += `${indentation}${key}: ${obj[key]}\n`;
        }
    }
    return plaintext;
}


const plaintext = objectToPlaintext(obj);
console.log(plaintext);


function changeText(text){
    document.getElementById("output").innerText = text;
}



