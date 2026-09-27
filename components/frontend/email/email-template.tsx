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

export interface KisekaEmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const monoFont = {
  fontFamily:
    "'JetBrains Mono', 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace",
};

export default function KisekaEmailTemplate({
  name,
  email,
  subject,
  message,
}: KisekaEmailTemplateProps) {
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
            .pillar-box { padding: 10px 12px !important; }
            .cta-group a { display: block !important; width: 100% !important; margin-bottom: 10px !important; }
            .dossier-label, .dossier-val { display: block !important; width: 100% !important; padding: 4px 0 !important; }
            .dossier-row { padding: 8px 0 !important; display: block !important; }
          }
          @media only screen and (max-width: 360px) {
            .email-outer-wrap { padding: 8px 4px !important; }
            .section-pad { padding: 16px 12px !important; }
            .header-pad { padding: 14px 12px !important; }
            .hero-title { font-size: 18px !important; }
          }
          @media only screen and (max-width: 250px) {
            .email-outer-wrap { padding: 0 !important; }
            .email-card { border-radius: 0 !important; border-left: none !important; border-right: none !important; }
            .header-pad { padding: 10px 8px !important; }
            .section-pad { padding: 12px 8px !important; }
            .watch-hide { display: none !important; }
            .hero-title { font-size: 15px !important; line-height: 1.25 !important; }
            .body-copy { font-size: 12px !important; line-height: 1.45 !important; }
            .kicker-text { font-size: 10px !important; }
            .timeline-step { padding-left: 16px !important; padding-bottom: 14px !important; }
            .timeline-dot { width: 8px !important; height: 8px !important; top: 4px !important; }
            .timeline-line { left: 3px !important; top: 14px !important; }
            .cta-primary, .cta-secondary { padding: 10px 10px !important; font-size: 12px !important; border-radius: 18px !important; }
            .sig-block { font-size: 11px !important; }
          }
        `}</style>
      </Head>
      <Preview>
        Consultation Request Confirmed - {name} · {subject}
      </Preview>

      <Body style={main}>
        <Container style={container}>
          {/* Top Portfolio Brand Accent Bar */}
          <div style={brandBar} />

          {/* HEADER: Auditor Identity & Dossier Reference */}
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
                    <Text style={headerRef}>REF · CONSULTATION-REQUEST</Text>
                    <Text style={headerDate}>
                      Audit Intake · <span style={monoFont}>{email}</span>
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* HERO: Consultation Confirmation & Executive Greeting */}
          <Section style={heroSection}>
            <Text style={kicker}>Internal Audit Review &amp; Compliance Practice</Text>
            <Heading style={heroTitle} className="hero-title">
              Consultation Request Received:{" "}
              <span style={heroSubject}>{subject}</span>
            </Heading>
            <Text style={greeting}>
              Dear <strong>{name}</strong>,
            </Text>
            <Text style={bodyIntro}>
              Thank you for submitting a consultation request through my
              portfolio regarding <strong>{subject}</strong>. Your inquiry has
              been logged into my audit intake register, and I have initiated a
              preliminary review of the regulatory parameters and risk areas you
              outlined.
            </Text>
          </Section>

          {/* DOSSIER SUMMARY TABLE: Submitted Consultation Parameters */}
          <Section style={dossierSection}>
            <div style={dossierCard}>
              <Text style={dossierTitle}>01. Engagement Intake Dossier</Text>
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
                      Stakeholder
                    </td>
                    <td className="dossier-val" style={dossierValue}>
                      {name}
                    </td>
                  </tr>
                  <tr className="dossier-row" style={dossierRowBorder}>
                    <td className="dossier-label" style={dossierLabel}>
                      Contact Email
                    </td>
                    <td className="dossier-val" style={dossierValue}>
                      <a href={`mailto:${email}`} style={emailLink}>
                        {email}
                      </a>
                    </td>
                  </tr>
                  <tr className="dossier-row" style={dossierRowBorder}>
                    <td className="dossier-label" style={dossierLabel}>
                      Review Mandate
                    </td>
                    <td className="dossier-val" style={dossierValueAccent}>
                      {subject}
                    </td>
                  </tr>
                  <tr className="dossier-row" style={dossierRowBorder}>
                    <td className="dossier-label" style={dossierLabel}>
                      Regulatory Perimeter
                    </td>
                    <td className="dossier-val" style={dossierValue}>
                      COSO ERM · ISO 31000 · IFRS 9 · Statutory Central Bank
                      Directives
                    </td>
                  </tr>
                  <tr className="dossier-row">
                    <td className="dossier-label" style={dossierLabel}>
                      Target Cycle &amp; SLA
                    </td>
                    <td className="dossier-val" style={dossierValue}>
                      Pre-Statutory Audit Cycle (Immediate Onboarding) · Direct
                      Response &le; 24 Hours
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Client Submitted Inquiry Excerpt */}
              <div style={messageBlock}>
                <Text style={messageLabel}>02. Submitted Scope Notes</Text>
                <Text style={messageText}>{message}</Text>
              </div>
            </div>
          </Section>

          {/* CORE EXPERTISE PILLARS */}
          <Section style={pillarsSection}>
            <Text style={pillarsTitle}>03. Methodology &amp; Assurance Pillars</Text>
            <Text style={pillarsIntro}>
              Every engagement is anchored in international auditing standards
              (IIA IPPF, ISO 31000, and COSO ERM) to deliver board-ready
              clarity:
            </Text>

            <div style={pillarBox}>
              <Text style={pillarTitle}>
                Enterprise Risk Assessment &amp; RACM Engineering
              </Text>
              <Text style={pillarCopy}>
                Granular identification of inherent versus residual operational,
                financial, and governance risks-calibrating preventative and
                detective internal controls to eliminate control leakage.
              </Text>
            </div>

            <div style={pillarBoxGap}>
              <Text style={pillarTitle}>
                Regulatory Adherence &amp; Statutory Compliance Verification
              </Text>
              <Text style={pillarCopy}>
                Rigorous compliance health checks against statutory mandates,
                industry licensing covenants, AML/KYC directives, and financial
                reporting standards-preventing regulatory penalties before
                examination cycles.
              </Text>
            </div>

            <div style={pillarBox}>
              <Text style={pillarTitle}>
                Independent Internal Audit Review &amp; Remediation Roadmaps
              </Text>
              <Text style={pillarCopy}>
                Evidence-backed walkthroughs, substantive sampling, and
                pragmatic corrective action plans (CAPs) tailored for executive
                leadership and Audit &amp; Risk Committees.
              </Text>
            </div>
          </Section>

          {/* PORTFOLIO TIMELINE: What Happens Next */}
          <Section style={timelineSection}>
            <Text style={timelineTitle}>04. Consultation &amp; Audit Review Workflow</Text>

            <div style={timelineStep}>
              <div style={timelineDot} />
              <div style={timelineLine} />
              <Text style={stepTag}>STEP 01 · WITHIN 24 HOURS</Text>
              <Text style={stepTitle}>
                Preliminary Risk &amp; Regulatory Perimeter Review
              </Text>
              <Text style={stepCopy}>
                I review your submitted parameters and prepare initial
                observations on applicable compliance obligations and
                high-priority control areas.
              </Text>
            </div>

            <div style={timelineStep}>
              <div style={timelineDot} />
              <div style={timelineLine} />
              <Text style={stepTag}>STEP 02 · 30-MINUTE EXECUTIVE BRIEFING</Text>
              <Text style={stepTitle}>
                Discovery Consultation &amp; Control Environment Walkthrough
              </Text>
              <Text style={stepCopy}>
                We align on current pain points, prior audit findings, statutory
                deadlines, and key organizational processes requiring assurance
                testing.
              </Text>
            </div>

            <div style={timelineStep}>
              <div style={timelineDot} />
              <Text style={stepTag}>STEP 03 · ENGAGEMENT CHARTER DELIVERY</Text>
              <Text style={stepTitle}>
                Tailored Audit Scope, Risk Matrix &amp; Compliance Schedule
              </Text>
              <Text style={stepCopy}>
                You receive a structured proposal detailing the Risk &amp;
                Control Matrix (RACM) scope, testing milestones, deliverables,
                and confidentiality covenants.
              </Text>
            </div>
          </Section>

          {/* CALL TO ACTION */}
          <Section style={ctaSection}>
            <div style={ctaCard}>
              <Text style={ctaTitle}>Expedite Your Discovery Briefing</Text>
              <Text style={ctaCopy}>
                While I will reply directly to{" "}
                <a href={`mailto:${email}`} style={ctaEmail}>
                  {email}
                </a>{" "}
                within 24 hours, you may also lock in a priority consultation
                slot or review my recent audit engagements below:
              </Text>
              <div className="cta-group">
                <a
                  href="https://kisekapius.com/schedule-consultation"
                  className="cta-primary"
                  style={ctaPrimary}
                >
                  Select Briefing Time Slot
                </a>
                <a
                  href="https://kisekapius.com/#case-studies"
                  className="cta-secondary"
                  style={ctaSecondary}
                >
                  Review Audit Case Studies
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
              This automated dossier confirmation is issued from the portfolio
              of Kiseka Pius in response to an inquiry submitted by{" "}
              <span style={monoFont}>{email}</span>. All preliminary risk
              disclosures, organizational metrics, and compliance inquiries are
              treated under strict professional audit confidentiality standards.
            </div>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

KisekaEmailTemplate.PreviewProps = {
  name: "Eleanor Vance",
  email: "e.vance@meridiancapital.co",
  subject: "Internal Audit Review & Process Assurance",
  message:
    "We are seeking an independent internal audit review of our treasury operations and regulatory reporting controls ahead of our annual statutory examination. Specifically looking to tighten our Risk & Control Matrix (RACM) and validate remediation of three prior-cycle compliance observations.",
} satisfies KisekaEmailTemplateProps;

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

const heroSubject = {
  color: "#B84A32",
};

const greeting = {
  fontSize: "14px",
  lineHeight: "1.65",
  color: "#09090B",
  margin: "0 0 14px 0",
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

const messageText = {
  fontSize: "12.5px",
  lineHeight: "1.55",
  color: "#52525B",
  fontStyle: "italic",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const pillarsSection = {
  padding: "0 32px 26px 32px",
};

const pillarsTitle = {
  fontSize: "14px",
  fontWeight: 700,
  color: "#09090B",
  margin: "0 0 6px 0",
};

const pillarsIntro = {
  fontSize: "13px",
  lineHeight: "1.55",
  color: "#52525B",
  margin: "0 0 14px 0",
};

const pillarBox = {
  backgroundColor: "#FFF6F4",
  borderLeft: "3px solid #F3AD9E",
  padding: "12px 16px",
  borderRadius: "0 8px 8px 0",
};

const pillarBoxGap = {
  backgroundColor: "#FFF6F4",
  borderLeft: "3px solid #F3AD9E",
  padding: "12px 16px",
  borderRadius: "0 8px 8px 0",
  margin: "10px 0",
};

const pillarTitle = {
  fontSize: "13px",
  fontWeight: 700,
  color: "#09090B",
  margin: "0",
};

const pillarCopy = {
  fontSize: "12.5px",
  lineHeight: "1.5",
  color: "#52525B",
  margin: "3px 0 0 0",
};

const timelineSection = {
  padding: "0 32px 28px 32px",
};

const timelineTitle = {
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