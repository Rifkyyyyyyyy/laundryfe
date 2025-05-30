import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

import logo from '../../../assets/images/appLogo.png';

// Format tanggal (Indonesian)
const formatDate = (isoStr) => {
  const d = new Date(isoStr);
  return d.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format rupiah sederhana
const formatCurrency = (num) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(num);

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12, fontFamily: 'Helvetica' },
  header: { fontSize: 16, marginBottom: 10, fontWeight: 'bold', textAlign: 'center' },
  logoSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  logo: { width: 60, height: 60, marginRight: 10 },
  outletInfo: { flexDirection: 'column' },
  section: { marginBottom: 10 },
  boldText: { fontWeight: 'bold' },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { flexDirection: 'row' },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#eee',
    padding: 4,
    fontWeight: 'bold',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
  },
});

export default function Invoice({ order }) {
  const outlet = order.outletId;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo dan Info Outlet */}
        <View style={styles.logoSection}>
          <Image style={styles.logo} src={logo} />
          <View style={styles.outletInfo}>
            <Text style={styles.boldText}>{outlet.name}</Text>
            <Text>{outlet.location.address}</Text>
            <Text>Telp: {outlet.phone}</Text>
            <Text>
              Jam Buka: {outlet.openingTime} - {outlet.closingTime} ({outlet.openingDays.join(', ')})
            </Text>
          </View>
        </View>

        {/* Header */}
        <Text style={styles.header}>Kwitansi Order</Text>

        {/* Order Info */}
        <View style={styles.section}>
          <Text>Order Code: {order.orderCode}</Text>
          <Text>Nama Customer: {order.customerName}</Text>
          <Text>Telepon: {order.customerPhone}</Text>
          <Text>Status Pembayaran: {order.paymentStatus}</Text>
          <Text>Metode Pembayaran: {order.paymentType}</Text>
          <Text>Jenis Layanan: {order.serviceType}</Text>
          <Text>Tanggal Ambil: {formatDate(order.pickupDate)}</Text>
          <Text>Catatan: {order.note || '-'}</Text>
        </View>

        {/* Tabel Item */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Nama Produk</Text>
            <Text style={styles.tableColHeader}>Qty</Text>
            <Text style={styles.tableColHeader}>Harga</Text>
            <Text style={styles.tableColHeader}>Subtotal</Text>
          </View>
          {order.items.map((item, idx) => (
            <View style={styles.tableRow} key={idx}>
              <Text style={styles.tableCol}>{item.productId.name}</Text>
              <Text style={styles.tableCol}>{item.quantity}</Text>
              <Text style={styles.tableCol}>{formatCurrency(item.pricePerItem)}</Text>
              <Text style={styles.tableCol}>{formatCurrency(item.subtotal)}</Text>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={[styles.section, { marginTop: 10 }]}>
          <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
            Total: {formatCurrency(order.total)}
          </Text>
          <Text style={styles.footerNote}>
          Terima kasih telah menggunakan layanan {outlet.name}. Semoga hari Anda menyenangkan!
        </Text> 
        </View>
      </Page>
    </Document>
  );
}
