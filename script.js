const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieSelect = document.querySelector('#movie');

populateUI();
let ticketPrice = +movieSelect.value;

// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null) {
        seats.forEach((seat, seatIdx) => {
            if (selectedSeats.indexOf(seatIdx) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
const updateSelectedCount = function() {
    const selectedSeats = container.querySelectorAll('.selected');
    count.innerText = selectedSeats.length;
    total.innerText = `$${selectedSeats.length*ticketPrice}`;

    // Save selected seats
    const seatsIndex = [...selectedSeats].map(function(seat) {
        return [...seats].indexOf(seat);
    })

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value) 

    updateSelectedCount()
})

// Seat click event
container.addEventListener('click', ({target}) => {
    if (target.classList.contains('seat') && !target.classList.contains('occupied')) {
        target.classList.toggle('selected');
    }

    updateSelectedCount();
})

// Initial count and total set
updateSelectedCount();