function getViewportHeight() {
  return window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;
}

function getPercentage(value, total) {
  return (value / total) * 100;
}

function isMobile() {
  return window.innerWidth <= 768;
}

function getValueFromPercentage(percentage, total) {
  return (percentage / 100) * total;
}

const handleTransitionValue = (percentage, min, max) => {
  const clamped = Math.max(0, Math.min(100, percentage));
  return max - (max - min) * (clamped / 100);
};

function handleLogoAnimation(percentage) {
  const LogoBox = document.querySelector("#logo-animate");
  const Logo = document.querySelector("#logo-animate img");
  const leftHeader = document.querySelector(".Header_Left");

  const headerWidth = leftHeader.offsetWidth;
  const windowWidth = window.innerWidth;
  const headerEnd = headerWidth;
  let logoLeft = windowWidth / 2;
  if (headerEnd > logoLeft - 50) {
    logoLeft = headerEnd + 60;
  }
  if (!Logo) return;
  const maxWidth = isMobile() ? 150 : 320;
  const minWidth = isMobile() ? 100 : 150;
  const minTop = isMobile() ? 5 : 10;
  const maxTop = isMobile() ? 70 : 120;
  const width = handleTransitionValue(percentage, minWidth, maxWidth);
  LogoBox.style.top = handleTransitionValue(percentage, minTop, maxTop) + "px";
  LogoBox.style.left =
    handleTransitionValue(percentage, windowWidth / 2) + "px";
  LogoBox.style.transform = `translate(-50%, -${handleTransitionValue(
    percentage,
    0,
    50
  )}%)`;
  Logo.style.width = width + "px";
  Logo.style.maxWidth = width + "px";
}

function handleSectionOneBuildingAnimation(percentage) {
  const HomeSectionOne = document.querySelector(".Home_Section_One");
  const mainImg = HomeSectionOne.querySelector(".expand-section .main_image");
  if (!mainImg) return;
  const minHeight = isMobile() ? 50 : 65;
  const minWidth = isMobile() ? 75 : 38;

  const borderRadius = handleTransitionValue(percentage, 0, 50);
  const width = Math.abs(
    handleTransitionValue(percentage, minWidth, 100) - (100 + minWidth)
  );
  const height = Math.abs(
    handleTransitionValue(percentage, minHeight, 100) - (100 + minHeight)
  );
  mainImg.style.width = width + "%";
  mainImg.style.height = height + "%";
  mainImg.style.borderRadius = `${borderRadius}% ${borderRadius}% 0px 0px`;

  // Mobile
  const overlayImageHeight = getOverlayImage().clientHeight;
  const extraHeight = overlayImageHeight - getViewportHeight();
  const M_Image = mainImg.querySelector("img.m_img");
  const M_Top = handleTransitionValue(
    percentage * 2,
    0,
    100 +
      (extraHeight > 0 ? getPercentage(extraHeight, getViewportHeight()) : 0)
  );
  const M_scale = handleTransitionValue(percentage, 1, 2);
  const M_Right = handleTransitionValue(percentage, 0, 35);
  const M_Width = Math.abs(handleTransitionValue(percentage, 80, 100) - 180);

  M_Image.style.top = "-" + M_Top + "%";
  M_Image.style.minHeight = (overlayImageHeight * M_Width) / 100 + "px";
  M_Image.style.transform = `scale(${M_scale})`;
  M_Image.style.right = M_Right + "%";
  M_Image.style.width = M_Width + "vw";

  // Desktop
  const D_Image = mainImg.querySelector("img.d_img");
  const D_Right = handleTransitionValue(percentage, 0, 15);
  const D_Width = Math.abs(handleTransitionValue(percentage, 80, 100) - 180);
  D_Image.style.right = "-" + D_Right + "%";
  D_Image.style.width = D_Width + "vw";
}

