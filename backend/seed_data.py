import json
from database import get_db_connection

QUIZ_QUESTIONS = [
    # --- BEGINNER (10 Questions) ---
    {
        "difficulty": "beginner",
        "category": "OTP Safety",
        "question_en": "A caller claiming to be from your bank asks for the 6-digit OTP sent to your phone to 'stop an unauthorized transaction'. What should you do?",
        "question_kn": "ನಿಮ್ಮ ಬ್ಯಾಂಕಿನಿಂದ ಕರೆ ಮಾಡುತ್ತಿದ್ದೇನೆ ಎಂದು ಹೇಳುವ ವ್ಯಕ್ತಿ 'ಅನಧಿಕೃತ ವಹಿವಾಟನ್ನು ತಡೆಯಲು' ನಿಮ್ಮ ಫೋನ್‌ಗೆ ಬಂದ 6-ಅಂಕಿಯ OTP ಕೇಳುತ್ತಾರೆ. ನೀವು ಏನು ಮಾಡಬೇಕು?",
        "question_hi": "खुद को बैंक अधिकारी बताने वाला व्यक्ति 'अनधिकृत लेनदेन रोकने' के लिए आपके फोन पर आया 6-अंकों का OTP मांगता है। आपको क्या करना चाहिए?",
        "options_en": ["Share the OTP immediately", "Hang up immediately and never share the OTP", "Share only the first 3 digits", "Forward the SMS to the caller"],
        "options_kn": ["ತಕ್ಷಣ OTP ಹಂಚಿಕೊಳ್ಳಿ", "ತಕ್ಷಣ ಕರೆ ಕಡಿತಗೊಳಿಸಿ ಮತ್ತು OTP ಎಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ", "ಮೊದಲ 3 ಅಂಕಿಗಳನ್ನು ಮಾತ್ರ ನೀಡಿ", "SMS ಅನ್ನು ಕರೆ ಮಾಡಿದವರಿಗೆ ಫಾರ್ವರ್ಡ್ ಮಾಡಿ"],
        "options_hi": ["तुरंत OTP बता दें", "तुरंत कॉल काट दें और OTP कभी साझा न करें", "केवल पहले 3 अंक बताएं", "SMS को कॉलर को फॉरवर्ड करें"],
        "correct_index": 1,
        "explanation_en": "Banks never ask for your OTP over a call or message. Sharing an OTP authorizes the scammer to steal your money.",
        "explanation_kn": "ಬ್ಯಾಂಕುಗಳು ಕರೆ ಅಥವಾ ಸಂದೇಶದ ಮೂಲಕ ನಿಮ್ಮ OTP ಅನ್ನು ಎಂದಿಗೂ ಕೇಳುವುದಿಲ್ಲ.",
        "explanation_hi": "बैंक कभी भी कॉल या संदेश पर आपका OTP नहीं मांगते। OTP साझा करने से ठग आपके पैसे चुरा सकते हैं।"
    },
    {
        "difficulty": "beginner",
        "category": "UPI Fraud",
        "question_en": "To RECEIVE money on a UPI app (like BHIM, GPay, or PhonePe), do you need to enter your UPI PIN?",
        "question_kn": "UPI ಆ್ಯಪ್‌ನಲ್ಲಿ ಹಣವನ್ನು ಸ್ವೀಕರಿಸಲು (Receive), ನಿಮ್ಮ UPI PIN ನಮೂದಿಸುವ ಅಗತ್ಯವಿದೆಯೇ?",
        "question_hi": "UPI ऐप पर पैसे प्राप्त करने (Receive) के लिए क्या आपको अपना UPI PIN दर्ज करने की आवश्यकता होती है?",
        "options_en": ["Yes, always", "No, UPI PIN is ONLY needed to send money", "Only for amounts above ₹1,000", "Yes, if requested via QR code"],
        "options_kn": ["ಹೌದು, ಯಾವಾಗಲೂ", "ಇಲ್ಲ, ಹಣ ಕಳುಹಿಸಲು ಮಾತ್ರ UPI PIN ಅಗತ್ಯವಿದೆ", "₹1,000 ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಮೊತ್ತಕ್ಕೆ ಮಾತ್ರ", "ಹೌದು, QR ಕೋಡ್ ಮೂಲಕ ಕೇಳಿದರೆ"],
        "options_hi": ["हाँ, हमेशा", "नहीं, UPI PIN केवल पैसे भेजने के लिए आवश्यक है", "केवल ₹1,000 से अधिक की राशि के लिए", "हाँ, यदि QR कोड के माध्यम से अनुरोध किया जाए"],
        "correct_index": 1,
        "explanation_en": "A UPI PIN is strictly required only for debiting (sending) money from your account—never for receiving funds.",
        "explanation_kn": "ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಹಣ ಕಳುಹಿಸಲು ಮಾತ್ರ UPI PIN ಅಗತ್ಯವಿದೆ—ಹಣ ಸ್ವೀಕರಿಸಲು ಎಂದಿಗೂ ಅಲ್ಲ.",
        "explanation_hi": "UPI PIN केवल आपके खाते से पैसे भेजने के लिए आवश्यक होता है, पैसे प्राप्त करने के लिए कभी नहीं।"
    },
    {
        "difficulty": "beginner",
        "category": "Password Security",
        "question_en": "Which of the following is the strongest password practice?",
        "question_kn": "ಈ ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಯಾವುದು ಅತ್ಯಂತ ಬಲವಾದ ಪಾಸ್‌ವರ್ಡ್ ಅಭ್ಯಾಸವಾಗಿದೆ?",
        "question_hi": "निम्नलिखित में से कौन सा सबसे मजबूत पासवर्ड अभ्यास है?",
        "options_en": ["Using your birth year and name", "Using the same password for all apps", "A long passphrase of 12+ characters with mixed cases, numbers, and symbols", "Writing your password on your phone cover"],
        "options_kn": ["ನಿಮ್ಮ ಹುಟ್ಟಿದ ವರ್ಷ ಮತ್ತು ಹೆಸರನ್ನು ಬಳಸುವುದು", "ಎಲ್ಲಾ ಆ್ಯಪ್‌ಗಳಿಗೆ ಒಂದೇ ಪಾಸ್‌ವರ್ಡ್ ಬಳಸುವುದು", "12+ ಅಕ್ಷರಗಳ ಉದ್ದದ ಪಾಸ್‌ಫ್ರೇಸ್ (ದೊಡ್ಡ/ಸಣ್ಣ ಅಕ್ಷರ, ಸಂಖ್ಯೆ, ಚಿಹ್ನೆ)", "ನಿಮ್ಮ ಫೋನ್ ಕವರ್ ಮೇಲೆ ಪಾಸ್‌ವರ್ಡ್ ಬರೆಯುವುದು"],
        "options_hi": ["अपना जन्म वर्ष और नाम उपयोग करना", "सभी ऐप्स के लिए एक ही पासवर्ड उपयोग करना", "12+ अक्षरों का लंबा पासफ़्रेज़ जिसमें बड़े/छोटे अक्षर, संख्याएं और प्रतीक हों", "अपने फोन कवर पर पासवर्ड लिखना"],
        "correct_index": 2,
        "explanation_en": "Length combined with character variety (uppercase, lowercase, digits, symbols) and uniqueness makes passwords vastly harder to crack.",
        "explanation_kn": "ಉದ್ದ ಮತ್ತು ವಿವಿಧ ಅಕ್ಷರಗಳ ಸಂಯೋಜನೆಯು ಪಾಸ್‌ವರ್ಡ್ ಅನ್ನು ಸುರಕ್ಷಿತಗೊಳಿಸುತ್ತದೆ.",
        "explanation_hi": "लंबाई और विभिन्न प्रकार के अक्षरों का संयोजन पासवर्ड को क्रैक करना बेहद कठिन बना देता है।"
    },
    {
        "difficulty": "beginner",
        "category": "Emergency Help",
        "question_en": "What is India's national helpline number to report financial cyber fraud immediately?",
        "question_kn": "ಆರ್ಥಿಕ ಸೈಬರ್ ವಂಚನೆಯನ್ನು ತಕ್ಷಣವೇ ವರದಿ ಮಾಡಲು ಭಾರತದ ರಾಷ್ಟ್ರೀಯ ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆ ಯಾವುದು?",
        "question_hi": "वित्तीय साइबर धोखाधड़ी की तुरंत रिपोर्ट करने के लिए भारत का राष्ट्रीय हेल्पलाइन नंबर क्या है?",
        "options_en": ["100", "1930", "108", "181"],
        "options_kn": ["100", "1930", "108", "181"],
        "options_hi": ["100", "1930", "108", "181"],
        "correct_index": 1,
        "explanation_en": "Dial 1930 immediately or visit cybercrime.gov.in during the 'Golden Hour' to freeze fraudulent fund transfers.",
        "explanation_kn": "ವಂಚನೆಯ ಹಣ ವರ್ಗಾವಣೆಯನ್ನು ತಡೆಯಲು ತಕ್ಷಣ 1930 ಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ cybercrime.gov.in ಗೆ ಭೇಟಿ ನೀಡಿ.",
        "explanation_hi": "धोखाधड़ी वाले फंड ट्रांसफर को रोकने के लिए तुरंत 1930 डायल करें या cybercrime.gov.in पर जाएं।"
    },
    {
        "difficulty": "beginner",
        "category": "Phishing",
        "question_en": "You receive an SMS: 'Your electricity power will be disconnected tonight at 9:30 PM. Call 98XXXX0011 immediately.' What kind of scam is this?",
        "question_kn": "'ಇಂದು ರಾತ್ರಿ 9:30 ಕ್ಕೆ ನಿಮ್ಮ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಕಡಿತಗೊಳಿಸಲಾಗುತ್ತದೆ. ತಕ್ಷಣ 98XXXX0011 ಗೆ ಕರೆ ಮಾಡಿ' ಎಂಬ SMS ಬಂದರೆ ಇದು ಯಾವ ರೀತಿಯ ವಂಚನೆ?",
        "question_hi": "आपको एक SMS मिलता है: 'आज रात 9:30 बजे आपकी बिजली काट दी जाएगी। तुरंत 98XXXX0011 पर कॉल करें।' यह किस प्रकार का घोटाला है?",
        "options_en": ["Official government reminder", "Urgency-based Smishing / Fake Utility Scam", "Routine meter upgrade", "Bank interest alert"],
        "options_kn": ["ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಜ್ಞಾಪನೆ", "ತುರ್ತು ಭಯ ಹುಟ್ಟಿಸುವ SMS ವಂಚನೆ (Smishing)", "ಸಾಮಾನ್ಯ ಮೀಟರ್ ನವೀಕರಣ", "ಬ್ಯಾಂಕ್ ಬಡ್ಡಿ ಎಚ್ಚರಿಕೆ"],
        "options_hi": ["आधिकारिक सरकारी अनुस्मारक", "तात्कालिकता-आधारित स्मिशिंग / नकली बिजली बिल घोटाला", "नियमित मीटर अपग्रेड", "बैंक ब्याज अलर्ट"],
        "correct_index": 1,
        "explanation_en": "Electricity boards never threaten night-time disconnection via personal mobile numbers. Scammers use panic to trick victims into installing screen-sharing apps.",
        "explanation_kn": "ವಿದ್ಯುತ್ ಮಂಡಳಿಗಳು ವೈಯಕ್ತಿಕ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗಳ ಮೂಲಕ ರಾತ್ರಿ ಸಂಪರ್ಕ ಕಡಿತದ ಬೆದರಿಕೆ ಹಾಕುವುದಿಲ್ಲ.",
        "explanation_hi": "बिजली बोर्ड कभी भी व्यक्तिगत मोबाइल नंबरों के माध्यम से रात में बिजली काटने की धमकी नहीं देते हैं।"
    },
    {
        "difficulty": "beginner",
        "category": "QR Code Scams",
        "question_en": "A buyer on an online marketplace sends you a QR code and tells you to scan it to receive ₹5,000 for your old sofa. What will happen if you scan it and enter your PIN?",
        "question_kn": "ಆನ್‌ಲೈನ್ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಖರೀದಿದಾರರೊಬ್ಬರು ನಿಮಗೆ QR ಕೋಡ್ ಕಳುಹಿಸಿ ಹಣ ಪಡೆಯಲು ಸ್ಕ್ಯಾನ್ ಮಾಡಲು ಹೇಳುತ್ತಾರೆ. ನೀವು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ PIN ನಮೂದಿಸಿದರೆ ಏನಾಗುತ್ತದೆ?",
        "question_hi": "एक खरीदार आपको QR कोड भेजता है और पैसे प्राप्त करने के लिए इसे स्कैन करने को कहता है। यदि आप स्कैन करके PIN डालते हैं तो क्या होगा?",
        "options_en": ["₹5,000 will be credited to your account", "₹5,000 will be DEDUCTED from your account", "Nothing happens", "Your bank will double the money"],
        "options_kn": ["ನಿಮ್ಮ ಖಾತೆಗೆ ₹5,000 ಜಮಾ ಆಗುತ್ತದೆ", "ನಿಮ್ಮ ಖಾತೆಯಿಂದ ₹5,000 ಕಡಿತಗೊಳ್ಳುತ್ತದೆ", "ಏನೂ ಆಗುವುದಿಲ್ಲ", "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಹಣವನ್ನು ದ್ವಿಗುಣಗೊಳಿಸುತ್ತದೆ"],
        "options_hi": ["आपके खाते में ₹5,000 जमा हो जाएंगे", "आपके खाते से ₹5,000 कट जाएंगे", "कुछ नहीं होगा", "आपका बैंक पैसे दोगुना कर देगा"],
        "correct_index": 1,
        "explanation_en": "QR codes are payment instructions used to PAY someone, never to receive money.",
        "explanation_kn": "QR ಕೋಡ್‌ಗಳು ಹಣ ಪಾವತಿಸಲು ಮಾತ್ರ ಬಳಸಲಾಗುತ್ತದೆ, ಹಣ ಪಡೆಯಲು ಎಂದಿಗೂ ಅಲ್ಲ.",
        "explanation_hi": "QR कोड का उपयोग केवल भुगतान करने के लिए किया जाता है, पैसे प्राप्त करने के लिए कभी नहीं।"
    },
    {
        "difficulty": "beginner",
        "category": "Fake Job Offers",
        "question_en": "A WhatsApp message promises ₹4,000/day for liking YouTube videos, but asks for a ₹2,000 'VIP registration deposit' first. Is this safe?",
        "question_kn": "YouTube ವೀಡಿಯೊಗಳನ್ನು ಲೈಕ್ ಮಾಡಲು ದಿನಕ್ಕೆ ₹4,000 ನೀಡುವುದಾಗಿ ಹೇಳಿ, ಮೊದಲು ₹2,000 'VIP ನೋಂದಣಿ ಶುಲ್ಕ' ಕೇಳುವ WhatsApp ಸಂದೇಶ ಸುರಕ್ಷಿತವೇ?",
        "question_hi": "एक WhatsApp संदेश YouTube वीडियो लाइक करने के लिए ₹4,000/दिन का वादा करता है, लेकिन पहले ₹2,000 'VIP पंजीकरण जमा' मांगता है। क्या यह सुरक्षित है?",
        "options_en": ["Yes, it is a genuine part-time job", "No, it is a classic prepaid task scam", "Yes, if they show a fake certificate", "Only if paid via cryptocurrency"],
        "options_kn": ["ಹೌದು, ಇದು ನಿಜವಾದ ಅರೆಕಾಲಿಕ ಕೆಲಸ", "ಇಲ್ಲ, ಇದು ಪೂರ್ವಪಾವತಿ ಕಾರ್ಯ ವಂಚನೆ (Task Scam)", "ಹೌದು, ಅವರು ಪ್ರಮಾಣಪತ್ರ ತೋರಿಸಿದರೆ", "ಕ್ರಿಪ್ಟೋಕರೆನ್ಸಿ ಮೂಲಕ ಪಾವತಿಸಿದರೆ ಮಾತ್ರ"],
        "options_hi": ["हाँ, यह एक असली पार्ट-टाइम नौकरी है", "नहीं, यह एक प्रीपेड टास्क घोटाला है", "हाँ, यदि वे प्रमाण पत्र दिखाते हैं", "केवल क्रिप्टोकरेंसी के माध्यम से भुगतान करने पर"],
        "correct_index": 1,
        "explanation_en": "Legitimate employers pay you for work; they never ask candidates to pay registration or task deposits.",
        "explanation_kn": "ನಿಜವಾದ ಉದ್ಯೋಗದಾತರು ಕೆಲಸಕ್ಕೆ ಸಂಬಳ ನೀಡುತ್ತಾರೆ; ನೋಂದಣಿ ಶುಲ್ಕವನ್ನು ಎಂದಿಗೂ ಕೇಳುವುದಿಲ್ಲ.",
        "explanation_hi": "असली नियोक्ता काम के लिए पैसे देते हैं; वे कभी भी पंजीकरण शुल्क नहीं मांगते।"
    },
    {
        "difficulty": "beginner",
        "category": "Safe Browsing",
        "question_en": "Where should you look for a bank's customer care phone number?",
        "question_kn": "ಬ್ಯಾಂಕಿನ ಗ್ರಾಹಕ ಸೇವಾ ದೂರವಾಣಿ ಸಂಖ್ಯೆಯನ್ನು ನೀವು ಎಲ್ಲಿ ಹುಡುಕಬೇಕು?",
        "question_hi": "आपको बैंक का कस्टमर केयर फोन नंबर कहाँ खोजना चाहिए?",
        "options_en": ["Top search ad on Google", "Back of your official debit/credit card or official bank website/app", "Comments section on social media", "Random WhatsApp forwards"],
        "options_kn": ["Google ನ ಮೊದಲ ಜಾಹೀರಾತಿನಲ್ಲಿ", "ನಿಮ್ಮ ಅಧಿಕೃತ ಡೆಬಿಟ್/ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಹಿಂಭಾಗ ಅಥವಾ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ", "ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮದ ಕಾಮೆಂಟ್‌ಗಳಲ್ಲಿ", "WhatsApp ಫಾರ್ವರ್ಡ್‌ಗಳಲ್ಲಿ"],
        "options_hi": ["Google के शीर्ष विज्ञापन में", "आपके आधिकारिक डेबिट/क्रेडिट कार्ड के पीछे या आधिकारिक बैंक वेबसाइट पर", "सोशल मीडिया कमेंट्स में", "WhatsApp फॉरवर्ड में"],
        "correct_index": 1,
        "explanation_en": "Scammers buy search engine ads with fake helpline numbers. Always use the number printed on your bank card or inside the official app.",
        "explanation_kn": "ವಂಚಕರು ನಕಲಿ ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆಗಳೊಂದಿಗೆ ಜಾಹೀರಾತು ನೀಡುತ್ತಾರೆ. ಯಾವಾಗಲೂ ಅಧಿಕೃತ ಮೂಲವನ್ನೇ ಬಳಸಿ.",
        "explanation_hi": "ठग नकली हेल्पलाइन नंबरों के साथ विज्ञापन देते हैं। हमेशा अपने बैंक कार्ड या आधिकारिक ऐप पर दिए गए नंबर का उपयोग करें।"
    },
    {
        "difficulty": "beginner",
        "category": "Social Media Security",
        "question_en": "What does Two-Factor Authentication (2FA) add to your account?",
        "question_kn": "ಎರಡು-ಹಂತದ ದೃಢೀಕರಣ (2FA) ನಿಮ್ಮ ಖಾತೆಗೆ ಏನನ್ನು ಸೇರಿಸುತ್ತದೆ?",
        "question_hi": "टू-फैक्टर ऑथेंटिकेशन (2FA) आपके खाते में क्या जोड़ता है?",
        "options_en": ["Slower internet speed", "A second verification step (like an authenticator code) even if someone steals your password", "Automatic password sharing", "Free cloud storage"],
        "options_kn": ["ನಿಧಾನಗತಿಯ ಇಂಟರ್ನೆಟ್", "ಪಾಸ್‌ವರ್ಡ್ ಕಳವಾದರೂ ಖಾತೆ ರಕ್ಷಿಸುವ ಎರಡನೇ ಭದ್ರತಾ ಹಂತ", "ಸ್ವಯಂಚಾಲಿತ ಪಾಸ್‌ವರ್ಡ್ ಹಂಚಿಕೆ", "ಉಚಿತ ಕ್ಲೌಡ್ ಸ್ಟೋರೇಜ್"],
        "options_hi": ["धीमी इंटरनेट स्पीड", "पासवर्ड चोरी होने पर भी खाते की रक्षा करने वाला दूसरा सुरक्षा चरण", "स्वचालित पासवर्ड साझाकरण", "मुफ्त क्लाउड स्टोरेज"],
        "correct_index": 1,
        "explanation_en": "2FA prevents unauthorized logins even if a cybercriminal discovers your password.",
        "explanation_kn": "ಸೈಬರ್ ಅಪರಾಧಿಗಳು ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ತಿಳಿದುಕೊಂಡರೂ 2FA ಅನಧಿಕೃತ ಲಾಗಿನ್ ತಡೆಯುತ್ತದೆ.",
        "explanation_hi": "यदि कोई साइबर अपराधी आपका पासवर्ड जान भी ले, तो भी 2FA अनधिकृत लॉगिन को रोकता है।"
    },
    {
        "difficulty": "beginner",
        "category": "Digital Arrest",
        "question_en": "Can Indian police or CBI officers legally conduct a 'Digital Arrest' over Skype or WhatsApp video call and demand money to close a case?",
        "question_kn": "ಭಾರತೀಯ ಪೊಲೀಸ್ ಅಥವಾ CBI ಅಧಿಕಾರಿಗಳು Skype ಅಥವಾ WhatsApp ವೀಡಿಯೊ ಕರೆಯಲ್ಲಿ 'ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್' ಮಾಡಿ ಪ್ರಕರಣ ಮುಚ್ಚಲು ಹಣ ಕೇಳಬಹುದೇ?",
        "question_hi": "क्या भारतीय पुलिस या CBI अधिकारी Skype या WhatsApp वीडियो कॉल पर 'डिजिटल अरेस्ट' कर सकते हैं और केस बंद करने के लिए पैसे मांग सकते हैं?",
        "options_en": ["Yes, for courier parcels", "No! 'Digital Arrest' does not exist in Indian law—it is 100% a scam", "Yes, if they wear a uniform on camera", "Only on weekends"],
        "options_kn": ["ಹೌದು, ಕೊರಿಯರ್ ಪಾರ್ಸೆಲ್‌ಗಳಿಗೆ", "ಇಲ್ಲ! ಭಾರತೀಯ ಕಾನೂನಿನಲ್ಲಿ 'ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್' ಎಂಬುದೇ ಇಲ್ಲ—ಇದು 100% ವಂಚನೆ", "ಹೌದು, ಅವರು ಸಮವಸ್ತ್ರ ಧರಿಸಿದ್ದರೆ", "ವಾರಾಂತ್ಯದಲ್ಲಿ ಮಾತ್ರ"],
        "options_hi": ["हाँ, कूरियर पार्सल के लिए", "नहीं! भारतीय कानून में 'डिजिटल अरेस्ट' जैसा कुछ नहीं है—यह 100% घोटाला है", "हाँ, यदि वे वर्दी पहने हुए हैं", "केवल सप्ताहांत पर"],
        "correct_index": 1,
        "explanation_en": "Law enforcement agencies never interrogate, arrest, or demand money over video calls. Hang up and dial 1930.",
        "explanation_kn": "ಕಾನೂನು ಜಾರಿ ಸಂಸ್ಥೆಗಳು ವೀಡಿಯೊ ಕರೆಗಳ ಮೂಲಕ ಬಂಧಿಸುವುದಿಲ್ಲ ಅಥವಾ ಹಣ ಕೇಳುವುದಿಲ್ಲ.",
        "explanation_hi": "कानून प्रवर्तन एजेंसियां कभी भी वीडियो कॉल पर पूछताछ, गिरफ्तारी या पैसे की मांग नहीं करती हैं।"
    },

    # --- INTERMEDIATE (10 Questions) ---
    {
        "difficulty": "intermediate",
        "category": "Fake Websites",
        "question_en": "A website URL is 'http://sbi-kyc-update.xyz/login'. Which two warning signs immediately stand out?",
        "question_kn": "'http://sbi-kyc-update.xyz/login' ಎಂಬ URL ನಲ್ಲಿ ತಕ್ಷಣ ಕಾಣುವ ಎರಡು ಎಚ್ಚರಿಕೆ ಚಿಹ್ನೆಗಳು ಯಾವುವು?",
        "question_hi": "एक वेबसाइट URL 'http://sbi-kyc-update.xyz/login' है। इसमें तुरंत कौन से दो चेतावनी संकेत दिखाई देते हैं?",
        "options_en": ["It uses '.xyz' instead of official '.co.in' and unencrypted 'http://'", "It has '/login' in the path", "It uses lowercase letters", "It is too short"],
        "options_kn": ["ಅಧಿಕೃತ '.co.in' ಬದಲಿಗೆ '.xyz' ಬಳಸಿದೆ ಮತ್ತು ಅಸುರಕ್ಷಿತ 'http://' ಇದೆ", "ಪಥದಲ್ಲಿ '/login' ಇದೆ", "ಸಣ್ಣ ಅಕ್ಷರಗಳನ್ನು ಬಳಸಿದೆ", "ಇದು ತುಂಬಾ ಚಿಕ್ಕದಾಗಿದೆ"],
        "options_hi": ["इसमें आधिकारिक '.co.in' के बजाय '.xyz' और असुरक्षित 'http://' का उपयोग किया गया है", "इसके पाथ में '/login' है", "यह छोटे अक्षरों का उपयोग करता है", "यह बहुत छोटा है"],
        "correct_index": 0,
        "explanation_en": "Official Indian banks do not host KYC portals on '.xyz' domains or unencrypted HTTP links.",
        "explanation_kn": "ಅಧಿಕೃತ ಬ್ಯಾಂಕುಗಳು '.xyz' ಡೊಮೇನ್ ಅಥವಾ HTTP ಲಿಂಕ್‌ಗಳಲ್ಲಿ KYC ಪೋರ್ಟಲ್ ನಡೆಸುವುದಿಲ್ಲ.",
        "explanation_hi": "आधिकारिक भारतीय बैंक '.xyz' डोमेन या असुरक्षित HTTP लिंक पर KYC पोर्टल नहीं चलाते हैं।"
    },
    {
        "difficulty": "intermediate",
        "category": "Fake Payment Screenshots",
        "question_en": "A customer at your shop shows a smartphone screenshot saying '₹2,500 Paid Successfully', but your bank SMS hasn't arrived. What is the safest action?",
        "question_kn": "ನಿಮ್ಮ ಅಂಗಡಿಯಲ್ಲಿ ಗ್ರಾಹಕರೊಬ್ಬರು '₹2,500 ಪಾವತಿ ಯಶಸ್ವಿಯಾಗಿದೆ' ಎಂಬ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ತೋರಿಸುತ್ತಾರೆ, ಆದರೆ ನಿಮಗೆ ಬ್ಯಾಂಕ್ SMS ಬಂದಿಲ್ಲ. ಸುರಕ್ಷಿತ ಕ್ರಮ ಯಾವುದು?",
        "question_hi": "आपकी दुकान पर एक ग्राहक '₹2,500 सफल भुगतान' का स्क्रीनशॉट दिखाता है, लेकिन आपका बैंक SMS नहीं आया है। सबसे सुरक्षित कदम क्या है?",
        "options_en": ["Trust the screenshot and hand over the goods", "Open your own official UPI/bank app and verify the actual balance & UTR credit", "Ask them to send the screenshot on WhatsApp", "Accept their word because the green tick looks real"],
        "options_kn": ["ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ನಂಬಿ ವಸ್ತುಗಳನ್ನು ನೀಡಿ", "ನಿಮ್ಮ ಅಧಿಕೃತ UPI/ಬ್ಯಾಂಕ್ ಆ್ಯಪ್ ತೆರೆದು ನಿಜವಾದ ಬ್ಯಾಲೆನ್ಸ್ ಮತ್ತು UTR ಜಮಾ ಪರಿಶೀಲಿಸಿ", "WhatsApp ನಲ್ಲಿ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಕಳುಹಿಸಲು ಹೇಳಿ", "ಹಸಿರು ಟಿಕ್ ನಿಜವೆಂದು ನಂಬಿ"],
        "options_hi": ["स्क्रीनशॉट पर भरोसा करें और सामान दे दें", "अपना आधिकारिक UPI/बैंक ऐप खोलें और वास्तविक बैलेंस व UTR क्रेडिट जांचें", "उन्हें WhatsApp पर स्क्रीनशॉट भेजने को कहें", "हरा टिक असली लगने के कारण उनकी बात मान लें"],
        "correct_index": 1,
        "explanation_en": "Fake payment apps generate realistic receipts with sounds and green ticks. Only your own bank statement or UPI app history confirms receipt.",
        "explanation_kn": "ನಕಲಿ ಪಾವತಿ ಆ್ಯಪ್‌ಗಳು ನಿಜವಾದಂತೆ ಕಾಣುವ ರಸೀದಿಗಳನ್ನು ಸೃಷ್ಟಿಸುತ್ತವೆ. ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಆ್ಯಪ್‌ನಲ್ಲಿ ಮಾತ್ರ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
        "explanation_hi": "नकली पेमेंट ऐप्स असली जैसी रसीदें और आवाजें बनाते हैं। केवल अपने बैंक या UPI ऐप में ही भुगतान की पुष्टि करें।"
    },
    {
        "difficulty": "intermediate",
        "category": "Screen Sharing Scams",
        "question_en": "Why do fraudsters ask victims to install apps like AnyDesk, TeamViewer, or RustDesk during a support call?",
        "question_kn": "ಬೆಂಬಲ ಕರೆಯ ಸಮಯದಲ್ಲಿ ವಂಚಕರು AnyDesk, TeamViewer ನಂತಹ ಆ್ಯಪ್‌ಗಳನ್ನು ಸ್ಥಾಪಿಸಲು ಏಕೆ ಕೇಳುತ್ತಾರೆ?",
        "question_hi": "सपोर्ट कॉल के दौरान ठग पीड़ितों से AnyDesk या TeamViewer जैसे ऐप्स इंस्टॉल करने के लिए क्यों कहते हैं?",
        "options_en": ["To boost phone battery life", "To view your screen live, read incoming OTPs, and control your banking apps remotely", "To clean phone viruses", "To upgrade 4G to 5G"],
        "options_kn": ["ಫೋನ್ ಬ್ಯಾಟರಿ ಹೆಚ್ಚಿಸಲು", "ನಿಮ್ಮ ಪರದೆಯನ್ನು ನೇರವಾಗಿ ನೋಡಲು, OTP ಓದಲು ಮತ್ತು ಬ್ಯಾಂಕ್ ಆ್ಯಪ್ ನಿಯಂತ್ರಿಸಲು", "ವೈರಸ್ ಸ್ವಚ್ಛಗೊಳಿಸಲು", "4G ನಿಂದ 5G ಗೆ ನವೀಕರಿಸಲು"],
        "options_hi": ["फोन की बैटरी बढ़ाने के लिए", "आपकी स्क्रीन लाइव देखने, OTP पढ़ने और बैंकिंग ऐप्स को रिमोटली नियंत्रित करने के लिए", "फोन वायरस साफ करने के लिए", "4G को 5G में अपग्रेड करने के लिए"],
        "correct_index": 1,
        "explanation_en": "Remote desktop tools grant full screen visibility, allowing attackers to watch you type PINs and intercept SMS OTPs.",
        "explanation_kn": "ರಿಮೋಟ್ ಆ್ಯಪ್‌ಗಳು ವಂಚಕರಿಗೆ ನಿಮ್ಮ ಪರದೆಯ ಸಂಪೂರ್ಣ ನಿಯಂತ್ರಣ ನೀಡುತ್ತವೆ.",
        "explanation_hi": "रिमोट डेस्कटॉप ऐप्स हमलावरों को आपकी स्क्रीन देखने और SMS OTP पढ़ने की अनुमति देते हैं।"
    },
    {
        "difficulty": "intermediate",
        "category": "Phishing",
        "question_en": "Does seeing a padlock icon (HTTPS) in the browser address bar guarantee that a website is genuine and not a scam?",
        "question_kn": "ಬ್ರೌಸರ್ ವಿಳಾಸ ಪಟ್ಟಿಯಲ್ಲಿ ಬೀಗದ ಚಿಹ್ನೆ (HTTPS) ಕಂಡರೆ ಆ ವೆಬ್‌ಸೈಟ್ ನಿಜವಾದದ್ದು ಮತ್ತು ವಂಚನೆಯಲ್ಲ ಎಂದು ಖಾತರಿಯೇ?",
        "question_hi": "क्या ब्राउज़र एड्रेस बार में पैडलॉक आइकन (HTTPS) दिखने का मतलब यह है कि वेबसाइट असली है और घोटाला नहीं है?",
        "options_en": ["Yes, HTTPS is only given to government-verified companies", "No, HTTPS only means the connection is encrypted; scammers also use HTTPS on phishing sites", "Yes, always", "Only on mobile phones"],
        "options_kn": ["ಹೌದು, ಸರ್ಕಾರಿ ಸಂಸ್ಥೆಗಳಿಗೆ ಮಾತ್ರ HTTPS ಸಿಗುತ್ತದೆ", "ಇಲ್ಲ, HTTPS ಕೇವಲ ಸಂಪರ್ಕ ಎನ್‌ಕ್ರಿಪ್ಟ್ ಆಗಿದೆ ಎಂದು ತೋರಿಸುತ್ತದೆ; ವಂಚಕರೂ HTTPS ಬಳಸುತ್ತಾರೆ", "ಹೌದು, ಯಾವಾಗಲೂ", "ಮೊಬೈಲ್ ಫೋನ್‌ಗಳಲ್ಲಿ ಮಾತ್ರ"],
        "options_hi": ["हाँ, HTTPS केवल सरकार द्वारा सत्यापित कंपनियों को दिया जाता है", "नहीं, HTTPS का अर्थ केवल एन्क्रिप्टेड कनेक्शन है; ठग भी फ़िशिंग साइटों पर HTTPS का उपयोग करते हैं", "हाँ, हमेशा", "केवल मोबाइल फोन पर"],
        "correct_index": 1,
        "explanation_en": "Free SSL/TLS certificates are available to anyone. Always check the exact spelling of the domain name, not just the padlock.",
        "explanation_kn": "ಉಚಿತ SSL ಪ್ರಮಾಣಪತ್ರಗಳು ಎಲ್ಲರಿಗೂ ಲಭ್ಯವಿವೆ. ಬೀಗದ ಚಿಹ್ನೆಯ ಜೊತೆಗೆ ಡೊಮೇನ್ ಹೆಸರನ್ನು ಸರಿಯಾಗಿ ಪರಿಶೀಲಿಸಿ.",
        "explanation_hi": "मुफ्त SSL प्रमाणपत्र किसी को भी मिल सकते हैं। केवल पैडलॉक ही नहीं, बल्कि डोमेन नाम की सही वर्तनी भी जांचें।"
    },
    {
        "difficulty": "intermediate",
        "category": "Social Media Impersonation",
        "question_en": "A friend's Instagram account messages you asking for an urgent ₹8,000 UPI transfer for a medical emergency. What should you do first?",
        "question_kn": "ಸ್ನೇಹಿತರ Instagram ಖಾತೆಯಿಂದ ವೈದ್ಯಕೀಯ ತುರ್ತು ಪರಿಸ್ಥಿತಿಗಾಗಿ ತಕ್ಷಣ ₹8,000 UPI ವರ್ಗಾವಣೆ ಕೇಳಿ ಸಂದೇಶ ಬಂದರೆ ಮೊದಲು ಏನು ಮಾಡಬೇಕು?",
        "question_hi": "आपके मित्र के Instagram खाते से मेडिकल इमरजेंसी के लिए तुरंत ₹8,000 UPI ट्रांसफर मांगने वाला संदेश आता है। आपको सबसे पहले क्या करना चाहिए?",
        "options_en": ["Transfer the money immediately to help", "Call your friend directly on their saved phone number to verify", "Ask for their UPI ID in chat and send half", "Share your own bank login"],
        "options_kn": ["ಸಹಾಯ ಮಾಡಲು ತಕ್ಷಣ ಹಣ ಕಳುಹಿಸಿ", "ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ನಿಮ್ಮ ಸ್ನೇಹಿತರ ಉಳಿಸಿದ ಫೋನ್ ಸಂಖ್ಯೆಗೆ ನೇರವಾಗಿ ಕರೆ ಮಾಡಿ", "ಚಾಟ್‌ನಲ್ಲಿ UPI ID ಕೇಳಿ ಅರ್ಧ ಹಣ ಕಳುಹಿಸಿ", "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಲಾಗಿನ್ ಹಂಚಿಕೊಳ್ಳಿ"],
        "options_hi": ["मदद के लिए तुरंत पैसे ट्रांसफर करें", "सत्यापित करने के लिए अपने मित्र के सहेजे गए फोन नंबर पर सीधे कॉल करें", "चैट में उनकी UPI ID मांगें और आधा भेजें", "अपना बैंक लॉगिन साझा करें"],
        "correct_index": 1,
        "explanation_en": "Hackers frequently hijack social media accounts and message contacts for emergency money. Always verify via a direct phone call.",
        "explanation_kn": "ಹ್ಯಾಕರ್‌ಗಳು ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಖಾತೆಗಳನ್ನು ಹ್ಯಾಕ್ ಮಾಡಿ ಸ್ನೇಹಿತರಿಂದ ಹಣ ಕೇಳುತ್ತಾರೆ. ನೇರ ಕರೆ ಮಾಡಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
        "explanation_hi": "हैकर्स अक्सर सोशल मीडिया अकाउंट हैक करके दोस्तों से पैसे मांगते हैं। हमेशा सीधे फोन कॉल करके पुष्टि करें।"
    },
    {
        "difficulty": "intermediate",
        "category": "Investment Fraud",
        "question_en": "You are added to a WhatsApp group where 'stock market professors' show daily 300% profit screenshots and ask you to download a custom APK trading app. What is the risk?",
        "question_kn": "'ಷೇರು ಮಾರುಕಟ್ಟೆ ತಜ್ಞರು' ಪ್ರತಿದಿನ 300% ಲಾಭದ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ತೋರಿಸಿ ಕಸ್ಟಮ್ APK ಆ್ಯಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು ಹೇಳುವ WhatsApp ಗುಂಪಿನ ಅಪಾಯವೇನು?",
        "question_hi": "आपको एक WhatsApp ग्रुप में जोड़ा जाता है जहाँ 'शेयर बाजार प्रोफेसर' रोजाना 300% मुनाफे के स्क्रीनशॉट दिखाते हैं और एक कस्टम APK ऐप डाउनलोड करने को कहते हैं। क्या जोखिम है?",
        "options_en": ["Guaranteed wealth", "Pig-butchering / fake trading app scam where profits are fabricated and withdrawals are blocked", "SEBI-approved mentorship", "Tax-free returns"],
        "options_kn": ["ಖಚಿತ ಸಂಪತ್ತು", "ನಕಲಿ ಟ್ರೇಡಿಂಗ್ ಆ್ಯಪ್ ವಂಚನೆ—ಇಲ್ಲಿ ಲಾಭ ನಕಲಿಯಾಗಿರುತ್ತದೆ ಮತ್ತು ಹಣ ಹಿಂಪಡೆಯಲು ಸಾಧ್ಯವಿಲ್ಲ", "SEBI ಅನುಮೋದಿತ ಮಾರ್ಗದರ್ಶನ", "ತೆರಿಗೆ ರಹಿತ ಆದಾಯ"],
        "options_hi": ["गारंटीकृत धन", "नकली ट्रेडिंग ऐप घोटाला जहाँ मुनाफा नकली होता है और पैसे निकालना ब्लॉक कर दिया जाता है", "SEBI-अनुमोदित मेंटरशिप", "कर-मुक्त रिटर्न"],
        "correct_index": 1,
        "explanation_en": "Fraudulent trading APKs display fake rising balances to lure larger deposits, then block withdrawals entirely.",
        "explanation_kn": "ನಕಲಿ ಟ್ರೇಡಿಂಗ್ ಆ್ಯಪ್‌ಗಳು ಹೆಚ್ಚಿನ ಹೂಡಿಕೆ ಆಕರ್ಷಿಸಲು ಸುಳ್ಳು ಲಾಭ ತೋರಿಸುತ್ತವೆ.",
        "explanation_hi": "धोखाधड़ी वाले ट्रेडिंग APK बड़े निवेश को आकर्षित करने के लिए नकली बैलेंस दिखाते हैं और बाद में निकासी रोक देते हैं।"
    },
    {
        "difficulty": "intermediate",
        "category": "SIM Swap & Mobile Security",
        "question_en": "Your mobile phone suddenly loses all network signal ('No Service') for hours while you receive email alerts about password resets. What might be happening?",
        "question_kn": "ನಿಮ್ಮ ಫೋನ್ ಇದ್ದಕ್ಕಿದ್ದಂತೆ ಗಂಟೆಗಳ ಕಾಲ ನೆಟ್‌ವರ್ಕ್ ಕಳೆದುಕೊಂಡು ('No Service'), ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾವಣೆಯ ಇಮೇಲ್‌ಗಳು ಬಂದರೆ ಏನಾಗುತ್ತಿರಬಹುದು?",
        "question_hi": "आपके मोबाइल फोन का नेटवर्क अचानक घंटों के लिए चला जाता है ('No Service') और आपको पासवर्ड रीसेट के ईमेल अलर्ट मिलते हैं। क्या हो रहा हो सकता है?",
        "options_en": ["Normal weather interference", "A potential SIM Swap attack where a scammer transferred your number to their SIM", "Phone screen brightness issue", "Free operator upgrade"],
        "options_kn": ["ಸಾಮಾನ್ಯ ಹವಾಮಾನ ವ್ಯತ್ಯಾಸ", "ವಂಚಕರು ನಿಮ್ಮ ಸಂಖ್ಯೆಯನ್ನು ತಮ್ಮ SIM ಗೆ ವರ್ಗಾಯಿಸಿರುವ SIM ಸ್ವಾಪ್ ದಾಳಿ", "ಫೋನ್ ಪರದೆಯ ಸಮಸ್ಯೆ", "ಉಚಿತ ನೆಟ್‌ವರ್ಕ್ ನವೀಕರಣ"],
        "options_hi": ["सामान्य मौसम हस्तक्षेप", "संभावित SIM स्वैप हमला जहाँ ठग ने आपका नंबर अपने SIM पर ट्रांसफर कर लिया है", "फोन स्क्रीन ब्राइटनेस समस्या", "मुफ्त ऑपरेटर अपग्रेड"],
        "correct_index": 1,
        "explanation_en": "In a SIM swap attack, criminals hijack your phone number to intercept banking OTPs. Contact your telecom operator and bank immediately.",
        "explanation_kn": "SIM ಸ್ವಾಪ್ ದಾಳಿಯಲ್ಲಿ ಅಪರಾಧಿಗಳು ಬ್ಯಾಂಕ್ OTP ಪಡೆಯಲು ನಿಮ್ಮ ಸಂಖ್ಯೆಯನ್ನು ಹೈಜಾಕ್ ಮಾಡುತ್ತಾರೆ.",
        "explanation_hi": "SIM स्वैप हमले में अपराधी बैंकिंग OTP प्राप्त करने के लिए आपका फोन नंबर हाईजैक कर लेते हैं।"
    },
    {
        "difficulty": "intermediate",
        "category": "Public Wi-Fi",
        "question_en": "Why should you avoid logging into net banking or entering card details over free open public Wi-Fi at cafes or stations?",
        "question_kn": "ಕೆಫೆ ಅಥವಾ ನಿಲ್ದಾಣಗಳಲ್ಲಿನ ಉಚಿತ ಸಾರ್ವಜನಿಕ Wi-Fi ಮೂಲಕ ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್ ಅಥವಾ ಕಾರ್ಡ್ ವಿವರಗಳನ್ನು ಏಕೆ ನಮೂದಿಸಬಾರದು?",
        "question_hi": "कैफे या स्टेशनों पर मुफ्त सार्वजनिक Wi-Fi पर नेट बैंकिंग या कार्ड विवरण दर्ज करने से क्यों बचना चाहिए?",
        "options_en": ["Public Wi-Fi uses too much battery", "Attackers on the same network can intercept unencrypted traffic or create fake 'Evil Twin' hotspots", "Banks charge extra fees on Wi-Fi", "It deletes your browser history"],
        "options_kn": ["ಸಾರ್ವಜನಿಕ Wi-Fi ಹೆಚ್ಚು ಬ್ಯಾಟರಿ ಬಳಸುತ್ತದೆ", "ಅದೇ ನೆಟ್‌ವರ್ಕ್‌ನಲ್ಲಿರುವ ದಾಳಿಕೋರರು ಡೇಟಾವನ್ನು ಕದಿಯಬಹುದು ಅಥವಾ ನಕಲಿ ಹಾಟ್‌ಸ್ಪಾಟ್ ಸೃಷ್ಟಿಸಬಹುದು", "ಬ್ಯಾಂಕುಗಳು ಹೆಚ್ಚುವರಿ ಶುಲ್ಕ ವಿಧಿಸುತ್ತವೆ", "ಇದು ಬ್ರೌಸರ್ ಇತಿಹಾಸ ಅಳಿಸುತ್ತದೆ"],
        "options_hi": ["सार्वजनिक Wi-Fi बहुत अधिक बैटरी उपयोग करता है", "एक ही नेटवर्क पर मौजूद हमलावर ट्रैफिक को इंटरसेप्ट कर सकते हैं या नकली हॉटस्पॉट बना सकते हैं", "बैंक Wi-Fi पर अतिरिक्त शुल्क लेते हैं", "यह ब्राउज़र इतिहास हटा देता है"],
        "correct_index": 1,
        "explanation_en": "Unsecured public networks expose users to Man-in-the-Middle (MitM) eavesdropping. Prefer mobile data (4G/5G) for financial transactions.",
        "explanation_kn": "ಅಸುರಕ್ಷಿತ ಸಾರ್ವಜನಿಕ ನೆಟ್‌ವರ್ಕ್‌ಗಳು ಡೇಟಾ ಕಳ್ಳತನಕ್ಕೆ ಕಾರಣವಾಗಬಹುದು. ಹಣಕಾಸಿನ ವಹಿವಾಟಿಗೆ ಮೊಬೈಲ್ ಡೇಟಾ ಬಳಸಿ.",
        "explanation_hi": "असुरक्षित सार्वजनिक नेटवर्क डेटा चोरी का जोखिम बढ़ाते हैं। वित्तीय लेनदेन के लिए मोबाइल डेटा का उपयोग करें।"
    },
    {
        "difficulty": "intermediate",
        "category": "UPI Collect Request",
        "question_en": "What is a 'UPI Collect Request' scam?",
        "question_kn": "'UPI ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್' (Collect Request) ವಂಚನೆ ಎಂದರೇನು?",
        "question_hi": "'UPI कलेक्ट रिक्वेस्ट' घोटाला क्या है?",
        "options_en": ["A bank reward coupon", "A scammer sends a payment request disguised as a refund/prize; approving it with your PIN debits your account", "An automatic tax refund", "A way to block spam calls"],
        "options_kn": ["ಬ್ಯಾಂಕ್ ಬಹುಮಾನ ಕೂಪನ್", "ವಂಚಕರು ಮರುಪಾವತಿ/ಬಹುಮಾನದ ಹೆಸರಿನಲ್ಲಿ ಹಣ ಕೇಳುವ ವಿನಂತಿ ಕಳುಹಿಸುತ್ತಾರೆ; PIN ಹಾಕಿದರೆ ನಿಮ್ಮ ಹಣ ಕಡಿತವಾಗುತ್ತದೆ", "ಸ್ವಯಂಚಾಲಿತ ತೆರಿಗೆ ಮರುಪಾವತಿ", "ಸ್ಪ್ಯಾಮ್ ಕರೆ ತಡೆಯುವ ವಿಧಾನ"],
        "options_hi": ["एक बैंक रिवॉर्ड कूपन", "ठग रिफंड/इनाम के नाम पर भुगतान अनुरोध भेजता है; PIN से स्वीकृत करने पर आपके खाते से पैसे कट जाते हैं", "स्वचालित टैक्स रिफंड", "स्पैम कॉल ब्लॉक करने का तरीका"],
        "correct_index": 1,
        "explanation_en": "Approving a 'Collect Request' always sends money OUT of your account.",
        "explanation_kn": "'ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್' ಅನುಮೋದಿಸುವುದರಿಂದ ಯಾವಾಗಲೂ ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಹಣ ಹೊರಹೋಗುತ್ತದೆ.",
        "explanation_hi": "'कलेक्ट रिक्वेस्ट' को स्वीकार करने से हमेशा आपके खाते से पैसे कटते हैं।"
    },
    {
        "difficulty": "intermediate",
        "category": "APK Malware",
        "question_en": "An unknown sender on WhatsApp sends a file named 'Wedding_Invitation.apk' or 'RTO_Challan.apk'. What happens if you install it?",
        "question_kn": "WhatsApp ನಲ್ಲಿ ಅಪರಿಚಿತರು 'Wedding_Invitation.apk' ಅಥವಾ 'RTO_Challan.apk' ಎಂಬ ಫೈಲ್ ಕಳುಹಿಸಿದರೆ ಮತ್ತು ನೀವು ಅದನ್ನು ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿದರೆ ಏನಾಗುತ್ತದೆ?",
        "question_hi": "WhatsApp पर कोई अनजान व्यक्ति 'Wedding_Invitation.apk' या 'RTO_Challan.apk' नाम की फाइल भेजता है। इसे इंस्टॉल करने पर क्या होता है?",
        "options_en": ["It opens a photo album", "It installs spyware/banking trojan capable of reading SMS OTPs and stealing bank credentials", "It pays your traffic fine", "It updates WhatsApp"],
        "options_kn": ["ಇದು ಫೋಟೋ ಆಲ್ಬಮ್ ತೆರೆಯುತ್ತದೆ", "ಇದು SMS OTP ಓದುವ ಮತ್ತು ಬ್ಯಾಂಕ್ ವಿವರ ಕದಿಯುವ ಮಾಲ್‌ವೇರ್ ಅನ್ನು ಸ್ಥಾಪಿಸುತ್ತದೆ", "ಇದು ಟ್ರಾಫಿಕ್ ದಂಡ ಪಾವತಿಸುತ್ತದೆ", "ಇದು WhatsApp ನವೀಕರಿಸುತ್ತದೆ"],
        "options_hi": ["यह एक फोटो एल्बम खोलता है", "यह स्पाइवेयर/बैंकिंग ट्रोजन इंस्टॉल करता है जो SMS OTP पढ़ सकता है और बैंक विवरण चुरा सकता है", "यह आपका ट्रैफिक चालान भरता है", "यह WhatsApp अपडेट करता है"],
        "correct_index": 1,
        "explanation_en": "Wedding invites and traffic challans are PDFs or images—never '.apk' Android installer files.",
        "explanation_kn": "ಮದುವೆ ಆಮಂತ್ರಣಗಳು ಮತ್ತು ಚಲನ್‌ಗಳು PDF ಆಗಿರುತ್ತವೆ—ಎಂದಿಗೂ '.apk' ಫೈಲ್‌ಗಳಾಗಿರುವುದಿಲ್ಲ.",
        "explanation_hi": "शादी के निमंत्रण और चालान PDF या इमेज होते हैं—कभी भी '.apk' इंस्टॉलर फाइलें नहीं।"
    },

    # --- ADVANCED (10 Questions) ---
    {
        "difficulty": "advanced",
        "category": "URL Structure & Phishing",
        "question_en": "Consider the URL: 'https://www.amazon.in@secure-account-verify.com/offer'. Which domain does the browser actually connect to?",
        "question_kn": "'https://www.amazon.in@secure-account-verify.com/offer' ಎಂಬ URL ನಲ್ಲಿ ಬ್ರೌಸರ್ ವಾಸ್ತವವಾಗಿ ಯಾವ ಡೊಮೇನ್‌ಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ?",
        "question_hi": "URL 'https://www.amazon.in@secure-account-verify.com/offer' पर विचार करें। ब्राउज़र वास्तव में किस डोमेन से जुड़ता है?",
        "options_en": ["www.amazon.in", "secure-account-verify.com", "Both domains equally", "It blocks the page automatically"],
        "options_kn": ["www.amazon.in", "secure-account-verify.com", "ಎರಡೂ ಡೊಮೇನ್‌ಗಳಿಗೆ", "ಪುಟವನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಿರ್ಬಂಧಿಸುತ್ತದೆ"],
        "options_hi": ["www.amazon.in", "secure-account-verify.com", "दोनों डोमेन से समान रूप से", "यह पेज को स्वचालित रूप से ब्लॉक कर देता है"],
        "correct_index": 1,
        "explanation_en": "In standard URI syntax (user@host), everything before '@' is treated as userinfo, and the browser connects to 'secure-account-verify.com'.",
        "explanation_kn": "URI ನಿಯಮದಂತೆ '@' ಚಿಹ್ನೆಯ ನಂತರದ ಡೊಮೇನ್ ('secure-account-verify.com') ಗೆ ಬ್ರೌಸರ್ ಸಂಪರ್ಕಿಸುತ್ತದೆ.",
        "explanation_hi": "मानक URI सिंटैक्स में '@' से पहले का भाग यूज़रइन्फो माना जाता है, और ब्राउज़र 'secure-account-verify.com' से जुड़ता है।"
    },
    {
        "difficulty": "advanced",
        "category": "Homograph Attacks",
        "question_en": "How does an IDN Homograph attack deceive cautious users?",
        "question_kn": "IDN ಹೋಮೋಗ್ರಾಫ್ (Homograph) ದಾಳಿಯು ಎಚ್ಚರಿಕೆಯ ಬಳಕೆದಾರರನ್ನು ಹೇಗೆ ಮೋಸಗೊಳಿಸುತ್ತದೆ?",
        "question_hi": "IDN होमोग्राफ हमला सतर्क उपयोगकर्ताओं को कैसे धोखा देता है?",
        "options_en": ["By cutting undersea internet cables", "By registering lookalike domains using Cyrillic/Unicode characters (e.g., replacing Latin 'a' with Cyrillic 'а')", "By guessing 4-digit ATM PINs", "By sending blank SMS messages"],
        "options_kn": ["ಸಮುದ್ರದಡಿಯ ಕೇಬಲ್ ಕತ್ತರಿಸುವ ಮೂಲಕ", "ಒಂದೇ ರೀತಿ ಕಾಣುವ ಯುನಿಕೋಡ್/ಸಿರಿಲಿಕ್ ಅಕ್ಷರಗಳನ್ನು ಬಳಸಿ ನಕಲಿ ಡೊಮೇನ್ ನೋಂದಾಯಿಸುವ ಮೂಲಕ", "ATM PIN ಊಹಿಸುವ ಮೂಲಕ", "ಖಾಲಿ SMS ಕಳುಹಿಸುವ ಮೂಲಕ"],
        "options_hi": ["समुद्री इंटरनेट केबल काटकर", "सिरिलिक/यूनिकोड अक्षरों का उपयोग करके दिखने में एक जैसे डोमेन पंजीकृत करके", "4-अंकों के ATM PIN का अनुमान लगाकर", "खाली SMS भेजकर"],
        "correct_index": 1,
        "explanation_en": "Different scripts contain visually identical glyphs, resolving underneath to 'xn--' Punycode domains controlled by attackers.",
        "explanation_kn": "ವಿಭಿನ್ನ ಲಿಪಿಗಳಲ್ಲಿ ಒಂದೇ ರೀತಿ ಕಾಣುವ ಅಕ್ಷರಗಳನ್ನು ಬಳಸಿ ವಂಚಕರು ನಕಲಿ ವೆಬ್‌ಸೈಟ್ ಸೃಷ್ಟಿಸುತ್ತಾರೆ.",
        "explanation_hi": "विभिन्न लिपियों में दिखने में समान अक्षरों का उपयोग करके हमलावर 'xn--' प्यूनीकोड डोमेन बनाते हैं।"
    },
    {
        "difficulty": "advanced",
        "category": "Deepfake & Voice Cloning",
        "question_en": "A video call shows your relative's face and voice asking for urgent money, but their lip-sync lags slightly and they refuse to answer a personal family question. What threat is this?",
        "question_kn": "ವೀಡಿಯೊ ಕರೆಯಲ್ಲಿ ನಿಮ್ಮ ಸಂಬಂಧಿಕರ ಮುಖ ಮತ್ತು ಧ್ವನಿ ಕಾಣಿಸುತ್ತದೆ, ಆದರೆ ತುಟಿಗಳ ಚಲನೆ ಸ್ವಲ್ಪ ತಡವಾಗುತ್ತದೆ ಮತ್ತು ವೈಯಕ್ತಿಕ ಪ್ರಶ್ನೆಗೆ ಉತ್ತರಿಸಲು ನಿರಾಕರಿಸುತ್ತಾರೆ. ಇದು ಯಾವ ಅಪಾಯ?",
        "question_hi": "एक वीडियो कॉल में आपके रिश्तेदार का चेहरा और आवाज दिखती है जो तत्काल पैसे मांगती है, लेकिन लिप-सिंक थोड़ा पीछे है और वे एक व्यक्तिगत पारिवारिक प्रश्न का उत्तर देने से इनकार करते हैं। यह क्या खतरा है?",
        "options_en": ["Slow 5G tower", "AI Deepfake / Real-time Voice & Face Cloning Scam", "Screen burn-in", "Accidental group call"],
        "options_kn": ["ನಿಧಾನಗತಿಯ 5G ಟವರ್", "AI ಡೀಪ್‌ಫೇಕ್ (Deepfake) ಧ್ವನಿ ಮತ್ತು ಮುಖ ಅನುಕರಣೆ ವಂಚನೆ", "ಪರದೆಯ ದೋಷ", "ಆಕಸ್ಮಿಕ ಗುಂಪು ಕರೆ"],
        "options_hi": ["धीमा 5G टावर", "AI डीपफेक / रीयल-टाइम वॉयस और फेस क्लोनिंग घोटाला", "स्क्रीन बर्न-इन", "आकस्मिक ग्रुप कॉल"],
        "correct_index": 1,
        "explanation_en": "Scammers can clone faces and voices from short social media videos. Establish a secret family 'safe word' for emergencies.",
        "explanation_kn": "ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮದ ವೀಡಿಯೊಗಳಿಂದ ವಂಚಕರು ಮುಖ ಮತ್ತು ಧ್ವನಿಯನ್ನು ಅನುಕರಿಸಬಹುದು.",
        "explanation_hi": "ठग सोशल मीडिया वीडियो से चेहरे और आवाज की क्लोनिंग कर सकते हैं। आपात स्थिति के लिए एक गुप्त पारिवारिक 'सेफ वर्ड' तय करें।"
    },
    {
        "difficulty": "advanced",
        "category": "Credential Stuffing",
        "question_en": "Why does reusing the same password across an obscure shopping blog and your primary email put your bank accounts at risk?",
        "question_kn": "ಒಂದು ಸಾಮಾನ್ಯ ಶಾಪಿಂಗ್ ಬ್ಲಾಗ್ ಮತ್ತು ನಿಮ್ಮ ಪ್ರಾಥಮಿಕ ಇಮೇಲ್‌ಗೆ ಒಂದೇ ಪಾಸ್‌ವರ್ಡ್ ಬಳಸುವುದರಿಂದ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗಳಿಗೆ ಏಕೆ ಅಪಾಯವಿದೆ?",
        "question_hi": "एक साधारण शॉपिंग ब्लॉग और आपके प्राथमिक ईमेल पर एक ही पासवर्ड का पुनः उपयोग करने से आपके बैंक खातों को खतरा क्यों होता है?",
        "options_en": ["Blogs charge bank fees", "Credential Stuffing: attackers leak passwords from weak sites and automate logins into your primary email to reset financial passwords", "Emails expire after 30 days", "Browsers delete saved cards"],
        "options_kn": ["ಬ್ಲಾಗ್‌ಗಳು ಬ್ಯಾಂಕ್ ಶುಲ್ಕ ವಿಧಿಸುತ್ತವೆ", "ಕ್ರೆಡೆನ್ಶಿಯಲ್ ಸ್ಟಫಿಂಗ್: ದುರ್ಬಲ ಸೈಟ್‌ಗಳಿಂದ ಕದ್ದ ಪಾಸ್‌ವರ್ಡ್ ಬಳಸಿ ನಿಮ್ಮ ಇಮೇಲ್ ಪ್ರವೇಶಿಸಿ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾಯಿಸಬಹುದು", "ಇಮೇಲ್‌ಗಳು 30 ದಿನಗಳಲ್ಲಿ ಮುಕ್ತಾಯಗೊಳ್ಳುತ್ತವೆ", "ಬ್ರೌಸರ್‌ಗಳು ಕಾರ್ಡ್ ಅಳಿಸುತ್ತವೆ"],
        "options_hi": ["ब्लॉग बैंक शुल्क लेते हैं", "क्रेडेंशियल स्टफिंग: हमलावर कमजोर साइटों से लीक पासवर्ड का उपयोग करके आपके ईमेल में लॉगिन करते हैं और वित्तीय पासवर्ड रीसेट करते हैं", "ईमेल 30 दिनों के बाद समाप्त हो जाते हैं", "ब्राउज़र सहेजे गए कार्ड हटा देते हैं"],
        "correct_index": 1,
        "explanation_en": "Your primary email is the master key to password resets across financial accounts. Always give it a unique password and 2FA.",
        "explanation_kn": "ನಿಮ್ಮ ಪ್ರಾಥಮಿಕ ಇಮೇಲ್ ಎಲ್ಲಾ ಖಾತೆಗಳ ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸುವ ಕೀಲಿಕೈಯಾಗಿದೆ.",
        "explanation_hi": "आपका प्राथमिक ईमेल वित्तीय खातों के पासवर्ड रीसेट की मास्टर कुंजी है। इसे हमेशा एक अद्वितीय पासवर्ड और 2FA दें।"
    },
    {
        "difficulty": "advanced",
        "category": "Juice Jacking",
        "question_en": "What is 'Juice Jacking' at public airport or railway charging stations?",
        "question_kn": "ವಿಮಾನ ನಿಲ್ದಾಣ ಅಥವಾ ರೈಲು ನಿಲ್ದಾಣದ ಸಾರ್ವಜನಿಕ ಚಾರ್ಜಿಂಗ್ ಕೇಂದ್ರಗಳಲ್ಲಿ 'ಜ್ಯೂಸ್ ಜಾಕಿಂಗ್' (Juice Jacking) ಎಂದರೇನು?",
        "question_hi": "सार्वजनिक हवाई अड्डे या रेलवे चार्जिंग स्टेशनों पर 'जूस जैकिंग' क्या है?",
        "options_en": ["Overcharging phone batteries", "Compromised USB charging ports that transfer malware or extract data over the USB data pins", "Free fast-charging technology", "Wi-Fi router reset"],
        "options_kn": ["ಬ್ಯಾಟರಿ ಓವರ್‌ಚಾರ್ಜ್ ಆಗುವುದು", "USB ಡೇಟಾ ಪಿನ್‌ಗಳ ಮೂಲಕ ಮಾಲ್‌ವೇರ್ ಸ್ಥಾಪಿಸುವ ಅಥವಾ ಡೇಟಾ ಕದಿಯುವ ಹಾನಿಗೊಳಗಾದ ಚಾರ್ಜಿಂಗ್ ಪೋರ್ಟ್‌ಗಳು", "ಉಚಿತ ವೇಗದ ಚಾರ್ಜಿಂಗ್", "Wi-Fi ರೂಟರ್ ರೀಸೆಟ್"],
        "options_hi": ["फोन बैटरी को ओवरचार्ज करना", "छेड़छाड़ किए गए USB चार्जिंग पोर्ट जो डेटा पिन के माध्यम से मैलवेयर इंस्टॉल करते हैं या डेटा चुराते हैं", "मुफ्त फास्ट-चार्जिंग तकनीक", "Wi-Fi राउटर रीसेट"],
        "correct_index": 1,
        "explanation_en": "Standard USB cables carry both power and data. Use your own AC wall adapter or a USB 'data blocker' in public places.",
        "explanation_kn": "USB ಕೇಬಲ್‌ಗಳು ವಿದ್ಯುತ್ ಮತ್ತು ಡೇಟಾ ಎರಡನ್ನೂ ಸಾಗಿಸುತ್ತವೆ. ಸಾರ್ವಜನಿಕ ಸ್ಥಳಗಳಲ್ಲಿ ನಿಮ್ಮ ಸ್ವಂತ ಚಾರ್ಜರ್ ಅಡಾಪ್ಟರ್ ಬಳಸಿ.",
        "explanation_hi": "मानक USB केबल पावर और डेटा दोनों ले जाते हैं। सार्वजनिक स्थानों पर अपने खुद के AC वॉल एडॉप्टर का उपयोग करें।"
    },
    {
        "difficulty": "advanced",
        "category": "Session Hijacking",
        "question_en": "What is the biggest danger of downloading 'cracked' or pirated paid software from torrent/unofficial sites?",
        "question_kn": "ಅನಧಿಕೃತ ಸೈಟ್‌ಗಳಿಂದ 'ಕ್ರ್ಯಾಕ್ಡ್' (Cracked) ಸಾಫ್ಟ್‌ವೇರ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡುವುದರಿಂದ ಆಗುವ ದೊಡ್ಡ ಅಪಾಯವೇನು?",
        "question_hi": "अनधिकृत साइटों से 'क्रैक्ड' या पाइरेटेड सॉफ्टवेयर डाउनलोड करने का सबसे बड़ा खतरा क्या है?",
        "options_en": ["Lower screen resolution", "Info-stealer malware that silently extracts browser session cookies, saved passwords, and crypto wallets", "Slower keyboard typing", "Automatic OS updates"],
        "options_kn": ["ಕಡಿಮೆ ಪರದೆಯ ರೆಸಲ್ಯೂಶನ್", "ಬ್ರೌಸರ್ ಕುಕೀಗಳು ಮತ್ತು ಉಳಿಸಿದ ಪಾಸ್‌ವರ್ಡ್‌ಗಳನ್ನು ಕದಿಯುವ ಇನ್ಫೋ-ಸ್ಟೀಲರ್ ಮಾಲ್‌ವೇರ್", "ನಿಧಾನಗತಿಯ ಟೈಪಿಂಗ್", "ಸ್ವಯಂಚಾಲಿತ OS ನವೀಕರಣ"],
        "options_hi": ["कम स्क्रीन रिज़ॉल्यूशन", "इन्फो-स्टीलर मैलवेयर जो चुपचाप ब्राउज़र सेशन कुकीज़ और सहेजे गए पासवर्ड चुरा लेता है", "धीमी कीबोर्ड टाइपिंग", "स्वचालित OS अपडेट"],
        "correct_index": 1,
        "explanation_en": "Session cookie theft allows attackers to bypass even 2FA by impersonating your active logged-in browser session.",
        "explanation_kn": "ಸೆಷನ್ ಕುಕೀ ಕಳ್ಳತನದಿಂದ ದಾಳಿಕೋರರು 2FA ಅನ್ನು ಸಹ ಬೈಪಾಸ್ ಮಾಡಬಹುದು.",
        "explanation_hi": "सेशन कुकी चोरी से हमलावर आपके सक्रिय लॉग-इन ब्राउज़र सेशन की नकल करके 2FA को भी बायपास कर सकते हैं।"
    },
    {
        "difficulty": "advanced",
        "category": "Call Forwarding Scam",
        "question_en": "A delivery agent claims they cannot find your address and asks you to dial '*401*<their_number>#' on your phone. What does that code actually do?",
        "question_kn": "ಡೆಲಿವರಿ ಏಜೆಂಟ್ ನಿಮ್ಮ ವಿಳಾಸ ಸಿಗುತ್ತಿಲ್ಲ ಎಂದು ಹೇಳಿ '*401*<ಅವರ_ಸಂಖ್ಯೆ>#' ಡಯಲ್ ಮಾಡಲು ಹೇಳುತ್ತಾರೆ. ಆ ಕೋಡ್ ವಾಸ್ತವವಾಗಿ ಏನು ಮಾಡುತ್ತದೆ?",
        "question_hi": "एक डिलीवरी एजेंट दावा करता है कि उसे आपका पता नहीं मिल रहा है और आपसे अपने फोन पर '*401*<उनका_नंबर>#' डायल करने को कहता है। वह कोड वास्तव में क्या करता है?",
        "options_en": ["Shares your GPS location", "Activates unconditional Call Forwarding, routing your incoming calls and voice OTPs to the scammer", "Connects to customer care", "Checks SIM balance"],
        "options_kn": ["ನಿಮ್ಮ GPS ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತದೆ", "ಕಾಲ್ ಫಾರ್ವರ್ಡಿಂಗ್ ಸಕ್ರಿಯಗೊಳಿಸಿ, ನಿಮ್ಮ ಒಳಬರುವ ಕರೆಗಳು ಮತ್ತು ಧ್ವನಿ OTP ಗಳನ್ನು ವಂಚಕರಿಗೆ ಕಳುಹಿಸುತ್ತದೆ", "ಗ್ರಾಹಕ ಸೇವೆಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ", "SIM ಬ್ಯಾಲೆನ್ಸ್ ಪರಿಶೀಲಿಸುತ್ತದೆ"],
        "options_hi": ["आपकी GPS लोकेशन साझा करता है", "कॉल फॉरवर्डिंग सक्रिय करता है, जिससे आपकी आने वाली कॉल और वॉयस OTP ठग के पास चले जाते हैं", "कस्टमर केयर से जोड़ता है", "SIM बैलेंस जांचता है"],
        "correct_index": 1,
        "explanation_en": "USSD codes like *401* or *21* forward your calls to the scammer's phone, letting them receive automated bank verification calls.",
        "explanation_kn": "*401* ಅಥವಾ *21* ನಂತಹ USSD ಕೋಡ್‌ಗಳು ನಿಮ್ಮ ಕರೆಗಳನ್ನು ವಂಚಕರ ಫೋನ್‌ಗೆ ಫಾರ್ವರ್ಡ್ ಮಾಡುತ್ತವೆ.",
        "explanation_hi": "*401* या *21* जैसे USSD कोड आपकी कॉल को ठग के फोन पर फॉरवर्ड कर देते हैं, जिससे उन्हें बैंक सत्यापन कॉल मिल जाती हैं।"
    },
    {
        "difficulty": "advanced",
        "category": "Golden Hour Response",
        "question_en": "Why is reporting financial fraud on 1930 within the first 1–2 hours ('Golden Hour') critical?",
        "question_kn": "ಆರ್ಥಿಕ ವಂಚನೆಯಾದ ಮೊದಲ 1–2 ಗಂಟೆಗಳ ('ಗೋಲ್ಡನ್ ಅವರ್') ಒಳಗೆ 1930 ಗೆ ವರದಿ ಮಾಡುವುದು ಏಕೆ ನಿರ್ಣಾಯಕವಾಗಿದೆ?",
        "question_hi": "वित्तीय धोखाधड़ी की रिपोर्ट पहले 1-2 घंटों ('गोल्डन आवर') के भीतर 1930 पर करना क्यों महत्वपूर्ण है?",
        "options_en": ["Banks close permanently after 2 hours", "The Citizen Financial Cyber Fraud Reporting System can place an immediate lien/freeze on the recipient mule account before funds are withdrawn", "It increases your credit score", "It deletes the scammer's SIM card automatically"],
        "options_kn": ["2 ಗಂಟೆಗಳ ನಂತರ ಬ್ಯಾಂಕುಗಳು ಮುಚ್ಚುತ್ತವೆ", "ವಂಚಕರು ಹಣವನ್ನು ಹಿಂಪಡೆಯುವ ಮೊದಲೇ ಸ್ವೀಕರಿಸುವ ಖಾತೆಯನ್ನು ತಕ್ಷಣ ಫ್ರೀಜ್ (Freeze) ಮಾಡಲು ಸಾಧ್ಯವಾಗುತ್ತದೆ", "ಇದು ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ಹೆಚ್ಚಿಸುತ್ತದೆ", "ವಂಚಕರ SIM ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಅಳಿಸುತ್ತದೆ"],
        "options_hi": ["2 घंटे के बाद बैंक बंद हो जाते हैं", "नागरिक वित्तीय साइबर धोखाधड़ी रिपोर्टिंग प्रणाली धन निकाले जाने से पहले प्राप्तकर्ता खाते को तुरंत फ्रीज कर सकती है", "यह आपका क्रेडिट स्कोर बढ़ाता है", "यह ठग का SIM कार्ड स्वचालित रूप से हटा देता है"],
        "correct_index": 1,
        "explanation_en": "The I4C 1930 platform links banks and payment gateways in real time to lock stolen funds across beneficiary layers before cash-out.",
        "explanation_kn": "1930 ವೇದಿಕೆಯು ಬ್ಯಾಂಕುಗಳನ್ನು ನೈಜ ಸಮಯದಲ್ಲಿ ಸಂಪರ್ಕಿಸಿ ಕಳವಾದ ಹಣವನ್ನು ತಕ್ಷಣ ತಡೆಹಿಡಿಯಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
        "explanation_hi": "1930 प्लेटफॉर्म बैंकों को रीयल-टाइम में जोड़ता है ताकि नकदी निकाले जाने से पहले चोरी हुए धन को फ्रीज किया जा सके।"
    },
    {
        "difficulty": "advanced",
        "category": "App Permissions",
        "question_en": "A simple flashlight or calculator app requests 'Accessibility Service' and 'Read SMS' permissions on Android. What should you do?",
        "question_kn": "ಒಂದು ಸಾಮಾನ್ಯ ಟಾರ್ಚ್ ಅಥವಾ ಕ್ಯಾಲ್ಕುಲೇಟರ್ ಆ್ಯಪ್ Android ನಲ್ಲಿ 'Accessibility Service' ಮತ್ತು 'Read SMS' ಅನುಮತಿ ಕೇಳಿದರೆ ಏನು ಮಾಡಬೇಕು?",
        "question_hi": "एक साधारण टॉर्च या कैलकुलेटर ऐप Android पर 'Accessibility Service' और 'Read SMS' अनुमति मांगता है। आपको क्या करना चाहिए?",
        "options_en": ["Allow all permissions quickly", "Deny immediately and uninstall the app—Accessibility Service lets malware read your screen and click buttons automatically", "Restart your phone", "Only grant SMS permission"],
        "options_kn": ["ಎಲ್ಲಾ ಅನುಮತಿಗಳನ್ನು ತಕ್ಷಣ ನೀಡಿ", "ತಕ್ಷಣ ನಿರಾಕರಿಸಿ ಮತ್ತು ಆ್ಯಪ್ ಅನ್‌ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ—Accessibility Service ಮಾಲ್‌ವೇರ್‌ಗೆ ಪರದೆ ಓದಲು ಅವಕಾಶ ನೀಡುತ್ತದೆ", "ಫೋನ್ ರೀಸ್ಟಾರ್ಟ್ ಮಾಡಿ", "SMS ಅನುಮತಿ ಮಾತ್ರ ನೀಡಿ"],
        "options_hi": ["सभी अनुमतियां तुरंत दें", "तुरंत अस्वीकार करें और ऐप अनइंस्टॉल करें—Accessibility Service मैलवेयर को स्क्रीन पढ़ने और बटन दबाने की अनुमति देती है", "अपना फोन रीस्टार्ट करें", "केवल SMS अनुमति दें"],
        "correct_index": 1,
        "explanation_en": "Banking trojans abuse Android Accessibility Services to perform Automated Transfer System (ATS) fraud without user touch.",
        "explanation_kn": "ಬ್ಯಾಂಕಿಂಗ್ ಟ್ರೋಜನ್‌ಗಳು ಸ್ವಯಂಚಾಲಿತ ವಂಚನೆ ನಡೆಸಲು Accessibility Service ಅನ್ನು ದುರುಪಯೋಗಪಡಿಸಿಕೊಳ್ಳುತ್ತವೆ.",
        "explanation_hi": "बैंकिंग ट्रोजन उपयोगकर्ता के बिना टच किए स्वचालित धोखाधड़ी करने के लिए Android Accessibility Services का दुरुपयोग करते हैं।"
    },
    {
        "difficulty": "advanced",
        "category": "Email Spoofing",
        "question_en": "An email displays the sender name 'RBI Official Support' but the actual email address is 'rbi-refund-desk@gmail.com'. How should you treat it?",
        "question_kn": "ಒಂದು ಇಮೇಲ್ 'RBI Official Support' ಎಂಬ ಹೆಸರನ್ನು ತೋರಿಸುತ್ತದೆ, ಆದರೆ ನಿಜವಾದ ಇಮೇಲ್ ವಿಳಾಸ 'rbi-refund-desk@gmail.com' ಆಗಿದೆ. ಇದನ್ನು ಹೇಗೆ ಪರಿಗಣಿಸಬೇಕು?",
        "question_hi": "एक ईमेल में प्रेषक का नाम 'RBI Official Support' दिखता है लेकिन वास्तविक ईमेल पता 'rbi-refund-desk@gmail.com' है। आपको इसे कैसे मानना चाहिए?",
        "options_en": ["Trust it because the display name says RBI", "Treat it as phishing—RBI and banks never send official notices from free '@gmail.com' addresses", "Reply with your bank account number", "Click the attachment to check"],
        "options_kn": ["ಹೆಸರು RBI ಎಂದು ಇರುವುದರಿಂದ ನಂಬಿ", "ಇದನ್ನು ಫಿಶಿಂಗ್ ಎಂದು ಪರಿಗಣಿಸಿ—RBI ಎಂದಿಗೂ ಉಚಿತ '@gmail.com' ವಿಳಾಸದಿಂದ ಅಧಿಕೃತ ಸಂದೇಶ ಕಳುಹಿಸುವುದಿಲ್ಲ", "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆ ಸಂಖ್ಯೆಯೊಂದಿಗೆ ಉತ್ತರಿಸಿ", "ಪರಿಶೀಲಿಸಲು ಲಗತ್ತನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ"],
        "options_hi": ["इस पर भरोसा करें क्योंकि डिस्प्ले नाम RBI है", "इसे फ़िशिंग मानें—RBI और बैंक कभी भी मुफ्त '@gmail.com' पते से आधिकारिक नोटिस नहीं भेजते", "अपने बैंक खाता संख्या के साथ उत्तर दें", "जांचने के लिए अटैचमेंट पर क्लिक करें"],
        "correct_index": 1,
        "explanation_en": "Display names can be set to anything. Always inspect the full domain after '@' in the sender's email address.",
        "explanation_kn": "ಪ್ರದರ್ಶನ ಹೆಸರನ್ನು ಯಾರು ಬೇಕಾದರೂ ಬದಲಾಯಿಸಬಹುದು. ಯಾವಾಗಲೂ '@' ನಂತರದ ಡೊಮೇನ್ ಪರಿಶೀಲಿಸಿ.",
        "explanation_hi": "डिस्प्ले नाम कुछ भी रखा जा सकता है। हमेशा प्रेषक के ईमेल पते में '@' के बाद के पूर्ण डोमेन की जांच करें।"
    }
]

