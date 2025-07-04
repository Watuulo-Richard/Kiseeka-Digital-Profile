import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Button,
  Hr,
  Column,
  Row,
} from '@react-email/components';

const AdminNotificationEmail = ({name, email, subject, message}:{name:string, email:string, subject:string, message:string}) => {
  
  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {name}</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans py-[40px]">
          <Container className="max-w-[600px] mx-auto bg-white rounded-[8px] shadow-lg overflow-hidden">
            {/* Header */}
            <Section className="bg-[#0f4c81] py-[24px] px-[24px]">
              <Heading className="text-[22px] font-bold text-white m-0">
                New Contact Form Submission
              </Heading>
              <Text className="text-[14px] text-[#e2e8f0] m-0 mt-[4px]">
                A user has submitted the contact form on your website
              </Text>
            </Section>
            
            {/* Alert Banner */}
            {/* <Section className="bg-[#edf2f7] border-solid border-l-[4px] border-l-[#0f4c81] px-[24px] py-[12px]">
              <Text className="text-[16px] text-[#334155] m-0">
                <strong>Submission Time:</strong> {submissionTime || new Date().toLocaleString()}
              </Text>
            </Section> */}
            
            {/* User Details */}
            <Section className="px-[24px] py-[24px]">
              <Heading className="text-[18px] font-bold text-[#334155] mb-[16px] mt-0">
                Contact Information
              </Heading>
              
              <Section className="bg-white rounded-[8px] border-solid border-[1px] border-[#e2e8f0] p-[16px] mb-[24px]">
                <Row>
                  <Column>
                    <Row>
                      <Column className="w-[30%]">
                        <Text className="text-[14px] font-bold text-[#64748b] m-0">Name:</Text>
                      </Column>
                      <Column className="w-[70%]">
                        <Text className="text-[14px] text-[#334155] m-0">{name}</Text>
                      </Column>
                    </Row>
                    
                    <Hr className="border-dashed border-[#e2e8f0] my-[12px] mx-0" />
                    
                    <Row>
                      <Column className="w-[30%]">
                        <Text className="text-[14px] font-bold text-[#64748b] m-0">Email:</Text>
                      </Column>
                      <Column className="w-[70%]">
                        <Text className="text-[14px] text-[#334155] m-0">
                          <a href={`mailto:${email}`} className="text-[#0f4c81] no-underline">
                            {email}
                          </a>
                        </Text>
                      </Column>
                    </Row>
                  </Column>
                </Row>
              </Section>
              
              {/* Message Details */}
              <Heading className="text-[18px] font-bold text-[#334155] mb-[16px] mt-0">
                Message Details
              </Heading>
              
              <Section className="bg-white rounded-[8px] border-solid border-[1px] border-[#e2e8f0] p-[16px]">
                <Text className="text-[14px] font-bold text-[#64748b] m-0">Subject:</Text>
                <Text className="text-[14px] text-[#334155] mt-[4px] mb-[16px]">{subject}</Text>
                
                <Text className="text-[14px] font-bold text-[#64748b] m-0">Message:</Text>
                <Text className="text-[14px] text-[#334155] mt-[4px] whitespace-pre-wrap">{message}</Text>
              </Section>
              
              {/* Action Buttons */}
              <Section className="mt-[32px]">
                <Row>
                  <Column className="text-center pr-[8px]">
                    <Button
                      className="bg-[#0f4c81] text-white font-bold py-[12px] px-[16px] rounded-[4px] no-underline text-[14px] w-full box-border"
                      href={`mailto:${email}?subject=RE: ${subject}`}
                    >
                      Reply to User
                    </Button>
                  </Column>
                  <Column className="text-center pl-[8px]">
                    <Button
                      className="bg-white text-[#0f4c81] font-bold py-[12px] px-[16px] rounded-[4px] no-underline text-[14px] border-solid border-[1px] border-[#0f4c81] w-full box-border"
                      href="https://kiseeka-digital-profile.vercel.app/sign-in-page"
                    >
                      View in Dashboard
                    </Button>
                  </Column>
                </Row>
              </Section>
            </Section>
            
            <Hr className="border-solid border-[#e2e8f0] my-0 mx-0 w-full" />
            
            {/* Footer */}
            <Section className="px-[24px] py-[24px] text-center">
              <Text className="text-[14px] text-[#64748b] m-0">
                This is an automated notification from your website's contact form.
              </Text>
              <Text className="text-[14px] text-[#64748b] m-0">
                © {new Date().getFullYear()} Your Company Name. All rights reserved.
              </Text>
              <Text className="text-[12px] text-[#94a3b8] m-0 mt-[8px]">
                123 Business Street, Suite 100, City, Country
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

AdminNotificationEmail.PreviewProps = {
  name: "John Doe",
  email: "johndoe@example.com",
  subject: "Product Inquiry",
  message: "Hello, I'm interested in learning more about your premium services. Could you please provide additional information about pricing and availability? Thank you!",
  submissionTime: "May 22, 2025, 8:22:04 PM"
};

export default AdminNotificationEmail;