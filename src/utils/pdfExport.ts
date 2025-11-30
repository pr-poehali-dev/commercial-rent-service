import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportContractToPDF = async (contractData: any, elementId: string = 'contract-preview') => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.error('Contract preview element not found');
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const fileName = `Договор_${contractData.contractNumber}_${new Date().toLocaleDateString('ru-RU').replace(/\./g, '-')}.pdf`;
    pdf.save(fileName);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};

export const generateSimpleContractPDF = (contractData: any) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  let y = 20;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.text('ДОГОВОР АРЕНДЫ НЕЖИЛОГО ПОМЕЩЕНИЯ', pageWidth / 2, y, { align: 'center' });
  
  y += 10;
  pdf.setFontSize(14);
  pdf.text(`№ ${contractData.contractNumber}`, pageWidth / 2, y, { align: 'center' });
  
  y += 10;
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`г. Москва, ${contractData.generatedDate}`, pageWidth / 2, y, { align: 'center' });

  y += 15;
  pdf.setFontSize(11);
  const text = pdf.splitTextToSize(
    `${contractData.landlordName}, ИНН ${contractData.landlordINN}, именуемое в дальнейшем "Арендодатель", ` +
    `с одной стороны, и ${contractData.tenantName}, именуемое в дальнейшем "Арендатор", с другой стороны, ` +
    `совместно именуемые "Стороны", заключили настоящий Договор о нижеследующем:`,
    pageWidth - margin * 2
  );
  
  text.forEach((line: string) => {
    pdf.text(line, margin, y);
    y += 7;
  });

  y += 10;
  pdf.setFont('helvetica', 'bold');
  pdf.text('1. ПРЕДМЕТ ДОГОВОРА', margin, y);
  pdf.setFont('helvetica', 'normal');
  y += 7;

  const section1 = pdf.splitTextToSize(
    `1.1. Арендодатель обязуется предоставить Арендатору за плату во временное владение и пользование нежилое помещение:\n` +
    `Объект: ${contractData.propertyName}\n` +
    `Адрес: ${contractData.propertyAddress}\n` +
    `Площадь: ${contractData.area} м²`,
    pageWidth - margin * 2
  );

  section1.forEach((line: string) => {
    if (y > 270) {
      pdf.addPage();
      y = 20;
    }
    pdf.text(line, margin, y);
    y += 7;
  });

  y += 10;
  pdf.setFont('helvetica', 'bold');
  pdf.text('2. СРОК ДЕЙСТВИЯ ДОГОВОРА', margin, y);
  pdf.setFont('helvetica', 'normal');
  y += 7;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  pdf.text(`2.1. Договор действует с ${formatDate(contractData.startDate)} по ${formatDate(contractData.endDate)}.`, margin, y);
  y += 14;

  pdf.setFont('helvetica', 'bold');
  pdf.text('3. РАЗМЕР И ПОРЯДОК ОПЛАТЫ', margin, y);
  pdf.setFont('helvetica', 'normal');
  y += 7;

  const rent = Number(contractData.monthlyRent).toLocaleString('ru-RU');
  pdf.text(`3.1. Арендная плата: ${rent} ₽ в месяц.`, margin, y);
  y += 7;
  pdf.text(`3.2. Оплата до ${contractData.paymentDay} числа каждого месяца.`, margin, y);

  if (contractData.deposit) {
    y += 7;
    const deposit = Number(contractData.deposit).toLocaleString('ru-RU');
    pdf.text(`3.3. Обеспечительный платёж: ${deposit} ₽.`, margin, y);
  }

  y += 20;
  if (y > 250) {
    pdf.addPage();
    y = 20;
  }

  pdf.setFont('helvetica', 'bold');
  pdf.text('ПОДПИСИ СТОРОН', margin, y);
  y += 15;

  pdf.setFont('helvetica', 'normal');
  pdf.text('АРЕНДОДАТЕЛЬ:', margin, y);
  pdf.text('АРЕНДАТОР:', pageWidth / 2 + 10, y);
  y += 7;
  
  pdf.setFontSize(10);
  pdf.text(contractData.landlordName, margin, y);
  pdf.text(contractData.tenantName, pageWidth / 2 + 10, y);
  y += 15;
  
  pdf.line(margin, y, margin + 60, y);
  pdf.line(pageWidth / 2 + 10, y, pageWidth / 2 + 70, y);
  y += 5;
  pdf.setFontSize(8);
  pdf.text('(подпись)', margin + 20, y);
  pdf.text('(подпись)', pageWidth / 2 + 30, y);

  const fileName = `Договор_${contractData.contractNumber}.pdf`;
  pdf.save(fileName);
};
