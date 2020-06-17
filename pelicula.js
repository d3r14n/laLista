/*
// @author Derian Jair Hernández Lira

//Activamos el localstorage si no existe
if (localStorage.getItem("pelicula") == null)
{
	localStorage.setItem("pelicula", "No se han añadido películas");
	localStorage.setItem("info", null);
}

//Variables Globales
var pelicula = localStorage.getItem("pelicula").split(";");
var info = localStorage.getItem("info").split(";");
/*
AZUp: Orden Alfabetico
RECUp: Orden por Recientes
	//True: Ordenar de mayor a menor (Más reciente)
	//False: Ordenar de menor a mayor (Menos reciente)
*/
/*
var AZUp = true;
var RECUp = false;

showMovieList();

//Escucha Eventos para los distintos elementos interactuables
document.getElementById('btnInfo').addEventListener("click", displayInfo); //Botón para mostrar información (motivo) de la pelicula
document.getElementById('btnAnadir').addEventListener("click", displayNew); //Botón para mostrar el modal para agregar peliculas a la lista
document.getElementById('ordenAlf').addEventListener("click", orderAZ); //Botón para ordenar alfabeticamente
document.getElementById('ordenRec').addEventListener("click", orderREC); //Botón para ordenar por recientes
document.getElementById('xPelicula').addEventListener("click", strikeMovie); //Botón para marcar en lista la pelicula seleccionada
document.getElementById('btnAzar').addEventListener("click", selectRandom); //Botón para seleccionar al azar

document.getElementById('xNuevaP').addEventListener("click", closeNew); //Botón para cerrar el modal de nueva pelicula
document.getElementById('xMotivo').addEventListener("click", closeInfo); //Botón para cerrar el modal de información
document.getElementById('btnAgregarNuevaP').addEventListener("click", addMovie); //Botón para añadir una pelicula

function showMovieList()
{
	if (pelicula.length < 2)
	{
		document.getElementById('listaPeliculas').innerHTML = "<h2>" + pelicula[0] + "</h2>"
	}
	else
	{
		document.getElementById('listaPeliculas').innerHTML = "";
		for (i = 1; i < pelicula.length; i++)
		{
			document.getElementById('listaPeliculas').innerHTML += "<p id='p"+i+"' onclick='selectThis(this.innerHTML)'>" + pelicula[i] + "</p>";
		}
	}
}

function displayInfo()
{
	document.getElementById('motivo').classList.remove("hidden");
	document.getElementById('divPelicula').style.background = "#00394C";
	document.getElementById('divLista').style.background = "rgba(0, 0, 0, 0.6)";
	document.getElementById('divBotones').style.background = "#00394C";

	if(document.getElementById('pelicula').innerHTML != "")
	{
		IDP = pelicula.indexOf(document.getElementById('pelicula').innerHTML);
		document.getElementById('motivoT').innerHTML = pelicula[IDP];
		document.getElementById('motivoInfo').innerHTML = info[IDP];
	}
	else
	{
		document.getElementById('motivoT').innerHTML = "No hay ninguna película seleccionada";
		document.getElementById('motivoInfo').innerHTML = "";
	}
}

function displayNew()
{
	document.getElementById('nuevaP').classList.remove("hidden");
	document.getElementById('divPelicula').style.background = "#00394C";
	document.getElementById('divLista').style.background = "rgba(0, 0, 0, 0.6)";
	document.getElementById('divBotones').style.background = "#00394C";
}

function orderAZ()
{
	pelicula.shift();
	info.shift();
	sorted = false;
	while(!sorted)
	{
		sorted = true;
		for (x = 0; x < pelicula.length - 1; x++)
		{
			if (pelicula[x].toLowerCase() > pelicula[x+1].toLowerCase())
			{
				sorted = false;

				tempP = pelicula[x];
				pelicula[x] = pelicula[x+1];
				pelicula[x+1] = tempP;

				tempI = info[x];
				info[x] = info[x+1];
				info[x+1] = tempI;
			}
		}
	}
	if (AZUp)
	{
		document.getElementById('ordenAlf').innerHTML = "A-Z ↓";
	}
	else
	{
		document.getElementById('ordenAlf').innerHTML = "A-Z ↑";
		pelicula.reverse();
		info.reverse();
	}
	pelicula.unshift("No se han añadido películas");
	info.unshift(null);
	showMovieList();
	AZUp = !AZUp;
}

function orderREC()
{
	pelicula = localStorage.getItem("pelicula").split(";");
	info = localStorage.getItem("info").split(";");
	pelicula.shift();
	info.shift();
	if (RECUp)
	{
		document.getElementById('ordenRec').innerHTML = "Agregado ↓";
	}
	else
	{
		document.getElementById('ordenRec').innerHTML = "Agregado ↑";
		pelicula.reverse();
		info.reverse();
	}
	pelicula.unshift("No se han añadido películas");
	info.unshift(null);
	showMovieList();
	RECUp = !RECUp;
}

function strikeMovie()
{
	pelicula = localStorage.getItem("pelicula").split(";");
	info = localStorage.getItem("info").split(";");
	IDP = pelicula.indexOf(document.getElementById('pelicula').innerHTML);
	if(IDP > 0)
	{
		if(confirm("¿Desea eliminar \"" + pelicula[IDP] + "\" de la lista?"))
		{
			if(confirm("¿Está seguro?"))
			{
				movieString = "No se han añadido películas";
				infoString = "null";
				pelicula.splice(IDP, 1);
				info.splice(IDP, 1);
				for (i = 1; i < pelicula.length; i++)
				{
					movieString += ";" + pelicula[i];
					infoString += ";" + info[i];
				}
				localStorage.setItem("pelicula", movieString);
				localStorage.setItem("info", infoString);
				document.getElementById('pelicula').innerHTML = "";
				document.getElementById('ordenRec').innerHTML = "Agregado ↓";
				RECUp = false;
				showMovieList();
			}
		}
	}
	else
	{
		alert("No hay ninguna película seleccionada");
	}
}

function selectRandom()
{
	if (pelicula.length > 1)
	{
		n = randomNumber(pelicula.length - 1, 1);
		document.getElementById('pelicula').innerHTML = pelicula[n];
	}
	else
	{
		alert("No se han añadido películas");
	}
}

function closeNew()
{
	document.getElementById('nuevaP').classList.add("hidden");
	document.getElementById('divPelicula').style.background = "#99D2E5";
	document.getElementById('divLista').style.background = "rgba(255, 255, 255, 0.6)";
	document.getElementById('divBotones').style.background = "#99D2E5";
}

function closeInfo()
{
	document.getElementById('motivo').classList.add("hidden");
	document.getElementById('divPelicula').style.background = "#99D2E5";
	document.getElementById('divLista').style.background = "rgba(255, 255, 255, 0.6)";
	document.getElementById('divBotones').style.background = "#99D2E5";
}

function addMovie()
{
	movieT = document.getElementById('nombrePelicula').value;
	movieI = document.getElementById('motivoP').value;
	if(confirm("¿Seguro que desea agregar la película \""+movieT+"\"?"))
	{
		localStorage.setItem("pelicula", localStorage.getItem("pelicula") + ";" + movieT);
		localStorage.setItem("info", localStorage.getItem("info") + ";" + movieI);
		pelicula = localStorage.getItem("pelicula").split(";");
		info = localStorage.getItem("info").split(";");
		alert("Pelicula añadida");
		document.getElementById('nombrePelicula').value = "";
		document.getElementById('motivoP').value = "";
		document.getElementById('ordenRec').innerHTML = "Agregado ↓";
		RECUp = false;
		closeNew();
		showMovieList();
	}
}

function selectThis(movie)
{
	console.log(movie);
	document.getElementById('pelicula').innerHTML = movie;
}

function randomNumber(max, min=0)
{
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}
*/