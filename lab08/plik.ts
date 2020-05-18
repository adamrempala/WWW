import * as fs from 'fs';

fs.open('plik.txt', 'a', (err, fd) => {

    if (err) {

        console.log('Nie udało się otworzyć pliku :(', err);

        return;

    }

    fs.write(fd, 'Kolejny wpis do pliku!\n', (err, written,str) => {

        if (err) {

            console.log('Nie udało się zapisać', err);

        }

        fs.close(fd, () => {});

    });

});