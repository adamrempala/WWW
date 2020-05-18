import * as fs from 'fs';
import { promisify } from 'util';

let open = promisify(fs.open);
let write = promisify(fs.write);
let close = promisify(fs.close);

async function zapiszCos() {
    let fd = -1;
    try {
        fd = await open('plik3.txt', 'a');
        await write(fd, 'To jeszcze z async/await');
        await close(fd);
    } catch (e) {
        console.log('Jakiś błąd zapisu', e);
        if (fd != -1) {
            await close(fd);
        }
    }
}

zapiszCos();
zapiszCos();