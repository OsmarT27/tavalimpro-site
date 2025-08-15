document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do DOM
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const contactForm = document.getElementById('contact-form');
    const video = document.getElementById('hero-video');
    const muteBtn = document.getElementById('mute-btn');
    const playPauseBtn = document.getElementById('play-pause-btn');

    // Adiciona o evento de clique para o botão do menu móvel
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Fecha o menu móvel ao clicar em um link de navegação
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Impede o envio do formulário e mostra uma mensagem de demonstração
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formMessage = document.createElement('div');
            formMessage.textContent = 'Formulário de demonstração — conecte a um serviço de e-mail ou WhatsApp.';
            formMessage.className = 'mt-4 p-4 rounded-xl bg-yellow-600 text-white text-center';
            contactForm.appendChild(formMessage);

            // Remove a mensagem após alguns segundos
            setTimeout(() => {
                if (formMessage) {
                    formMessage.remove();
                }
            }, 5000);
        });
    }

    // Adiciona a funcionalidade de mutar/desmutar o vídeo
    if (video && muteBtn) {
        // Inicializa o vídeo como mudo e com ícone de mudo
        let isMuted = video.muted;
        const muteIcon = `<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.81 5 3.54 5 6.71s-2.11 5.9-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>`;
        const unmuteIcon = `<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.47 21 13.28 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.81 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.41.33-.88.62-1.4 0L14 16.73V20l4-4.01 1.05 1.05-1.48 1.48c-1.74 1.4-3.55 2.13-5.57 2.23V20l-1.45-1.45L3 17.73 1.73 19 3 20.27l1.73 1.73L6.27 20 20 6.27 18.73 5 4.27 19zM14 3.23v2.06c2.89.81 5 3.54 5 6.71s-2.11 5.9-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>`;

        function updateMuteIcon() {
            if (video.muted) {
                muteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">${unmuteIcon}</svg>`;
            } else {
                muteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">${muteIcon}</svg>`;
            }
        }
        updateMuteIcon();

        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            updateMuteIcon();
        });
    }

    // Adiciona a funcionalidade de play/pause
    if (video && playPauseBtn) {
        const playIcon = `<path d="M8 5v14l11-7z"/>`;
        const pauseIcon = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`;
        
        function updatePlayPauseIcon() {
            if (video.paused) {
                playPauseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">${playIcon}</svg>`;
            } else {
                playPauseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">${pauseIcon}</svg>`;
            }
        }
        updatePlayPauseIcon();

        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
            updatePlayPauseIcon();
        });
    }
});
