# Minneapolis: Violencia Policial y Racismo

Visualización de los datos disponibles en [kaggle](https://www.kaggle.com/paultimothymooney/minneapolis-police-stops-and-police-violence) sobre violencia policial en la ciudad de Minneapolis. Puedes revisar la visualización [aquí](https://puc-infovis.github.io/version-2020/salon_de_la_fama/Gui%C3%B1ez_Francisco/Visualizaci%C3%B3n/index.html).

_Read this in other languages: [🇪🇸Español](https://github.com/fguinez/minneapolis-police-use-of-force/blob/main/README.md), [🇬🇧English](https://github.com/fguinez/minneapolis-police-use-of-force/blob/main/README.eng.md)._

[![Previsualización](https://i.imgur.com/tM4rTQf.png)](https://puc-infovis.github.io/version-2020/salon_de_la_fama/Gui%C3%B1ez_Francisco/Visualizaci%C3%B3n/index.html)

_Desarrollado en 2020 en el contexto del exámen final del curso Visualización de Información (IIC2026) de la Pontificia Universidad Católica de Chile_

## Instrucciones de uso local

Para abrir la visualización localmente, es necesario levantar un servidor local dentro de la carpeta que contiene todos los archivos de la visualización con:
```
python3 -m http.server
```

Luego, hay que dirigirse a `http://0.0.0.0:8000/` desde el navegador.

* **Nota:** Si intenta abrir directamente el archivo `index.html` en el navegador muy probablemente no se visualizará todo el contenido por el [error CORS](https://developer.mozilla.org/es/docs/Web/HTTP/CORS/Errors/CORSRequestNotHttp?utm_source=devtools&utm_medium=firefox-cors-errors&utm_campaign=default).

## Tareas pendientes

A continuación se presenta una lista de ideas para mejorar la visualización que aun no se han implementado:

- _Tooltip_ que detalle todos los porcentajes al realizar _hover_ sobre el apartado de "Otros"
- Añadir la opción de traducir los textos de la visualización a inglés

¿Quieres concretar una de estas ideas? ¡Adelante, realiza un fork de este repositorio!

## Links

- Visualization in operation: https://puc-infovis.github.io/version-2020/salon_de_la_fama/Gui%C3%B1ez_Francisco/Visualización/
- Kaggle dataset: https://www.kaggle.com/paultimothymooney/minneapolis-police-stops-and-police-violence
- Kaggle visualization notebook: https://www.kaggle.com/fguinez/visualization-minneapolis-police-violence
