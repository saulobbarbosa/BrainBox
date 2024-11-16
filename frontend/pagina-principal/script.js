const sliders = document.querySelectorAll('.slider');
        const btnVoltar = document.getElementById('voltar');
        const btnProxima = document.getElementById('proxima');

        let currentSlide = 0;

        function escondeSlide() {
            sliders.forEach(slider => slider.classList.remove('on'));
        }

        function mostraSlide() {
            sliders[currentSlide].classList.add('on');
        }

        function proximoSlide() {
            escondeSlide();
            currentSlide = (currentSlide + 1) % sliders.length;
            mostraSlide();
        }

        function slideAnterior() {
            escondeSlide();
            currentSlide = (currentSlide - 1 + sliders.length) % sliders.length;
            mostraSlide();
        }

        btnVoltar.addEventListener('click', slideAnterior);
        btnProxima.addEventListener('click', proximoSlide);

        mostraSlide(); // Mostra o primeiro slide inicialmente