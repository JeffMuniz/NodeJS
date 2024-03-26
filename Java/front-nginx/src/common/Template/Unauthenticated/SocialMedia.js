import React from "react";
import { SvgIcon } from "@common";

const socialMedias = [
  {
    name: "facebook",
    url: "https://www.facebook.com/macvisacard/",
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/macvisacard/?hl=pt-br",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/company/macvisacard/",
  },
];

const SocialMedia = () => (
  <div>
    {socialMedias.map(({ name, url }) => (
      <a
        key={name}
        id={`btn-social-media-${name}`}
        target="_blank"
        rel="noopener noreferrer"
        href={url}
      >
        <SvgIcon name={name} />
      </a>
    ))}
  </div>
);

export default SocialMedia;
