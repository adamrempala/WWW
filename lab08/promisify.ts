import * as fs from 'fs';
import { promisify } from 'util';

let open = promisify(fs.open);
let write = promisify(fs.write);
let close = promisify(fs.close);

let fd;

open('plik.txt', 'a').then((_fd) => {
    fd = _fd;
    write(fd, 'A z promisami też się może zapisze?\n');
}).then(() => close(fd)).catch((reason) => {
    console.log('Błąd był straszliwy!, reason');
});