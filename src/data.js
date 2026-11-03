export const profile = {
  name: "Sumaiya Islam",
  email: "sumaiyaislamuiux@gmail.com",
  descriptor: "Visual design · UI/UX · Frontend development",
  links: {
    behance: "https://www.behance.net/sumaiyaislam501265",
    github: "https://github.com/sumaiyaislamuiux-sys",
    instagram: "https://www.instagram.com/sumaiyaislamuiux2026/",
    linkedin: "https://www.linkedin.com/in/sumaiya-islam-uiux",
    pinterest: "https://www.pinterest.com/islamuiux/",
    x: "https://x.com/sumaiyauiux",
  },
};

const imageDimensions = {
  "avatar-eyes.webp": [1254, 1254],
  "avatar-eyes-640.webp": [640, 640],
  "bangladesh-medical-university-certificate.webp": [1536, 1024],
  "bd-red-creascent.webp": [1423, 1024],
  "birdem-certificate.webp": [1536, 1024],
  "bitebox.webp": [1103, 279],
  "brew&bloom details.webp": [2048, 8486],
  "brew&bloom.webp": [2048, 1667],
  "campus-ambassador-trophy.webp": [1088, 1192],
  "certificate-figma-design-system.webp": [2048, 1684],
  "cit-certificate-of-experience.webp": [1536, 1024],
  "creative-digital.webp": [1789, 399],
  "eagle-certificate .webp": [1450, 1024],
  "emcdc secratary batch.webp": [808, 675],
  "emcdc session secratary batch.webp": [905, 905],
  "finora.webp": [2048, 618],
  "graphic-design-certificate.webp": [2048, 1463],
  "greenova details.webp": [2048, 6710],
  "greenova.webp": [2048, 1666],
  "me.webp": [1122, 1402],
  "navy-blue-girl.webp": [1536, 1024],
  "nsda-graphic-design.webp": [1458, 1024],
  "nsda-web-design.webp": [1415, 1024],
  "portfolio-bg.webp": [1672, 941],
  "professional-graphic -design.webp": [1448, 1086],
  "root&rituals details.webp": [2048, 8691],
  "roots&rituals.webp": [2048, 1667],
  "uiux-designer-gp-academy.webp": [2048, 1433],
  "wanderly details.webp": [2048, 8497],
  "wanderly.webp": [2048, 1667],
  "webdevelopment.webp": [1914, 672],
};

export function getImageDimensions(src) {
  const filename = decodeURIComponent(src.split(/[?#]/, 1)[0].split("/").pop());
  const dimensions = imageDimensions[filename];
  if (!dimensions) {
    throw new Error(`Missing image dimensions for ${src}`);
  }
  return { width: dimensions[0], height: dimensions[1] };
}

export const projects = [
  {
    slug: "greenova",
    number: "01",
    title: "Greenova",
    category: "Visual identity concept",
    description:
      "A leaf-led identity artwork shown in a warm, natural palette.",
    image: "/greenova.webp",
    imageSrcSet:
      "/greenova-480.webp 480w, /greenova-960.webp 960w, /greenova.webp 2048w",
    detailImage: "/greenova%20details.webp",
  },
  {
    slug: "brew-and-bloom",
    number: "02",
    title: "Brew & Bloom",
    category: "Visual identity preview",
    description:
      "A botanical coffee-cup mark paired with a warm wordmark.",
    image: "/brew&bloom.webp",
    imageSrcSet:
      "/brew&bloom-480.webp 480w, /brew&bloom-960.webp 960w, /brew&bloom.webp 2048w",
    detailImage: "/brew&bloom%20details.webp",
  },
  {
    slug: "wanderly",
    number: "03",
    title: "Wanderly",
    category: "Visual identity preview",
    description:
      "A travel-themed emblem and wordmark in a bold, colorful palette.",
    image: "/wanderly.webp",
    imageSrcSet:
      "/wanderly-480.webp 480w, /wanderly-960.webp 960w, /wanderly.webp 2048w",
    detailImage: "/wanderly%20details.webp",
  },
  {
    slug: "roots-and-rituals",
    number: "04",
    title: "Roots & Rituals",
    category: "Visual identity preview",
    description:
      "A botanical badge-style mark with a hand-crafted visual character.",
    image: "/roots&rituals.webp",
    imageSrcSet:
      "/roots&rituals-480.webp 480w, /roots&rituals-960.webp 960w, /roots&rituals.webp 2048w",
    detailImage: "/root&rituals%20details.webp",
  },
];
