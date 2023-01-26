
import Product from '../../models/product.js'
import Order from '../../models/order.js'
import { connect, disconnect } from "../../database/index.js";
import { jwt } from "../../utils/index.js";


export const saveOrder = async (req, res) => {
    
    const { body, token = "" } = req.body ;

    const { orderItems  , total } = body
    
    console.log('TOKEN:',token)
    console.log('OrderItems:',orderItems)
    console.log('TOTAL:',total)
    console.log('hola')
    const { userId } = await jwt.isValidToken(token);

    if ( !userId ) {
        return res.status(401).json({message: 'Debe de estar autenticado para hacer esto'});
    }

    const productsIds = orderItems.map( product => product._id );
    await connect();

    const dbProducts = await Product.find({ _id: { $in: productsIds } });

    console.log('LOS PRODUCTOS SON:', dbProducts)
    
    try {

        const subTotal = orderItems.reduce( ( prev, current ) => {
            const currentPrice = dbProducts.find( prod => prod.id === current._id )?.price;
            if ( !currentPrice ) {
                throw new Error('Verifique el carrito de nuevo, producto no existe');
            }

            return (currentPrice * current.quantity) + prev
        }, 0 );

        console.log('SUBTOTAL',subTotal )

        const taxRate =  Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const backendTotal = subTotal * ( taxRate + 1 );

        console.log('BACKEND TOTAL',backendTotal )

        if ( total !== backendTotal ) {
            throw new Error('El total no cuadra con el monto');
        }

        // Todo bien hasta este punto
        const newOrder = new Order({ ...body, isPaid: false, user: userId });
        newOrder.total = Math.round( newOrder.total * 100 ) / 100;

        await newOrder.save();
        await disconnect();
        
        return res.status(201).json( newOrder );


        
    } catch (error) {
        await disconnect();
        console.log(error);
        res.status(400).json({
            message: error.message || 'Revise logs del servidor'
        })
    }
    



    // return res.status(201).json( req.body );
}
