export const htmlReceipt = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invoice</title>
    <style>
    .invoice-preview {
      border-radius: 4px;
      border: 0.575px solid var(--Secondary-Light-grey, #e6e6e6);
      box-shadow: 0px 2px 5px 0px rgba(16, 24, 40, 0.05);
      background: #fff;
      display: flex;
      max-width: 100vw;
      flex-direction: column;
      overflow: hidden;
      font-family: Pretendard Variable, -apple-system, Roboto, Helvetica, sans-serif;
      padding: 25px 0 48px;
     
    }
    
    .invoice-container {
      display: flex;
      width: 100%;
      flex-direction: column;
      padding: 0 14px;
    
    }
    
    .invoice-header {
      align-self: start;
      display: flex;
      gap: 40px 92px;
    }
    
    .billing-info {
      display: flex;
      flex-direction: column;
      align-items: start;
    }
    
    .invoice-number-wrapper {
      display: flex;
      align-items: center;
      gap: 9px;
      font-size: 14px;
      line-height: 1;
    }
    
    .company-logo {
      background-color: #d9d9d9;
      border-radius: 50%;
      width: 25px;
      height: 26px;
      margin: auto 0;
    }
    
    .invoice-number-container {
      display: flex;
      align-items: start;
      gap: 1px;
      margin: auto 0;
    }
    
    .invoice-label {
      color: var(--Content-Secondary, #333);
      font-weight: 400;
      letter-spacing: 0.14px;
    }
    
    .invoice-number {
      color: var(--Core-Dark-Blue, #0d3b66);
      font-weight: 600;
      letter-spacing: 0.18px;
    }
    
    .bill-to-section {
      display: flex;
      margin-top: 13px;
      flex-direction: column;
      font-size: 14px;
      line-height: 1;
    }
    
    .bill-to-label {
      color: var(--Content-Tertiary, #b2b2b2);
      font-weight: 400;
      letter-spacing: 0.14px;
    }
    
    .client-name {
      color: var(--Core-Dark-Blue, #0d3b66);
      font-weight: 600;
      letter-spacing: 0.18px;
    }
    
    .project-details {
      display: flex;
      margin-top: 17px;
      flex-direction: column;
    }
    
    .date-label {
      color: var(--Content-Tertiary, #b2b2b2);
      font-size: 14px;
      font-weight: 400;
      line-height: 1;
      letter-spacing: 0.14px;
    }
    
    .project-title {
      color: var(--Core-Dark-Blue, #0d3b66);
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.08px;
    }
    
    .sender-info {
      align-self: end;
      display: flex;
      margin-top: 39px;
      flex-direction: column;
      font-size: 14px;
      line-height: 1;
    }
    
    .from-section {
      display: flex;
      flex-direction: column;
    }
    
    .from-label {
      color: var(--Content-Tertiary, #b2b2b2);
      font-weight: 400;
      letter-spacing: 0.14px;
    }
    
    .sender-name {
      color: var(--Core-Dark-Blue, #0d3b66);
      font-weight: 600;
      letter-spacing: 0.18px;
    }
    
    .date-section {
      align-self: start;
      display: flex;
      margin-top: 17px;
      flex-direction: column;
    }
    
    .divider {
      background-color: #e6e6e6;
      margin-top: 15px;
      height: 1px;
      border: 1px solid #e6e6e6;
    }
    
    .invoice-items {
      display: flex;
      margin-top: 9px;
      align-items: start;
      font-size: 14px;
      color: var(--Content-Primary, #0f0f0f);
      font-weight: 400;
      letter-spacing: 0.14px;
      line-height: 1;
    }
    
    .item-description {
      display: flex;
      flex-direction: column;
      width: 111px;
    }
    
    .column-header {
      color: var(--Core-Dark-Blue, #0d3b66);
      font-weight: 600;
      letter-spacing: 0.18px;
      padding: 5px 6px 5px 7px;
    }
    
    .highlighted-row {
      background-color: rgba(135, 193, 248, 0.15);
      padding: 5px 6px 5px 7px;
    }
    
    .regular-row {
      padding: 5px 6px 5px 7px;
    }
    
    .quantity-column {
      display: flex;
      flex-direction: column;
      width: 56px;
    }
    
    .price-column {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    
    .amount-column {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    
    .totals-section {
      align-self: end;
      display: flex;
      margin-top: 9px;
      width: 127px;
      flex-direction: column;
      align-items: end;
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0.14px;
    }
    
    .total-row {
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 5px 0;
    }
    
    .grand-total {
      border-top: 0.575px solid var(--Secondary-Light-grey, #e6e6e6);
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.08px;
    }
    
    .payment-section {
      display: flex;
      margin-top: 11px;
      width: 100%;
      flex-direction: column;
      font-size: 14px;
      line-height: 1;
      padding: 0 14px;
    }
    
    .payment-details {
      align-self: start;
      display: flex;
      margin-top: 14px;
      gap: 40px;
    }
    
    .terms-section {
      align-self: start;
      display: flex;
      flex-direction: column;
    }
    
    .section-label {
      color: var(--Content-Tertiary, #b2b2b2);
      font-weight: 400;
      letter-spacing: 0.14px;
    }
    
    .section-content {
      color: var(--Core-Dark-Blue, #0d3b66);
      font-weight: 600;
      letter-spacing: 0.18px;
    }
    
    .bank-details {
      display: flex;
      flex-direction: column;
      color: var(--Core-Dark-Blue, #0d3b66);
      font-weight: 600;
      letter-spacing: 0.18px;
    }
    
    .bank-info {
      font-family: Plus Jakarta Sans, -apple-system, Roboto, Helvetica, sans-serif;
      font-weight: 400;
    }
    </style>
  </head>
  <div class="invoice-preview">
      <div class="invoice-container">
        <div class="invoice-header">
          <div class="billing-info">
            <div class="invoice-number-wrapper">
              <div class="company-logo"></div>
              <div class="invoice-number-container">
                <div class="invoice-label">Invoice No.</div>
                <div class="invoice-number">#0001</div>
              </div>
            </div>
            <div class="bill-to-section">
              <div class="bill-to-label">Bill To:</div>
              <div class="client-name">Mr Peter Abu</div>
            </div>
            <div class="project-details">
              <div class="date-label">Issuance date</div>
              <div class="project-title">Website Design For Lancebox</div>
            </div>
          </div>
          <div class="sender-info">
            <div class="from-section">
              <div class="from-label">From:</div>
              <div class="sender-name">Miss Olasubomi Akin</div>
            </div>
            <div class="date-section">
              <div class="date-label">Issuance date</div>
              <div class="section-content">25/01/2023</div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="invoice-items">
          <div class="item-description">
            <div class="column-header">Description</div>
            <div class="highlighted-row">Web Design</div>
            <div class="regular-row">Logo Design</div>
            <div class="highlighted-row">Web Design</div>
            <div class="regular-row">Logo Design</div>
          </div>
          <div class="quantity-column">
            <div class="column-header">Qty</div>
            <div class="highlighted-row">2.00</div>
            <div class="regular-row">2.00</div>
            <div class="highlighted-row">2.00</div>
            <div class="regular-row">2.00</div>
          </div>
          <div class="price-column">
            <div class="column-header">Unit Price(N)</div>
            <div class="highlighted-row">3,000,000</div>
            <div class="regular-row">3,000,000</div>
            <div class="highlighted-row">3,000,000</div>
            <div class="regular-row">3,000,000</div>
          </div>
          <div class="amount-column">
            <div class="column-header">Amount(N)</div>
            <div class="highlighted-row">6,000,000</div>
            <div class="regular-row">6,000,000</div>
            <div class="highlighted-row">6,000,000</div>
            <div class="regular-row">6,000,000</div>
          </div>
        </div>
        <div class="totals-section">
          <div class="total-row">
            <div>Subtotal:</div>
            <div>N12,000,000.00</div>
          </div>
          <div class="total-row">
            <div>Tax:</div>
            <div>N1,440,000.00</div>
          </div>
          <div class="total-row">
            <div>Shipping:</div>
            <div>N500,000.00</div>
          </div>
          <div class="total-row grand-total">
            <div>Total:</div>
            <div>N14,900,000.00</div>
          </div>
        </div>
      </div>
      <div class="payment-section">
        <div class="divider"></div>
        <div class="payment-details">
          <div class="terms-section">
            <div class="section-label">Terms Of Payment</div>
            <div class="section-content">Payment will be made in installments</div>
          </div>
          <div class="bank-details">
            <div class="section-label">Payment Details</div>
            <div>Bank Number: <span class="bank-info">0123456789</span></div>
            <div>Bank Name: <span class="bank-info">Lance Bank</span></div>
            <div>Account Name: <span class="bank-info">Jane Doe</span></div>
          </div>
        </div>
      </div>
    </div>
</html>
`;
