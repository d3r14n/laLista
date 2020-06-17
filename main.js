// @author Derian Jair Hernández Lira

//Activamos el localstorage si no existe
if (localStorage.getItem("ll_categorias") == null)
{
	localStorage.setItem("ll_categorias", "Principal");
	localStorage.setItem("ll_colorCategoria", "#431296");
	localStorage.setItem("ll_elementos", null);
	localStorage.setItem("ll_categoriaElemento", null);
	localStorage.setItem("ll_info", null);
}

//Variables Globales
var categoria = localStorage.getItem("ll_categorias").split(";");
var elemento = localStorage.getItem("ll_elementos").split(";");
var categoriaElemento = localStorage.getItem("ll_categoriaElemento").split(";");
var info = localStorage.getItem("ll_info").split(";");

var categoriaActual = null;
var elementosActuales = currentElements(categoriaActual);

/*
AZUp: Orden Alfabetico
RECUp: Orden por Recientes
	//True: Ordenar de mayor a menor (Más reciente)
	//False: Ordenar de menor a mayor (Menos reciente)
*/
var AZUp = true;
var RECUp = false;

showList();
showCategories();

//Escucha Eventos para los distintos elementos interactuables
document.getElementById('btnAnadir').addEventListener("click", displayNewElement); //Botón para mostrar el modal para agregar elementos a la lista
document.getElementById('categoria_p').addEventListener("click", function(){selectCategory(null)}); //Botón para mostrar la pagina principal
document.getElementById('categoria_n').addEventListener("click", displayNewCategory); //Botón para mostrar el modal para agregar categorias
document.getElementById('categoria_c').addEventListener("click", displayOptions); //Botón para mostrar el modal de opciones

document.getElementById('btnConfig').addEventListener("click", displayOptions); //Botón para mostrar el modal de opciones

document.getElementById('ordenAlf').addEventListener("click", orderAZ); //Botón para ordenar alfabeticamente
document.getElementById('ordenRec').addEventListener("click", orderREC); //Botón para ordenar por recientes
document.getElementById('btnAzar').addEventListener("click", selectRandom); //Botón para seleccionar al azar

document.getElementById('btnCerrarNuevaCategoria').addEventListener("click", closeNewCategory); //Botón para cerrar el modal de nueva categoria
document.getElementById('btnCerrarNuevoElemento').addEventListener("click", closeNewElement); //Botón para cerrar el modal de nuevo elemento
document.getElementById('btnCerrarElemento').addEventListener("click", closeInfo); //Botón para cerrar el modal de información
document.getElementById('btnCerrarOpciones').addEventListener("click", closeOptions); //Botón para cerrar el modal de opciones

document.getElementById('btnAgregarNuevaCategoria').addEventListener("click", addCategory); //Botón para añadir una categoria
document.getElementById('btnAgregarNuevoElemento').addEventListener("click", addElement); //Botón para añadir un elemento

document.getElementById('btnCompletarElemento').addEventListener("click", removeElement) //Botón para eliminar un elemento completado

document.getElementById('menuHamburguesa').addEventListener("click", showMenu); //Botón para mostrar el menu lateral

document.getElementById('sombra').addEventListener("click", closeAll); //Cierra todos los modales al tocar fuera de este

function currentElements(category)
{
	reloadGlobals();
	var ce = Array(2);
	ce[0] = Array();
	ce[1] = Array();
	x = 0;
	for (i = 0; i < elemento.length; i++)
	{
		if (categoriaElemento[i] == category)
		{
			ce[0][x] = elemento[i];
			ce[1][x] = i;
			x++;
		}
	}
	console.log(ce);
	return ce;
}

function reloadGlobals()
{
	categoria = localStorage.getItem("ll_categorias").split(";");
	elemento = localStorage.getItem("ll_elementos").split(";");
	categoriaElemento = localStorage.getItem("ll_categoriaElemento").split(";");
	info = localStorage.getItem("ll_info").split(";");
}

function showList()
{
	if (categoriaActual != null)
	{
		elementosActuales = currentElements(categoriaActual);
		if (elementosActuales[0].length > 0)
		{
			document.getElementById('lista').innerHTML = "";
			for (i = 0; i < elementosActuales[0].length; i++)
			{
				document.getElementById('lista').innerHTML += "<p id='p" + i + "' class='elementoLista' onclick='selectThis(" + elementosActuales[1][i] + ")'>" + elementosActuales[0][i] + "</p>";
			}
		}
		else
		{
			document.getElementById('lista').innerHTML = "No hay elementos agregados en esta categoria. Utiliza la \"+\" en la esquina superior derecha para agregar nuevos elementos.";
		}
	}
	else
	{
		document.getElementById('lista').innerHTML = "Bienvenido a \"LA LISTA\". Esta App te permitirá recopilar todos los pendientes que tienes y categorizarlos. Sólo te advierto, la lista nunca acaba.";
	}
}

function showCategories()
{
	reloadGlobals();
	if(categoria.length >= 2)
	{
		menu = document.getElementById('categoriasMenu');
		for(i = 1; i < categoria.length; i++)
		{
			menu.innerHTML += "<button id='categoria_" + i + "' class='categoria gray_btn' onclick='selectCategory(this.innerHTML)'>" + categoria[i] + "</button>";
		}
	}
}

function selectThis(selectedElementID)
{
	console.log(selectedElementID);
	displayInfo(selectedElementID);
}

function selectCategory(selectedCategory)
{
	categoriaActual = selectedCategory;
	document.getElementById("txtCategoria").innerHTML = selectedCategory != null ? selectedCategory : "La Lista";
	document.getElementById("categoriaNuevoElemento").value = selectedCategory;
	showList();
	closeMenu();
}

