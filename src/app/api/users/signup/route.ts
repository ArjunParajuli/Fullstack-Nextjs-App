import dbConnect from "@/dbConnect/dbConnect";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendMail } from "@/utils/mailer";

dbConnect();

export const POST = async(request: NextRequest, response: NextResponse) =>{
    try{
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        const emailCheck = await User.findOne({email}) 
        if(emailCheck){
            return NextResponse.json({msg: "Email already exists"})
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPw = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username, email, password: hashedPw
        })

        const savedUser = await newUser.save();
        console.log(savedUser)

        // Send Verification email
        await sendMail({email, emailType: 'VERIFY', userId: savedUser._id})

        return NextResponse.json({
            message: "User Registered Successfully",
            savedUser
        })


    }catch(err: any){
        return NextResponse.json({error: err.message})
    }
}