SCAM_SCENARIOS = [
    {
        "category": "Bank KYC SMS",
        "channel": "SMS",
        "sender": "+91-90000-00101",
        "message_text": "Dear Customer, Your National Bank YONO account will be SUSPENDED today! Update your PAN & KYC immediately at http://nb-kyc-verify-now.xyz to avoid account block.",
        "is_scam": 1,
        "highlighted_phrases": ["SUSPENDED today", "Update your PAN & KYC immediately", "http://nb-kyc-verify-now.xyz"],
        "red_flags": [
            "Sent from a 10-digit personal mobile number instead of an official bank header (like VM-NBLBNK).",
            "Creates artificial panic ('SUSPENDED today').",
            "Uses an unencrypted HTTP link on a suspicious '.xyz' domain."
        ],
        "explanation": "This is a classic KYC Smishing (SMS Phishing) attack designed to harvest your net-banking credentials and OTP.",
        "prevention": "Never click KYC links in SMS. Use only your bank's official mobile app or visit your home branch."
    },
    {
        "category": "Official Bank Transaction Alert",
        "channel": "SMS",
        "sender": "AD-HDFCBK",
        "message_text": "INR 1,250.00 debited from A/c **4821 on 12-Nov-26 via UPI Ref No 631894021145. If not done by you, call 1800-202-6161 or report on official app immediately.",
        "is_scam": 0,
        "highlighted_phrases": ["AD-HDFCBK", "UPI Ref No 631894021145", "1800-202-6161"],
        "red_flags": [
            "Contains no clickable third-party links asking for PIN or KYC.",
            "Sent from a registered DLT alphanumeric sender ID (AD-HDFCBK).",
            "Provides a 12-digit UPI Reference Number and directs you to the official toll-free helpline."
        ],
        "explanation": "This follows the standard format of a legitimate informational debit alert from a bank.",
        "prevention": "Even with genuine alerts, always verify the toll-free number against the back of your debit card before calling."
    },
    {
        "category": "Fake UPI Cashback",
        "channel": "UPI App Notification",
        "sender": "rewards-claim@okaxis-fake",
        "message_text": "Congratulations! You have won ₹4,999 Diwali Cashback! Tap 'PAY' and enter your UPI PIN to claim ₹4,999 directly into your bank account.",
        "is_scam": 1,
        "highlighted_phrases": ["won ₹4,999 Diwali Cashback", "Tap 'PAY' and enter your UPI PIN to claim"],
        "red_flags": [
            "Asks you to tap 'PAY' and enter your UPI PIN to receive money.",
            "Entering a UPI PIN always deducts money—it never credits cashback."
        ],
        "explanation": "Scammers send a UPI Collect Request disguised with a 'Cashback' note so distracted users enter their PIN.",
        "prevention": "Decline any unexpected UPI collect request immediately. You never need a PIN to receive rewards."
    },
    {
        "category": "Digital Arrest Threat",
        "channel": "WhatsApp Video Call",
        "sender": "Mumbai Crime Branch (VOIP +92-000-112233)",
        "message_text": "We have intercepted a FedEx parcel in your name containing illegal passports and contraband. Stay on this Skype/WhatsApp video call under DIGITAL ARREST and transfer ₹1,50,000 for RBI verification or police will arrest you in 30 minutes.",
        "is_scam": 1,
        "highlighted_phrases": ["intercepted a FedEx parcel", "DIGITAL ARREST", "transfer ₹1,50,000 for RBI verification"],
        "red_flags": [
            "Foreign country code (+92) claiming to be Indian Police/CBI.",
            "Claims you are under 'Digital Arrest'—a concept that does not exist in Indian law.",
            "Demands money transfer to 'clear' a criminal investigation."
        ],
        "explanation": "Fraudsters use studio backdrops resembling police stations and fake uniforms to terrorize victims into transferring life savings.",
        "prevention": "Disconnect the call immediately, block the number, and report the incident on 1930 or cybercrime.gov.in."
    },
    {
        "category": "Fake Part-Time Job",
        "channel": "Telegram / WhatsApp",
        "sender": "HR_Priya_GlobalMedia",
        "message_text": "Hello! Work from home 1 hour daily rating hotel reviews and earn ₹3,500–₹7,000 per day! First 3 tasks paid ₹150. To unlock Task 4 prepaid merchant order, deposit ₹5,000 and get ₹6,800 back in 10 minutes!",
        "is_scam": 1,
        "highlighted_phrases": ["earn ₹3,500–₹7,000 per day", "prepaid merchant order, deposit ₹5,000"],
        "red_flags": [
            "Unrealistic daily pay for simple clicking/rating tasks.",
            "Hooks victims with a tiny initial payout (₹150) before demanding large 'prepaid task deposits'."
        ],
        "explanation": "This is a multi-stage Task Fraud. Once you deposit ₹5,000, scammers invent 'tax' or 'credit score' errors to extract lakhs more.",
        "prevention": "Never pay money to earn a salary or unlock work tasks."
    },
    {
        "category": "QR Code Marketplace Scam",
        "channel": "OLX / Marketplace Chat",
        "sender": "Army_Officer_Buyer_09",
        "message_text": "I am posted at the border and want to buy your dining table for ₹12,000 right now without bargaining. Scan this QR code I sent and enter your UPI PIN to receive ₹12,000 advance.",
        "is_scam": 1,
        "highlighted_phrases": ["without bargaining", "Scan this QR code I sent and enter your UPI PIN to receive"],
        "red_flags": [
            "Impersonates armed forces personnel to build instant trust.",
            "Agrees to full price immediately without inspecting the item.",
            "Sends a QR code claiming scanning it will credit money to the seller."
        ],
        "explanation": "Scanning a payment QR code and entering your UPI PIN debits ₹12,000 from your bank account.",
        "prevention": "To receive money, share your UPI ID or let the buyer scan YOUR QR code—never scan theirs."
    },
    {
        "category": "Fake Courier Delivery SMS",
        "channel": "SMS",
        "sender": "+91-90000-00404",
        "message_text": "IndiaPost: Your package #IN884920 could not be delivered due to incomplete address. Update address within 12 hours at https://indiapost-track-pkg.top/update or parcel will return.",
        "is_scam": 1,
        "highlighted_phrases": ["incomplete address", "https://indiapost-track-pkg.top/update"],
        "red_flags": [
            "Uses '.top' domain instead of the official 'indiapost.gov.in'.",
            "Sent from a random mobile number.",
            "Leads to a fake form asking for a ₹25 'redelivery fee' to steal your credit/debit card details and CVV."
        ],
        "explanation": "Smishing campaigns exploit expected deliveries to steal card numbers and OTPs.",
        "prevention": "Track parcels only on the official 'indiapost.gov.in' portal."
    },
    {
        "category": "Electricity Disconnection Threat",
        "channel": "WhatsApp",
        "sender": "+91-90000-00505",
        "message_text": "URGENT NOTICE: Your electricity connection will be disconnected tonight at 9:30 PM because your previous month bill update failed. Immediately contact our Electricity Officer at 90000-00505.",
        "is_scam": 1,
        "highlighted_phrases": ["disconnected tonight at 9:30 PM", "contact our Electricity Officer at 90000-00505"],
        "red_flags": [
            "Threatens abrupt night-time disconnection.",
            "Asks you to call a personal 10-digit mobile number.",
            "When called, the scammer instructs you to install a remote screen-sharing app."
        ],
        "explanation": "Utilities never issue night-time disconnection ultimatums via personal WhatsApp numbers.",
        "prevention": "Check your actual bill status on your state electricity board's official app or Bharat BillPay."
    },
    {
        "category": "Legitimate 2FA Login Code",
        "channel": "SMS",
        "sender": "AX-GOOGLE",
        "message_text": "G-749201 is your Google verification code. Do not share this code with anyone.",
        "is_scam": 0,
        "highlighted_phrases": ["AX-GOOGLE", "Do not share this code with anyone"],
        "red_flags": [
            "Contains no links or phone numbers to call.",
            "Explicitly warns you never to share the code.",
            "Arrives right when you personally initiate a login."
        ],
        "explanation": "This is a genuine two-factor authentication SMS. However, if you did NOT try to log in, someone has your password—change it immediately.",
        "prevention": "Never read out or forward this code to any caller."
    },
    {
        "category": "Fake Customer Care Search Result",
        "channel": "Phone Call",
        "sender": "1800-FAKE-HELP",
        "message_text": "You searched Google for a food delivery refund number and called the top result. The agent says: 'Sir, to process your ₹350 refund, download QuickSupport App and type the 9-digit code shown on your screen.'",
        "is_scam": 1,
        "highlighted_phrases": ["searched Google for a food delivery refund number", "download QuickSupport App and type the 9-digit code"],
        "red_flags": [
            "Number was found via open web search instead of inside the official app.",
            "Agent asks you to install a remote-access tool ('QuickSupport') to issue a simple refund."
        ],
        "explanation": "Scammers poison search results with fake toll-free numbers and use remote access tools to drain bank accounts.",
        "prevention": "Always raise refund tickets strictly inside the official app's 'Help / Support' section."
    },
    {
        "category": "Fake Lottery / KBC Prize",
        "channel": "WhatsApp Audio + Image",
        "sender": "+91-90000-00707",
        "message_text": "CONGRATULATIONS! Your mobile number has won ₹25,00,000 in the All-India Sim Card Lucky Draw! Contact Manager Rana Pratap on WhatsApp and pay ₹12,500 GST processing charge to release your cheque.",
        "is_scam": 1,
        "highlighted_phrases": ["won ₹25,00,000", "pay ₹12,500 GST processing charge"],
        "red_flags": [
            "You cannot win a lottery you never entered.",
            "Legitimate prizes never ask winners to pay upfront 'GST' or 'processing fees' into personal accounts."
        ],
        "explanation": "Advance-fee lottery scams keep demanding endless 'taxes' and 'RBI clearance fees' while no prize exists.",
        "prevention": "Block and report the sender immediately."
    },
    {
        "category": "Phishing Email (Account Suspension)",
        "channel": "Email",
        "sender": "security-alert@paytm-support-desk.com",
        "message_text": "Dear User, Unusual login detected from Russia. Your wallet will be permanently frozen in 2 hours unless you verify your password and card PIN here: https://paytm-support-desk.com/verify",
        "is_scam": 1,
        "highlighted_phrases": ["paytm-support-desk.com", "permanently frozen in 2 hours", "verify your password and card PIN"],
        "red_flags": [
            "Sender domain is 'paytm-support-desk.com', not the official 'paytm.com'.",
            "Asks for your card PIN—no legitimate company ever asks for your PIN."
        ],
        "explanation": "Lookalike domains combined with 2-hour panic deadlines are classic credential-harvesting phishing.",
        "prevention": "Open your app directly to check login activity instead of clicking email links."
    },
    {
        "category": "Social Media Friend Emergency",
        "channel": "Instagram DM",
        "sender": "rohan.sharma_official (Compromised Friend Account)",
        "message_text": "Bro I'm stuck at the hospital and my UPI limit is exceeded! Please send ₹6,500 to my friend's UPI ID medical.help99@okicici right now, I'll return it by evening. Don't call, network is weak.",
        "is_scam": 1,
        "highlighted_phrases": ["send ₹6,500 to my friend's UPI ID", "Don't call, network is weak"],
        "red_flags": [
            "Asks money to be sent to an unfamiliar third-party UPI ID.",
            "Specifically excuses away phone verification ('Don't call, network is weak')."
        ],
        "explanation": "Attackers compromise Instagram/Facebook accounts and message the victim's friends using emotional hospital emergencies.",
        "prevention": "Always call your friend on their actual mobile number before sending a single rupee."
    },
    {
        "category": "Income Tax Refund Phishing",
        "channel": "SMS",
        "sender": "+91-90000-00808",
        "message_text": "IT Dept: You are eligible for an Income Tax Refund of ₹18,450. Submit your bank account & net-banking credentials at http://incometax-refund-in.site to credit within 24 hrs.",
        "is_scam": 1,
        "highlighted_phrases": ["http://incometax-refund-in.site", "Submit your bank account & net-banking credentials"],
        "red_flags": [
            "Uses '.site' instead of the official '.gov.in' portal.",
            "Income Tax refunds are credited directly to pre-validated bank accounts—never via SMS links."
        ],
        "explanation": "Phishing sites mimicking government tax portals steal net-banking passwords and debit card details.",
        "prevention": "Check tax refund status only on 'incometax.gov.in'."
    },
    {
        "category": "Official Cyber Awareness Advisory",
        "channel": "SMS",
        "sender": "CP-I4CMHA",
        "message_text": "Cyber Dost Alert: Never share OTP, UPI PIN or screen-sharing access with unknown callers. Report cyber financial fraud immediately on helpline 1930 or www.cybercrime.gov.in - MHA",
        "is_scam": 0,
        "highlighted_phrases": ["CP-I4CMHA", "1930", "www.cybercrime.gov.in"],
        "red_flags": [
            "Public awareness message from the Ministry of Home Affairs (I4C).",
            "Does not ask for personal info, money, or clicks on unknown domains."
        ],
        "explanation": "This is a genuine government cyber-hygiene awareness SMS.",
        "prevention": "Save 1930 in your contacts for emergencies."
    }
]


