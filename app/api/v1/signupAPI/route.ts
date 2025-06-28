'use server';

import { prismaClient } from '@/lib/db';
import { UserDetailTypes } from '@/schema/schema';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { hashSync } from 'bcrypt-ts';
import EmailTemplate from '@/components/backend/email/email-template';
export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const userDetails: UserDetailTypes = await request.json();
  const { fullName, email, role, password } = userDetails;
  try {
    // Here We First Find If The Email Already Exists In The DataBase
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });
    // If YES...!!!
    if (existingUser) {
      return NextResponse.json({
        data: null,
        error: `User with this email ( ${email})  already exists in the Database`,
        status: 409,
      }, {
        status: 409
      });
    }
    // & If NOT...!!! Then
    // We Encrypt the Password =>bcrypt
    const hashedPassword = hashSync(password, 10);

    //Generate Token
    const generateToken = () => {
      const min = 100000; // Minimum 6-figure number
      const max = 999999; // Maximum 6-figure number
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const userToken = generateToken();
    const newUser = await prismaClient.user.create({
      // Here We Are Destructing Because We Want To Add In A User Token
      data: {
        fullName,
        email,
        password: hashedPassword,
        role,
        token: userToken,
      },
    });

    //Send an Email with the Token on the link as a search param
    const token = newUser.token;
    const userId = newUser.id;
    const names = newUser.fullName.split(' ')[0];
    const linkText = 'Verify your Account ';
    const message =
      'Thank you for registering with Kiseeka-Digital-Profile. To complete your registration and verify your email address, please enter the following 6-digit verification code on our website :';
    const sendMail = await resend.emails.send({
      from: 'Kiseeka-Digital-Profile App <info@lubegajovan.com>',
      to: email,
      subject: 'Verify Your Email Address',
      react: EmailTemplate({ names, token, linkText, message }),
    });
    console.log(token);
    console.log(sendMail);
    console.log(newUser);
    return NextResponse.json(
      {
        data: newUser,
        error: null,
        message: 'User Saved Successfully In The DataBase...!!!✅',
        status: 201,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      data: null,
      error:
        '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
      message: 'Failed To Save User In The DataBase...!!!🥺',
      status: 500,
    }, {
        status: 500
    });
  }
}
