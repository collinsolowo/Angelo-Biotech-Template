import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "../../styles/Homepage.css";

// WeChat icon as SVG component since we can't import external files
const WeChatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 4.882-1.900 7.60.5.5-3.187-2.75-6.876-8.372-6.876zm-2.44 5.65a.8.8 0 0 0 .8-.8.8.8 0 0 0-.8-.8.8.8 0 0 0-.8.8.8.8 0 0 0 .8.8zm4.591 0a.8.8 0 0 0 .8-.8.8.8 0 0 0-.8-.8.8.8 0 0 0-.8.8.8.8 0 0 0 .8.8z"/>
    <path d="M24 14.966c0-2.61-2.357-4.722-5.259-4.722-2.902 0-5.26 2.112-5.26 4.722 0 2.61 2.358 4.722 5.26 4.722.711 0 1.387-.1 2.001-.269a.468.468 0 0 1 .388.053l1.03.602a.176.176 0 0 0 .093.029c.088 0 .16-.074.16-.165 0-.039-.016-.076-.026-.115l-.211-.802a.32.32 0 0 1 .115-.361c.99-.73 1.709-1.81 1.709-3.094zM18.505 16.2a.433.433 0 0 1-.433-.433.433.433 0 0 1 .433-.433.433.433 0 0 1 .433.433.433.433 0 0 1-.433.433zm2.964 0a.433.433 0 0 1-.433-.433.433.433 0 0 1 .433-.433.433.433 0 0 1 .433.433.433.433 0 0 1-.433.433z"/>
  </svg>
);

const socials = [
  {
    id: "fb",
    name: "Facebook",
    url: "https://facebook.com/angelobiotechafrica",
    icon: faFacebookF,
    type: "fa",
    color: "#1877f2",
  },
  {
    id: "tw",
    name: "Twitter",
    url: "https://twitter.com/angelobiotechafrica",
    icon: faTwitter,
    type: "fa",
    color: "#1da1f2",
  },
  {
    id: "ig",
    name: "Instagram",
    url: "https://instagram.com/angelobiotechafrica",
    icon: faInstagram,
    type: "fa",
    color: "#e1306c",
  },
  {
    id: "we",
    name: "WeChat",
    url: "https://wechat.com/angelobiotechafrica",
    icon: WeChatIcon,
    type: "component",
    color: "#07c160",
  },
  {
    id: "yt",
    name: "YouTube",
    url: "https://youtube.com/@angelobiotechafrica",
    icon: faYoutube,
    type: "fa",
    color: "#ff0000",
  },
];

export default function SocialMediaSection() {
  return (
    <section className="social-section" aria-labelledby="social-heading">
      <div className="social-inner">
        <h2 id="social-heading" className="social-title">
          Connect With Us
        </h2>
        <p className="social-sub">
          Stay connected through our official social media channels for the latest updates, health tips, and community insights.
        </p>

        <div className="social-grid">
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              aria-label={`Visit our ${s.name} page`}
            >
              <div
                className="social-icon"
                style={{ backgroundColor: s.color }}
              >
                {s.type === "fa" ? (
                  <FontAwesomeIcon icon={s.icon} />
                ) : (
                  <s.icon />
                )}
              </div>
              <span className="social-name">{s.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}