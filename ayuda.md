# Cómo cambiar el texto de cada sección de la página
El html de cada sección de la página se encuentra en: `/_includes/secciones/`
Tienen un nombre descriptivo respecto al nombre de la sección.

**IMPORTANTE**: No tocar el código de `/index.html` para añadir algo a las secciones, este fichero contiene el código necesario para dar estructura.

# Cómo ver los cambios
Cada vez que modifiques y guardes uno de los ficheros desde prose.io tardará unos segundos (o minutos en el peor de los casos) en verse el cambio en la web. 

**IMPORTANTE**: Si el cambio no se reflejara en la web pasados unos minutos, puede haber ocurrido que haya algún error en el formato de los ficheros modificados. En ese caso llegará un correo a biko.isdi@gmail.com avisando del problema ocurrido.

Cada cambio en un fichero require que añadas un comentario con el que quedará registrado el cambio. Puedes usar el que pone por defecto o personalizarlo.

# Cómo cambiar las personas de voluntarios, formación y patronato
Los datos de las personas se encuentra en:
* `/data/voluntarios.yml`
* `/data/ayuda-formacion.yml`
* `/data/patronato.yml`

Las fotos están en: `/imgs/personas/`
Pulsa en el fichero `/imgs/personas/a-subir-imagen.md` para encontrar las instrucciones de cómo subir una nueva foto.

# Cómo cambiar los proyectos
Los datos de los proyectos de ayuda en acción y ashoka se encuentra en:
* `/_data/proyectos-ayuda-en-accion.yml`
* `/_data/proyectos-ashoka.yml`

Contienen todos los campos de un proyecto y se puede añadir, modificar y borrar libremente. **Mínimo debe existir un proyecto en cada fichero**.