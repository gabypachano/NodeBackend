import { connect, disconnect } from "../../database/index.js";
import User from "../../models/user.js";

import bcrypt from "bcryptjs";
import { jwt } from "../../utils/index.js";

import {isValidEmail} from '../../utils/index.js'

export const registerUser = async (req, res) => {

    const { email = '', password = '', name = '' } = req.body ;

    if ( password.length < 6 ) {
        return res.status(400).json({
            message: 'La contraseña debe de ser de 6 caracteres'
        });
    }

    if ( name.length < 2 ) {
        return res.status(400).json({
            message: 'El nombre debe de ser de 2 caracteres'
        });
    }
    
    if ( !isValidEmail( email ) ) {
        return res.status(400).json({
            message: 'El correo no tiene formato de correo'
        });
    }
    
    
    await connect();
    const user = await User.findOne({ email });

    if ( user ) {
        await disconnect();
        return res.status(400).json({
            message:'No puede usar ese correo'
        })
    }

    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync( password ),
        role: 'admin',
        name,
    });

    try {
        await newUser.save({ validateBeforeSave: true });
        await disconnect();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Revisar logs del servidor'
        })
    }
   
    const { _id, role } = newUser;

    const token = jwt.signToken( _id, email, role );

    return res.status(200).json({
        token, //jwt
        user: {
            email, 
            role, 
            name,
        }
    })


}