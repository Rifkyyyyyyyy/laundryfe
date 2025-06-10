import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';

import logo from '../../../assets/images/appLogo.png'; // Pastikan path sesuai
import SignFont from '../../../../public/assets/font/sign.ttf';


// Format tanggal (Indonesia)
const formatDate = (isoStr) => {
  const d = new Date(isoStr);
  return d.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format mata uang IDR
const formatCurrency = (num) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(num);

// Register custom font jika diperlukan
Font.register({
  family: 'Sign',
  fonts: [{ src: SignFont }],
});



const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#333',
    position: 'relative', // For background elements
  },
  // Background floral design (simplified for React-PDF)
  // React-PDF doesn't directly support complex background images like HTML CSS.
  // This is a conceptual placeholder or could be achieved with a faint SVG/PNG overlay if needed.
  // For this minimalist style, we'll keep it clean.
  // If you really need a floral background, you'd likely create an SVG or use a very faint image and place it with absolute positioning.

  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  companyInfo: {
    flexDirection: 'column',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  companyAddress: {
    fontSize: 9,
    marginBottom: 2,
  },
  companyPhone: {
    fontSize: 9,
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 2,
  },
  invoiceDetails: {
    textAlign: 'right',
  },
  invoiceDetailText: {
    fontSize: 9,
    marginTop: 3,
  },

  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottom: 1, // Mimicking the separator
    paddingBottom: 10,
    borderBottomColor: '#eee',
  },
  billTo: {
    width: '48%',
    flexDirection: 'column',
  },
  billToHeader: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottom: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 3,
  },
  billToText: {
    fontSize: 9,
    marginBottom: 3,
  },
  paymentMethod: {
    width: '48%',
    flexDirection: 'column',
    textAlign: 'right',
  },
  paymentMethodHeader: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottom: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 3,
  },
  paymentMethodText: {
    fontSize: 9,
    marginBottom: 3,
  },

  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '15%', // NO
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 0,
    fontWeight: 'bold',
    backgroundColor: '#f9f9f9',
    textAlign: 'left',
  },
  tableColDescriptionHeader: {
    width: '55%', // ITEM DESCRIPTION
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 0,
    fontWeight: 'bold',
    backgroundColor: '#f9f9f9',
    textAlign: 'left',
  },
  tableColHeaderRight: {
    width: '10%', // PRICE, QTY, TOTAL
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 0,
    fontWeight: 'bold',
    backgroundColor: '#f9f9f9',
    textAlign: 'right',
  },
  tableCol: {
    width: '15%', // NO
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 0,
    textAlign: 'left',
  },
  tableColDescription: {
    width: '55%', // ITEM DESCRIPTION
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 0,
    textAlign: 'left',
  },
  itemDescriptionText: {
    fontSize: 8,
    color: '#666',
    marginTop: 2,
  },
  tableColRight: {
    width: '10%', // PRICE, QTY, TOTAL
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 0,
    textAlign: 'right',
  },

  summarySection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom: 50, // Added margin to ensure space for the fixed footer
  },
  summaryDetails: {
    width: '40%', // Adjust as needed
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 10,
  },
  summaryValue: {
    fontSize: 10,
    fontWeight: 'normal',
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  subtotalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  subtotalValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  signatureSection: {
    marginTop: 40,
    textAlign: 'right',
  },
  signatureImage: {
    width: 120, // Adjust size as needed
    height: 40, // Adjust height to match signature aspect ratio
    marginBottom: 5,
    alignSelf: 'flex-end', // Aligns the image to the right within its view
  },
  signatureName: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 5,
  },
  signatureTitle: {
    fontSize: 9,
    color: '#666',
  },

  // New Footer Styles
  footerContainer: {
    position: 'absolute', // Position it absolutely relative to the page
    bottom: 0, // Stick to the bottom
    left: 0,
    right: 0,
    backgroundColor: '#2196F3', // Biru laut (contoh)
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 30, // Match page padding
    textAlign: 'center',
  },
  footerText: {
    fontSize: 9,
    color: 'white',
  },
});




