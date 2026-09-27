import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export interface EmailTemplateProps {
  names: string;
  token: number | string;
  linkText: string;
  message: string;
}

const monoFont = {
  fontFamily:
    "'JetBrains Mono', 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace",
};

export default function EmailTemplate({
  names,
  token,
  linkText,
  message,
}: EmailTemplateProps) {
  const verificationCode = String(token);

  return (
    <Html lang="en">
      <Head>
        <style>{`
          @media only screen and (max-width: 600px) {
            .email-outer-wrap { padding: 16px 10px !important; }
            .email-card { border-radius: 12px !important; }
            .section-pad { padding: 22px 18px !important; }
            .header-pad { padding: 20px 18px !important; }
            .stack-col { display: block !important; width: 100% !important; }
            .meta-right { text-align: left !important; margin-top: 6px !important; }
            .hero-title { font-size: 21px !important; line-height: 1.3 !important; }
            .code-box { font-size: 26px !important; letter-spacing: 6px !important; }
          }
          @media only screen and (max-width: 360px) {
            .email-outer-wrap { padding: 8px 4px !important; }
            .section-pad { padding: 16px 12px !important; }
            .header-pad { padding: 14px 12px !important; }
            .hero-title { font-size: 18px !important; }
            .code-box { font-size: 20px !important; letter-spacing: 4px !important; }
            .dossier-label, .dossier-val { display: block !important; width: 100% !important; padding: 4px 0 !important; }
            .dossier-row { padding: 8px 0 !important; display: block !important; }
          }
          @media only screen and (max-width: 250px) {
            .email-outer-wrap { padding: 0 !important; }
            .email-card { border-radius: 0 !important; }
            .header-pad { padding: 10px 8px !important; }
            .section-pad { padding: 12px 8px !important; }
            .watch-hide { display: none !important; }
            .hero-title { font-size: 15px !important; line-height: 1.25 !important; }
            .body-copy { font-size: 12px !important; line-height: 1.45 !important; }
            .code-box { font-size: 16px !important; letter-spacing: 2px !important; }
            .cta-primary { padding: 10px 10px !important; font-size: 12px !important; border-radius: 18px !important; }
            .sig-block { font-size: 11px !important; }
          }
        `}</style>
      </Head>
      <Preview>
        Verify your email address · Code {verificationCode} · Kiseka Pius Digital Profile
      </Preview>

      <Body style={main}>
        <Container style={container}>
          {/* Top Portfolio Brand Accent Bar */}
          <div style={brandBar} />

          {/* HEADER: Auditor Identity & Verification Reference */}
          <Section style={header}>
            <table
              role="presentation"
              width="100%"
              cellPadding={0}
              cellSpacing={0}
              border={0}
            >
              <tbody>
                <tr>
                  <td className="stack-col" style={headerLeftCell}>
                    <Text style={headerName}>Kiseka Pius</Text>
                    <Text style={headerSubtitle}>
                      Internal Auditor · Risk Assessment &amp; Regulatory
                      Compliance Specialist
                    </Text>
                  </td>
                  <td className="stack-col meta-right" style={headerRightCell}>
                    <Text style={headerRef}>REF · VERIFY-{verificationCode}</Text>
                    <Text style={headerDate}>
                      Digital Profile App · Account Verification
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* HERO: Verification Confirmation */}
          <Section style={heroSection}>
            <Text style={kicker}>Account Verification · Kiseka-Digital-Profile</Text>
            <Heading style={heroTitle} className="hero-title">
              Confirm Your Email Address
            </Heading>
            <Text style={greeting}>
              Hi <strong>{names}</strong>,
            </Text>
            <Text style={bodyCopy}>{message}</Text>
          </Section>

          {/* VERIFICATION CODE */}
          <Section style={codeSection}>
            <Text style={codeLabel}>Enter this 6-digit verification code:</Text>
            <div className="code-box" style={codeBox}>
              {verificationCode}
            </div>
            <Text style={codeHint}>
              The code expires once your account has been verified.
            </Text>
            <div style={ctaRow}>
              <a
                href="https://kiseeka-digital-profile.vercel.app"
                className="cta-primary"
                style={ctaPrimary}
              >
                {linkText}
              </a>
            </div>
          </Section>

          {/* DOSSIER SUMMARY: Submitted Registration Parameters */}
          <Section style={dossierSection}>
            <div style={dossierCard}>
              <Text style={dossierTitle}>01. Registration Dossier</Text>
              <table
                role="presentation"
                width="100%"
                cellPadding={0}
                cellSpacing={0}
                border={0}
                style={dossierTable}
              >
                <tbody>
                  <tr className="dossier-row" style={dossierRow}>
                    <td className="dossier-label" style={dossierLabel}>
                      Registered As
                    </td>
                    <td className="dossier-val" style={dossierValue}>
                      {names}
                    </td>
                  </tr>
                  <tr className="dossier-row" style={dossierRowBorder}>
                    <td className="dossier-label" style={dossierLabel}>
                      Platform
                    </td>
                    <td className="dossier-val" style={dossierValue}>
                      Kiseeka Digital-Profile App
                    </td>
                  </tr>
                  <tr className="dossier-row">
                    <td className="dossier-label" style={dossierLabel}>
                      Verification Code
                    </td>
                    <td className="dossier-val" style={dossierValueAccent}>
                      <span style={monoFont}>{verificationCode}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* VERIFICATION WORKFLOW */}
          <Section style={stepsSection}>
            <Text style={stepsTitle}>02. What Happens Next</Text>

            <div style={timelineStep}>
              <div style={timelineDot} />
              <div style={timelineLine} />
              <Text style={stepTag}>STEP 01</Text>
              <Text style={stepTitle}>Enter Your Verification Code</Text>
              <Text style={stepCopy}>
                Return to the verification page and enter the code shown above
                to activate your account.
              </Text>
            </div>

            <div style={timelineStep}>
              <div style={timelineDot} />
              <div style={timelineLine} />
              <Text style={stepTag}>STEP 02 · ACCESS GRANTED</Text>
              <Text style={stepTitle}>Sign In &amp; Complete Your Profile</Text>
              <Text style={stepCopy}>
                Once verified, you can sign in and complete your professional
                profile, work experience, skills, projects, and blog content.
              </Text>
            </div>

            <div style={timelineStep}>
              <div style={timelineDot} />
              <Text style={stepTag}>STEP 03 · SUPPORT</Text>
              <Text style={stepTitle}>Need Assistance?</Text>
              <Text style={stepCopy}>
                If the code does not arrive or you run into any issue, reply to
                this email or contact{" "}
                <a href="mailto:consult@kisekapius.com" style={inlineLink}>
                  consult@kisekapius.com
                </a>
                .
              </Text>
            </div>
          </Section>

          {/* SIGNATURE & CONFIDENTIALITY FOOTER */}
          <Section style={footer}>
            <table
              role="presentation"
              width="100%"
              cellPadding={0}
              cellSpacing={0}
              border={0}
            >
              <tbody>
                <tr>
                  <td style={footerLeftCell}>
                    <Text style={footerName}>Kiseka Pius</Text>
                    <Text style={footerRole}>
                      Internal Auditor · Risk Assessment &amp; Regulatory
                      Compliance Specialist
                    </Text>
                    <Text style={footerContact}>
                      Direct:{" "}
                      <a href="mailto:consult@kisekapius.com" style={inlineLink}>
                        consult@kisekapius.com
                      </a>{" "}
                      · <span style={monoFont}>+256 700 482 910</span>
                      <br />
                      Practice: Kampala · East Africa &amp; International
                      Advisory
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>

            <div style={footerNotice}>
              <strong>Confidentiality &amp; Professional Assurance Notice:</strong>{" "}
              This verification email is issued by the Kiseka-Digital-Profile
              application in response to your registration request. The
              one-time code grants access only to the account registered under
              this email address.
            </div>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

