import { EmailFormTypes } from '@/schema/schema';
import * as React from 'react';

// interface EmailTemplateProps {
//   firstName: string;
// }

export function EmailTemplate({ name, email, subject, message }: EmailFormTypes) {
  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <h1>Welcome, {email}!</h1>
      <h1>Welcome, {subject}!</h1>
      <h1>Welcome, {message}!</h1>
    </div>
  );
}