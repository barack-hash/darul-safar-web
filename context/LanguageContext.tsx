"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

export type Lang = 'en' | 'ar' | 'am' | 'om';

interface Translations {
  nav: {
    home: string;
    pilgrimage: string;
    ticketing: string;
    visas: string;
    tools: string;
    solutions: string;
    services: string;
  };
  hero: {
    tag: string;
    headline: string;
    subtitle: string;
    bookUmrah: string;
    globalTicketing: string;
    cta: string;
  };
  footer: {
    brandDesc: string;
    hq: string;
    location: string;
    quickLinks: string;
    legal: string;
    terms: string;
    privacy: string;
    stayConnected: string;
    newsletterDesc: string;
    emailPlaceholder: string;
    copyright: string;
  };
  services: {
    pilgrimage: string;
    pilgrimageDesc: string;
    ticketing: string;
    ticketingDesc: string;
    visas: string;
    visasDesc: string;
    tools: string;
    toolsDesc: string;
  };
  homePage: {
    serviceEyebrow: string;
    serviceStatement: string;
    valueCards: {
      guidance: { title: string; desc: string };
      coordination: { title: string; desc: string };
      pilgrimage: { title: string; desc: string };
    };
    cardLabel: string;
    cardNote: string;
  };
  toolsPage: {
    title: string;
    subtitle: string;
    amount: string;
    from: string;
    to: string;
    lastUpdated: string;
    commonPairs: string;
    loading: string;
    error: string;
    clock: {
      title: string;
      localTime: string;
      addisAbaba: string;
      riyadh: string;
      dubai: string;
    };
    planner: {
      title: string;
      itinerary: string;
      addDay: string;
      day: string;
      activity: string;
      location: string;
      budget: string;
      flights: string;
      accommodation: string;
      food: string;
      visas: string;
      totalBudget: string;
      estInEtb: string;
      currency: string;
      clearAll: string;
      activityDetails: string;
      locationNotes: string;
    };
  };
  pilgrimagePage: {
    title: string;
    subtitle: string;
    packagesTitle: string;
    economyUmrah: {
      title: string;
      desc: string;
      inclusions: string[];
    };
    premiumHajj: {
      title: string;
      desc: string;
      inclusions: string[];
    };
    discussWhatsApp: string;
    heroCtaText: string;
    heroServicePill: string;
    packagesEyebrow: string;
    progressTitle: string;
    progressText: string;
    finalEyebrow: string;
    finalTitle: string;
    finalSubtitle: string;
    guideTitle: string;
    guideSubtitle: string;
    steps: {
      ihram: { title: string; desc: string; };
      tawaf: { title: string; desc: string; };
      sai: { title: string; desc: string; };
      halq: { title: string; desc: string; };
    };
  };
}

