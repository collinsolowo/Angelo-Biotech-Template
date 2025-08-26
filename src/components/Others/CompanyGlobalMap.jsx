// CompanyGlobalMap.jsx - Updated with accessibility improvements
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../styles/Homepage.css';

// Branch list with improved data structure
const BRANCHES = [
    { id: 'ph', label: 'NIGERIA (PORT HARCOURT)', coords: [4.8156, 7.0498], tz: 'Africa/Lagos' },
    { id: 'lag', label: 'NIGERIA (LAGOS)', coords: [6.5244, 3.3792], tz: 'Africa/Lagos' },
    { id: 'bd', label: 'BANGLADESH BRANCH (DHAKA)', coords: [23.8103, 90.4125], tz: 'Asia/Dhaka' },
    { id: 'tg', label: 'TOGO BRANCH (LOMÉ)', coords: [6.1725, 1.2314], tz: 'Africa/Lome' },
    { id: 'id', label: 'INDONESIA BRANCH (JAKARTA)', coords: [-6.2088, 106.8456], tz: 'Asia/Jakarta' },
    { id: 'bj', label: 'BENIN BRANCH (COTONOU)', coords: [6.3703, 2.3912], tz: 'Africa/Porto-Novo' },
    { id: 'gh', label: 'GHANA BRANCH (ACCRA)', coords: [5.6037, -0.1870], tz: 'Africa/Accra' },
    { id: 'ci', label: "COTE D'IVOIRE BRANCH (ABIDJAN)", coords: [5.359952, -4.008256], tz: 'Africa/Abidjan' },
    { id: 'cm', label: 'CAMEROON BRANCH (DOUALA)', coords: [4.0511, 9.7679], tz: 'Africa/Douala' },
    { id: 'cd', label: 'CONGO (DRC) BRANCH (KINSHASA)', coords: [-4.4419, 15.2663], tz: 'Africa/Kinshasa' },
    { id: 'ke', label: 'KENYA BRANCH (NAIROBI)', coords: [-1.2921, 36.8219], tz: 'Africa/Nairobi' },
    { id: 'ru', label: 'RUSSIA BRANCH (MOSCOW)', coords: [55.7558, 37.6173], tz: 'Europe/Moscow' },
    { id: 'by', label: 'BELARUS BRANCH (MINSK)', coords: [53.9006, 27.5590], tz: 'Europe/Minsk' },
    { id: 'pl', label: 'POLAND BRANCH (WARSAW) *', coords: [52.2297, 21.0122], tz: 'Europe/Warsaw' },
    { id: 'ao', label: 'ANGOLA BRANCH (LUANDA)', coords: [-8.8390, 13.2894], tz: 'Africa/Luanda' },
    { id: 'zm', label: 'ZAMBIA BRANCH (LUSAKA)', coords: [-15.3875, 28.3228], tz: 'Africa/Lusaka' },
    { id: 'mz', label: 'MOZAMBIQUE BRANCH (MAPUTO)', coords: [-25.9653, 32.5892], tz: 'Africa/Maputo' },
    { id: 'sg', label: 'SINGAPORE BRANCH * (SINGAPORE)', coords: [1.3521, 103.8198], tz: 'Asia/Singapore' },
    { id: 'us', label: 'USA BRANCH (NEW YORK)', coords: [40.7128, -74.0060], tz: 'America/New_York' },
    { id: 'kz', label: 'KAZAKHSTAN BRANCH (ALMATY)', coords: [43.2220, 76.8512], tz: 'Asia/Almaty' },
    { id: 'th', label: 'THAILAND BRANCH * (BANGKOK)', coords: [13.7563, 100.5018], tz: 'Asia/Bangkok' },
    { id: 'vn', label: 'VIETNAM BRANCH * (HO CHI MINH CITY)', coords: [10.8231, 106.6297], tz: 'Asia/Ho_Chi_Minh' },
    { id: 'my', label: 'MALASIA BRANCH * (KUALA LUMPUR)', coords: [3.1390, 101.6869], tz: 'Asia/Kuala_Lumpur' },
    { id: 'uk', label: 'UK BRANCH (LONDON)', coords: [51.5074, -0.1278], tz: 'Europe/London' },
    { id: 'ca', label: 'CANADA BRANCH * (TORONTO)', coords: [43.6532, -79.3832], tz: 'America/Toronto' }
];

// Helper component for map panning
function PanToMarker({ position }) {
    const map = useMap();
    useEffect(() => {
        if (!position) return;
        map.flyTo(position, 4, { duration: 0.9 });
    }, [position, map]);
    return null;
}

