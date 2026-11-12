export type Inquiry = {
  company: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  consent: boolean;
};

export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;

export const emptyInquiry: Inquiry = {
  company: "",
  name: "",
  phone: "",
  email: "",
  service: "",
  budget: "",
  message: "",
  consent: false,
};

export function validateInquiry(d: Inquiry): InquiryErrors {
  const e: InquiryErrors = {};
  if (d.company.trim().length < 2) e.company = "Моля, въведете име на фирма.";
  if (d.name.trim().length < 2) e.name = "Моля, въведете лице за контакт.";
  if (!/^\+?[\d\s()-]{8,18}$/.test(d.phone.trim())) e.phone = "Моля, въведете валиден телефонен номер.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = "Моля, въведете валиден имейл адрес.";
  if (!d.service) e.service = "Моля, изберете услуга или пакет.";
  if (d.message.length > 3000) e.message = "Съобщението е твърде дълго.";
  if (!d.consent) e.consent = "Необходимо е съгласие, за да се свържем с Вас.";
  return e;
}