function handleSectionTwoAnimation(StickyImageBox, sectionOneHeight) {
  const totalHeight = getViewportHeight() * 2;
  const scroll = window.scrollY - sectionOneHeight;
  const percentage = getPercentage(scroll, totalHeight);
  const newPercentage = Math.max(25, percentage).toFixed(2) + "%";
  StickyImageBox.style.clipPath = `circle(${newPercentage} at 50% 50%)`;
}

const getOverlayImage = () =>
  Array.from(
    HomeSectionOne.querySelectorAll(".expand-section .home-overlay-image img")
  ).find((img) => getComputedStyle(img).display === "block");

function handleSectionThreeAnimation() {}

const delay1 = 1500;
const delay2 = 2000;

const HomeSectionOne = document.querySelector(".Home_Section_One");
let sectionOneHeightDef = 0;

const initializeContent = () => {
  // Header
  // const overlay = document.getElementById("splash-overlay");

  // const fadeOutOverlay = () => {
  //   setTimeout(() => {
      // overlay.classList.add("fade-out");
      // document.getElementById("Linkar_Graphic_2")?.classList.add("zoom-in");
      // document
      //   .getElementById("Linkar_Graphic_2")
      //   ?.classList.remove("opacity-0");
  //   }, delay1);
  // };

  // fadeOutOverlay();

  HomeSectionOne.style.maxHeight = getOverlayImage().clientHeight + "px";
  HomeSectionOne.style.height = getViewportHeight() + "px";

  if (getOverlayImage().clientHeight > getViewportHeight()) {
    sectionOneHeightDef = getOverlayImage().clientHeight - getViewportHeight();
    document.querySelector(".Section_One_Extra_Scroll").style.height =
      getViewportHeight() * 2.5 + sectionOneHeightDef + "px";
  }

  document.getElementById("Home_Img_Desc").style.top =
    getViewportHeight() * 2.5 + sectionOneHeightDef - 50 + "px";
};

