import { useState } from "react";
import "../assets/css/components_css/InfoPages.css";
import { FaToolbox, FaWifi, FaCloudDownloadAlt, FaCheckCircle, FaPowerOff, FaExclamationTriangle, FaFileAlt } from "react-icons/fa"; import Seo from "../components/Seo";

import setup_guide from '../assets/images/printer-setup-guide.webp'

export default function GetStarted() {
    const [expandedStep, setExpandedStep] = useState(0);
    const [expandedIssue, setExpandedIssue] = useState(null);

    const setupIssues = [
        {
            id: "new-setup",
            title: "New Printer Setup",
            icon: <FaToolbox />,
            description: "New printer in the box? Go from unboxed to first print without the hassle.",
            action: "START PRINTER SETUP"
        },
        {
            id: "offline",
            title: "Printer Shows Offline",
            icon: <FaPowerOff />,
            description: "Printer showing offline again? Get it back online in minutes — for good.",
            action: "FIX OFFLINE PRINTER"
        },
        {
            id: "drivers",
            title: "Install Printer Drivers",
            icon: <FaCloudDownloadAlt />,
            description: "Wrong or outdated drivers? Get the exact match for your model installed.",
            action: "INSTALL PRINTER DRIVERS"
        },
        {
            id: "wifi",
            title: "WiFi Connection Drops",
            icon: <FaWifi />,
            description: "Tired of your printer vanishing from WiFi? Lock in a connection that lasts.",
            action: "FIX CONNECTIVITY ISSUE"
        },
        {
            id: "errors",
            title: "Error Codes / Not Detected",
            icon: <FaExclamationTriangle />,
            description: "Flashing lights or cryptic errors? Get a real diagnosis, not guesswork.",
            action: "DIAGNOSE PRINTER ERROR"
        },
        {
            id: "scanner",
            title: "Scanner Not Working?",
            icon: <FaFileAlt />,
            description: "Blank scans or streaky pages? Bring back crisp, clean prints today.",
            action: "FIX SCANNER ISSUE"
        }
    ];

    const windowsSteps = [
        {
            id: "physical",
            title: "Step 1: Physical Setup",
            details: [
                "Power & Ink: Plug the HP printer into a power outlet, switch it on, and install the ink cartridges or toner.",
                "Paper: Load the paper tray and slide the guides snug against the paper.",
                "Wireless: On the printer's screen, open 'Network Settings' or 'Wi-Fi Setup' and join your home network.",
                "USB: Prefer a cable? Connect the USB cable from the printer to your PC."
            ]
        },
        {
            id: "drivers",
            title: "Step 2: Add the Printer & Install Drivers",
            details: [
                "1. Open a browser and go to 123.hp.com/setup, then download the HP Smart app.",
                "2. Run HP Smart and let it detect your printer automatically.",
                "3. Or open Settings > Bluetooth & devices > Printers & scanners and click Add device.",
                "4. Select your HP printer when it appears — Windows fetches the basic drivers for you."
            ]
        },
        {
            id: "offline",
            title: "Step 3: Fix 'HP Printer Offline' on Windows",
            details: [
                "Set as default: In Printers & scanners, open your HP printer and uncheck 'Use Printer Offline.'",
                "Restart the spooler: Press Win + R, type services.msc, find Print Spooler, right-click and choose Restart.",
                "Update the driver: In Device Manager, find your printer under 'Print queues,' right-click and select Update driver.",
                "Firewall check: Temporarily disable Windows Defender Firewall to see if your HP printer is detected."
            ]
        }
    ];

    const macSteps = [
        {
            id: "physical-mac",
            title: "Step 1: Physical Setup",
            details: [
                "Hardware: Power on the HP printer and remove all protective orange shipping tape from inside.",
                "Network: Put your Mac and HP printer on the same Wi-Fi network. With a cable, modern MacBooks may need a USB-C to USB-A adapter."
            ]
        },
        {
            id: "add-printer",
            title: "Step 2: Add the Printer",
            details: [
                "Open the Apple Menu and choose System Settings (or System Preferences).",
                "Scroll to Printers & Scanners.",
                "Click Add Printer, Scanner, or Fax... (or the + icon).",
                "Select your HP printer from the list.",
                "In the Use dropdown, pick AirPrint if available, or download HP Easy Start from 123.hp.com/setup. Click Add."
            ]
        },
        {
            id: "troubleshoot-mac",
            title: "Step 3: Troubleshoot Your HP Printer on Mac",
            details: [
                "Communication error: In Printers & Scanners, right-click your printer and choose 'Reset printing system...' for a fresh start.",
                "AirPrint not found: If your printer isn't AirPrint-ready, install the HP driver (.dmg) from 123.hp.com/setup.",
                "Sleep mode: Some HP printers drop Wi-Fi in 'Deep Sleep.' Tap a button to wake it before printing."
            ]
        }
    ];

    const faqItems = [
        {
            question: "How do I set up my HP printer using 123.hp.com/setup?",
            answer: "Go to 123.hp.com/setup, download the HP Smart app for your model, then follow the prompts to connect your printer to Wi-Fi and install the drivers. The full step-by-step process for Windows and Mac is covered in the guide above."
        },
        {
            question: "Why does my HP printer keep showing offline?",
            answer: "An HP printer offline status is usually caused by a Wi-Fi drop, a stuck print spooler, the 'Use Printer Offline' setting being enabled, or an outdated driver. Restart the printer and router, uncheck offline mode, and restart the Print Spooler service to bring it back online."
        },
        {
            question: "How do I troubleshoot my HP printer when it won't print?",
            answer: "Check that the printer is powered on and connected to the same network as your device, clear any stuck jobs from the print queue, update or reinstall the driver from 123.hp.com/setup, and run a test print. If it still fails, reset the printing system (Mac) or restart the spooler (Windows)."
        },
        {
            question: "Do I need a CD to install my HP printer?",
            answer: "No. Modern HP printers are set up entirely online through 123.hp.com/setup — just download the HP Smart app or the latest driver for your model and follow the on-screen steps."
        }
    ];

    return (
        <div className="info-page">
            <Seo
                title="Easy Setup Guide | printStore"
                description="Smart printer setup & troubleshooting. Step-by-step guides for setup, offline fixes, driver installation, and WiFi connection issues."
                canonicalPath="/get-started"
            />

            {/* Hero Section */}
            <div className="page-hero" style={{ background: "linear-gradient(135deg, var(--ink), var(--rust-deep))", padding: "60px 0" }}>
                <div className="container">
                    <h1 style={{ fontSize: "36px", marginBottom: "12px", fontStyle: "normal" }}>Smart Printer Setup & Troubleshooting</h1>
                    <p style={{ fontSize: "18px", opacity: 0.9, marginBottom: "24px" }}>
                        Setup, offline errors, WiFi drops, driver issues — guided solutions that get you printing again in minutes.
                    </p>
                    <div style={{ display: "flex", gap: "16px",  flexWrap: "wrap" }}>
                        <button style={{
                            background: "#4CAF50",
                            color: "white",
                            border: "none",
                            padding: "12px 28px",
                            borderRadius: "24px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        }}>
                            ✓ QUICK SETUP
                        </button>
                        <button style={{
                            background: "#4CAF50",
                            color: "white",
                            border: "none",
                            padding: "12px 28px",
                            borderRadius: "24px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        }}>
                            ✕ EASY TROUBLESHOOTING
                        </button>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* Choose Your Issue */}
                <div style={{ margin: "48px 0", textAlign: "center" }}>
                    <h2 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "12px", color: "var(--ink)" }}>
                        Choose Your Issue
                    </h2>
                    <p style={{ fontSize: "15px", color: "var(--ink-soft)", marginBottom: "32px" }}>
                        Select an option below for smart printer setup and troubleshooting.
                    </p>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "20px",
                        marginBottom: "40px"
                    }}>
                        {setupIssues.map((issue) => (
                            <div key={issue.id} style={{
                                background: "white",
                                border: "2px solid #e0e0e0",
                                borderRadius: "12px",
                                padding: "28px 20px",
                                textAlign: "center",
                                transition: "all 0.3s",
                                cursor: "pointer"
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--rust)"}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e0e0e0"}
                            >
                                <div style={{ fontSize: "36px", color: "var(--rust)", marginBottom: "12px" }}>
                                    {issue.icon}
                                </div>
                                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "var(--ink)", marginBottom: "10px" }}>
                                    {issue.title}
                                </h3>
                                <p style={{ fontSize: "14px", color: "var(--ink-soft)", marginBottom: "16px", lineHeight: "1.5" }}>
                                    {issue.description}
                                </p>
                                <button style={{
                                    background: "#0052CC",
                                    color: "white",
                                    border: "none",
                                    padding: "10px 18px",
                                    borderRadius: "4px",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    width: "100%"
                                }}>
                                    {issue.action}
                                </button>
                            </div>
                        ))}
                    </div>

                    <p style={{ fontSize: "15px", color: "var(--ink-soft)", marginTop: "20px" }}>
                        Need more help? Connect with our live chat support team for quick assistance.
                    </p>
                </div>


                {/* Visual Steps Section */}
                <div style={{ margin: "48px 0" }}>
                    <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "12px", color: "var(--ink)" }}>
                        123.hp.com/setup Guide – HP Printer Setup & Offline Fix
                    </h2>
                    <p style={{ fontSize: "15px", color: "var(--ink-soft)", marginBottom: "32px", lineHeight: "1.6" }}>
                        Set up your HP printer the easy way using the 123.hp.com/setup process. This step-by-step guide walks you through installing your new HP printer, connecting it to Wi-Fi, fixing the dreaded HP printer offline error, and troubleshooting common problems — with clear instructions for both Windows and Mac.
                    </p>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                        gap: "24px",
                        marginBottom: "40px"
                    }}>
                        {/* Card 1 */}
                        <div style={{
                            background: "white",
                            border: "1px solid var(--line)",
                            borderRadius: "8px",
                            overflow: "hidden",
                            textAlign: "center"
                        }}>
                            <div style={{
                                background: "#f0f0f0",
                                height: "200px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px",
                                color: "var(--ink-soft)"
                            }}>
                                [Download HP Software Image]
                            </div>
                            <div style={{ padding: "20px" }}>
                                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0052CC", marginBottom: "12px" }}>
                                    Download HP Software
                                </h3>
                                <p style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                                    Get the latest HP drivers and software from 123.hp.com/setup, matched to your exact model.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div style={{
                            background: "white",
                            border: "1px solid var(--line)",
                            borderRadius: "8px",
                            overflow: "hidden",
                            textAlign: "center"
                        }}>
                            <div style={{
                                background: "#f0f0f0",
                                height: "200px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px",
                                color: "var(--ink-soft)"
                            }}>
                                [Connect Your Printer Image]
                            </div>
                            <div style={{ padding: "20px" }}>
                                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0052CC", marginBottom: "12px" }}>
                                    Connect Your Printer
                                </h3>
                                <p style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                                    Link your HP printer over Wi-Fi or USB using the printer's built-in setup screen.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div style={{
                            background: "white",
                            border: "1px solid var(--line)",
                            borderRadius: "8px",
                            overflow: "hidden",
                            textAlign: "center"
                        }}>
                            <div style={{
                                background: "#f0f0f0",
                                height: "200px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px",
                                color: "var(--ink-soft)"
                            }}>
                                [Install Printer Drivers Image]
                            </div>
                            <div style={{ padding: "20px" }}>
                                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0052CC", marginBottom: "12px" }}>
                                    Install the Printer Drivers
                                </h3>
                                <p style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                                    Follow the on-screen HP Smart prompts to finish installation and add your device.
                                </p>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div style={{
                            background: "white",
                            border: "1px solid var(--line)",
                            borderRadius: "8px",
                            overflow: "hidden",
                            textAlign: "center"
                        }}>
                            <div style={{
                                background: "#f0f0f0",
                                height: "200px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px",
                                color: "var(--ink-soft)"
                            }}>
                                [Test the Printer Image]
                            </div>
                            <div style={{ padding: "20px" }}>
                                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0052CC", marginBottom: "12px" }}>
                                    Test the Printer
                                </h3>
                                <p style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                                    Print a test page to confirm your HP printer is online and working correctly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Windows Setup Guide */}
                <div className="info-content" style={{ marginTop: "40px" }}>
                    <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "24px", color: "var(--ink)" }}>
                        💻 HP Printer Setup for Windows (10 & 11)
                    </h2>

                    {windowsSteps.map((step, index) => (
                        <div key={step.id} style={{
                            background: "#f5f5f5",
                            border: "2px solid #e3e3e3",
                            borderRadius: "8px",
                            padding: "20px",
                            marginBottom: "16px"
                        }}>
                            <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0052CC", marginBottom: "12px" }}>
                                {step.title}
                            </h3>
                            <ul style={{ paddingLeft: "24px", margin: "0" }}>
                                {step.details.map((detail, i) => (
                                    <li key={i} style={{
                                        fontSize: "14px",
                                        color: "var(--ink-soft)",
                                        marginBottom: "8px",
                                        lineHeight: "1.6"
                                    }}>
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Mac Setup Guide */}
                <div className="info-content" style={{ marginTop: "32px" }}>
                    <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "24px", color: "var(--ink)" }}>
                        💻 HP Printer Setup for Mac (macOS)
                    </h2>

                    {macSteps.map((step) => (
                        <div key={step.id} style={{
                            background: "#f5f5f5",
                            border: "2px solid #e3e3e3",
                            borderRadius: "8px",
                            padding: "20px",
                            marginBottom: "16px"
                        }}>
                            <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0052CC", marginBottom: "12px" }}>
                                {step.title}
                            </h3>
                            <ul style={{ paddingLeft: "24px", margin: "0" }}>
                                {step.details.map((detail, i) => (
                                    <li key={i} style={{
                                        fontSize: "14px",
                                        color: "var(--ink-soft)",
                                        marginBottom: "8px",
                                        lineHeight: "1.6"
                                    }}>
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Final Step */}
                <div style={{
                    background: "#e8f5e9",
                    border: "2px solid #4CAF50",
                    borderRadius: "8px",
                    padding: "24px",
                    marginTop: "32px"
                }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#2e7d32", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                        <FaCheckCircle /> Final Step (Windows & Mac)
                    </h3>
                    <p style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: "1.6", margin: "0" }}>
                        Open any document, press <strong>Ctrl + P</strong> (Windows) or <strong>Cmd + P</strong> (Mac), and print a <strong>test page</strong> to confirm your HP printer is online and the colors and alignment are correct.
                    </p>
                </div>

                {/* Support Section */}
               {/* Support Section */}
<div
    style={{
        background: "white",
        border: "1px solid var(--line)",
        borderRadius: "8px",
        padding: "40px",
        margin: "36px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "40px",
        flexWrap: "wrap"
    }}
>
    {/* Left Content */}
    <div
        style={{
            flex: 1,
            minWidth: "320px"
        }}
    >
        <h2
            style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "12px",
                color: "var(--ink)"
            }}
        >
            Still Need Help? Chat with an Expert Now
        </h2>

        <p
            style={{
                fontSize: "14px",
                color: "var(--ink-soft)",
                marginBottom: "20px",
                lineHeight: "1.6"
            }}
        >
            Followed every step and your HP printer still won't set up or
            shows offline? Don't waste hours guessing. Connect with our
            support experts for real-time troubleshooting — we'll diagnose
            the exact cause, fix offline and connection errors, and get you
            printing again in minutes.
        </p>

        <button
            style={{
                background: "#0052CC",
                color: "white",
                border: "none",
                padding: "14px 32px",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer"
            }}
        >
            Start Live Chat — Fix It Now
        </button>
    </div>

    {/* Right Image */}
    <div
        style={{
            flex: 1,
            minWidth: "320px",
            display: "flex",
            justifyContent: "center"
        }}
    >
        <img
            src={setup_guide} // <-- apni image
            alt="Support Expert"
            style={{
                width: "100%",
                maxWidth: "520px",
                borderRadius: "12px",
                objectFit: "cover",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
            }}
        />
    </div>
</div>

                {/* FAQ Section */}
                <div style={{ marginTop: "40px" }}>
                    <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "24px", color: "var(--ink)" }}>
                        🔧 HP Printer Setup, Offline & Troubleshooting – FAQ
                    </h2>

                    <div className="faq-list">
                        {faqItems.map((item, index) => (
                            <div key={index} className="faq-item">
                                <div
                                    className="faq-question"
                                    onClick={() => setExpandedIssue(expandedIssue === index ? -1 : index)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <span style={{ flex: 1, textAlign: "left" }}>
                                        {item.question}
                                    </span>
                                    <span style={{ fontSize: "16px" }}>
                                        {expandedIssue === index ? "−" : "+"}
                                    </span>
                                </div>
                                {expandedIssue === index && (
                                    <div className="faq-answer">
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="info-content" style={{ textAlign: "center", marginTop: "40px", background: "linear-gradient(135deg, rgba(165, 115, 95, 0.05), rgba(100, 50, 50, 0.05))" }}>
                    <h2>Still Have Questions?</h2>
                    <p>
                        Visit our Contact page to reach our support team via phone, email, or live chat.
                    </p>
                    <div style={{ marginTop: "24px" }}>
                        <a href="/contact" className="btn-primary" style={{ textDecoration: "none", display: "inline-block" }}>
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>


        </div>
    );
}