import React from "react";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@utils/prisma";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { getServerSession } from "next-auth";
import { authConfig } from "@utils/auth";
import { renderToBuffer } from "@react-pdf/renderer";
import QRCode from "qrcode";

type BookingWithDetails = NonNullable<Awaited<ReturnType<typeof fetchBooking>>>;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
  },
  ticketContainer: {
    border: "1 solid #ccc",
    padding: 20,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#333",
  },
  topHeading: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    color: "#1D4ED8",
    marginBottom: 2,
  },
  subHeading: {
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: "#666",
    marginBottom: 2,
  },
  contactRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  contactItem: {
    fontSize: 8,
    textAlign: "center",
    fontWeight: "light",
    color: "#666",
  },
  underline: {
    borderBottom: "0.5 solid #ddd",
    marginVertical: 8,
  },
  horizontalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contactSection: {
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    marginLeft: 25,
  },
  leftHorizontalRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rightHorizontalRow: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-around",
    // paddingleft: 20,
  },
  leftSection: {
    width: "75%",
    paddingRight: 10,
  },
  rightSection: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 100,
    height: 40,
    objectFit: "contain",
  },
  rowGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  rowItem: {
    width: "32%",
  },
  label: {
    fontWeight: "bold",
    color: "#1E3A8A",
  },
  qr: {
    width: 80,
    height: 80,
    marginBottom: 2,
  },
  qrText: {
    fontSize: 8,
    color: "#666",
    textAlign: "center",
  },
  disclaimer: {
    fontSize: 8,
    color: "#777",
    marginTop: 10,
    marginBottom: 6,
  },
  footer: {
    fontSize: 9,
    textAlign: "center",
    marginTop: 10,
    color: "#444",
  },
});

async function fetchBooking(id: string, userId: string) {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      user: true,
      route: {
        include: {
          bus: true,
        },
      },
      bookingSeats: {
        include: {
          routeSeat: {
            include: {
              seat: true,
            },
          },
          ticket: true,
        },
      },
    },
  });

  if (!booking || booking.userId !== userId) return null;

  return booking;
}

const TicketPDF = ({
  booking,
  qrDataUrl,
}: {
  booking: BookingWithDetails;
  qrDataUrl: string;
}) => {
  const ticket = booking.bookingSeats[0]?.ticket;
  const seatNumber = ticket?.seatNumber;
  const price = ticket?.price;
  const busPlate = ticket?.busPlate;
  const route = booking.route;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.ticketContainer}>
          <Text style={styles.topHeading}>EASYEXPRESS COACHES</Text>

          <View style={styles.contactRow}>
            <View style={styles.leftHorizontalRow}>
              <Image
                src="https://i.ibb.co/zxHv7x7/easyexpress-logo.png"
                style={styles.logoImage}
              />
            </View>
            <View style={styles.contactSection}>
              <Text style={styles.subHeading}>PASSENGER TICKET</Text>
              <View style={styles.rightHorizontalRow}>
                <Text style={styles.contactItem}>Phone: +254 20-333-555</Text>
                <Text style={styles.contactItem}>
                  Email: support@easyexpress.com
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.underline} />

          <View style={styles.horizontalRow}>
            <View style={styles.leftSection}>
              <View style={styles.rowGroup}>
                <Text style={styles.rowItem}>
                  <Text style={styles.label}>Passenger:</Text>{" "}
                  {booking.passengerName}
                </Text>
                <Text style={styles.rowItem}>
                  <Text style={styles.label}>Route:</Text> {route.departure} →{" "}
                  {route.destination}
                </Text>
                <Text style={styles.rowItem}>
                  <Text style={styles.label}>BusPlate:</Text> {busPlate}
                </Text>
              </View>

              <View style={styles.rowGroup}>
                <Text style={styles.rowItem}>
                  <Text style={styles.label}>Phone:</Text>{" "}
                  {booking.passengerPhone}
                </Text>
                <Text style={styles.rowItem}>
                  <Text style={styles.label}>Date:</Text>{" "}
                  {new Date(route.date).toLocaleDateString()}
                </Text>
                <Text style={styles.rowItem}>
                  <Text style={styles.label}>Seat No:</Text> {seatNumber}
                </Text>
              </View>

              <View style={styles.rowGroup}>
                <Text style={styles.rowItem}>
                  <Text style={styles.label}>Gender:</Text>{" "}
                  {booking.passengerGender}
                </Text>
                <Text style={styles.rowItem}>
                  <Text style={styles.label}>Time:</Text> {route.time}
                </Text>
                <Text style={styles.rowItem}>
                  <Text style={styles.label}>Price:</Text> KES{" "}
                  {price?.toFixed(2)}
                </Text>
              </View>
            </View>

            <View style={styles.rightSection}>
              {qrDataUrl && <Image src={qrDataUrl} style={styles.qr} />}
              <Text style={styles.qrText}>Scan for Ticket Info</Text>
            </View>
          </View>

          <View style={styles.underline} />

          <Text style={styles.disclaimer}>
            * This is a non-refundable ticket. Please arrive at the station at
            least 30 minutes before departure. EasyExpress is not responsible
            for missed departures or lost items during transit.
          </Text>

          <Text style={styles.footer}>
            `Thank you for booking with EasyExpress. Have a pleasant journey!`
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export async function GET(req: NextRequest) {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing booking ID" }, { status: 400 });
  }

  const booking = await fetchBooking(id, userId);

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  const qrContent = `Booking ID: ${booking.id}\nPassenger: ${booking.passengerName}\nRoute: ${booking.route.departure} → ${booking.route.destination}`;
  const qrDataUrl = await QRCode.toDataURL(qrContent);

  const pdfBuffer = await renderToBuffer(
    <TicketPDF booking={booking} qrDataUrl={qrDataUrl} />,
  );

  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename=ticket-${booking.id}.pdf`,
    },
  });
}
