function gestion_formulaire(vehicule)
	{
		var filter_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var filter_portable = /^(06|07)[0-9]{8}/gi;
		var filter_telephone = /^(01|02|03|04|05|08|09)[0-9]{8}/gi;
		var NOM=$("#nom_"+vehicule).val();
		var PRENOM=$("#prenom_"+vehicule).val();
		var EMAIL=$("#email_"+vehicule).val();
		var PORTABLE=$("#portable_"+vehicule).val();
		var HORAIRE=$("#horaire_"+vehicule+' option:selected').val();
		var MESSAGE=$("#message_"+vehicule).val();
		var VEHICULE=vehicule;
		var ITEMS=HORAIRE.split('|');
		var HEURE_DE_RDV='';
		var DEALERSHOP=$('#dealershop_'+vehicule).val();
		switch (ITEMS[0])
		{
			case '0' : {HEURE_DE_RDV='9 heure';break;}
			case '1' : {HEURE_DE_RDV='9 heure 30';break;}
			case '2' : {HEURE_DE_RDV='10 heure';break;}
			case '3' : {HEURE_DE_RDV='10 heure 30';break;}
			case '4' : {HEURE_DE_RDV='11 heure';break;}
			case '5' : {HEURE_DE_RDV='11 heure 30';break;}
			case '6' : {HEURE_DE_RDV='12 heure';break;}
			case '7' : {HEURE_DE_RDV='14 heure';break;}
			case '8' : {HEURE_DE_RDV='14 heure 30';break;}
			case '9' : {HEURE_DE_RDV='15 heure';break;}
			case '10' : {HEURE_DE_RDV='15 heure 30';break;}
			case '11' : {HEURE_DE_RDV='16 heure';break;}
			case '12' : {HEURE_DE_RDV='16 heure 30';break;}
			case '13' : {HEURE_DE_RDV='17 heure';break;}
			case '14' : {HEURE_DE_RDV='17 heure 30';break;}
			case '15' : {HEURE_DE_RDV='18 heure';break;}
			case '16' : {HEURE_DE_RDV='18 heure 30';break;}
		}
		if (NOM.length==0)
		{
			$("#erreur_nom_"+vehicule).fadeIn();
			setTimeout(function() {$("#erreur_nom_"+vehicule).fadeOut('slow') }, 5000);					
			document.getElementById('nom_'+vehicule).focus();
			return false; 
		}
		else
		{
			if (!filter_email.test(EMAIL)) 
			{
				$("#erreur_email_"+vehicule).fadeIn();
				setTimeout(function() {$("#erreur_email_"+vehicule).fadeOut('slow') }, 5000);					
				document.getElementById('email_'+vehicule).focus();
				return false; 
			}
			else
			{
				if (!filter_portable.test(PORTABLE))
				{
					$("#erreur_portable_"+vehicule).fadeIn();
					setTimeout(function() {$("#erreur_portable_"+vehicule).fadeOut('slow') }, 5000);					
					document.getElementById('portable_'+vehicule).focus();
					return false; 
				}
				else
				{
					if (HORAIRE.length==0)
					{
						$("#erreur_horaire_"+vehicule).fadeIn();
						setTimeout(function() {$("#erreur_horaire_"+vehicule).fadeOut('slow') }, 5000);					
						document.getElementById('horaire_'+vehicule).focus();
						return false; 
					}
					else
					{
						return true;
					}
				}
			}
		}
	}