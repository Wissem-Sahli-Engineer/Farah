import React from 'react';
import Orb from './Gallery.jsx'; 

export default function GalleryPage() {
  const myImages = [
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811524/Farah41_ttwgmp.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811424/Farah20_raizlr.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811420/Farah30_ledkbs.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811420/Farah18_jlzx6u.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811419/Farah19_iin3my.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811414/Farah16_wakngi.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811414/Farah21_mxpgn7.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811412/Farah17_vkybim.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811412/Farah15_kj9yng.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811371/Farah53_whz08i.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811366/Farah69_pmkwjj.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811352/Farah66_zpg7kj.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811348/Farah37_fvlwlo.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811348/Farah57_upoigp.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811339/Farah40_dckw7b.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811335/Farah74_a7nkjb.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811333/Farah70_akew2p.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811331/Farah52_iasdhj.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811331/Farah68_o7b7mn.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811331/Farah72_igancb.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811328/FarahM2_tuyg2b.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811328/Farah75_avsmb7.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811326/Farah59_d4x2zj.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811325/Farah60_vytvxg.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811325/FarahM_mkat5q.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811316/Farah65_oy6qba.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811324/Farah58_gd2qts.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811314/Farah63_n3nnuo.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811313/Farah51_eaennx.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811295/Farah50_dbiz9u.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811293/Farah61_tlrrtr.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811292/Farah62_qwlsme.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811292/Farah64_jkgobw.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811294/Farah73_oik5ze.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811291/Farah67_hu0yic.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811109/Farah2_m7woxi.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811089/Farah9_g9tdnv.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811085/Farah6_xl0str.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811086/Farah12_ndwlux.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811077/Farah8_gdzand.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811076/Farah7_togngm.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811066/Faarah71_cexgh8.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811069/Farah1_uqnrdc.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811073/Farah7_2_d8om36.webp",
    "https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811070/farah_hero_hpm20d.webp"
  ];

  return (
    <div className="app">
      <style jsx>{`
        * {
        .Orb-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        nav,
        footer {
          position: fixed;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 3em;
          z-index: 2;
        }
        nav {
          top: 0;
        }
        footer {
          bottom: 0;
        }
        h1 {
          text-transform: uppercase;
          font-family: "Gojo", sans-serif; /* Add Google Font link in index.html if needed */
          font-size: 18px;
          font-weight: 900;
          color: #fff;
        }
        p {
          text-transform: uppercase;
          font-family: "Akkurat Mono", monospace;
          font-size: 11px;
          color: #777;
        }
      `}</style>
      <Orb
        images={myImages} // Pass the array!
        totalItems={50} // More for even distribution; repeats images
        sphereRadius={5}
        backgroundColor="black"
      />
      <footer>
        <p>[Archive beyond]</p>
      </footer>
    </div>
  );
}