export default function CompanyGlobalMap({ branches = BRANCHES }) {
    const initialCenter = [15, 0];
    const mapRef = useRef(null);
    const [selected, setSelected] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);
    const [panTo, setPanTo] = useState(null);
    const [now, setNow] = useState(new Date());

    // Live clock update
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Compute timezone-based times
    const branchTimes = useMemo(() => {
        return branches.map(b => {
            let label;
            try {
                label = new Intl.DateTimeFormat('en-GB', {
                    timeZone: b.tz,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                }).format(now);
            } catch (err) {
                label = now.toUTCString();
            }
            return { id: b.id, time: label };
        });
    }, [branches, now]);

    const findTime = (id) => {
        const rec = branchTimes.find(t => t.id === id);
        return rec ? rec.time : '';
    };

    function focusBranch(b) {
        setSelected(b.id);
        setPanTo(b.coords);
    }

    const total = branches.length;

    return (
        <section className="global-map-section" aria-labelledby="global-map-heading">
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Angelo Biotech Africa",
                    "description": "Overseas branch offices across multiple countries and regions.",
                    "location": branches.map(b => ({ "@type": "Place", "name": b.label }))
                })}
            </script>

            <div className="global-map-inner">
                <header className="global-map-header">
                    <h2 id="global-map-heading">Overseas Branch Offices — {total} Countries & Regions</h2>
                    <p className="global-map-sub">Interactive real-time view. Click a marker or name to focus — local times shown live.</p>
                </header>

                <div className="global-map-grid">
                    <div className="map-column" role="region" aria-label="Branch locations map">
                        <MapContainer
                            center={initialCenter}
                            zoom={2}
                            style={{ height: '100%', minHeight: 420, borderRadius: 12 }}
                            whenCreated={map => (mapRef.current = map)}
                            scrollWheelZoom={false}
                        >
                            <TileLayer
                                attribution='© OpenStreetMap contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {panTo && <PanToMarker position={panTo} />}
                            {branches.map((b) => (
                                <CircleMarker
                                    key={b.id}
                                    center={b.coords}
                                    radius={8}
                                    color={selected === b.id ? '#ff6b6b' : '#60a5fa'}
                                    fillColor={selected === b.id ? '#ff8787' : '#60a5fa'}
                                    fillOpacity={0.9}
                                    stroke={true}
                                    weight={1}
                                    eventHandlers={{
                                        click: () => {
                                            setSelected(b.id);
                                            setPanTo(b.coords);
                                        },
                                        mouseover: () => setHoveredId(b.id),
                                        mouseout: () => setHoveredId(null),
                                    }}
                                >
                                    <Popup>
                                        <div className="popup">
                                            <strong>{b.label}</strong>
                                            <div className="popup-time">Local time: {findTime(b.id)}</div>
                                            <div className="popup-controls">
                                                <button onClick={() => focusBranch(b)} className="btn small">Focus</button>
                                            </div>
                                        </div>
                                    </Popup>
                                </CircleMarker>
                            ))}
                        </MapContainer>
                    </div>

                    <aside className="list-column" aria-label="Branch list">
                        <div className="list-controls">
                            <label htmlFor="branch-search" className="sr-only">Search branches</label>
                            <input
                                id="branch-search"
                                type="search"
                                placeholder="Search country or city"
                                className="branch-search"
                                onChange={(e) => {
                                    const q = e.target.value.trim().toLowerCase();
                                    if (!q) {
                                        setPanTo(null);
                                        setSelected(null);
                                        return;
                                    }
                                    const found = branches.find(b => b.label.toLowerCase().includes(q));
                                    if (found) {
                                        focusBranch(found);
                                    }
                                }}
                            />
                        </div>

                        <div className="list-count" aria-live="polite">Showing {total} branches</div>

                        <ul className="branch-list" role="list">
                            {branches.map(b => (
                                <li
                                    key={b.id}
                                    className={`branch-item ${selected === b.id ? 'selected' : ''} ${hoveredId === b.id ? 'hovered' : ''}`}
                                >
                                    <button
                                        type="button"
                                        className="branch-btn"
                                        onClick={() => focusBranch(b)}
                                        onMouseEnter={() => setHoveredId(b.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        aria-pressed={selected === b.id}
                                        aria-describedby={`branch-time-${b.id}`}
                                    >
                                        <div className="branch-label">{b.label}</div>
                                        <div className="branch-meta">
                                            <span id={`branch-time-${b.id}`} className="branch-time">{findTime(b.id)}</span>
                                            {b.label.includes('*') && <span className="branch-star" aria-hidden="true">★</span>}
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="list-footer">
                            <small>Tip: tap a marker or name to focus. Times update live.</small>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}