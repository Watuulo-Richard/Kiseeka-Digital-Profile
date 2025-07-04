import type { EmailFormTypes } from "@/schema/schema"
import * as React from 'react';
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components"

export default function KiseekaEmailTemplate({ name, email, subject, message }: EmailFormTypes) {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
        @media only screen and (max-width: 600px) {
          .mobile-padding { padding: 20px 16px !important; }
          .mobile-text { font-size: 14px !important; }
          .mobile-heading { font-size: 20px !important; }
          .mobile-hero-heading { font-size: 24px !important; }
          .mobile-full-width { width: 100% !important; }
          .mobile-center { text-align: center !important; }
          .mobile-button {
            width: 100% !important;
            padding: 16px 20px !important;
            font-size: 16px !important;
          }
          .mobile-profile-image { width: 100px !important; height: 100px !important; }
        }
        .icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-right: 8px;
        }
        .large-icon {
          display: inline-block;
          width: 32px;
          height: 32px;
          vertical-align: middle;
          margin-right: 12px;
        }
      `}</style>
      </Head>
      <Preview>New message received from {name} via Kiseeka Digital Profile App</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={headerSection}>
            <Row>
              <Column align="center">
                <table cellPadding="0" cellSpacing="0" border={0} style={logoTable}>
                  <tr>
                    <td align="center">
                      <svg
                        className="large-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4ECDC4"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <Text style={logoText}>KISEEKA PIUS DIGITAL PROFILE APP</Text>
                    </td>
                  </tr>
                </table>
              </Column>
            </Row>
          </Section>

          {/* Hero Section */}
          <Section style={heroSection}>
            <Row>
              <Column>
                <table cellPadding="0" cellSpacing="0" border={0} width="100%" style={heroTable}>
                  <tr>
                    <td style={heroContentCell}>
                      <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        <svg
                          className="large-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#4ECDC4"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: "48px", height: "48px", marginBottom: "20px" }}
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                      <Heading style={heroHeading} className="mobile-hero-heading">
                        New Message Received
                      </Heading>
                      <table cellPadding="0" cellSpacing="0" border={0} style={profileImageTable}>
                        <tr>
                          <td align="center">
                            <Img
                              src="https://j9v2s0d9fs.ufs.sh/f/lPsbSsZAX9SYdNnmqvWekY0wghnZXPrJQ7R45bjNmFBu8SCx"
                              alt="Kiseeka Pius"
                              style={profileImage}
                              className="mobile-profile-image"
                            />
                          </td>
                        </tr>
                      </table>
                      <Text style={profileIntro} className="mobile-text">
                        Hello <span style={profileName}>Kiseeka Pius</span>,<br />
                        You have received a new message through your Digital Profile App.
                      </Text>
                    </td>
                  </tr>
                </table>
              </Column>
            </Row>
          </Section>

          {/* Message Details Section */}
          <Section style={contentSection} className="mobile-padding">
            <Row>
              <Column align="center">
                <Heading style={mainHeading} className="mobile-heading">
                  <svg
                    className="icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4ECDC4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 9V5a3 3 0 0 0-6 0v4" />
                    <rect x="2" y="9" width="20" height="11" rx="2" ry="2" />
                  </svg>
                  Message Details
                </Heading>

                {/* Sender Information */}
                <table cellPadding="0" cellSpacing="0" border={0} style={messageDetailsTable}>
                  <tr>
                    <td style={messageDetailRow}>
                      <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                        <tr>
                          <td style={messageLabel}>
                            <svg
                              className="icon"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#666666"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                            From:
                          </td>
                          <td style={messageValue}>{name}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style={messageDetailRow}>
                      <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                        <tr>
                          <td style={messageLabel}>
                            <svg
                              className="icon"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#666666"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                              <polyline points="22,6 12,13 2,6" />
                            </svg>
                            Email:
                          </td>
                          <td style={messageValue}>{email}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style={messageDetailRow}>
                      <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                        <tr>
                          <td style={messageLabel}>
                            <svg
                              className="icon"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#666666"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            Subject:
                          </td>
                          <td style={messageValue}>{subject}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                {/* Message Content */}
                <table cellPadding="0" cellSpacing="0" border={0} style={messageContentTable}>
                  <tr>
                    <td>
                      <Text style={messageContentLabel}>
                        <svg
                          className="icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#666666"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14,2 14,8 20,8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10,9 9,9 8,9" />
                        </svg>
                        Message:
                      </Text>
                      <div style={messageContentBox}>
                        <Text style={messageContentText}>{message}</Text>
                      </div>
                    </td>
                  </tr>
                </table>

                <table cellPadding="0" cellSpacing="0" border={0} style={buttonTable}>
                  <tr>
                    <td align="center">
                      <Link href="#" style={replyButton} className="mobile-button">
                        <svg
                          className="icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ marginRight: "8px" }}
                        >
                          <polyline points="9,17 4,12 9,7" />
                          <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
                        </svg>
                        REPLY TO MESSAGE
                      </Link>
                    </td>
                  </tr>
                </table>
              </Column>
            </Row>
          </Section>

          {/* Footer */}
          <Section style={footerSection} className="mobile-padding">
            <Row>
              <Column align="center">
                <Text style={footerText} className="mobile-text">
                  <svg
                    className="icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#999999"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  This message was sent through your Kiseeka Digital Profile App.
                </Text>
                <Text style={footerText} className="mobile-text">
                  PKF Uganda | Professional Auditing Services
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: "#f8f9fa",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
  margin: "0",
  padding: "20px 0",
}

const container = {
  margin: "0 auto",
  width: "100%",
  maxWidth: "600px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
}

// Header Styles
const headerSection = {
  backgroundColor: "#ffffff",
  padding: "30px 40px 20px",
  borderBottom: "1px solid #e9ecef",
}

const logoTable = {
  width: "100%",
}

const logoText = {
  color: "#6c757d",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
  textAlign: "center" as const,
  letterSpacing: "1px",
}

// Hero Styles
const heroSection = {
  backgroundColor: "#2c3e50",
  padding: "40px 40px 50px",
}

const heroTable = {
  width: "100%",
}

const heroContentCell = {
  textAlign: "center" as const,
}

const heroHeading = {
  color: "#4ECDC4",
  fontSize: "28px",
  fontWeight: "600",
  lineHeight: "1.2",
  margin: "0 0 30px",
  textAlign: "center" as const,
}

const profileImageTable = {
  margin: "0 auto 25px",
}

const profileImage = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  display: "block",
  margin: "0 auto",
  objectFit: "cover" as const,
  border: "4px solid #ffffff",
}

const profileIntro = {
  color: "#ffffff",
  fontSize: "16px",
  lineHeight: "1.5",
  margin: "0",
  textAlign: "center" as const,
}

const profileName = {
  color: "#4ECDC4",
  fontWeight: "600",
}

// Content Styles
const contentSection = {
  backgroundColor: "#ffffff",
  padding: "50px 40px 60px",
}

const mainHeading = {
  color: "#2c3e50",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.3",
  textAlign: "center" as const,
  margin: "0 0 40px",
}

const messageDetailsTable = {
  width: "100%",
  margin: "0 0 30px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "20px",
}

const messageDetailRow = {
  padding: "12px 0",
  borderBottom: "1px solid #e9ecef",
}

const messageLabel = {
  color: "#6c757d",
  fontSize: "14px",
  fontWeight: "600",
  width: "80px",
  verticalAlign: "top",
  paddingRight: "15px",
}

const messageValue = {
  color: "#2c3e50",
  fontSize: "16px",
  fontWeight: "400",
}

const messageContentTable = {
  width: "100%",
  margin: "0 0 40px",
}

const messageContentLabel = {
  color: "#6c757d",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 15px",
}

const messageContentBox = {
  backgroundColor: "#f8f9fa",
  border: "1px solid #e9ecef",
  borderRadius: "8px",
  padding: "20px",
}

const messageContentText = {
  color: "#2c3e50",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
}

const buttonTable = {
  margin: "0 auto",
}

const replyButton = {
  backgroundColor: "#4ECDC4",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  padding: "16px 32px",
  borderRadius: "25px",
  display: "inline-flex",
  alignItems: "center",
  textAlign: "center" as const,
  letterSpacing: "0.5px",
  boxShadow: "0 4px 12px rgba(78, 205, 196, 0.3)",
}

// Footer Styles
const footerSection = {
  backgroundColor: "#f8f9fa",
  padding: "30px 40px 40px",
  borderTop: "1px solid #e9ecef",
}

const footerText = {
  color: "#6c757d",
  fontSize: "12px",
  lineHeight: "1.6",
  textAlign: "center" as const,
  margin: "0 0 8px",
}