const translations: Record<Lang, Translations> = {
  en: {
    nav: { home: "Home", pilgrimage: "Pilgrimage", ticketing: "Ticketing", visas: "Visas", tools: "Tools", solutions: "Solutions", services: "Services" },
    hero: { 
      tag: "The Global Cartographer", 
      headline: "Connecting Ethiopian Travelers to the Globe.", 
      subtitle: "Darul Safar Travel & Trading provides world-class travel solutions for pilgrimage, global ticketing, and specialized logistics.", 
      bookUmrah: "Book Umrah", 
      globalTicketing: "Global Ticketing",
      cta: "Book Now"
    },
    footer: {
      brandDesc: "Connecting horizons and facilitating global trading for the modern Ethiopian traveler.",
      hq: "Headquarters",
      location: "Addis Ababa, Ethiopia",
      quickLinks: "Quick Links",
      legal: "Legal",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      stayConnected: "Stay Connected",
      newsletterDesc: "Join our newsletter for the latest travel updates and trading tools.",
      emailPlaceholder: "Email Address",
      copyright: "© 2026 Darul Safar Travel & Trading. All rights reserved."
    },
    services: {
      pilgrimage: "Religious Pilgrimage",
      pilgrimageDesc: "Premium Umrah, Hajj, and Ziyarah Tours to the holy cities with expert guidance.",
      ticketing: "Global Air Ticketing",
      ticketingDesc: "Seamless flight arrangements through our elite airline network. Best rates guaranteed.",
      visas: "Visa & Document Services",
      visasDesc: "Expert processing for work, tourist, medical, and education permits globally.",
      tools: "Specialized Travel",
      toolsDesc: "Advanced logistics for enterprise-scale travel and bespoke vacation planning."
    },
    homePage: {
      serviceEyebrow: "Travel services",
      serviceStatement: "From pilgrimage and visa preparation to global ticketing and travel logistics, Darul Safar helps Ethiopian travelers move with clarity, dignity, and confidence.",
      valueCards: {
        guidance: {
          title: "Premium guidance",
          desc: "A calmer process for travelers who want clarity before commitment."
        },
        coordination: {
          title: "Global coordination",
          desc: "Flights, routes, documents, and timing handled with a polished workflow."
        },
        pilgrimage: {
          title: "Pilgrimage care",
          desc: "Support designed around trust, preparation, and meaningful travel."
        }
      },
      cardLabel: "Curated service",
      cardNote: "Smooth, guided, premium."
    },
    toolsPage: {
      title: "Live Currency Converter",
      subtitle: "Real-time exchange rates for the global Ethiopian traveler.",
      amount: "Amount",
      from: "From",
      to: "To",
      lastUpdated: "Last Updated",
      commonPairs: "Quick Reference (to ETB)",
      loading: "Fetching live rates...",
      error: "Unable to load live rates.",
      clock: {
        title: "World Clock",
        localTime: "Local Time",
        addisAbaba: "Addis Ababa",
        riyadh: "Riyadh",
        dubai: "Dubai"
      },
      planner: {
        title: "Travel Planner",
        itinerary: "Itinerary Timeline",
        addDay: "Add Day",
        day: "Day",
        activity: "Activity",
        location: "Location",
        budget: "Smart Budget",
        flights: "Flights",
        accommodation: "Accommodation",
        food: "Food",
        visas: "Visas",
        totalBudget: "Total Budget",
        estInEtb: "Est. in ETB",
        currency: "Currency",
        clearAll: "Clear All",
        activityDetails: "Activity Details",
        locationNotes: "Location Notes"
      }
    },
    pilgrimagePage: {
      title: "The Sacred Journey",
      subtitle: "Embark on a spiritually enriching experience with our meticulously planned Umrah and Hajj packages.",
      packagesTitle: "Our Packages",
      economyUmrah: {
        title: "Economy Umrah",
        desc: "A comfortable and affordable journey to the holy cities.",
        inclusions: ["Visa Processing", "Round-trip Flights", "3-Star Hotel (1km from Haram)", "Ground Transportation", "5L Zamzam Water"]
      },
      premiumHajj: {
        title: "Premium Hajj",
        desc: "An exceptional, fully-guided Hajj experience with premium amenities.",
        inclusions: ["Hajj Visa Processing", "Direct Flights", "5-Star Hotel (Facing Haram)", "VIP Tents in Mina & Arafat", "Dedicated Scholar Guidance"]
      },
      discussWhatsApp: "Discuss on WhatsApp",
      heroCtaText: "Guided pilgrimage planning with visa, flight, hotel, and preparation support.",
      heroServicePill: "Umrah • Hajj • Ziyarah",
      packagesEyebrow: "Sacred travel, carefully arranged",
      progressTitle: "Progress",
      progressText: "{count} of 8 items packed",
      finalEyebrow: "Begin with clarity",
      finalTitle: "Ready to plan your sacred journey?",
      finalSubtitle:
        "Share your travel window, group size, and preferred package. Darul Safar will help you understand the next step with calm, clear guidance.",
      guideTitle: "Pilgrim's Guide",
      guideSubtitle: "The simplified steps of Umrah.",
      steps: {
        ihram: { title: "1. Ihram", desc: "The sacred state of purity and intention. Pilgrims bathe, wear the Ihram garments, and recite the Talbiyah before crossing the Miqat." },
        tawaf: { title: "2. Tawaf", desc: "Circling the Kaaba seven times counter-clockwise, expressing devotion and unity with believers worldwide." },
        sai: { title: "3. Sa'i", desc: "Walking seven times between the hills of Safa and Marwah, honoring the faith and perseverance of Hajar." },
        halq: { title: "4. Halq / Taqsir", desc: "Shaving or trimming the hair, symbolizing humility, spiritual rebirth, and the completion of the Umrah rituals." }
      }
    }
  },
  ar: {
    nav: { home: "الرئيسية", pilgrimage: "الحج والعمرة", ticketing: "التذاكر", visas: "التأشيرات", tools: "الأدوات", solutions: "الحلول", services: "الخدمات" },
    hero: { 
      tag: "رسام الخرائط العالمي", 
      headline: "ربط المسافرين الإثيوبيين بالعالم.", 
      subtitle: "تقدم دار السفر للسياحة والتجارة حلول سفر عالمية المستوى للحج والعمرة، وحجز التذاكر العالمية، والخدمات اللوجستية المتخصصة.", 
      bookUmrah: "احجز عمرة", 
      globalTicketing: "تذاكر عالمية",
      cta: "احجز الآن"
    },
    footer: {
      brandDesc: "ربط الآفاق وتسهيل التجارة العالمية للمسافر الإثيوبي الحديث.",
      hq: "المقر الرئيسي",
      location: "أديس أبابا، إثيوبيا",
      quickLinks: "روابط سريعة",
      legal: "قانوني",
      terms: "الشروط والأحكام",
      privacy: "سياسة الخصوصية",
      stayConnected: "ابق على تواصل",
      newsletterDesc: "انضم إلى النشرة الإخبارية للحصول على أحدث تحديثات السفر وأدوات التجارة.",
      emailPlaceholder: "عنوان البريد الإلكتروني",
      copyright: "© 2026 دار السفر للسياحة والتجارة. جميع الحقوق محفوظة."
    },
    services: {
      pilgrimage: "الحج والعمرة",
      pilgrimageDesc: "رحلات عمرة وحج وزيارة فاخرة إلى المدن المقدسة مع إرشاد خبير.",
      ticketing: "تذاكر طيران عالمية",
      ticketingDesc: "ترتيبات طيران سلسة من خلال شبكة خطوطنا الجوية النخبة. أفضل الأسعار مضمونة.",
      visas: "خدمات التأشيرات والمستندات",
      visasDesc: "معالجة خبيرة لتصاريح العمل والسياحة والطبية والتعليمية على مستوى العالم.",
      tools: "سفر متخصص",
      toolsDesc: "لوجستيات متقدمة لسفر الشركات وتخطيط العطلات المخصصة."
    },
    homePage: {
      serviceEyebrow: "خدمات السفر",
      serviceStatement: "من تجهيز رحلات الحج والعمرة إلى التأشيرات وحجز التذاكر والخدمات اللوجستية، تساعد دار السفر المسافرين الإثيوبيين على التحرك بوضوح وكرامة وثقة.",
      valueCards: {
        guidance: {
          title: "إرشاد متميز",
          desc: "تجربة أكثر هدوءاً للمسافرين الذين يريدون الوضوح قبل اتخاذ القرار."
        },
        coordination: {
          title: "تنسيق عالمي",
          desc: "تنظيم الرحلات والمسارات والوثائق والمواعيد بطريقة احترافية."
        },
        pilgrimage: {
          title: "رعاية الحج والعمرة",
          desc: "دعم مبني على الثقة والاستعداد ومعنى الرحلة."
        }
      },
      cardLabel: "خدمة مختارة",
      cardNote: "سلسة، موجهة، ومتميزة."
    },
    toolsPage: {
      title: "محول العملات المباشر",
      subtitle: "أسعار صرف في الوقت الفعلي للمسافر الإثيوبي العالمي.",
      amount: "المبلغ",
      from: "من",
      to: "إلى",
      lastUpdated: "آخر تحديث",
      commonPairs: "مرجع سريع (إلى البير الإثيوبي)",
      loading: "جاري جلب الأسعار المباشرة...",
      error: "تعذر تحميل الأسعار المباشرة.",
      clock: {
        title: "الساعة العالمية",
        localTime: "التوقيت المحلي",
        addisAbaba: "أديس أبابا",
        riyadh: "الرياض",
        dubai: "دبي"
      },
      planner: {
        title: "مخطط السفر",
        itinerary: "الجدول الزمني للرحلة",
        addDay: "إضافة يوم",
        day: "يوم",
        activity: "النشاط",
        location: "الموقع",
        budget: "الميزانية الذكية",
        flights: "رحلات الطيران",
        accommodation: "الإقامة",
        food: "الطعام",
        visas: "التأشيرات",
        totalBudget: "إجمالي الميزانية",
        estInEtb: "التقدير بالبير الإثيوبي",
        currency: "العملة",
        clearAll: "مسح الكل",
        activityDetails: "تفاصيل النشاط",
        locationNotes: "ملاحظات الموقع"
      }
    },
    pilgrimagePage: {
      title: "الرحلة المقدسة",
      subtitle: "انطلق في تجربة روحانية غنية مع باقات العمرة والحج المخطط لها بعناية.",
      packagesTitle: "باقاتنا",
      economyUmrah: {
        title: "عمرة اقتصادية",
        desc: "رحلة مريحة وبأسعار معقولة إلى المدن المقدسة.",
        inclusions: ["استخراج التأشيرة", "رحلات طيران ذهاب وعودة", "فندق 3 نجوم (1 كم من الحرم)", "المواصلات البرية", "5 لتر ماء زمزم"]
      },
      premiumHajj: {
        title: "حج مميز",
        desc: "تجربة حج استثنائية وموجهة بالكامل مع وسائل راحة فاخرة.",
        inclusions: ["استخراج تأشيرة الحج", "رحلات طيران مباشرة", "فندق 5 نجوم (مواجه للحرم)", "خيام كبار الشخصيات في منى وعرفات", "إرشاد ديني متخصص"]
      },
      discussWhatsApp: "تواصل عبر واتساب",
      heroCtaText: "تخطيط موجه للحج والعمرة مع دعم التأشيرة والطيران والفندق والاستعداد للرحلة.",
      heroServicePill: "عمرة • حج • زيارة",
      packagesEyebrow: "سفر إيماني مرتب بعناية",
      progressTitle: "التقدم",
      progressText: "{count} من 8 عناصر تم تجهيزها",
      finalEyebrow: "ابدأ بوضوح",
      finalTitle: "هل أنت مستعد لتخطيط رحلتك الإيمانية؟",
      finalSubtitle:
        "شاركنا موعد السفر وعدد المسافرين والباقه المناسبة لك، وستساعدك دار السفر على معرفة الخطوة التالية بإرشاد واضح وهادئ.",
      guideTitle: "دليل الحاج والمعتمر",
      guideSubtitle: "خطوات العمرة المبسطة.",
      steps: {
        ihram: { title: "1. الإحرام", desc: "حالة النقاء والنية المقدسة. يغتسل الحجاج، ويرتدون ملابس الإحرام، ويلبون قبل تجاوز الميقات." },
        tawaf: { title: "2. الطواف", desc: "الدوران حول الكعبة سبعة أشواط عكس عقارب الساعة، تعبيراً عن التفاني والوحدة مع المؤمنين في جميع أنحاء العالم." },
        sai: { title: "3. السعي", desc: "المشي سبعة أشواط بين تلي الصفا والمروة، تكريماً لإيمان وصبر السيدة هاجر." },
        halq: { title: "4. الحلق / التقصير", desc: "حلق الشعر أو تقصيره، يرمز إلى التواضع، والولادة الروحية الجديدة، وإتمام مناسك العمرة." }
      }
    }
  },
  am: {
    nav: { home: "ዋና ገፅ", pilgrimage: "ሐጅ እና ዑምራ", ticketing: "ትኬት", visas: "ቪዛ", tools: "መሳሪያዎች", solutions: "መፍትሄዎች", services: "አገልግሎቶች" },
    hero: { 
      tag: "ዓለም አቀፍ ካርታ አዘጋጅ", 
      headline: "ኢትዮጵያውያን ተጓዦችን ከዓለም ጋር ማገናኘት።", 
      subtitle: "ዳሩል ሰፈር የጉዞ እና ንግድ ለሐጅ እና ዑምራ፣ ለአለም አቀፍ ትኬት እና ለልዩ ሎጂስቲክስ አለም አቀፍ ደረጃቸውን የጠበቁ የጉዞ መፍትሄዎችን ይሰጣል።", 
      bookUmrah: "ዑምራ ይመዝገቡ", 
      globalTicketing: "ዓለም አቀፍ ትኬት",
      cta: "አሁን ይመዝገቡ"
    },
    footer: {
      brandDesc: "ለዘመናዊው ኢትዮጵያዊ ተጓዥ አድማሶችን ማገናኘት እና ዓለም አቀፍ ንግድን ማመቻቸት።",
      hq: "ዋና መስሪያ ቤት",
      location: "አዲስ አበባ፣ ኢትዮጵያ",
      quickLinks: "ፈጣን አገናኞች",
      legal: "ህጋዊ",
      terms: "ውሎች እና ሁኔታዎች",
      privacy: "የግላዊነት መመሪያ",
      stayConnected: "ከእኛ ጋር ይገናኙ",
      newsletterDesc: "ለአዳዲስ የጉዞ መረጃዎች እና የንግድ መሳሪያዎች የዜና መጽሔታችንን ይቀላቀሉ።",
      emailPlaceholder: "የኢሜይል አድራሻ",
      copyright: "© 2026 ዳሩል ሰፈር የጉዞ እና ንግድ። መብቱ በህግ የተጠበቀ ነው።"
    },
    services: {
      pilgrimage: "የሃይማኖት ጉዞ",
      pilgrimageDesc: "ፕሪሚየም ዑምራ፣ ሐጅ እና ዚያራ ጉብኝቶች ወደ ቅዱሳን ከተሞች ከባለሙያ መመሪያ ጋር።",
      ticketing: "ዓለም አቀፍ የአየር ትኬት",
      ticketingDesc: "በእኛ ምርጥ የአየር መንገድ አውታረ መረብ በኩል እንከን የለሽ የበረራ ዝግጅቶች። ምርጥ ዋጋዎች የተረጋገጡ ናቸው።",
      visas: "የቪዛ እና የሰነድ አገልግሎቶች",
      visasDesc: "ለስራ፣ ለቱሪስት፣ ለህክምና እና ለትምህርት ፈቃዶች በዓለም አቀፍ ደረጃ የባለሙያ ሂደት።",
      tools: "ልዩ የጉዞ አገልግሎት",
      toolsDesc: "ለድርጅት ደረጃ ጉዞ እና ለተበጀ የእረፍት ጊዜ እቅድ የላቀ ሎጂስቲክስ።"
    },
    homePage: {
      serviceEyebrow: "የጉዞ አገልግሎቶች",
      serviceStatement: "ዳሩል ሰፈር ከዑምራና ሐጅ ዝግጅት እስከ ቪዛ፣ የአየር ትኬትና የጉዞ አቀናበር ድረስ ኢትዮጵያውያን ተጓዦች በግልጽነት፣ በክብርና በመተማመን እንዲጓዙ ያግዛል።",
      valueCards: {
        guidance: {
          title: "የባለሙያ መመሪያ",
          desc: "ከውሳኔ በፊት ግልጽነትን ለሚፈልጉ ተጓዦች የተረጋጋ ሂደት።"
        },
        coordination: {
          title: "ዓለም አቀፍ አቀናበር",
          desc: "በረራ፣ መንገድ፣ ሰነድና የጊዜ አቀናበር በተደራጀ ሂደት።"
        },
        pilgrimage: {
          title: "የዑምራና ሐጅ እንክብካቤ",
          desc: "በመተማመን፣ በዝግጅትና በትርጉም የተመሠረተ ድጋፍ።"
        }
      },
      cardLabel: "የተመረጠ አገልግሎት",
      cardNote: "ቀላል፣ የተመራ፣ ፕሪሚየም።"
    },
    toolsPage: {
      title: "የቀጥታ ምንዛሬ መቀየሪያ",
      subtitle: "ለዓለም አቀፍ ኢትዮጵያዊ ተጓዥ የእውነተኛ ጊዜ የምንዛሬ ተመኖች።",
      amount: "መጠን",
      from: "ከ",
      to: "ወደ",
      lastUpdated: "ለመጨረሻ ጊዜ የዘመነው",
      commonPairs: "ፈጣን ማጣቀሻ (ወደ ብር)",
      loading: "የቀጥታ ተመኖችን በማምጣት ላይ...",
      error: "የቀጥታ ተመኖችን መጫን አልተቻለም።",
      clock: {
        title: "የዓለም ሰዓት",
        localTime: "የአካባቢ ሰዓት",
        addisAbaba: "አዲስ አበባ",
        riyadh: "ሪያድ",
        dubai: "ዱባይ"
      },
      planner: {
        title: "የጉዞ እቅድ አውጪ",
        itinerary: "የጉዞ የጊዜ ሰሌዳ",
        addDay: "ቀን ያክሉ",
        day: "ቀን",
        activity: "እንቅስቃሴ",
        location: "ቦታ",
        budget: "ስማርት በጀት",
        flights: "በረራዎች",
        accommodation: "ማረፊያ",
        food: "ምግብ",
        visas: "ቪዛዎች",
        totalBudget: "አጠቃላይ በጀት",
        estInEtb: "በብር ግምት",
        currency: "ምንዛሬ",
        clearAll: "ሁሉንም አጽዳ",
        activityDetails: "የእንቅስቃሴ ዝርዝሮች",
        locationNotes: "የቦታ ማስታወሻዎች"
      }
    },
    pilgrimagePage: {
      title: "ቅዱስ ጉዞ",
      subtitle: "በጥንቃቄ ከተዘጋጁት የዑምራ እና የሐጅ ፓኬጆቻችን ጋር በመንፈሳዊ የበለጸገ ተሞክሮ ይጀምሩ።",
      packagesTitle: "የእኛ ፓኬጆች",
      economyUmrah: {
        title: "ኢኮኖሚ ዑምራ",
        desc: "ወደ ቅዱሳን ከተሞች ምቹ እና ተመጣጣኝ ጉዞ።",
        inclusions: ["የቪዛ ሂደት", "የደርሶ መልስ በረራዎች", "ባለ 3-ኮከብ ሆቴል (ከሐረም 1 ኪ.ሜ)", "የየብስ ትራንስፖርት", "5 ሊትር የዘምዘም ውሃ"]
      },
      premiumHajj: {
        title: "ፕሪሚየም ሐጅ",
        desc: "ልዩ እና ሙሉ በሙሉ የተመራ የሐጅ ተሞክሮ ከፕሪሚየም አገልግሎቶች ጋር።",
        inclusions: ["የሐጅ ቪዛ ሂደት", "ቀጥታ በረራዎች", "ባለ 5-ኮከብ ሆቴል (ሐረምን የሚመለከት)", "በሚና እና አረፋት የቪአይፒ ድንኳኖች", "የተሰጠ የሊቃውንት መመሪያ"]
      },
      discussWhatsApp: "በዋትስአፕ ያነጋግሩን",
      heroCtaText: "ከቪዛ፣ በረራ፣ ሆቴል እና የጉዞ ዝግጅት ድጋፍ ጋር የተመራ የሐጅና ዑምራ እቅድ።",
      heroServicePill: "ዑምራ • ሐጅ • ዚያራ",
      packagesEyebrow: "በጥንቃቄ የተዘጋጀ ቅዱስ ጉዞ",
      progressTitle: "ሂደት",
      progressText: "ከ8 እቃዎች {count} ተዘጋጅተዋል",
      finalEyebrow: "በግልጽነት ይጀምሩ",
      finalTitle: "ቅዱስ ጉዞዎን ለማቀድ ዝግጁ ነዎት?",
      finalSubtitle:
        "የጉዞ ጊዜዎን፣ የቡድን ብዛትዎን እና የሚመርጡትን ፓኬጅ ያጋሩን። ዳሩል ሰፈር ቀጣዩን እርምጃ በግልጽና በተረጋጋ መመሪያ እንዲረዱ ይረዳዎታል።",
      guideTitle: "የተጓዥ መመሪያ",
      guideSubtitle: "ቀላል የዑምራ ደረጃዎች።",
      steps: {
        ihram: { title: "1. ኢህራም", desc: "የንጽህና እና የኒያ (ዓላማ) ቅዱስ ሁኔታ። ተጓዦች ይታጠባሉ፣ የኢህራም ልብሶችን ይለብሳሉ፣ እና ሚቃትን ከማለፋቸው በፊት ተልቢያን ይላሉ።" },
        tawaf: { title: "2. ጠዋፍ", desc: "በካዕባ ዙሪያ ሰባት ጊዜ በተቃራኒ ሰዓት አቅጣጫ መዞር፣ በዓለም ዙሪያ ካሉ አማኞች ጋር ያለውን ፍቅር እና አንድነት መግለጽ።" },
        sai: { title: "3. ሰዕይ", desc: "በሶፋ እና መርዋ ኮረብታዎች መካከል ሰባት ጊዜ መመላለስ፣ የሀጀርን እምነት እና ጽናት ማክበር።" },
        halq: { title: "4. ሐልቅ / ተቅሲር", desc: "ፀጉርን መላጨት ወይም ማሳጠር፣ ትህትናን፣ መንፈሳዊ ዳግም ልደትን እና የዑምራ ስነ-ስርዓቶችን ማጠናቀቅን ያመለክታል።" }
      }
    }
  },
  om: {
    nav: { home: "Fuula Duraa", pilgrimage: "Hajjii fi Umrah", ticketing: "Tikeetii", visas: "Viizaa", tools: "Meeshaalee", solutions: "Furmaata", services: "Tajaajiloota" },
    hero: { 
      tag: "Kaartaa Idil-addunyaa", 
      headline: "Imaltoota Itoophiyaa Addunyaa Waliin Walquunnamsiisuu.", 
      subtitle: "Darul Safar Travel & Trading furmaata imalaa sadarkaa addunyaa hajjii fi umrah, tikeetii idil-addunyaa fi loojistiksii adda ta'eef ni dhiyeessa.", 
      bookUmrah: "Umrah Galmeessi", 
      globalTicketing: "Tikeetii Idil-addunyaa",
      cta: "Amma Galmeessi"
    },
    footer: {
      brandDesc: "Imaltoota Itoophiyaa ammayyaaf daangaa walquunnamsiisuu fi daldala idil-addunyaa mijeessuu.",
      hq: "Waajjira Muummee",
      location: "Finfinnee, Itoophiyaa",
      quickLinks: "Geessituuwwan Salphaa",
      legal: "Seeraa",
      terms: "Haalawwan fi Dambiiwwan",
      privacy: "Imaammata Iccitii",
      stayConnected: "Nu Waliin Turi",
      newsletterDesc: "Odeeffannoo imalaa haaraa fi meeshaalee daldalaaf barruu keenya hordofi.",
      emailPlaceholder: "Teessoo Imeelii",
      copyright: "© 2026 Darul Safar Travel & Trading. Mirgi hunduu eeggamaadha."
    },
    services: {
      pilgrimage: "Imala Amantii",
      pilgrimageDesc: "Daawwannaa Umrah, Hajjii fi Ziyarah sadarkaa olaanaa gara magaalota qulqulluutti qajeelfama ogeessotaan.",
      ticketing: "Tikeetii Xiyyaaraa Idil-addunyaa",
      ticketingDesc: "Qophii balalii rakkoo hin qabne karaa cimina daandii xiyyaaraa keenyaa. Gatiin gaariin mirkanaa'aadha.",
      visas: "Tajaajila Viizaa fi Sanadaa",
      visasDesc: "Eeyyama hojii, tuuristii, yaalaa fi barnootaa idil-addunyaatti ogeessotaan raawwachuu.",
      tools: "Imala Addaa",
      toolsDesc: "Loojistiksii olaanaa imala dhaabbataaf fi karoora boqonnaa addaa."
    },
    homePage: {
      serviceEyebrow: "Tajaajila imalaa",
      serviceStatement: "Qophii Umraa fi Hajjii irraa kaasee hanga viizaa, tikkeettii xiyyaaraa, fi qindoomina imalaatti, Darul Safar imaltoota Itoophiyaa iftoomina, kabaja, fi amantaa waliin akka imalan gargaara.",
      valueCards: {
        guidance: {
          title: "Qajeelfama olaanaa",
          desc: "Adeemsa tasgabbaa'aa, imaltoota murtee dura iftoomina barbaadaniif."
        },
        coordination: {
          title: "Qindoomina addunyaa",
          desc: "Balali'aa, daandii, sanadoota, fi yeroo sirnaan qindaa'uun."
        },
        pilgrimage: {
          title: "Kunuunsa imala amantii",
          desc: "Deeggarsa amantaa, qophii, fi hiika imalaa irratti hundaa'e."
        }
      },
      cardLabel: "Tajaajila filatame",
      cardNote: "Salphaa, qajeelfamaa, olaanaa."
    },
    toolsPage: {
      title: "Jijjiirraa Maallaqaa Kallattii",
      subtitle: "Imaltoota Itoophiyaa idil-addunyaaf gatii sharafaa yeroo ammaa.",
      amount: "Hanga",
      from: "Irraa",
      to: "Gara",
      lastUpdated: "Yeroo Dhumaa Kan Haaromfame",
      commonPairs: "Wabii Salphaa (gara ETB)",
      loading: "Gatii kallattii fidaa jira...",
      error: "Gatii kallattii fe'uun hin danda'amne.",
      clock: {
        title: "Sa'aatii Addunyaa",
        localTime: "Sa'aatii Naannoo",
        addisAbaba: "Finfinnee",
        riyadh: "Riyaad",
        dubai: "Dubay"
      },
      planner: {
        title: "Karoora Imalaa",
        itinerary: "Sagantaa Imalaa",
        addDay: "Guyyaa Ida'i",
        day: "Guyyaa",
        activity: "Hojii",
        location: "Bakka",
        budget: "Baajata Qaxalee",
        flights: "Balali'aa",
        accommodation: "Bultii",
        food: "Nyaata",
        visas: "Viizaa",
        totalBudget: "Baajata Waliigalaa",
        estInEtb: "Tilmaama ETB",
        currency: "Maallaqa",
        clearAll: "Hunda Haqi",
        activityDetails: "Ibsa Hojii",
        locationNotes: "Yaada Bakka"
      }
    },
    pilgrimagePage: {
      title: "Imala Qulqulluu",
      subtitle: "Paakeejiiwwan Umrah fi Hajjii keenya of eeggannoon karoorfaman waliin muuxannoo hafuuraan badhaadhe eegalaa.",
      packagesTitle: "Paakeejiiwwan Keenya",
      economyUmrah: {
        title: "Umrah Ikoonomii",
        desc: "Imala mijataa fi gatii madaalawaan gara magaalota qulqulluutti.",
        inclusions: ["Adeemsa Viizaa", "Balali'aa Deddeebii", "Hoteela Urjii 3 (Haram irraa kiilomeetira 1)", "Geejjiba Lafa Irraa", "Bishaan Zamzam Liitira 5"]
      },
      premiumHajj: {
        title: "Hajjii Piriimiyemii",
        desc: "Muuxannoo Hajjii adda ta'ee fi guutuun qajeelfamu, tajaajiloota piriimiyemii waliin.",
        inclusions: ["Adeemsa Viizaa Hajjii", "Balali'aa Kallattii", "Hoteela Urjii 5 (Haram kan ilaalu)", "Dunkaana VIP Minaa fi Arafaa keessatti", "Qajeelfama Hayyootaa Addaa"]
      },
      discussWhatsApp: "WhatsApp irratti Mari'adhaa",
      heroCtaText: "Karoora Hajjii fi Umraa qajeelfamaa, deeggarsa viizaa, balalii, hoteelaa fi qophii imalaa waliin.",
      heroServicePill: "Umrah • Hajjii • Ziyarah",
      packagesEyebrow: "Imala amantii of eeggannoon qindaa'e",
      progressTitle: "Adeemsa",
      progressText: "Wantoota 8 keessaa {count} qophaa'e",
      finalEyebrow: "Iftoominaan jalqabi",
      finalTitle: "Imala kee qulqulluu karoorfachuuf qophiidhaa?",
      finalSubtitle:
        "Yeroo imalaa, baay'ina garee, fi paakeejii filattan nuuf qoodaa. Darul Safar tarkaanfii itti aanu iftoominaafi qajeelfama tasgabbaa'aa waliin akka hubattan isin gargaara.",
      guideTitle: "Qajeelfama Imalaa",
      guideSubtitle: "Sadarkaalee Umrah salphifaman.",
      steps: {
        ihram: { title: "1. Ihraam", desc: "Haala qulqullummaa fi niyyaa qulqulluu. Imaltoonni ni dhiqatu, uffata Ihraam ni uffatu, fi Miqaat osoo hin qaxxaamurin dura Talbiyah ni jedhu." },
        tawaf: { title: "2. Xawaaf", desc: "Ka'abaa marsaa torba faallaa lakkooftuu sa'aatiin naanna'uu, jaalalaa fi tokkummaa amantoota addunyaa waliin agarsiisuu." },
        sai: { title: "3. Sa'iy", desc: "Gaarren Safaa fi Marwaa gidduu si'a torba deemuun, amantaa fi obsa Hajar kabajuu." },
        halq: { title: "4. Halq / Taqsir", desc: "Rifeensa haaddachuu ykn gabaabsuu, gad of qabuu, dhaloota hafuuraa haaraa, fi xumura sirnoota Umrah agarsiisa." }
      }
    }
  }
};

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
