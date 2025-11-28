// ============================
// Music / Sound files
// ============================
const song1 = new Audio('assets/music/song1.mp3');
const song2 = new Audio('assets/music/song2.mp3');
const countrySong = new Audio('assets/music/country_song.mp3');
const song3 = new Audio('assets/music/song3.mp3');
const clickSfx = new Audio('assets/music/click.mp3');
const surpriseSfx = new Audio('assets/music/surprise.mp3');

document.addEventListener('DOMContentLoaded', () => {

    // ===== INDEX.HTML =====
    if (document.querySelector('#mickeyButton')) {
        const mickeyButton = document.getElementById('mickeyButton');
        const mickey = document.getElementById('mickey');

        // Mickey walks for 3 sec then stops
        setTimeout(() => {
            mickey.classList.add('stopWalking');
            mickeyButton.style.display = 'block';
            song1.play();
        }, 3000);

        // Button click triggers surprise + songs
        mickeyButton.addEventListener('click', () => {
            clickSfx.play();
            surpriseSfx.play();
            song2.play();

            // Play country song after song2 ends
            song2.addEventListener('ended', () => {
                countrySong.play();
            });

            // Redirect to rating page after country song ends
            countrySong.addEventListener('ended', () => {
                window.location.href = 'rating.html';
            });
        });
    }

    // ===== RATING.HTML =====
    if (document.querySelector('#ratingBtn')) {
        const ratingInput = document.getElementById('ratingInput');
        const ratingBtn = document.getElementById('ratingBtn');

        ratingBtn.addEventListener('click', () => {
            const rating = parseInt(ratingInput.value);
            if (rating >= 1 && rating <= 5) {
                localStorage.setItem('userRating', rating);
                clickSfx.play();
                window.location.href = 'name.html';
            } else {
                alert('Please enter a number between 1-5');
            }
        });
    }

    // ===== NAME.HTML =====
    if (document.querySelector('#nameBtn')) {
        const nameInput = document.getElementById('nameInput');
        const nameBtn = document.getElementById('nameBtn');
        const finalBtn = document.getElementById('finalBtn');

        nameBtn.addEventListener('click', () => {
            const userName = nameInput.value.trim();
            if (userName) {
                localStorage.setItem('userName', userName);
                clickSfx.play();
                finalBtn.style.display = 'block';
            } else {
                alert('Please enter your name!');
            }
        });

        finalBtn.addEventListener('click', () => {
            clickSfx.play();
            const userName = localStorage.getItem('userName') || 'Buddy';
            alert(`Have a Great Day ${userName}! Thanks for using this website!`);
            song3.play();
        });
    }

    // ===== FINAL.HTML =====
    if (document.querySelector('#greeting')) {
        const greeting = document.getElementById('greeting');
        const userName = localStorage.getItem('userName') || 'Buddy';
        greeting.textContent = `Thanks for visiting, ${userName}!`;
        song3.play();
    }
});