/*$(document).ready(function(){
    // Utilisez une classe unique pour les boutons de déclenchement des popovers
    $('.popover-trigger').popover({
        html: true,
        title: "Ajouter un modèle",
        content: function() {
            // Utilisez `$(this)` pour obtenir le contenu spécifique au bouton cliqué
            return $(this).siblings('.popover-content').children().clone();
        }
    });

    $(document).on('click', function(e) {
        // Si le clic n'est pas sur le bouton déclencheur ni sur le contenu du popover
        if (!$(e.target).is('.popover-trigger, .popover-trigger *') && 
            !$(e.target).is('.popover-content, .popover-content *')) {
            // Masquez tous les popovers
            $('.popover-trigger').popover('hide');
        }
    });
});*/