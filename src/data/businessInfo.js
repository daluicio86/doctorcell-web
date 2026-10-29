// Business-confirmed contact and hours, shared by pages and structured data.
export const openingHours = {
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  opens: "09:00",
  closes: "18:00",
  label: "Lunes a sábado"
};

export const contactInfo = {
  businessName: "DoctorCell Quito",
  address: "Prensa y Río Arajuno, Quito, Ecuador",
  whatsappDisplay: "+593 98 322 2100",
  phoneDisplay: "+593 98 322 2100",
  phoneHref: "+593983222100",
  email: "dc.infouio@gmail.com",
  hours: `${openingHours.label}, ${openingHours.opens}–${openingHours.closes}`
};

export const whatsappNumber = contactInfo.phoneHref.replace(/\D/g, "");
