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
  receiptDiv.style.padding = '40px';
  receiptDiv.style.backgroundColor = '#ffffff';
  receiptDiv.style.fontFamily = 'Georgia, "Times New Roman", serif';
  receiptDiv.style.color = '#1a1a1a';
  receiptDiv.style.lineHeight = '1.6';
  receiptDiv.style.borderRadius = '8px';
  receiptDiv.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
  receiptDiv.style.border = '1px solid #e5e5e5';

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

  // Create the receipt HTML with Santander-inspired design
  receiptDiv.innerHTML = `
    <!-- Header with Santander-style design -->
    <div style="
      background: linear-gradient(135deg, #EC0000 0%, #CC0000 100%);
      color: white;
      padding: 30px 40px;
      border-radius: 8px 8px 0 0;
      margin: -40px -40px 30px -40px;
      position: relative;
      border-bottom: 4px solid #B30000;
    ">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-size: 28px; font-weight: 700; margin-bottom: 4px; font-family: 'Georgia', serif;">
            Nivalus Bank
          </div>
          <div style="font-size: 14px; opacity: 0.9; font-weight: 300;">
            Secure Banking Solutions
          </div>
        </div>
        <div style="
          background: rgba(255,255,255,0.15);
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: 1px solid rgba(255,255,255,0.2);
        ">
          ${receiptData.status}
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div style="padding: 0;">
      
      <!-- Transaction Title -->
      <div style="
        text-align: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 2px solid #f0f0f0;
      ">
        <div style="font-size: 24px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px;">
          Transaction Receipt
        </div>
        <div style="font-size: 14px; color: #666; font-weight: 400;">
          Official Banking Document
        </div>
      </div>

      <!-- Transaction Details Grid -->
      <div style="
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        margin-bottom: 30px;
        padding: 25px;
        background: #fafafa;
        border-radius: 6px;
        border: 1px solid #e0e0e0;
      ">
        <div>
          <div style="font-weight: 600; color: #666; font-size: 11px; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px;">
            Transaction ID
          </div>
          <div style="font-size: 14px; font-weight: 600; color: #1a1a1a; font-family: 'Courier New', monospace; background: #fff; padding: 8px; border-radius: 4px; border: 1px solid #ddd;">
            ${receiptData.transactionId}
          </div>
        </div>
        
        <div>
          <div style="font-weight: 600; color: #666; font-size: 11px; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px;">
            Date & Time
          </div>
          <div style="font-size: 14px; font-weight: 600; color: #1a1a1a;">
            ${formatDate(receiptData.dateTime)}
          </div>
        </div>
        
        <div>
          <div style="font-weight: 600; color: #666; font-size: 11px; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px;">
            Transfer Type
          </div>
          <div style="font-size: 14px; font-weight: 600; color: #1a1a1a;">
            ${receiptData.transferType}
          </div>
        </div>
        
        <div>
          <div style="font-weight: 600; color: #666; font-size: 11px; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px;">
            Reference Number
          </div>
          <div style="font-size: 14px; font-weight: 600; color: #1a1a1a; font-family: 'Courier New', monospace;">
            #${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
          </div>
        </div>
      </div>

      <!-- Amount Section -->
      <div style="
        background: linear-gradient(135deg, #EC0000 0%, #CC0000 100%);
        padding: 30px;
        border-radius: 6px;
        margin-bottom: 30px;
        text-align: center;
        color: white;
        border: 1px solid #B30000;
      ">
        <div style="font-weight: 600; color: rgba(255,255,255,0.9); font-size: 12px; text-transform: uppercase; margin-bottom: 10px; letter-spacing: 1px;">
          Transfer Amount
        </div>
        <div style="font-size: 36px; font-weight: 700; margin-bottom: 15px; font-family: 'Georgia', serif;">
          ${formatCurrency(receiptData.amount)}
        </div>
        
        ${receiptData.memo ? `
          <div style="
            margin-top: 20px; 
            padding: 15px; 
            background: rgba(255,255,255,0.1); 
            border-radius: 4px;
            border: 1px solid rgba(255,255,255,0.2);
          ">
            <div style="font-weight: 600; color: rgba(255,255,255,0.9); font-size: 11px; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px;">
              Memo
            </div>
            <div style="color: white; font-style: italic; font-size: 14px;">
              ${receiptData.memo}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Account Information -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 30px;">
        
        <!-- Sender Information -->
        <div style="
          background: #f8f9fa;
          padding: 25px;
          border-radius: 6px;
          border: 1px solid #e0e0e0;
        ">
          <div style="
            font-weight: 700; 
            color: #EC0000; 
            font-size: 12px; 
            text-transform: uppercase; 
            margin-bottom: 15px; 
            letter-spacing: 0.5px;
            border-bottom: 2px solid #EC0000;
            padding-bottom: 8px;
          ">
            Sender Information
          </div>
          <div style="margin-bottom: 12px;">
            <span style="font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase;">Username:</span>
            <span style="margin-left: 8px; color: #1a1a1a; font-weight: 500; font-size: 14px;">${receiptData.sender.username}</span>
          </div>
          <div style="margin-bottom: 12px;">
            <span style="font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase;">Email:</span>
            <span style="margin-left: 8px; color: #1a1a1a; font-weight: 500; font-size: 14px;">${receiptData.sender.email}</span>
          </div>
          <div>
            <span style="font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase;">Account:</span>
            <span style="margin-left: 8px; color: #1a1a1a; font-weight: 500; font-family: 'Courier New', monospace; font-size: 14px;">
              ****${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
            </span>
          </div>
        </div>

        <!-- Recipient Information -->
        <div style="
          background: #f8f9fa;
          padding: 25px;
          border-radius: 6px;
          border: 1px solid #e0e0e0;
        ">
          <div style="
            font-weight: 700; 
            color: #EC0000; 
            font-size: 12px; 
            text-transform: uppercase; 
            margin-bottom: 15px; 
            letter-spacing: 0.5px;
            border-bottom: 2px solid #EC0000;
            padding-bottom: 8px;
          ">
            Recipient Information
          </div>
          
          ${receiptData.transferType === 'P2P' ? `
            <div style="margin-bottom: 12px;">
              <span style="font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase;">
                ${receiptData.recipient.identifier?.includes('@') ? 'Email:' : 'Phone:'}
              </span>
              <span style="margin-left: 8px; color: #1a1a1a; font-weight: 500; font-size: 14px;">${receiptData.recipient.identifier}</span>
            </div>
          ` : `
            <div style="margin-bottom: 12px;">
              <span style="font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase;">Name:</span>
              <span style="margin-left: 8px; color: #1a1a1a; font-weight: 500; font-size: 14px;">${receiptData.recipient.name}</span>
            </div>
            ${receiptData.recipient.accountNumber ? `
              <div style="margin-bottom: 12px;">
                <span style="font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase;">Account:</span>
                <span style="margin-left: 8px; color: #1a1a1a; font-weight: 500; font-family: 'Courier New', monospace; font-size: 14px;">
                  ${receiptData.recipient.accountNumber}
                </span>
              </div>
            ` : ''}
            ${receiptData.recipient.routingNumber ? `
              <div style="margin-bottom: 12px;">
                <span style="font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase;">Routing:</span>
                <span style="margin-left: 8px; color: #1a1a1a; font-weight: 500; font-size: 14px;">${receiptData.recipient.routingNumber}</span>
              </div>
            ` : ''}
            ${receiptData.recipient.swiftCode ? `
              <div style="margin-bottom: 12px;">
                <span style="font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase;">SWIFT:</span>
                <span style="margin-left: 8px; color: #1a1a1a; font-weight: 500; font-size: 14px;">${receiptData.recipient.swiftCode}</span>
              </div>
            ` : ''}
            ${receiptData.recipient.bankName ? `
              <div style="margin-bottom: 12px;">
                <span style="font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase;">Bank:</span>
                <span style="margin-left: 8px; color: #1a1a1a; font-weight: 500; font-size: 14px;">${receiptData.recipient.bankName}</span>
              </div>
            ` : ''}
            ${receiptData.recipient.bankAddress ? `
              <div style="margin-bottom: 12px;">
                <span style="font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase;">Bank Address:</span>
                <span style="margin-left: 8px; color: #1a1a1a; font-weight: 500; font-size: 12px;">${receiptData.recipient.bankAddress}</span>
              </div>
            ` : ''}
          `}
        </div>
      </div>

      <!-- Footer -->
      <div style="
        background: #1a1a1a;
        padding: 25px;
        border-radius: 6px;
        text-align: center;
        color: white;
        page-break-inside: avoid;
        break-inside: avoid;
        border: 1px solid #333;
      ">
        <div style="font-size: 16px; font-weight: 700; margin-bottom: 10px; font-family: 'Georgia', serif;">
          Thank you for banking with Nivalus Bank
        </div>
        <div style="font-size: 13px; margin-bottom: 15px; opacity: 0.9; font-weight: 300;">
          Your Trusted Financial Partner
        </div>
        <div style="
          font-size: 11px; 
          opacity: 0.8; 
          margin-bottom: 15px; 
          line-height: 1.5;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        ">
          This receipt serves as official proof of your transaction. Please retain this document for your records and future reference. For any questions, please contact our customer service.
        </div>
        <div style="
          font-size: 10px; 
          opacity: 0.7; 
          border-top: 1px solid #333; 
          padding-top: 15px;
          font-family: 'Courier New', monospace;
        ">
          Generated on ${new Date().toLocaleString()} | Document ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}
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