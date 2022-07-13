import i18n from "i18next";
import { initReactI18next } from "react-i18next";
export const getLanguage = () => localStorage.getItem('lng') ? localStorage.getItem('lng') : 'eng'
const resources = {
    amh: {
        translation: {
            "News": "ዜና",
            "Vacancy": "ክፍት የሰራ ቦታ",
            "Bids": "ጨረታ",
            "Research": "ምርምር እና ጥናቶች",
            "About": "ስለኛ",
            "language": "ቋንቋ",
            "Home": "ቤት",
            "Attraction sites": "የጉብኝት ቦታዎች",
            "region": "ክልል",
            "Amhara": "አማራ",
            "Oromia": "ኦሮሚያ",
            "Afar": "አፋር",
            "Tigrai": "ትግራይ",
            "Gambela": "ጋምቤላ",
            "Somali": "ሶማሊ",
            "Bensahangul gumuz": "ቤንሻንጉል ጉሙዝ",
            "Harari": "ሀረሪ",
            "Diredewa": "ድሬደዋ",
            "Sidama": "ሲዳማ",
            "SNNPR": "ደቡብ ክልል",
            "Addis Ababa city": "አዲስ አበባ ከተማ",
            "All": "ሁሉም",
            "important links": "አስፈላጊ አገናኞች",
            "Meskel": "መስቀል",
            "Christian celebration": "የክርስቲያን አከባበር",
            "Blue nile": "ዓባይ",
            "Longet river in the world": "በዓለም ላይ ረዥም ወንዝ",
            "Semen mountain": "ሰሜን ተራራ",
            "semen mountain park": "ሰሜን ተራራ ፓርክ",
            "Eritale": "ኤሪታሌ",
            "Active magma": "ንቁ እሳተ ገሞራ",
            "Read more": "ተጨማሪ ያንብቡ",
            "READ MORE": "ተጨማሪ ያንብቡ",
            "Other news": "ሌሎች ዜናዎች",
            "No news  registered yet": "እስካሁን ምንም ዜና አልተመዘገበም",
            "Vacancies": "ክፍት የሥራ መደቦች",
            "No Vacanices registered yet": "ገና ምንም ክፍት የሥራ መደብ አልተመዘገበም",
            "Job title": "የስራ መደቡ መጠሪያ",
            "Job description": "የሥራ ዝርዝር መግለጫ",
            "Skills": "ችሎታ",
            "Work experience": "የስራ ልምድ",
            "Required in quantity": "አስፈላጊ ብዛት",
            "Dead line": "ማለቂያ ቀን",
            "Title": "ርዕስ",
            "Instruction": "መመሪያ",
            "File and explanation": "ፋይል እና ማብራሪያ",
            "No bids registered  yet": "እስካሁን ድረስ ጨረታ አልተመዘገበም",
            "Research and studies": "ምርምር እና ጥናቶች",
            "Find out more": "ተጨማሪ ለማወቅ",
            "Know about land of origins": "ስለ መነሻዎ መሬት ይወቁ",
            "No Attraction site registered yet": "እስካሁን ድረስ የጉብኝት ቦታዎች አልተመዘገበም",
            "Vision": "ራዕይ",
            "Historical Background": "ታሪካዊ ዳራ",
            "Message from the organization": "ከድርጅቱ የተላለፈ መልእክት",
            "Organization Chart": "የድርጅቱ መዋቅር",
            "Amharic": "አማርኛ",
            "English": "እንግሊዝኛ",
            "History": "ታሪክ",
            "Know About history and formulation of this organization": "ስለዚህ ድርጅት እና ታሪክ አወቃቀር ይወቁ",
            "Moct": "ኢ.ባ.ቱ.ሚ",
            "Message of Moct": "የሚኒስትሩ መልእክት",
            "Read about our concerns and ideas": "ስለ እኛ ሀሳቦች ያንብቡ",
            "see about our organization structure": "ስለ ድርጅታችን መዋቅር ይመልከቱ",
            "Message of the minister": "የሚኒስትሩ መልእክት",
            "Know About our vision and mission": "ስለ ራዕያችን እና ተልእኳችን ይወቁ",
            "click the image for fullscreen": "ለሙሉ ማያ ምስሉን ጠቅ ያድርጉ",
            "MENU": "ምናሌ",
            "ADDRESS": "አድራሻ",
            "Addis Ababa": "አዲስ አበባ",
            "Ethiopia": "ኢትዮጵያ",
            "Moct All Rights Reserved": "ኢ.ባ.ቱ.ሚ ሁሉንም መብቶች የተጠበቁ ናቸው",
            "Other attraction sites": "ሌሎች የጉብኝት ቦታዎች",
            "See on google map": "በ google ካርታ ላይ ይመልከቱ",
            "search results": "ጠቅላላ የፍለጋ ውጤቶች",
            "sorry ... No search result is found": "ይቅርታ ... ምንም የፍለጋ ውጤት አልተገኘም",
            "Need help?": "እርዳታ ይፈልጋሉ?",
            "type and hit enter": "ይተይቡ እና አስገባን ይምቱ",
            "what can i help you?": "ምን ልረዳዎት?",
            "Hello, I am a  Moct chatbot": "ሰላም ፣ እኔ የ ኢ.ባ.ቱ.ሚ ቻት ቦት ነኝ",
            "Please leave your name": "ስምዎን ሊነግሩ ይችላሉ",
            "Forums": "መድረኮች",
            "Archives": "ማህደር",
            'we are offline! ,you can come later on working hours': 'ለጊዜው ከመስመር ውጭ ነን! በኋላ በስራ ሰዓት መምጣት ትችላለህ',
            'Quick Links': "ፈጣን አገናኞች",
            'Contact Us': 'አግኙን',
            'Follow Us': 'ተከተሉን'
        }
    }
};
export const changeLanguage = (lng) => {
    localStorage.setItem('lng', lng)
    i18n.use(initReactI18next) // passes i18n down to react-i18next
        .init({
            resources,
            lng,
            interpolation: {
                escapeValue: false // react already safes from xss
            }
        });
}
/** */
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: getLanguage(),
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;