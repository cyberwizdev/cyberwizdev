"use server";

import { ContactFormData } from "@/components/ContactForm";
import { sendContactFormAdmin } from "@/email/templates/contactFormAdmin";
import { sendContactFormUser } from "@/email/templates/contactFormUser";
import { sendNewsletterSubscription } from "@/email/templates/newsletterSubscription";
import { prisma } from "@/prisma/prisma";
import nodemailer from "nodemailer";

export const contact = async (data: ContactFormData) => {
  const { name, phone, email, message } = data;

  try {
    await prisma.contact.create({ data: { name, email, message, phone } });

    sendContactFormUser(email, {
      name,
      message,
    });

    sendContactFormAdmin(process.env.ADMIN_EMAIL!, {
      contactName: name,
      contactPhone: phone,
      contactEmail: email,
      contactMessage: message,
      submissionDate: new Date().toISOString(),
      contactSubject: "Contact Form (Cyberwizdev)",
      contactCompany: "Cyberwizdev",
    });
  } catch (ex) {
    console.log(ex);
    throw new Error("Something went wrong. Please try again!");
  }
};

export const subscribeToNewsletter = async (email: string) => {
  try {
    await prisma.newsletterSubscription.create({ data: { email } });

    sendNewsletterSubscription(email, {
      subscriberName: email,
      unsubscribeUrl: `${process.env.AUTH_URL}/unsubscribe?email=${email}`,
    });
  } catch (ex) {
    console.log(ex);
    throw new Error("Something went wrong. Please try again!");
  }
};
