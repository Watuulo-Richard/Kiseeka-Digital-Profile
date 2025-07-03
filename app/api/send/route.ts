import AdminNotificationEmail from '@/components/frontend/email/admin-email-template';
import { EmailTemplate } from '@/components/frontend/email/email-template';
import { prismaClient } from '@/lib/db';
import { EmailFormTypes } from '@/schema/schema';
import { error } from 'console';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request:NextRequest) {
  try {
    const {name, email, subject, message, portfolioId} = await request.json()

    const responseOne = await resend.emails.send({
      from: 'Kiseeka-Digital-Profile <info@lubegajovan.com>',
      to: email,
      subject: subject,
      react: EmailTemplate({ name, email, subject, message }),
    });
    console.log(responseOne)

    const responseTwo = await resend.emails.send({
      from: 'Kiseeka-Digital-Profile <info@lubegajovan.com>',
      to: 'watuulorichard@gmail.com',
      subject: subject,
      react: AdminNotificationEmail({name, email, subject, message}),
    });
    console.log(responseTwo)

    const createAnEmail = await prismaClient.email.create({
        data: {
            name, email, subject, message, portfolioId
        }
    })

    if (responseOne.error) {
      return Response.json({ responseOne }, { status: 500 });
    }

    if (responseTwo.error) {
      return Response.json({ responseTwo }, { status: 500 });
    }

    return NextResponse.json({
        data: createAnEmail,
        message: 'Email Has Been Saved Successfully',
        error: null,
        status: 201
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}