export default function Invoice({ order }) {
  const outlet = order.outletId;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{outlet.name}</Text>
            <Text style={styles.companyAddress}>{outlet.location.address}</Text>
            <Text style={styles.companyPhone}>Telp: {outlet.phone}</Text>
            <Text style={styles.companyPhone}>
              Jam Buka: {outlet.openingTime} - {outlet.closingTime} ({outlet.openingDays.join(', ')})
            </Text>
          </View>
          <View style={styles.invoiceDetails}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceDetailText}>Order Code: {order.orderCode}</Text>
            <Text style={styles.invoiceDetailText}>Date: {formatDate(order.createdAt)}</Text> {/* Assuming createdAt is the invoice date */}
            <Text style={styles.invoiceDetailText}>Due Date: {formatDate(order.pickupDate)}</Text>
          </View>
        </View>

        {/* Bill To and Payment Method Section */}
        <View style={styles.infoSection}>
          <View style={styles.billTo}>
            <Text style={styles.billToHeader}>BILL TO:</Text>
            <Text style={styles.billToText}>{order.customerName}</Text>
            <Text style={styles.billToText}>Telepon: {order.customerPhone}</Text>
            {/* You might want to add customer address here if available in your order object */}
          </View>
          <View style={styles.paymentMethod}>
            <Text style={styles.paymentMethodHeader}>Payment Method</Text>
            <Text style={styles.paymentMethodText}>{order.paymentType}</Text>
            <Text style={styles.paymentMethodText}>Status: {order.paymentStatus}</Text>
            {/* You could add bank details if applicable */}
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>NO</Text>
            <Text style={styles.tableColDescriptionHeader}>ITEM DESCRIPTION</Text>
            <Text style={styles.tableColHeaderRight}>PRICE</Text>
            <Text style={styles.tableColHeaderRight}>QTY</Text>
            <Text style={styles.tableColHeaderRight}>TOTAL</Text>
          </View>
          {order.items.map((item, idx) => {
            // Check if pricePerItem exists and is valid, otherwise use pricePerKg
            const hasPricePerItem = item.pricePerItem !== null && item.pricePerItem !== undefined && item.pricePerItem !== 0;
            const price = hasPricePerItem ? item.pricePerItem : (item.pricePerKg ?? 0);
            const priceLabel = hasPricePerItem ? 'item' : (item.pricePerKg !== undefined ? 'kg' : '-');

            // Determine quantity display based on whether it's per item or per kg
            // If pricePerItem exists, assume 'quantity' refers to number of items.
            // If pricePerKg exists, assume 'weightInKg' is the relevant quantity.
            // Based on your JSON, 'quantity' is 1 and 'pricePerKg' is used,
            // so we'll display '1' as quantity for now, but if you have 'weightInKg'
            // for kg-based items, make sure it's in your JSON.
            const quantityDisplay = hasPricePerItem ? item.quantity : (item.weightInKg ? `${item.weightInKg} kg` : item.quantity);


            return (
              <View style={styles.tableRow} key={idx}>
                <Text style={styles.tableCol}>{idx + 1}</Text>
                <View style={styles.tableColDescription}>
                  <Text>{item.productId.name}</Text>
                  <Text style={styles.itemDescriptionText}>Note: {order.note || '-'}</Text> {/* Using order.note as description for all items, or item.note if available per item */}
                </View>
                <Text style={styles.tableColRight}>
                  {price > 0 ? `${formatCurrency(price)} / ${priceLabel}` : '-'}
                </Text>
                <Text style={styles.tableColRight}>{quantityDisplay}</Text>
                <Text style={styles.tableColRight}>{formatCurrency(item.subtotal)}</Text>
              </View>
            );
          })}
        </View>

        {/* Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryDetails}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.summaryValue}>{formatCurrency(order.total)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>{formatCurrency(0)}</Text> {/* Dummy Tax: 0 */}
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={styles.summaryValue}>{formatCurrency(0)}</Text> {/* Dummy Discount: 0 */}
            </View>
            <View style={styles.subtotalRow}>
              <Text style={styles.subtotalLabel}>Sub Total</Text>
              <Text style={styles.subtotalValue}>{formatCurrency(order.total)}</Text>
            </View>
          </View>
        </View>

        {/* Signature Section */}
        <View style={styles.signatureSection}>
          {/* If you have a manager signature image, replace the `data:` URL with your actual image path */}
          {/* For now, a placeholder or simply the text name */}
          <Text style={{ fontFamily: 'Sign', fontSize: 24, marginBottom: 5 }}>
            Boss besar
          </Text>

          <Text style={styles.signatureName}>Boss besar</Text>
          <Text style={styles.signatureTitle}>Owner</Text>
        </View>

        {/* Footer Container - Added as the last element in the Page */}
        <View style={styles.footerContainer} fixed>
          <Text style={styles.footerText}>
            Terima kasih telah menggunakan layanan {outlet.name}. Semoga hari Anda menyenangkan!
          </Text>
          <Text style={styles.footerText}>
            Invoice generated on {formatDate(new Date().toISOString())}
          </Text>
        </View>
      </Page>
    </Document>
  );
}