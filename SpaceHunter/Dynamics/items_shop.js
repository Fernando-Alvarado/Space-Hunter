    class item{
        constructor(name,precio,src)
        {
            this.name=name;
            this.precio=precio;
            this.src=src;
            
        }
    }

    new item("La Última Cena",1500,"./../Statics/Media/Arte/ultima_cena.jpg");
    var array_items= new Array(15);
    array_items[0]=new item("La Última Cena",1500,"./../Statics/Media/Arte/ultima_cena.jpg");
    console.log(array_items[0]);

    