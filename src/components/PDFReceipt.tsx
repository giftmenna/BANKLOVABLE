import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface ReceiptData {
  transactionId: string;
  dateTime: string;
  transferType: string;
  status: string;
  sender: {
    username: string;
    email: string;
  };
  recipient: {
    name: string;
    accountNumber?: string;
    routingNumber?: string;
    swiftCode?: string;
    bankName?: string;
    bankAddress?: string;
    identifier?: string;
  };
  amount: number;
  memo?: string;
}

export const generatePDFReceipt = async (receiptData: ReceiptData) => {
  // Create a temporary div to render the receipt
  const receiptDiv = document.createElement('div');
  receiptDiv.style.position = 'absolute';
  receiptDiv.style.left = '-9999px';
  receiptDiv.style.top = '0';
  receiptDiv.style.width = '800px';
  receiptDiv.style.maxHeight = '1000px';
  receiptDiv.style.padding = '30px';
  receiptDiv.style.backgroundColor = '#ffffff';
  receiptDiv.style.fontFamily = 'Arial, sans-serif';
  receiptDiv.style.color = '#1f2937';
  receiptDiv.style.lineHeight = '1.5';
  receiptDiv.style.borderRadius = '12px';
  receiptDiv.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // Create the receipt HTML
  receiptDiv.innerHTML = `
    <!-- Header -->
    <div style="
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      color: white;
      padding: 25px;
      border-radius: 16px 16px 0 0;
      margin: -30px -30px 25px -30px;
      text-align: center;
      position: relative;
    ">
      <div style="font-size: 24px; font-weight: 800; margin-bottom: 6px;">
        Nivalus Bank
      </div>
      <div style="font-size: 14px; opacity: 0.9;">
        Your Trusted Financial Partner
      </div>
    </div>

    <!-- Status Badge -->
    <div style="
      position: absolute;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #00d4aa 0%, #0099cc 100%);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    ">
      ${receiptData.status}
    </div>

    <!-- Main Content -->
    <div style="padding: 15px 0;">
      
      <!-- Transaction Details -->
      <div style="
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 20px;
        border-radius: 12px;
        margin-bottom: 20px;
        color: white;
      ">
        <div style="font-size: 20px; font-weight: 700; margin-bottom: 15px; text-align: center;">
          Transaction Receipt
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div>
            <div style="font-weight: 600; color: rgba(255,255,255,0.8); font-size: 12px; text-transform: uppercase; margin-bottom: 5px;">
              Transaction ID
            </div>
            <div style="font-size: 14px; font-weight: 600; font-family: 'Courier New', monospace;">
              ${receiptData.transactionId}
            </div>
          </div>
          
          <div>
            <div style="font-weight: 600; color: rgba(255,255,255,0.8); font-size: 12px; text-transform: uppercase; margin-bottom: 5px;">
              Date & Time
            </div>
            <div style="font-size: 14px; font-weight: 600;">
              ${formatDate(receiptData.dateTime)}
            </div>
          </div>
          
          <div>
            <div style="font-weight: 600; color: rgba(255,255,255,0.8); font-size: 12px; text-transform: uppercase; margin-bottom: 5px;">
              Transfer Type
            </div>
            <div style="font-size: 14px; font-weight: 600;">
              ${receiptData.transferType}
            </div>
          </div>
          
          <div>
            <div style="font-weight: 600; color: rgba(255,255,255,0.8); font-size: 12px; text-transform: uppercase; margin-bottom: 5px;">
              Reference
            </div>
            <div style="font-size: 14px; font-weight: 600;">
              #${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
            </div>
          </div>
        </div>
      </div>

      <!-- Amount Section -->
      <div style="
        background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
        padding: 25px;
        border-radius: 12px;
        margin-bottom: 20px;
        text-align: center;
      ">
        <div style="font-weight: 700; color: #8b4513; font-size: 14px; text-transform: uppercase; margin-bottom: 8px;">
          Transfer Amount
        </div>
        <div style="font-size: 32px; font-weight: 800; color: #8b4513; margin-bottom: 12px;">
          ${formatCurrency(receiptData.amount)}
        </div>
        
        ${receiptData.memo ? `
          <div style="
            margin-top: 15px; 
            padding: 12px; 
            background: rgba(255,255,255,0.8); 
            border-radius: 8px;
          ">
            <div style="font-weight: 700; color: #8b4513; font-size: 12px; text-transform: uppercase; margin-bottom: 5px;">
              Memo
            </div>
            <div style="color: #8b4513; font-style: italic;">
              ${receiptData.memo}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Account Information -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
        
        <!-- Sender Information -->
        <div style="
          background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
          padding: 15px;
          border-radius: 12px;
        ">
          <div style="font-weight: 700; color: #2d3748; font-size: 12px; text-transform: uppercase; margin-bottom: 12px;">
            Sender Information
          </div>
          <div style="margin-bottom: 10px;">
            <span style="font-weight: 600; color: #4a5568;">Username:</span>
            <span style="margin-left: 8px; color: #2d3748; font-weight: 500;">${receiptData.sender.username}</span>
          </div>
          <div style="margin-bottom: 10px;">
            <span style="font-weight: 600; color: #4a5568;">Email:</span>
            <span style="margin-left: 8px; color: #2d3748; font-weight: 500;">${receiptData.sender.email}</span>
          </div>
          <div>
            <span style="font-weight: 600; color: #4a5568;">Account:</span>
            <span style="margin-left: 8px; color: #2d3748; font-weight: 500; font-family: 'Courier New', monospace;">
              ****${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
            </span>
          </div>
        </div>

        <!-- Recipient Information -->
        <div style="
          background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
          padding: 15px;
          border-radius: 12px;
        ">
          <div style="font-weight: 700; color: #8b4513; font-size: 12px; text-transform: uppercase; margin-bottom: 12px;">
            Recipient Information
          </div>
          
          ${receiptData.transferType === 'P2P' ? `
            <div style="margin-bottom: 10px;">
              <span style="font-weight: 600; color: #8b4513;">
                ${receiptData.recipient.identifier?.includes('@') ? 'Email:' : 'Phone:'}
              </span>
              <span style="margin-left: 8px; color: #8b4513; font-weight: 500;">${receiptData.recipient.identifier}</span>
            </div>
          ` : `
            <div style="margin-bottom: 10px;">
              <span style="font-weight: 600; color: #8b4513;">Name:</span>
              <span style="margin-left: 8px; color: #8b4513; font-weight: 500;">${receiptData.recipient.name}</span>
            </div>
            ${receiptData.recipient.accountNumber ? `
              <div style="margin-bottom: 10px;">
                <span style="font-weight: 600; color: #8b4513;">Account:</span>
                <span style="margin-left: 8px; color: #8b4513; font-weight: 500; font-family: 'Courier New', monospace;">
                  ${receiptData.recipient.accountNumber}
                </span>
              </div>
            ` : ''}
            ${receiptData.recipient.routingNumber ? `
              <div style="margin-bottom: 10px;">
                <span style="font-weight: 600; color: #8b4513;">Routing:</span>
                <span style="margin-left: 8px; color: #8b4513; font-weight: 500;">${receiptData.recipient.routingNumber}</span>
              </div>
            ` : ''}
            ${receiptData.recipient.swiftCode ? `
              <div style="margin-bottom: 10px;">
                <span style="font-weight: 600; color: #8b4513;">SWIFT:</span>
                <span style="margin-left: 8px; color: #8b4513; font-weight: 500;">${receiptData.recipient.swiftCode}</span>
              </div>
            ` : ''}
            ${receiptData.recipient.bankName ? `
              <div style="margin-bottom: 10px;">
                <span style="font-weight: 600; color: #8b4513;">Bank:</span>
                <span style="margin-left: 8px; color: #8b4513; font-weight: 500;">${receiptData.recipient.bankName}</span>
              </div>
            ` : ''}
            ${receiptData.recipient.bankAddress ? `
              <div style="margin-bottom: 10px;">
                <span style="font-weight: 600; color: #8b4513;">Bank Address:</span>
                <span style="margin-left: 8px; color: #8b4513; font-weight: 500; font-size: 12px;">${receiptData.recipient.bankAddress}</span>
              </div>
            ` : ''}
          `}
        </div>
      </div>

      <!-- Footer -->
      <div style="
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 20px;
        border-radius: 12px;
        text-align: center;
        color: white;
        page-break-inside: avoid;
        break-inside: avoid;
      ">
        <div style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">
          Thank you for banking with Nivalus Bank
        </div>
        <div style="font-size: 14px; margin-bottom: 12px; opacity: 0.9;">
          Your Trusted Financial Partner
        </div>
        <div style="font-size: 12px; opacity: 0.8; margin-bottom: 12px; white-space: nowrap;">
          This receipt serves as proof of your transaction. Please keep it for your records and future reference.
        </div>
        <div style="font-size: 11px; opacity: 0.7;">
          Generated on ${new Date().toLocaleString()}
        </div>
      </div>
    </div>
  `;

  // Add the div to the document
  document.body.appendChild(receiptDiv);

  try {
    // Convert the div to canvas
    const canvas = await html2canvas(receiptDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
    });

    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Only add the image if it fits on one page, otherwise scale it down
    if (imgHeight <= pageHeight) {
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    } else {
      // Scale down to fit on one page
      const scale = pageHeight / imgHeight;
      const scaledWidth = imgWidth * scale;
      const scaledHeight = imgHeight * scale;
      const xOffset = (210 - scaledWidth) / 2; // Center horizontally
      pdf.addImage(imgData, 'PNG', xOffset, 0, scaledWidth, scaledHeight);
    }

    // Download the PDF
    pdf.save(`receipt-${receiptData.transactionId}.pdf`);

    // Clean up
    document.body.removeChild(receiptDiv);
  } catch (error) {
    console.error('Error generating PDF:', error);
    document.body.removeChild(receiptDiv);
    throw error;
  }
}; 