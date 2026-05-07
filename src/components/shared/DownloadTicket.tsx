import { Download } from "lucide-react";
import { useState } from "react";
import type { Ticket } from "../../types";
import { formatDate } from "../../utilities/functions";

const TICKET_STYLE = {
    width: 1200,
    scale: 2,

    colors: {
        bg: "#F1F5F9",
        card: "#FFFFFF",
        border: "#E2E8F0",
        text: "#0F172A",
        muted: "#64748B",
        accent: "#2563EB",
    },

    spacing: {
        pagePad: 60,
        sectionGap: 24,
    },

    fonts: {
        title: "bold 34px sans-serif",
        heading: "bold 20px sans-serif",
        subheading: "600 14px sans-serif",
        body: "500 16px sans-serif",
        small: "500 12px monospace",
        tiny: "400 10px sans-serif",
    },
};

function drawCard(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number = 16
) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
    });
}



async function generateTicket(ticket: Ticket): Promise<string> {
    const event = ticket.event;
    if (!event) throw new Error("Event not found");

    const { width, scale, colors, spacing, fonts } = TICKET_STYLE;

    const CARD_HEIGHT = 300; // 🔥 increased for extra fields
    const HEADER_HEIGHT = 120;
    const QR_SIZE = 140;
    const LOGO_SIZE = 46;

    const totalHeight =
        HEADER_HEIGHT +
        ticket.tickets.length * (CARD_HEIGHT + spacing.sectionGap) +
        120;

    const canvas = document.createElement("canvas");
    canvas.width = width * scale;
    canvas.height = totalHeight * scale;

    const ctx = canvas.getContext("2d")!;
    ctx.scale(scale, scale);

    // Background
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, width, totalHeight);

    // Logo
    const logo = await loadImage("/images/icon.png");
    if (logo) {
        ctx.drawImage(logo, spacing.pagePad, 35, LOGO_SIZE, LOGO_SIZE);
    }

    // Booking ID
    ctx.font = fonts.tiny;
    ctx.fillStyle = colors.muted;
    ctx.fillText(
        `Booking ID: ${ticket._id?.slice(-10).toUpperCase()}`,
        width - spacing.pagePad - 240,
        65
    );

    let y = HEADER_HEIGHT;

    for (const t of ticket.tickets) {
        const x = spacing.pagePad;
        const w = width - spacing.pagePad * 2;

        // Card
        ctx.fillStyle = colors.card;
        drawCard(ctx, x, y, w, CARD_HEIGHT);
        ctx.fill();

        ctx.strokeStyle = colors.border;
        ctx.stroke();

        // Event Name
        ctx.fillStyle = colors.text;
        ctx.font = fonts.heading;
        ctx.fillText(event.event_name, x + 30, y + 50);

        // Location
        const locationLabel = event.city
            ? "CITY"
            : event.address
                ? "ADDRESS"
                : "LOCATION";

        const locationValue = event.city || event.address || "N/A";

        ctx.font = fonts.subheading;
        ctx.fillStyle = colors.muted;

        ctx.fillText("DATE", x + 30, y + 95);
        ctx.fillText(locationLabel, x + 260, y + 95);

        ctx.fillStyle = colors.text;
        ctx.font = fonts.body;

        ctx.fillText(formatDate(event.start_date), x + 30, y + 120);
        ctx.fillText(locationValue, x + 260, y + 120);

        // Divider
        ctx.strokeStyle = colors.border;
        ctx.beginPath();
        ctx.moveTo(x + 30, y + 145);
        ctx.lineTo(width - spacing.pagePad - 260, y + 145);
        ctx.stroke();

        // ─────────────────────────────
        // 👤 ATTENDEE INFO (UPDATED)
        // ─────────────────────────────

        ctx.fillStyle = colors.muted;
        ctx.font = fonts.subheading;

        ctx.fillText("NAME", x + 30, y + 175);
        ctx.fillText("TICKET TYPE", x + 260, y + 175);

        ctx.fillText("CNIC", x + 30, y + 210);
        ctx.fillText("CONTACT", x + 260, y + 210);

        ctx.fillStyle = colors.text;
        ctx.font = fonts.body;

        // Row 1
        ctx.fillText(t.name || "N/A", x + 30, y + 195);
        ctx.fillText(t.type || "N/A", x + 260, y + 195);

        // Row 2 (NEW FIELDS)
        ctx.fillText(t.cnic || "N/A", x + 30, y + 230);

        const contact = t.phone || t.email || "N/A";
        ctx.fillText(contact, x + 260, y + 230);

        // QR Code
        if (t.qr_code) {
            const qr = await loadImage(t.qr_code);
            if (qr) {
                ctx.drawImage(
                    qr,
                    width - spacing.pagePad - QR_SIZE - 20,
                    y + 55,
                    QR_SIZE,
                    QR_SIZE
                );
            }
        }

        // Ticket Code
        ctx.fillStyle = colors.muted;
        ctx.font = fonts.small;
        ctx.textAlign = "center";

        ctx.fillText(
            t.code || "NO-CODE",
            width - spacing.pagePad - QR_SIZE / 2 - 20,
            y + 210
        );

        ctx.font = fonts.tiny;
        ctx.fillText(
            "SCAN FOR ENTRY",
            width - spacing.pagePad - QR_SIZE / 2 - 20,
            y + 230
        );

        ctx.textAlign = "left";

        y += CARD_HEIGHT + spacing.sectionGap;
    }

    // Footer
    ctx.fillStyle = colors.muted;
    ctx.font = fonts.tiny;
    ctx.textAlign = "center";

    ctx.fillText(
        "This is an official digital ticket. Please present this at the entrance.",
        width / 2,
        y + 40
    );

    return canvas.toDataURL("image/png", 1.0);
}

// ─────────────────────────────
// Download Component
// ─────────────────────────────



interface Props {
    ticket: Ticket;
}

const DownloadTicket = ({ ticket }: Props) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        try {
            setLoading(true);

            const dataUrl = await generateTicket(ticket);

            const a = document.createElement("a");
            a.href = dataUrl;
            a.download = `ticket-${ticket._id}.png`;
            a.click();
        } catch (err) {
            console.error(err);
            alert("Failed to generate ticket");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition disabled:opacity-60"
        >
            <Download className={`w-4 h-4 ${loading ? "animate-bounce" : ""}`} />
            {loading ? "Generating..." : "Download Ticket"}
        </button>
    );
};

export default DownloadTicket;