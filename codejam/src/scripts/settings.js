export function activeSize(links, size) {
    links.forEach((link) => {
        link.classList.remove('active');
    });

    links.forEach((link) => {
        if (+link.dataset.size === size) {
            link.classList.add('active');
        }
    });
}

export function soundPlay() {
    const audio = new Audio('./assets/whoosh.mp3');
    audio.play();
}
