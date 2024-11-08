function confirmarLocalizacao() {
    // Exibe o modal de confirmação
    document.getElementById("modal-confirmacao").style.display = "flex";
}

function coletarCoordenadas() {
    // Fecha o modal e prossegue com a coleta de coordenadas
    document.getElementById("modal-confirmacao").style.display = "none";
    enviarLocalizacao();
}

function cancelarEnvio() {
    // Fecha o modal e exibe uma mensagem informando que o cliente deve estar no local correto
    document.getElementById("modal-confirmacao").style.display = "none";
    alert("Por favor, nos envie as coordenadas assim que estiver no local correto.");
}

function enviarLocalizacao() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(abrirWhatsApp, erroLocalizacao);
    } else {
        alert("Geolocalização não é suportada pelo seu navegador.");
    }
}

function abrirWhatsApp(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Gera o link do Google Maps com as coordenadas
    const linkGoogleMaps = `https://www.google.com/maps?q=${latitude},${longitude}`;
    
    // Gera o link para traçar rota até a localização do cliente
    const linkTraçarRota = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    // Formata a mensagem para o WhatsApp com os links do Google Maps
    const mensagem = `Olá! Aqui está a minha localização solicitada:\nLatitude: ${latitude}\nLongitude: ${longitude}\nVeja no mapa: ${linkGoogleMaps}\nTraçar rota até o cliente: ${linkTraçarRota}`;

    // Codifica a mensagem e gera o link para o WhatsApp
    const linkWhatsApp = `https://wa.me/5577981192617?text=${encodeURIComponent(mensagem)}`;

    // Redireciona o cliente para o WhatsApp com a mensagem pronta
    window.location.href = linkWhatsApp;

    // Exibe a mensagem de agradecimento
    exibirMensagemAgradecimento();
}

function exibirMensagemAgradecimento() {
    const mensagemAgradecimento = document.getElementById("mensagem-agradecimento");
    mensagemAgradecimento.style.display = "block";
}

function erroLocalizacao() {
    alert("Não foi possível obter a localização. Verifique as permissões de localização do seu dispositivo.");
}
