
let reservation = document.getElementById('reservation') as HTMLDivElement;
let submit = document.querySelector('button[type=submit]');

function doResume(event) {
    event.preventDefault();
    let from = document.querySelector('select[name="skad"]') as HTMLSelectElement;
    let to = document.querySelector('select[name="dokad"]') as HTMLSelectElement;
    let fname = document.getElementById('fname') as HTMLInputElement;
    let sname = document.getElementById('sname') as HTMLInputElement;
    let date = document.getElementById('date') as HTMLInputElement;
    let pfrom = document.createElement('p');
    let pto = document.createElement('p');
    let pname = document.createElement('p');
    let pdate = document.createElement('p');
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