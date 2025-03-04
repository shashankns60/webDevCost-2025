import { jsPDF } from 'jspdf';
import { ServiceOption } from '../types';

export function generateQuote(
  selectedServices: ServiceOption[],
  customNote: string,
  formData: { name: string; email: string; mobile: string; city: string }
) {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Add watermarks
  pdf.setTextColor(230, 230, 230);
  pdf.setFontSize(30);
  
  // Create watermark pattern
  for (let i = -50; i < pageHeight + 50; i += 80) {
    for (let j = -50; j < pageWidth + 50; j += 100) {
      // Calculate rotated position
      const angle = -45;
      const radians = angle * (Math.PI / 180);
      const text = 'www.santeck.in';
      const textWidth = pdf.getStringUnitWidth(text) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
      
      pdf.saveGraphicsState();
      // Move to position
      pdf.moveTo(j, i);
      // Rotate text
      const x = j + (textWidth / 2);
      const y = i;
      pdf.text(text, x, y, {
        angle: angle,
        align: 'center'
      });
      pdf.restoreGraphicsState();
    }
  }

  // Reset text color for content
  pdf.setTextColor(19, 29, 90); // #131D5A
  pdf.setFontSize(20);
  pdf.text('Web Development Quote', 20, 20);

  // Add customer details
  pdf.setFontSize(12);
  pdf.text(`Name: ${formData.name}`, 20, 40);
  pdf.text(`Email: ${formData.email}`, 20, 50);
  pdf.text(`Mobile: ${formData.mobile}`, 20, 60);
  pdf.text(`City: ${formData.city}`, 20, 70);

  // Add services
  pdf.setFontSize(14);
  pdf.text('Selected Services:', 20, 90);
  
  let yPos = 100;
  let total = 0;

  selectedServices.forEach((service) => {
    pdf.setFontSize(12);
    pdf.text(`${service.name}`, 20, yPos);
    pdf.text(`₹${service.basePrice.toLocaleString()}`, 150, yPos);
    yPos += 10;
    total += service.basePrice;
  });

  // Add custom note if present
  if (customNote) {
    yPos += 10;
    pdf.setFontSize(14);
    pdf.text('Custom Notes:', 20, yPos);
    yPos += 10;
    pdf.setFontSize(12);
    const splitNote = pdf.splitTextToSize(customNote, 170);
    pdf.text(splitNote, 20, yPos);
    yPos += splitNote.length * 7;
  }

  // Add total
  pdf.setFontSize(16);
  pdf.text(`Total: ₹${total.toLocaleString()}`, 20, yPos + 20);

  return pdf;
}