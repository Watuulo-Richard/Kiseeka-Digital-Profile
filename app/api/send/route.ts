import { NextRequest, NextResponse } from 'next/server';
import { CreateEmailResponse } from '@/types/email';
import { prismaClient } from '@/lib/db';
import { Resend } from 'resend';
import AdminNotificationEmail from '@/components/frontend/email/admin-email-template';
import KisekaEmailTemplate from '@/components/frontend/email/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateEmailResponse>> {
  try {
    const {name, email, subject, message, userId} = await request.json()

    const responseOne = await resend.emails.send({
      from: 'Kiseka-Pius-Portfolio <info@lubegajovan.org>',
      to: email,
      subject: subject,
      react: KisekaEmailTemplate({ name, email, subject, message }),
    });
    console.log(responseOne)

    const responseTwo = await resend.emails.send({
      from: 'Kiseka-Pius-Portfolio <info@lubegajovan.org>',
      to: 'kisekapius45@gmail.com',
      subject: subject,
      react: AdminNotificationEmail({name, email, subject, message}),
    });
    console.log(responseTwo)

    const createAnEmail = await prismaClient.email.create({
        data: {
            name, email, subject, message, userId
        }
    })

    if (responseOne.error) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "Failed To Send Email",
          error:   responseOne.error.message,
          status:  500,
        },
        { status: 500 },
      );
    }

    if (responseTwo.error) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "Failed To Send Email",
          error:   responseTwo.error.message,
          status:  500,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
        success: true,
        id: createAnEmail.id,
        message: 'Email Has Been Saved Successfully',
        error: null,
        status: 201
    });
  } catch (error) {
    return NextResponse.json({
        success: false,
        id: "",
        message: "Failed To Send Email",
        error: error instanceof Error ? error.message : "Unknown error",
        status: 500
    }, { status: 500 });
  }
}