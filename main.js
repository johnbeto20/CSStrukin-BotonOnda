var boton = document.getElementById("btn");

boton.addEventListener('click', (event) => {
    boton.classList.add('active');
    this.addEventListener('animationend', (event)=>{
        boton.classList.remove("active")
    })
})