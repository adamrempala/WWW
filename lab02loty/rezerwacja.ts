
let reservation = document.getElementById('reservation') as HTMLDivElement;
let submit = document.querySelector('button[type=submit]');

function doResume(event) {
    event.preventDefault();
    const from = document.querySelector('select[name="skad"]') as HTMLSelectElement;
    const to = document.querySelector('select[name="dokad"]') as HTMLSelectElement;
    const fname = document.getElementById('fname') as HTMLInputElement;
    const sname = document.getElementById('sname') as HTMLInputElement;
    const date = document.getElementById('date') as HTMLInputElement;
    const pfrom = document.createElement('p');
    const pto = document.createElement('p');
    const pname = document.createElement('p');
    const pdate = document.createElement('p');
    pfrom.innerHTML = `From: ${from.value}`;
    pto.innerHTML = `To: ${to.value}`;
    pname.innerHTML = `Name: ${sname.value}, ${fname.value}`;
    pdate.innerHTML = `Date: ${date.value}`;
    reservation.appendChild(pfrom);
    reservation.appendChild(pto);
    reservation.appendChild(pname);
    reservation.appendChild(pdate);
    reservation.style.display = 'block';
}
submit.addEventListener('click', doResume, false);