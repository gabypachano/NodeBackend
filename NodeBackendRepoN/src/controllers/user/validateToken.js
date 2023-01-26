import {jwt} from '../../utils/index.js'
import { connect, disconnect } from "../../database/index.js";
import User from "../../models/user.js";

export const checkJWT = async(req, res) => {

    console.log('entra en la veerif',req.headers)
    
    const { token = ''  } = req.body;

    console.log('el token es', token)

    try {
        const {userId} = await jwt.isValidToken( token );

        await connect();
        const user = await User.findById( userId ).lean();
        await disconnect();
    
        if ( !user ) {
            await disconnect();
            return res.status(400).json({ message: 'No existe usuario con ese id' })
        }
    
        const { _id, email, role, name } = user;
        console.log('el usuario es',user )
        return res.status(200).json({
            token: jwt.signToken( _id, email,role ),
            user: {
                email, 
                role, 
                name
            }
        })

    } catch (error) {
        await disconnect();
        return res.status(401).json({
            message: 'Token de autorización no es válido'
        })   
    }


   


}
