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

export interface AdminNotificationEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const monoFont = {
  fontFamily:
    "'JetBrains Mono', 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace",
};

export default function AdminNotificationEmail({
  name,
  email,
  subject,
  message,
}: AdminNotificationEmailProps) {
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
            .dossier-label, .dossier-val { display: block !important; width: 100% !important; padding: 4px 0 !important; }
            .dossier-row { padding: 8px 0 !important; display: block !important; }
            .cta-group a { display: block !important; width: 100% !important; margin-bottom: 10px !important; }
          }
          @media only screen and (max-width: 360px) {
            .email-outer-wrap { padding: 8px 4px !important; }
            .section-pad { padding: 16px 12px !important; }
            .header-pad { padding: 14px 12px !important; }
            .hero-title { font-size: 18px !important; }
          }
          @media only screen and (max-width: 250px) {
            .email-outer-wrap { padding: 0 !important; }
            .email-card { border-radius: 0 !important; }
            .header-pad { padding: 10px 8px !important; }
            .section-pad { padding: 12px 8px !important; }
            .watch-hide { display: none !important; }
            .body-copy { font-size: 12px !important; line-height: 1.45 !important; }
            .sig-block { font-size: 11px !important; }
          }
        `}</style>
      </Head>
      <Preview>
        New contact form submission from {name} · {subject}
      </Preview>

      <Body style={main}>
        <Container style={container}>
          {/* Top Portfolio Brand Accent Bar */}
          <div style={brandBar} />

          {/* HEADER: Auditor Identity & Notification Reference */}
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
                    <Text style={headerRef}>ADMIN · CONTACT-FORM</Text>
                    <Text style={headerDate}>
                      New submission via Kiseka-Digital-Profile App
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* HERO: New Message Notification */}
          <Section style={heroSection}>
            <Text style={kicker}>Admin Notification · Contact Form</Text>
            <Heading style={heroTitle} className="hero-title">
              New Message Received
            </Heading>
            <Text style={bodyIntro}>
              A visitor has submitted the consultation / contact form on your
              digital profile. The sender&apos;s details and message are below.
            </Text>
          </Section>

          {/* DOSSIER SUMMARY: Sender & Inquiry Details */}
          <Section style={dossierSection}>
            <div style={dossierCard}>
              <Text style={dossierTitle}>01. Sender Details</Text>
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
                      Name
                    </td>
                    <td className="dossier-val" style={dossierValue}>
                      {name}
                    </td>
                  </tr>
                  <tr className="dossier-row" style={dossierRowBorder}>
                    <td className="dossier-label" style={dossierLabel}>
                      Email
                    </td>
                    <td className="dossier-val" style={dossierValue}>
                      <a href={`mailto:${email}`} style={emailLink}>
                        {email}
                      </a>
                    </td>
                  </tr>
                  <tr className="dossier-row">
                    <td className="dossier-label" style={dossierLabel}>
                      Subject
                    </td>
                    <td className="dossier-val" style={dossierValueAccent}>
                      {subject}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Message Content */}
              <div style={messageBlock}>
                <Text style={messageLabel}>02. Submitted Message</Text>
                <div style={messageBox}>
                  <Text style={messageText}>{message}</Text>
                </div>
              </div>
            </div>
          </Section>

          {/* CALL TO ACTION */}
          <Section style={ctaSection}>
            <div style={ctaCard}>
              <Text style={ctaTitle}>Respond to This Inquiry</Text>
              <Text style={ctaCopy}>
                Reply directly to{" "}
                <strong>
                  <a href={`mailto:${email}`} style={ctaEmail}>
                    {email}
                  </a>
                </strong>{" "}
                or open the full conversation from your inbox.
              </Text>
              <div className="cta-group">
                <a
                  href={`mailto:${email}?subject=${encodeURIComponent(
                    `RE: ${subject}`,
                  )}`}
                  className="cta-primary"
                  style={ctaPrimary}
                >
                  Reply to Sender
                </a>
                <a
                  href="https://kiseka-digital-profile.vercel.app"
                  className="cta-secondary"
                  style={ctaSecondary}
                >
                  Open Kiseka Digital Profile
                </a>
              </div>
            </div>
          </Section>

          {/* AUDITOR SIGNATURE & CONFIDENTIALITY FOOTER */}
          <Section style={footer} className="sig-block">
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
                      · <span style={monoFont}>+256 777 633 442</span>
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
              This notification was generated automatically by the
              Kiseka-Digital-Profile application after a visitor submitted the
              contact form. Please treat the sender&apos;s details and message
              under the same professional confidentiality standards as all
              client correspondence.
            </div>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

AdminNotificationEmail.PreviewProps = {
  name: "Eleanor Vance",
  email: "e.vance@meridiancapital.co",
  subject: "Internal Audit Review & Process Assurance Inquiry",
  message:
    "We are seeking an independent internal audit review of our treasury operations and regulatory reporting controls ahead of our annual statutory examination. Specifically looking to tighten our Risk & Control Matrix (RACM) and validate remediation of three prior-cycle compliance observations.",
} satisfies AdminNotificationEmailProps;

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

const bodyIntro = {
  fontSize: "14px",
  lineHeight: "1.65",
  color: "#52525B",
  margin: "0",
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
  width: "30%",
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
};

const emailLink = {
  color: "#B84A32",
  fontWeight: 500,
  textDecoration: "underline",
};

const messageBlock = {
  marginTop: "14px",
  paddingTop: "12px",
  borderTop: "1px dashed #E4E4E7",
};

const messageLabel = {
  fontSize: "11px",
  fontWeight: 600,
  color: "#71717A",
  margin: "0 0 4px 0",
};

const messageBox = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E4E4E7",
  borderRadius: "8px",
  padding: "14px 16px",
};

const messageText = {
  fontSize: "12.5px",
  lineHeight: "1.55",
  color: "#52525B",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const ctaSection = {
  padding: "0 32px 30px 32px",
};

const ctaCard = {
  backgroundColor: "#FAFAFA",
  border: "1px solid #E4E4E7",
  borderRadius: "12px",
  padding: "22px 20px",
  textAlign: "center" as const,
};

const ctaTitle = {
  fontSize: "14px",
  fontWeight: 700,
  color: "#09090B",
  margin: "0 0 6px 0",
};

const ctaCopy = {
  fontSize: "12.5px",
  lineHeight: "1.5",
  color: "#52525B",
  margin: "0 0 18px 0",
};

const ctaEmail = {
  color: "#09090B",
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
  marginRight: "8px",
};

const ctaSecondary = {
  display: "inline-block",
  backgroundColor: "transparent",
  color: "#09090B",
  borderRadius: "128px",
  padding: "13px 24px",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "1.2",
  textAlign: "center" as const,
  border: "1px solid #E4E4E7",
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