def seed_database():
    """Insert initial quiz questions and scam scenarios if tables are empty."""
    conn = get_db_connection()
    cursor = conn.cursor()

    q_count = cursor.execute("SELECT COUNT(*) FROM quiz_questions").fetchone()[0]
    if q_count == 0:
        for q in QUIZ_QUESTIONS:
            cursor.execute(
                """
                INSERT INTO quiz_questions (
                    difficulty, category,
                    question_en, question_kn, question_hi,
                    options_en_json, options_kn_json, options_hi_json,
                    correct_index,
                    explanation_en, explanation_kn, explanation_hi
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    q["difficulty"],
                    q["category"],
                    q["question_en"],
                    q["question_kn"],
                    q["question_hi"],
                    json.dumps(q["options_en"], ensure_ascii=False),
                    json.dumps(q["options_kn"], ensure_ascii=False),
                    json.dumps(q["options_hi"], ensure_ascii=False),
                    q["correct_index"],
                    q["explanation_en"],
                    q["explanation_kn"],
                    q["explanation_hi"],
                ),
            )

    s_count = cursor.execute("SELECT COUNT(*) FROM scam_scenarios").fetchone()[0]
    if s_count == 0:
        for s in SCAM_SCENARIOS:
            cursor.execute(
                """
                INSERT INTO scam_scenarios (
                    category, channel, sender, message_text,
                    is_scam, highlighted_phrases_json, red_flags_json,
                    explanation, prevention
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    s["category"],
                    s["channel"],
                    s["sender"],
                    s["message_text"],
                    s["is_scam"],
                    json.dumps(s["highlighted_phrases"], ensure_ascii=False),
                    json.dumps(s["red_flags"], ensure_ascii=False),
                    s["explanation"],
                    s["prevention"],
                ),
            )

    conn.commit()
    conn.close()