if (getOverlayImage()) {
  if (getOverlayImage().complete) {
    initializeContent();
  } else {
    getOverlayImage().addEventListener("load", initializeContent);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const mainImg = HomeSectionOne.querySelector(".expand-section .main_image");
  const StickyImageBox = document.querySelector("#Sticky_Image");
  const HomeSectionTwoContent = document.querySelector(
    ".Home_Section_Two.content"
  );
  const HomeSectionTwoBg = document.querySelector(".Home_Section_Two.Bg_50");
  const HomeSectionThree = document.querySelector(".Home_Section_Three");
  const HomeSectionThreeImg = HomeSectionThree.querySelector("img");
  const HomeSectionEight = document.querySelector(".Home_Section_Eight");
  const HomeSectionEightImg = HomeSectionEight.querySelector("img");
  const HomeSectionFour = document.querySelector(".Home_Section_Four");
  const HomeSectionFive = document.querySelector(".Home_Section_Five");
  const unitBars = document.getElementById("Unit_Bars");
  const HomeSectionSix = document.querySelector(".Home_Section_Six");
  const HomeSectionSixTabs = HomeSectionSix.querySelector(".Tabs");
  let mainImgLastState = null;

  const menuIcon = document.getElementById("Menu_Button");
  const menuContainer = document.querySelector(".header-menu-container");

  menuIcon.addEventListener("click", () => {
    menuContainer.classList.toggle("open");
  });

  // --- Close when clicking outside ---
  document.addEventListener("click", (e) => {
    if (
      menuContainer.classList.contains("open") &&
      !menuContainer.contains(e.target) &&
      !menuIcon.contains(e.target)
    ) {
      menuContainer.classList.remove("open");
    }
  });
  //Header End

  const mainImgObserver = new ResizeObserver(() => {
    const parentWidth = mainImg.parentElement.offsetWidth;
    const currentWidth = mainImg.offsetWidth;
    const isFullWidth = Math.abs(currentWidth - parentWidth) < 1;

    if (isFullWidth && mainImgLastState !== "full") {
      mainImgLastState = "full";
      HomeSectionOne.querySelector(
        ".expand-section .home-overlay-image"
      )?.classList.add("visible");
      HomeSectionOne.querySelector(".content .content-wrapper")?.classList.add(
        "Text_Primary"
      );
      HomeSectionOne.querySelector(".content")?.classList.add("top");
      const h1 = HomeSectionOne.querySelector(".content .content-wrapper h1");
      const p = HomeSectionOne.querySelector(".content .content-wrapper p");
      if (h1) h1.innerHTML = S1_TITLE;
      if (p) p.innerHTML = S1_PARA;
    } else if (!isFullWidth && mainImgLastState !== "not-full") {
      mainImgLastState = "not-full";
      HomeSectionOne.querySelector(
        ".expand-section .home-overlay-image"
      )?.classList.remove("visible");
      HomeSectionOne.querySelector(
        ".content .content-wrapper"
      )?.classList.remove("Text_Primary");
      HomeSectionOne.querySelector(".content")?.classList.remove("top");
      const h1 = HomeSectionOne.querySelector(".content .content-wrapper h1");
      const p = HomeSectionOne.querySelector(".content .content-wrapper p");
      if (h1) h1.innerHTML = S2_TITLE;
      if (p) p.innerHTML = S2_PARA;
    }
  });
  mainImgObserver.observe(mainImg);

  const handleAnim = () => {
    const sectionOneHeight = getViewportHeight() * 2.5;
    let sectionOneHeightDef = 0;
    if (getOverlayImage().clientHeight > getViewportHeight()) {
      sectionOneHeightDef =
        getOverlayImage().clientHeight - getViewportHeight();
      document.querySelector(".Section_One_Extra_Scroll").style.height =
        getViewportHeight() * 2.5 + sectionOneHeightDef + "px";
    }

    // Section One Start
    const percentage = getPercentage(scrollY, getViewportHeight());
    handleLogoAnimation(percentage);
    handleSectionOneBuildingAnimation(percentage);
    if (scrollY + getViewportHeight() > sectionOneHeight) {
      HomeSectionOne.style.position = "absolute";
      HomeSectionOne.style.top = getViewportHeight() * 1.5 + "px";
    } else {
      HomeSectionOne.style.position = "fixed";
      HomeSectionOne.style.top = "0px";
    }
    // Section One End

    // Section Two Start
    handleSectionTwoAnimation(
      StickyImageBox,
      sectionOneHeight + sectionOneHeightDef
    );
    const homeSectionTwoHeight =
      HomeSectionTwoContent.clientHeight +
      sectionOneHeight +
      sectionOneHeightDef -
      (isMobile() ? getViewportHeight() / 4 : 0);
    const sectionTwoStart =
      document.getElementById("Sec_Two_Position_Start").offsetTop -
      (isMobile() ? 0.25 * getViewportHeight() : 0);
    const sectionTwoEnd =
      document.getElementById("Sec_Two_Position_End").offsetTop -
      getViewportHeight();
    if (scrollY < sectionTwoStart) {
      StickyImageBox.style.position = "absolute";
      StickyImageBox.style.top = sectionTwoStart + "px";
      HomeSectionTwoBg.style.position = "absolute";
      HomeSectionTwoBg.style.top = sectionTwoStart + "px";
    } else if (scrollY >= sectionTwoStart && scrollY < sectionTwoEnd) {
      StickyImageBox.style.position = "fixed";
      StickyImageBox.style.top = "0px";
      HomeSectionTwoBg.style.position = "fixed";
      HomeSectionTwoBg.style.top = 0 + "px";
    } else {
      StickyImageBox.style.position = "absolute";
      StickyImageBox.style.top = sectionTwoEnd + "px";
      HomeSectionTwoBg.style.position = "absolute";
      HomeSectionTwoBg.style.top = sectionTwoEnd + "px";
    }
    // Section Two End

    //Section Three Start - SIMPLIFIED FIXED VERSION
    const TotalUSPSec = 5;
    const delaySecTwo = 0.25 * TotalUSPSec;
    const secTwoGap = 5 + delaySecTwo;
    const startOffset = 48;

    // Calculate scroll boundaries
    // const sectionThreeStart = homeSectionTwoHeight + (getViewportHeight() * (secTwoGap + 2));
    // const sectionThreeEnd = homeSectionTwoHeight + (getViewportHeight() * (secTwoGap + 4));
    const sectionThreeStart = document.getElementById(
      "Sec_Three_Position_Start"
    ).offsetTop;
    const sectionThreeEnd =
      document.getElementById("Sec_Three_Position_End").offsetTop -
      getViewportHeight();
    const sectionThreeRange = getViewportHeight() * 2;

    const sectionThreeScroll = scrollY - sectionThreeStart;

    if (scrollY < sectionThreeStart) {
      // Before Section Three starts
      HomeSectionThree.style.position = "absolute";
      HomeSectionThree.style.top = sectionThreeStart + "px";
      HomeSectionThreeImg.style.transform = `translate(0, -${startOffset}%)`;

      // Reset elements
      HomeSectionThree.querySelector(
        ".location-image-paragraph"
      ).style.opacity = "1";
      HomeSectionThree.querySelector(
        ".location-image-paragraph"
      ).style.transform = "translateX(0px)";
      HomeSectionThree.querySelector(".button-grid").style.opacity = "0";
    } else if (scrollY >= sectionThreeStart && scrollY < sectionThreeEnd) {
      // During Section Three animation
      HomeSectionThree.style.position = "fixed";
      HomeSectionThree.style.top = "0px";
      HomeSectionThree.style.left = "0px";
      HomeSectionThree.style.width = "100%";
      HomeSectionThree.style.height = "100vh";

      const per = Math.min(
        100,
        Math.max(0, getPercentage(sectionThreeScroll, sectionThreeRange))
      );
      const maxMoveDistance = Math.max(
        0,
        HomeSectionThreeImg.clientWidth - window.innerWidth
      );

      let xTranslate = 0;
      let yTranslate = -startOffset;
      const paragraph = HomeSectionThree.querySelector(
        ".location-image-paragraph"
      );

      if (per <= 50) {
        // Phase 1: Move horizontally (LEFT to RIGHT - FIXED DIRECTION)
        const scaledPer = per * 2;
        // Move from 0 to maxMoveDistance as we scroll down
        xTranslate = (maxMoveDistance * scaledPer) / 100;

        paragraph.style.transform = `translateX(${-xTranslate}px)`;
        paragraph.style.opacity = "1";
        HomeSectionThree.querySelector(".button-grid").style.opacity = "0";
        HomeSectionThreeImg.style.transform = `translate(-${xTranslate}px, ${yTranslate}%)`;
      } else {
        const maxMoveDistance = Math.max(
          0,
          HomeSectionThreeImg.clientWidth - window.innerWidth
        );
        const xTranslate = (maxMoveDistance * 100) / 100;
        HomeSectionThreeImg.style.transform = `translate(-${xTranslate}px, ${yTranslate}%)`;
      }
    } else {
      // After Section Three ends
      HomeSectionThree.style.position = "absolute";
      HomeSectionThree.style.top = sectionThreeEnd + "px";

      const maxMoveDistance = Math.max(
        0,
        HomeSectionThreeImg.clientWidth - window.innerWidth
      );
      const xTranslate = (maxMoveDistance * 100) / 100;
      HomeSectionThreeImg.style.transform = `translate(-${xTranslate}px, -${48}%)`;
      // HomeSectionThreeImg.style.transform = `translate(-${maxMoveDistance}px, 0%)`;
      HomeSectionThree.querySelector(
        ".location-image-paragraph"
      ).style.opacity = "0";
      HomeSectionThree.querySelector(".button-grid").style.opacity = "1";
    }
    //Section Three End

    //Section Five Start
    // console.log(HomeSectionFive.getBoundingClientRect().top < 0 && HomeSectionFive.getBoundingClientRect().top > -(HomeSectionFive.clientHeight))
    // if(HomeSectionFive.getBoundingClientRect().top < 0 && HomeSectionFive.getBoundingClientRect().top > -(HomeSectionFive.clientHeight)){
    //   HomeSectionFive.querySelector('.Unit_Bars').classList.add('visible')
    // }else{
    //   HomeSectionFive.querySelector('.Unit_Bars').classList.remove('visible');
    // }

    const SectionFiveElement_Top =
      HomeSectionFive.getBoundingClientRect().top - 0.5 * getViewportHeight();
    const SectionFiveElement_Bottom =
      HomeSectionFive.getBoundingClientRect().bottom - getViewportHeight();
    if (SectionFiveElement_Top > 0) {
      HomeSectionFive.querySelector(".Unit_Bars").style.position = "absolute";
      HomeSectionFive.querySelector(".Unit_Bars").style.top = "unset";
      HomeSectionFive.querySelector(".Unit_Bars").style.bottom = 0 + "px";
    } else if (SectionFiveElement_Top <= 0 && SectionFiveElement_Bottom >= 0) {
      HomeSectionFive.querySelector(".Unit_Bars").style.position = "fixed";
      HomeSectionFive.querySelector(".Unit_Bars").style.top = "unset";
      HomeSectionFive.querySelector(".Unit_Bars").style.bottom = "-30px";
    } else {
      HomeSectionFive.querySelector(".Unit_Bars").style.position = "absolute";
      HomeSectionFive.querySelector(".Unit_Bars").style.top = "unset";
      HomeSectionFive.querySelector(".Unit_Bars").style.bottom = "-30px" + "px";
    }
    //Section Five End

    // Section Six Start
    const totalSecFiveHeight =
      homeSectionTwoHeight +
      getViewportHeight() * (secTwoGap + 5) +
      HomeSectionFour.clientHeight +
      HomeSectionFive.clientHeight;
    const SectionSixElement = {
      Main_Image: HomeSectionSix.querySelector(".Main_Image"),
      Top_Right_Image: HomeSectionSix.querySelector(".Top_Right_Image"),
      Bottom_Left_Image: HomeSectionSix.querySelector(".Bottom_Left_Image"),
      Bottom_Right_Image: HomeSectionSix.querySelector(".Bottom_Right_Image"),
      Top_Text_Box: HomeSectionSix.querySelector(".Top_Text_Box"),
      Bottom_Text_Box: HomeSectionSix.querySelector(".Bottom_Text_Box"),
      Tabs: HomeSectionSix.querySelector(".Tabs"),
    };
    const SectionSixElement_Tabs_Top =
      HomeSectionSix.getBoundingClientRect().top <= 0
        ? Math.min(
            HomeSectionSix.clientHeight - 100,
            Math.abs(HomeSectionSix.getBoundingClientRect().top) +
              (getViewportHeight() - 100)
          )
        : Math.abs(HomeSectionSix.getBoundingClientRect().top) +
          (getViewportHeight() - 100);
    SectionSixElement.Tabs.style.top = SectionSixElement_Tabs_Top + "px";
    if (scrollY < totalSecFiveHeight) {
      HomeSectionSix.style.position = "absolute";
      HomeSectionSix.style.top = totalSecFiveHeight + "px";
      const per = getPercentage(
        scrollY - totalSecFiveHeight,
        getViewportHeight() * 0.5
      );
      SectionSixElement.Main_Image.style.top =
        150 - handleTransitionValue(per, 0, 150) + "px";
      SectionSixElement.Main_Image.style.height =
        handleTransitionValue(per, 60, 100) + "vh";
      SectionSixElement.Main_Image.style.width =
        handleTransitionValue(per, 40, 100) + "vw";
      SectionSixElement.Top_Right_Image.style.right =
        "-" + handleTransitionValue(per, 15, 100) + "%";
      SectionSixElement.Bottom_Right_Image.style.right =
        "-" + handleTransitionValue(per, 5, 100) + "%";
      SectionSixElement.Bottom_Left_Image.style.left =
        "-" + handleTransitionValue(per, 5, 100) + "vw";
      SectionSixElement.Top_Text_Box.style.right =
        handleTransitionValue(per, 60, 100) + "%";
      SectionSixElement.Bottom_Text_Box.style.right =
        handleTransitionValue(per, 60, 100) + "%";
    } else if (
      scrollY > totalSecFiveHeight &&
      scrollY < totalSecFiveHeight + getViewportHeight() * 1
    ) {
      // const deff = scrollY - totalSecFiveHeight;
      const per = getPercentage(
        scrollY - totalSecFiveHeight,
        getViewportHeight() * 0.5
      );
      HomeSectionSix.style.position = "Fixed";
      HomeSectionSix.style.top = 0 + "px";
      SectionSixElement.Main_Image.style.top =
        150 - handleTransitionValue(per, 0, 150) + "px";
      SectionSixElement.Main_Image.style.height =
        handleTransitionValue(per, 60, 100) + "vh";
      SectionSixElement.Main_Image.style.width =
        handleTransitionValue(per, 40, 100) + "vw";
      SectionSixElement.Top_Right_Image.style.right =
        "-" + handleTransitionValue(per, 15, 100) + "%";
      SectionSixElement.Bottom_Right_Image.style.right =
        "-" + handleTransitionValue(per, 5, 100) + "%";
      SectionSixElement.Bottom_Left_Image.style.left =
        "-" + handleTransitionValue(per, 5, 100) + "vw";
      SectionSixElement.Top_Text_Box.style.right =
        handleTransitionValue(per, 60, 100) + "%";
      SectionSixElement.Bottom_Text_Box.style.right =
        handleTransitionValue(per, 40, 100) + "%";
    } else {
      HomeSectionSix.style.position = "absolute";
      HomeSectionSix.style.top =
        totalSecFiveHeight + getViewportHeight() * 1 + "px";
    }

    //Section Six End

    // Section Eight Start
    const sectionEightStart = document.getElementById(
      "Sec_Eight_Position_Start"
    ).offsetTop;
    const sectionEightEnd =
      document.getElementById("Sec_Eight_Position_End").offsetTop -
      getViewportHeight();
    const sectionEightRange = getViewportHeight() * 2;

    const sectionEightScroll = scrollY - sectionEightStart;
    const sectionEightStartOffset = 0;

    if (scrollY < sectionEightStart) {
      // Before Section Eight starts
      HomeSectionEight.style.position = "absolute";
      HomeSectionEight.style.top = sectionEightStart + "px";
      HomeSectionEightImg.style.transform = `translate(0, -${sectionEightStartOffset}%)`;
    } else if (scrollY >= sectionEightStart && scrollY < sectionEightEnd) {
      HomeSectionEight.style.position = "fixed";
      HomeSectionEight.style.top = "0px";
      HomeSectionEight.style.left = "0px";
      HomeSectionEight.style.width = "100%";
      HomeSectionEight.style.height = "100vh";

      const per = Math.min(
        100,
        Math.max(0, getPercentage(sectionEightScroll, sectionEightRange))
      );
      const maxMoveDistance = Math.max(
        0,
        HomeSectionEightImg.clientWidth - window.innerWidth
      );
      const maxMoveYDistance = Math.max(
        0,
        HomeSectionEightImg.clientHeight - window.innerHeight
      );

      let xTranslate = 0;
      let yTranslate = 0;

      if (per <= 50) {
        const scaledPer = per * 2;
        yTranslate = (maxMoveYDistance * scaledPer) / 100;

        HomeSectionEightImg.style.transform = `translate(-${xTranslate}px, -${yTranslate}px)`;
      } else {
        const scaledPer = (per - 50) * 2;
        xTranslate = (maxMoveDistance * scaledPer) / 100;
        yTranslate = (maxMoveYDistance * 100) / 100;
        HomeSectionEightImg.style.transform = `translate(-${xTranslate}px, -${yTranslate}px)`;
      }
    } else {
      // After Section Eight ends
      const maxMoveDistance = Math.max(
        0,
        HomeSectionEightImg.clientWidth - window.innerWidth
      );
            const maxMoveYDistance = Math.max(
        0,
        HomeSectionEightImg.clientHeight - window.innerHeight
      );
      HomeSectionEight.style.position = 'absolute';
      HomeSectionEight.style.top = sectionEightEnd + 'px';
      const xTranslate = (maxMoveDistance * 100) / 100;
      const yTranslate = (maxMoveYDistance * 100) / 100;
      HomeSectionEightImg.style.transform = `translate(-${xTranslate}px, -${yTranslate}px)`;
    }
    //Section Eight End
  };

  handleAnim();
  window.addEventListener("scroll", handleAnim);
  window.addEventListener("resize", () => {
    initializeContent();
    handleAnim();
  });
  window.addEventListener("orientationchange", () => {
    initializeContent();
    handleAnim();
  });
  unitBars.addEventListener("click", (e) => {
    const btn = e.target.closest(".unit");
    if (!btn) return;

    const id = btn.dataset.id;
    unitBars.querySelector(".active")?.classList.remove("active");
    btn.classList.add("active");

    const groups = [
      ".Unit_Title",
      ".Unit_Main_Image img",
      ".Unit_Description",
      ".Unit_Map_Image img",
      ".unit_details",
      ".Unit_Map2_Image img",
      ".Unit_Link_Btn",
    ];

    // Hide all
    groups.forEach((sel) =>
      HomeSectionFive.querySelectorAll(sel).forEach((el) =>
        el.classList.remove("visible")
      )
    );

    // Show selected
    [
      "_Title",
      "_Main_Image",
      "_Description",
      "_Map",
      "_Details",
      "_Map2",
      "_Link",
    ].forEach((suffix) =>
      document.getElementById(id + suffix)?.classList.add("visible")
    );

    // HomeSectionFive.scrollIntoView({ top: 0, behavior: 'smooth' });
  });

  HomeSectionSixTabs.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn) return;

    const id = btn.dataset.id;
    HomeSectionSixTabs.querySelector(".active")?.classList.remove("active");
    btn.classList.add("active");

    const groups = [
      ".Main_Image img",
      ".Top_Right_Image img",
      ".Bottom_Left_Image img",
      ".Bottom_Right_Image img",
      ".Bottom_Text_Box p",
      ".Top_Text_Box p",
    ];

    // Hide all
    groups.forEach((sel) =>
      HomeSectionSix.querySelectorAll(sel).forEach((el) =>
        el.classList.remove("visible")
      )
    );

    // Show selected
    [
      "_Main_Image",
      "_Top_Right_Image",
      "_Bottom_Left_Image",
      "_Bottom_Right_Image",
      "_Bottom_Text_Box",
      "_Top_Text_Box",
    ].forEach((suffix) =>
      document.getElementById(id + suffix)?.classList.add("visible")
    );
  });

  const slideAnimEle = document.querySelectorAll(".slide-anim");

  const slideAnimEleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("slide-up");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );
  slideAnimEle.forEach((el) => slideAnimEleObserver.observe(el));

  const inputExpandBorder = document.querySelectorAll(".input-expand-border");
  const inputExpandBorderObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("expand");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );
  inputExpandBorder.forEach((el) => inputExpandBorderObserver.observe(el));
});