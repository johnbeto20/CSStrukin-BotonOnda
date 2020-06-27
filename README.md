# CSStrukin-boton-onda

Este boton fue diseñado por
[@andrew.eugene](https://www.instagram.com/p/CAu-3qggz49/), pero me llamó la atención ver si podía hacer algo similar con HTML y CSS.

Para la construcción de este elemento es necesario tener un boton en html,

````html
<button id="btn" class="btn">Comenzar</button>
````
Pero en la construcción vi necesario agregar el texto en un <b>data-text</b> para facilitar la manipulación del texto como objeto.

````html
<button id="btn" class="btn" data-text="Comenzar!">
</button>

````
````css
.btn:before {
    content: attr(data-text);
}
````
Luego le aplico los estilos al gusto de uno.

![imagen boton](https://raw.githubusercontent.com/username/projectname/branch/path/to/img.png)

Ya lo que haremos sería construir el elemento SVG que simulará nuestro efecto onda (puede ser hasta un div, yo por que lo quería con SVG XD), y esto lo agregaremos dentro del boton.

````html
<button id="btn" class="btn" data-text="Comenzar!">
    <svg width="280" height="280" viewbox="-40 -40 280 280" class="svg-circle">
        <circle class="circle-svg" cx="100" cy="100" r="60"></circle>
    </svg>
</button>
````
tendríamos algo así

![imagen circulo](https://raw.githubusercontent.com/username/projectname/branch/path/to/img.png)

pero le aplicaremos estilos para que se vea más acorde a lo que necesitamos.

````css
  .circle-svg {
      stroke:var(--color-btn);
      stroke-width: 60;
      fill: transparent;
  }
````

![imagen circulo ahora](https://raw.githubusercontent.com/username/projectname/branch/path/to/img.png)

para generar los detalles de sombra y duplicado del mismo elemento utilizamos <b>Filtros de SVG</b>

````html
<svg xmlns="https://www.w3.org/2000/svg" version="1.1">
  <defs>
      <filter id="svg-effect" x="-40" y="-40" width="280" height="280">
          <feGaussianBlur result="shadowed" stdDeviation="20"/>
          <feColorMatrix result="MatrixShadowed" in="shadowed" type="matrix"
              values="1 1 1 1 0
                      1 1 1 1 0
                      1 1 1 1 0
                      0 0 0 0.2 0"/>
          <feOffset in="MatrixShadowed" result="moveShadowed" dx="-25" dy="-25"/>
          <feBlend in="SourceGraphic" result="secondCreate" mode="normal"/>
          <feGaussianBlur result="secondBlur" in="secondCreate" stdDeviation="20"/>
          <feColorMatrix result="secondMatrix" in="secondBlur" type="saturate" values="1.6"/>
      </filter>
  </defs>
</svg>
````

para que este filtro impacte en nuestro circulo le agregamos la siguiente propiedad:

````css
  .circle-svg {
      ...
      filter: url(#svg-effect);
  }
````

Donde <b>url(#svg-effect)</b> es el id del <b>filter</b>

Para la animación cree un @keyframe apuntandole al eñemento .svg-circle

````CSS
.btn.active .svg-circle {
    animation: scaleOnda 2s ease-out forwards;
}

@keyframes scaleOnda {
    0% { opacity: 0;}
    2% { transform: scale(0); opacity: 1;}
    100% { transform: scale(2.3); opacity: 0;}
}
````

Muestro en esta parte las cosas que se usaron para generar el botón, pero no es un tutorial, solo mostrar los recursos que fueron utilizados para realizar esta pildorita, de igual forma quedará el recurso para que puedan curiosearlo y explorarlo.