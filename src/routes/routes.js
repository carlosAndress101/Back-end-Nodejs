/***gestiona todas consultas las coloca como de forma globar por si el 
 * proyecto llega a hacer muy robusto.
 */
import message from'../Global/network';


const routes = (server) =>{
    server.use('/message', message)
}

module.exports = routes;