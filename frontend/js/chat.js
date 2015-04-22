// Connexion à socket.io
var socket = io.connect('http://localhost:8080');

console.log('coucou');

// On demande le pseudo, on l'envoie au serveur et on l'affiche dans le titre
var pseudo = prompt('Quel est votre pseudo ?');
socket.emit('nouveau_client', pseudo);
document.title = pseudo + ' - ' + document.title;

// Quand on reçoit un message, on l'insère dans la page
socket.on('message', function(data) {
    insereMessage(data.pseudo, data.message)
})

// Quand un nouveau client se connecte, on affiche l'information
socket.on('nouveau_client', function(pseudo) {
    $('#zone_chat').prepend('<p><em>' + pseudo + ' a rejoint le Chat !</em></p>');
})

// Lorsqu'on envoie le formulaire, on transmet le message et on l'affiche sur la page
$('#formulaire_chat').submit(function () {
    var message = $('#message').val();
    socket.emit('message', message); // Transmet le message aux autres
    insereMessage(pseudo, message); // Affiche le message aussi sur notre page
    $('#message').val('').focus(); // Vide la zone de Chat et remet le focus dessus
    return false; // Permet de bloquer l'envoi "classique" du formulaire
});
            
// Ajoute un message dans la page
function insereMessage(pseudo, message) {
    $('#zone_chat').prepend('<p><strong>' + pseudo + '</strong> ' + message + '</p>');
}