// Manual edits: keep store contact, delivery, cart, and social settings here.
export const SITE_CONFIG = {
  business: {
    name: "SHREE LCM SWEETS",
    whatsappNumber: "919304044471",
    phoneDisplay: "+91 9304044471",
    address: "Chowk, Balthar, Sikta, West Champaran, Bihar – 845307.",
    mapsUrl: "https://maps.app.goo.gl/vEa5xGANHJcRfEqC7?g_st=ac",
    mapsCoordinates: "27.0261721,84.6333501",
  },
  deliveryRadiusKm: 5,
  cartStorageKey: "shri-lcm-cart-v1",
  socialProfiles: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
  whatsappMessages: {
    accountInquiry: "नमस्ते श्री LCM, मुझे आपकी मिठाइयों के बारे में जानकारी चाहिए।",
    chocolateCakeInquiry: "नमस्ते श्री LCM, मुझे चॉकलेट केक के दाम और उपलब्धता बताएं।",
    nanKhataiInquiry: "नमस्ते श्री LCM, मुझे नानखटाई चाहिए।",
    breadPrice: "नमस्ते श्री LCM, आज की ताज़ी ब्रेड का दाम बताएं।",
    breadAvailability: "नमस्ते श्री LCM, आज की ताज़ी ब्रेड का दाम और मिलने की जानकारी दें।",
    sweetsList: "नमस्ते श्री LCM, आपकी मिठाइयों की पूरी सूची भेजें।",
    birthday: "नमस्ते श्री LCM, जन्मदिन के लिए मिठाई और केक की जानकारी दें।",
    wedding: "नमस्ते श्री LCM, शादी के लिए मिठाइयों की जानकारी दें।",
    festival: "नमस्ते श्री LCM, त्योहार की मिठाइयों की सूची भेजें।",
    giftPack: "नमस्ते श्री LCM, मिठाई का तोहफ़ा देना है। जानकारी दें।",
    specialOccasion: "नमस्ते श्री LCM, मुझे एक खास मौके के लिए मिठाई चाहिए।",
    sudhaDairy: "नमस्ते जी, कृपया सुधा डेयरी उत्पादों की जानकारी दें।",
    order: "नमस्ते श्री LCM, आज की मिठाइयों और ऑर्डर की जानकारी दें।",
    faq: "Hello Shri LCM, please help me with my questions about your shop.",
    returnPolicy: "Hello Shri LCM, please share your return policy.",
    shopContact: "",
    privacyPolicy: "Hello Shri LCM, please share your privacy policy.",
    terms: "Hello Shri LCM, please share your terms and conditions.",
    refundPolicy: "Hello Shri LCM, please share your refund policy.",
    productInquiry: (productName, weight = "") =>
      `नमस्ते, कृपया ${productName}${weight ? ` के ${weight}` : ""} के सही दाम और उपलब्धता बताइए।`,
    productInquiryAtWeight: (productName, grams) =>
      `नमस्ते, कृपया ${productName} के ${grams >= 1000 ? "1 किलो" : `${grams} ग्राम`} के सही दाम और उपलब्धता बताइए।`,
  },
};