EmailTemplate.PreviewProps = {
  names: "Eleanor",
  token: 842061,
  linkText: "Verify your Account",
  message:
    "Thank you for registering with Kiseka-Digital-Profile. To complete your registration and verify your email address, please enter the following 6-digit verification code on our website:",
} satisfies EmailTemplateProps;

/* ============ Styles ============ */
const main = {
  backgroundColor: "#F7F7F8",
  color: "#09090B",
  fontFamily:
    "'Space Grotesk', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  padding: "0",
  margin: "0",
};

const container = {
  maxWidth: "640px",
  margin: "0 auto",
  backgroundColor: "#FFFFFF",
  borderRadius: "14px",
  overflow: "hidden",
};

const brandBar = {
  height: "5px",
  width: "100%",
  background: "linear-gradient(90deg, #F3AD9E 0%, #B84A32 100%)",
};

const header = {
  padding: "26px 32px",
  borderBottom: "1px solid #E4E4E7",
};

const headerLeftCell = {
  verticalAlign: "middle" as const,
};

const headerRightCell = {
  verticalAlign: "middle" as const,
  textAlign: "right" as const,
};

const headerName = {
  fontSize: "19px",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: "#09090B",
  margin: "0",
};

const headerSubtitle = {
  fontSize: "12px",
  color: "#52525B",
  margin: "3px 0 0 0",
};

const headerRef = {
  fontSize: "11px",
  fontWeight: 600,
  color: "#B84A32",
  fontFamily:
    "'JetBrains Mono', 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace",
  margin: "0",
};

const headerDate = {
  fontSize: "11px",
  color: "#71717A",
  margin: "2px 0 0 0",
};

const heroSection = {
  padding: "30px 32px 24px 32px",
};

const kicker = {
  fontSize: "12px",
  fontWeight: 600,
  color: "#B84A32",
  margin: "0 0 8px 0",
};