function displayInfo(idElemento)
{
	document.getElementById('elemento').classList.remove("hidden");
	document.getElementById('sombra').classList.remove("hidden");

	document.getElementById('tituloElemento').innerHTML = elemento[idElemento];
	document.getElementById('descripcionElemento').innerHTML = info[idElemento];
}

function displayNewCategory()
{
	closeMenu();
	document.getElementById('nuevaCategoria').classList.remove("hidden");
	document.getElementById('sombra').classList.remove("hidden");
}

function displayNewElement()
{
	closeMenu();
	document.getElementById('nuevoElemento').classList.remove("hidden");
	document.getElementById('sombra').classList.remove("hidden");
}

function displayOptions()
{
	underConstruction();
}

function orderAZ()
{
	underConstruction();
	/*
	elements = currentElements()
	sorted = false;
	while (!sorted)
	{
		sorted = true;
		for (x = 0; x < elements.length - 1; x++)
		{
			if (elements[x].toLowerCase() > elements[x + 1].toLowerCase())
			{
				sorted = false;

				tempP = elements[x];
				elements[x] = elements[x + 1];
				elements[x + 1] = tempP;

				tempI = info[x];
				info[x] = info[x + 1];
				info[x + 1] = tempI;
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
		elements.reverse();
		info.reverse();
	}
	showList();
	AZUp = !AZUp;
	*/
}

function orderREC()
{
	underConstruction();
	/*
	elements = currentElements()
	if (RECUp)
	{
		document.getElementById('ordenRec').innerHTML = "Agregado ↓";
	}
	else
	{
		document.getElementById('ordenRec').innerHTML = "Agregado ↑";
		elements.reverse();
		info.reverse();
	}
	showList();
	RECUp = !RECUp;
	*/
}

function selectRandom()
{
	underConstruction();
	/*
	if (elementosActuales[0].length > 1)
	{
		n = randomNumber(elementosActuales[0].length - 1, 1);
		document.getElementById('elemento').innerHTML = pelicula[n];
	}
	else
	{
		alert("No se han añadido elementos");
	}
	*/
}

function randomNumber(max, min = 0)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function closeNewCategory()
{
	document.getElementById('nuevaCategoria').classList.add("hidden");
	document.getElementById('sombra').classList.add("hidden");
}

function closeNewElement()
{
	document.getElementById('nuevoElemento').classList.add("hidden");
	document.getElementById('sombra').classList.add("hidden");
}

function closeInfo()
{
	document.getElementById('elemento').classList.add("hidden");
	document.getElementById('sombra').classList.add("hidden");
}

function closeOptions()
{
	underConstruction();
}

function addCategory()
{
	categoryTitle = document.getElementById('nombreCategoria').value;
	categoryColor = document.getElementById('colorCategoria').value;
	if (confirm("¿Seguro que desea agregar la categoría \"" + categoryTitle + "\"?"))
	{
		localStorage.setItem("ll_categorias", localStorage.getItem("ll_categorias") + ";" + categoryTitle);
		localStorage.setItem("ll_colorCategoria", localStorage.getItem("ll_colorCategoria") + ";" + categoryColor);

		alert("Categoría añadida");
		document.getElementById('nombreCategoria').value = "";
		document.getElementById('colorCategoria').value = "#000000";
		document.getElementById('ordenRec').innerHTML = "Agregado ↓";
		RECUp = false;
		closeNewCategory();
		showList();
		showCategories();
	}
}

function addElement()
{
	elementTitle = document.getElementById('nombreNuevoElemento').value;
	elementCategory = categoriaActual;
	elementInfo = document.getElementById('descripcionNuevoElemento').value;
	if(elementCategory != null)
	{
		if(elementTitle != "" && elementInfo != "")
		{
			if (confirm("¿Seguro que desea agregar el elemento \"" + elementTitle + "\" a la lista \"" + elementCategory + "\"?"))
			{
				localStorage.setItem("ll_elementos", localStorage.getItem("ll_elementos") + ";" + elementTitle);
				localStorage.setItem("ll_categoriaElemento", localStorage.getItem("ll_categoriaElemento") + ";" + elementCategory);
				localStorage.setItem("ll_info", localStorage.getItem("ll_info") + ";" + elementInfo);

				alert("Elemento añadido");
				document.getElementById('nombreNuevoElemento').value = "";
				document.getElementById('categoriaNuevoElemento').value = "";
				document.getElementById('descripcionNuevoElemento').value = "";
				document.getElementById('ordenRec').innerHTML = "Agregado ↓";
				RECUp = false;
				closeNewElement();
				showList();
			}
		}
		else
		{
			alert("Favor de llenar todos los campos.");
		}
	}
	else
	{
		alert("No hay una categoría seleccionada. Escoge una categoria del menú lateral e intenta agregar el elemento nuevamente.");
		closeNewElement();
	}
}

function removeElement()
{
	underConstruction();
}

function showMenu()
{
	document.getElementById("menu").style.left = "0";
	document.getElementById("sombra").classList.remove("hidden");
}

function closeMenu()
{
	document.getElementById("menu").style.left = "-50vw";
	document.getElementById("sombra").classList.add("hidden");
}

function closeAll()
{
	closeMenu();
	closeNewCategory();
	closeNewElement();
	closeInfo();
}

function underConstruction()
{
	alert("Esta sección sigue en construcción. Lamentamos las molestias.\nEspera nuevas funcionalidades en la proxima versión.");
}