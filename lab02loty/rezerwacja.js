var reservation = document.getElementById('reservation');
var submit = document.querySelector('button[type=submit]');
function doResume(event) {
    event.preventDefault();
    var from = document.querySelector('select[name="skad"]');
    var to = document.querySelector('select[name="dokad"]');
    var fname = document.getElementById('fname');
    var sname = document.getElementById('sname');
    var date = document.getElementById('date');
    var pfrom = document.createElement('p');
    var pto = document.createElement('p');
    var pname = document.createElement('p');
    var pdate = document.createElement('p');
    pfrom.innerHTML = "From: " + from.value;
    pto.innerHTML = "To: " + to.value;
    pname.innerHTML = "Name: " + sname.value + ", " + fname.value;
    pdate.innerHTML = "Date: " + date.value;
    reservation.appendChild(pfrom);
    reservation.appendChild(pto);
    reservation.appendChild(pname);
    reservation.appendChild(pdate);
    reservation.style.display = 'block';
}
submit.addEventListener('click', doResume, false);
