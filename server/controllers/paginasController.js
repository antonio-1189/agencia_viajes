import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async(req, res) => {

    //consultar tres viajes  del modelo de  viaje

    try {

        const viajesPromise = Viaje.findAll({ limit: 3 });
        const testimonialespromise = Testimonial.findAll({ limit: 3 });

        const [viajes, testimoniales] = await Promise.all([
            viajesPromise,
            testimonialespromise
        ]);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes,
            testimoniales
        });


    } catch (error) {
        console.log(error)
    }


}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    })
}


const paginaViajes = async(req, res) => {

    //consultar BD
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: 'Próximos viajes',
        viajes
    })
}

//Muestra un viaje por su slug

const paginaDetalleViaje = async(req, res) => {
    const { slug } = req.params;


    try {

        const viaje = await Viaje.findOne({

            where: {
                slug
            }
        });

        res.render('viaje', {
            pagina: 'información Viaje',
            viaje
        })

    } catch (error) {
        console.log(error)
    }

}

const paginaTestimoniales = async(req, res) => {


    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        })

    } catch (error) {
        console.log(error)
    }

}


export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje,

}