const heroTitle = {
  fontSize: "24px",
  fontWeight: 700,
  lineHeight: "1.3",
  letterSpacing: "-0.02em",
  color: "#09090B",
  margin: "0 0 16px 0",
};

const greeting = {
  fontSize: "14px",
  lineHeight: "1.65",
  color: "#09090B",
  margin: "0 0 14px 0",
};

const bodyCopy = {
  fontSize: "14px",
  lineHeight: "1.65",
  color: "#52525B",
  margin: "0",
};

const codeSection = {
  padding: "0 32px 26px 32px",
};

const codeLabel = {
  fontSize: "12px",
  fontWeight: 600,
  color: "#09090B",
  margin: "0 0 12px 0",
};

const codeBox = {
  backgroundColor: "#FFF6F4",
  border: "1px dashed #B84A32",
  borderRadius: "10px",
  padding: "18px 20px",
  fontSize: "32px",
  fontWeight: 700,
  letterSpacing: "8px",
  textAlign: "center" as const,
  color: "#09090B",
  fontFamily:
    "'JetBrains Mono', 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace",
};

const codeHint = {
  fontSize: "11px",
  color: "#71717A",
  textAlign: "center" as const,
  margin: "10px 0 18px 0",
};

const ctaRow = {
  textAlign: "center" as const,
};

const ctaPrimary = {
  display: "inline-block",
  backgroundColor: "#09090B",
  color: "#FFFFFF",
  borderRadius: "128px",
  padding: "13px 24px",
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: "1.2",
  textAlign: "center" as const,
  border: "1px solid #09090B",
};

const dossierSection = {
  padding: "0 32px 26px 32px",
};

const dossierCard = {
  backgroundColor: "#FAFAFA",
  border: "1px solid #E4E4E7",
  borderRadius: "10px",
  padding: "18px 20px",
};

const dossierTitle = {
  fontSize: "12px",
  fontWeight: 600,
  color: "#09090B",
  margin: "0 0 8px 0",
  paddingBottom: "8px",
  borderBottom: "1px solid #E4E4E7",
};

const dossierTable = {
  fontSize: "13px",
};

const dossierRow = {
  borderBottom: "1px solid #E4E4E7",
};

const dossierRowBorder = {
  borderBottom: "1px solid #E4E4E7",
};

const dossierLabel = {
  padding: "8px 12px 8px 0",
  color: "#52525B",
  width: "38%",
  verticalAlign: "top" as const,
};

const dossierValue = {
  padding: "8px 0",
  color: "#09090B",
  fontWeight: 500,
  verticalAlign: "top" as const,
};

const dossierValueAccent = {
  padding: "8px 0",
  color: "#B84A32",
  fontWeight: 600,
  verticalAlign: "top" as const,
  fontFamily:
    "'JetBrains Mono', 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace",
};

const stepsSection = {
  padding: "0 32px 28px 32px",
};

const stepsTitle = {
  fontSize: "14px",
  fontWeight: 700,
  color: "#09090B",
  margin: "0 0 16px 0",
};

const timelineStep = {
  position: "relative" as const,
  paddingLeft: "26px",
  paddingBottom: "22px",
};

const timelineDot = {
  position: "absolute" as const,
  left: "0",
  top: "4px",
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: "#F3AD9E",
  border: "2px solid #B84A32",
};

const timelineLine = {
  position: "absolute" as const,
  left: "5px",
  top: "18px",
  bottom: "0",
  width: "2px",
  backgroundColor: "#E4E4E7",
};

const stepTag = {
  fontSize: "11px",
  fontWeight: 600,
  color: "#B84A32",
  fontFamily:
    "'JetBrains Mono', 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace",
  margin: "0",
};

const stepTitle = {
  fontSize: "13.5px",
  fontWeight: 700,
  color: "#09090B",
  margin: "4px 0 0 0",
};

const stepCopy = {
  fontSize: "12.5px",
  lineHeight: "1.5",
  color: "#52525B",
  margin: "4px 0 0 0",
};

const footer = {
  backgroundColor: "#FAFAFA",
  borderTop: "1px solid #E4E4E7",
  padding: "24px 32px",
};

const footerLeftCell = {
  verticalAlign: "top" as const,
};

const footerName = {
  fontSize: "14px",
  fontWeight: 700,
  color: "#09090B",
  margin: "0",
};

const footerRole = {
  fontSize: "12px",
  color: "#B84A32",
  fontWeight: 600,
  margin: "2px 0 0 0",
};

const footerContact = {
  fontSize: "12px",
  color: "#52525B",
  lineHeight: "1.6",
  margin: "6px 0 0 0",
};

const inlineLink = {
  color: "#09090B",
  fontWeight: 500,
};

const footerNotice = {
  marginTop: "16px",
  paddingTop: "14px",
  borderTop: "1px solid #E4E4E7",
  fontSize: "11px",
  lineHeight: "1.5",
  color: "#71717A",
};