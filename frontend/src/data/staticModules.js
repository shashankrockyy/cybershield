export const FRAUD_LIBRARY_ITEMS = [
  {
    id: 'upi-fraud',
    title: '1. UPI Fraud & Collect Request Traps',
    definition: 'Deceptive tactics where fraudsters trick users into authorizing Unified Payments Interface (UPI) debits while believing they are receiving money.',
    howItWorks: 'Scammers send a "Collect Request" or fake cashback link claiming you won a prize or refund. When you tap Pay and enter your UPI PIN, money leaves your account.',
    warningSigns: ['Asking for UPI PIN to receive money', 'Messages promising lottery or cashback rewards', 'Urgent pressure to approve a request quickly'],
    example: 'A buyer on a classifieds site sends a ₹5,000 collect request labeled "Refund/Advance Credit" and tells you to enter your PIN.',
    prevention: 'Remember the golden rule: UPI PIN is ONLY for sending money, never for receiving.',
    victimAction: 'Call 1930 immediately, note the 12-digit UTR number, and report the UPI ID inside your payment app and bank.'
  },
  {
    id: 'phishing',
    title: '2. Phishing & Smishing Attacks',
    definition: 'Fraudulent emails (Phishing) or SMS messages (Smishing) impersonating banks, courier services, or government agencies to steal login credentials.',
    howItWorks: 'Attackers send urgent warnings about account suspension or undelivered parcels containing lookalike website links that capture passwords, card numbers, and OTPs.',
    warningSigns: ['Misspelled URLs (e.g., sbi-kyc-update.xyz)', 'Sent from 10-digit personal phone numbers', 'Threatening 24-hour account block deadlines'],
    example: '"Dear User, your PAN is not linked. Update at http://bank-pan-kyc.top within 2 hours or account freezes."',
    prevention: 'Never click links in unexpected SMS/emails. Open official apps or type official domains directly.',
    victimAction: 'Change net-banking passwords immediately, block cards, and report the phishing URL at cybercrime.gov.in.'
  },
  {
    id: 'otp-scams',
    title: '3. OTP & Screen-Sharing Scams',
    definition: 'Social engineering tricks aimed at obtaining your One-Time Password (OTP) or viewing your screen remotely.',
    howItWorks: 'Fraudsters pose as bank officials or delivery agents asking for an OTP to "cancel a wrong debit" or ask you to install AnyDesk/TeamViewer to fix an issue.',
    warningSigns: ['Caller asks you to read out a 6-digit SMS code', 'Instructions to download remote-access apps', 'Dialing *401* call-forwarding USSD codes'],
    example: '"Sir, ₹9,999 is being debited from your card. Tell me the OTP you just received so I can cancel it."',
    prevention: 'Never share any OTP with anyone—including bank staff. Uninstall unknown remote-access apps.',
    victimAction: 'Disconnect internet/Wi-Fi on the phone, call 1930, and freeze your bank account immediately.'
  },
  {
    id: 'digital-arrest',
    title: '4. Digital Arrest Scams',
    definition: 'An extortion scam where criminals impersonate Police, CBI, ED, or Customs officers over video calls and falsely accuse victims of crimes.',
    howItWorks: 'Scammers claim a parcel with illegal goods was linked to your Aadhaar, keep you on continuous Skype/WhatsApp video surveillance, and demand "bail/verification transfers".',
    warningSigns: ['Police interrogation over WhatsApp/Skype video call', 'Fake police station backgrounds and forged arrest warrants', 'Demanding money transfer to "RBI safe accounts"'],
    example: 'A caller in a police uniform claims your Aadhaar was used in money laundering and orders you not to disconnect the video call.',
    prevention: 'Indian law has NO concept of "Digital Arrest". Police never arrest or collect fines over video calls.',
    victimAction: 'Hang up immediately, do not transfer money, block the caller, and dial 1930.'
  },
  {
    id: 'fake-jobs',
    title: '5. Fake Job & Prepaid Task Scams',
    definition: 'Fraudulent work-from-home offers promising high daily income for liking videos, rating hotels, or data entry.',
    howItWorks: 'Scammers pay a small amount (₹150) for initial tasks to gain trust, then demand "VIP merchant deposits" of ₹5,000 to ₹2,00,000 to unlock bigger payouts that never arrive.',
    warningSigns: ['High pay for zero-skill clicking tasks', 'Recruiters operating solely on Telegram/WhatsApp', 'Asking employees to deposit money to earn salary'],
    example: '"Like 3 YouTube videos and earn ₹500! Now deposit ₹10,000 in Task 4 to earn ₹14,500."',
    prevention: 'Legitimate companies pay salaries—they never ask job seekers for security or task deposits.',
    victimAction: 'Stop sending money immediately, save Telegram/WhatsApp chat logs and bank receipts, and report to 1930.'
  },
  {
    id: 'investment-fraud',
    title: '6. Fake Trading Apps & Investment Fraud',
    definition: 'Scams using fake stock market tips, WhatsApp mentorship groups, and rogue APK apps promising guaranteed 200–500% returns.',
    howItWorks: 'Victims are added to WhatsApp groups where actors post fake profit screenshots and persuade users to install a non-Play Store trading APK.',
    warningSigns: ['Guaranteed unrealistic daily stock profits', 'Asking you to download trading apps via APK links instead of Play Store/App Store', 'Demanding "withdrawal tax" to release profits'],
    example: 'An app shows your ₹50,000 grew to ₹4,20,000, but asks for ₹80,000 "SEBI clearance tax" when you try to withdraw.',
    prevention: 'Invest only through SEBI-registered brokers downloaded from official app stores.',
    victimAction: 'Do not pay any withdrawal tax; uninstall the fake APK and report bank transfers on 1930.'
  },
  {
    id: 'shopping-fraud',
    title: '7. Online Shopping & Fake Storefront Fraud',
    definition: 'Fraudulent e-commerce websites and social media pages advertising branded electronics or clothes at 80–90% discounts.',
    howItWorks: 'Fake sites collect prepaid UPI/card payments and either send nothing, deliver a box of stones/rags, or refuse refunds.',
    warningSigns: ['Unbelievably low prices on flagship phones/luxury goods', 'No Cash-on-Delivery option', 'Newly registered domain with no physical address or customer reviews'],
    example: 'An Instagram ad selling a ₹60,000 smartphone for ₹6,999 via prepaid UPI only.',
    prevention: 'Shop on established platforms and verify seller reviews before paying.',
    victimAction: 'Report the fraudulent merchant UPI ID to your bank and file a complaint on cybercrime.gov.in.'
  },
  {
    id: 'social-impersonation',
    title: '8. Social Media Account Hacking & Impersonation',
    definition: 'Criminals hijack or clone a friend’s Instagram, Facebook, or WhatsApp account to beg contacts for urgent medical/travel money.',
    howItWorks: 'After taking over an account via phishing, the attacker messages all friends claiming a hospital emergency and provides a third-party UPI ID.',
    warningSigns: ['Friend asks for money to a stranger’s UPI ID', 'Refuses phone calls claiming "mic broken" or "hospital ICU"', 'Unusual urgency'],
    example: '"Bro my mom is in ICU, please send ₹10,000 to doctor.rahul@okaxis immediately, I’ll return tomorrow."',
    prevention: 'Always call your friend directly on their saved phone number before transferring money.',
    victimAction: 'Alert your friend so they can recover their account, and report the fraud to 1930 if money was sent.'
  },
  {
    id: 'identity-theft',
    title: '9. Identity Theft & Document Misuse',
    definition: 'Unauthorized use of your Aadhaar, PAN, passport, or photos to open mule bank accounts, issue SIM cards, or take instant loans.',
    howItWorks: 'Scammers harvest KYC documents from fake job forms, unsecured public Wi-Fi, or unmasked photocopies.',
    warningSigns: ['Unknown loan inquiries on your CIBIL credit report', 'Receiving OTPs for services you never registered for', 'Unknown mobile numbers linked to your Aadhaar'],
    example: 'Fraudsters use a leaked PAN and selfie to open a digital loan account in your name.',
    prevention: 'Use Masked Aadhaar (hiding first 8 digits), lock Aadhaar biometrics via mAadhaar, and check TAFCOP for active SIMs.',
    victimAction: 'Report unauthorized SIMs on Sanchar Saathi (TAFCOP), dispute CIBIL entries, and file a cybercrime complaint.'
  },
  {
    id: 'fake-care',
    title: '10. Fake Customer Care Helpline Scams',
    definition: 'Scammers publish fake toll-free customer support numbers on Google Search and Google Maps for banks, airlines, and delivery apps.',
    howItWorks: 'When a customer calls seeking a refund, the fake agent sends a phishing link or asks them to install a remote-access app.',
    warningSigns: ['Number copied from a random blog or search ad instead of the official app', 'Agent asks for card CVV, UPI PIN, or screen sharing'],
    example: 'Searching "courier customer care number" and calling a sponsored ad that asks for a ₹5 UPI verification payment.',
    prevention: 'Use ONLY customer care numbers listed inside the official app or printed on your physical bank card.',
    victimAction: 'Hang up immediately, uninstall any suggested app, and report the phone number on Chakshu / 1930.'
  },
  {
    id: 'qr-scams',
    title: '11. QR-Code Payment Scams',
    definition: 'Tricking users into scanning a payment QR code under the false claim that scanning it will deposit money into their account.',
    howItWorks: 'A QR code encodes a payment destination. Scanning it and entering your PIN always debits money from your wallet.',
    warningSigns: ['Buyer sends you a QR code to "pay" you', 'QR code pasted over a genuine merchant’s standee'],
    example: 'An online buyer sends a WhatsApp QR code saying "Scan this to get your ₹3,000 advance."',
    prevention: 'Never scan a QR code or enter your PIN to receive money.',
    victimAction: 'Contact your bank and 1930 immediately with the recipient UPI details.'
  },
  {
    id: 'fake-screenshots',
    title: '12. Fake Payment Screenshot Scams',
    definition: 'Using edited images or spoofed "Prank/Fake UPI" apps to show shopkeepers or sellers a false payment confirmation screen.',
    howItWorks: 'Fraudsters generate a realistic screen with green ticks and audio chimes without actually transferring funds.',
    warningSigns: ['Sender rushes you to hand over goods before your bank SMS arrives', 'Mismatched fonts, missing 12-digit UTR number, or wrong timestamp'],
    example: 'A customer shows a green "₹4,500 Paid" screen on their phone and leaves quickly before the shopkeeper checks their own app.',
    prevention: 'Never rely on the buyer’s phone screen. Always check your own bank/UPI app transaction history or soundbox.',
    victimAction: 'Preserve CCTV footage, phone numbers, and fake screenshot copies, and report to local police / cybercrime.gov.in.'
  }
];

export const SIMULATOR_SCENARIOS = [
  {
    id: 'sim-1',
    title: 'Scenario 1: The Urgent Bank KYC Call',
    situation:
      'Your phone rings. The caller says: "Hello, I am calling from your bank’s head office. Your debit card will be blocked in 15 minutes unless you share the 6-digit verification OTP sent to your SMS."',
    options: [
      {
        text: 'Read out the 6-digit OTP quickly so my card does not get blocked.',
        isSafe: false,
        feedback: 'DANGEROUS! That OTP authorizes a real money transfer from your account. Banks NEVER ask for OTPs over phone calls.'
      },
      {
        text: 'Hang up immediately without sharing any code, and check my official banking app.',
        isSafe: true,
        feedback: 'EXCELLENT! Disconnecting immediately stops social engineering cold. Your card will not be blocked for refusing to share an OTP.'
      },
      {
        text: 'Ask the caller for their employee ID and then share the OTP.',
        isSafe: false,
        feedback: 'UNSAFE! Scammers easily invent fake employee IDs. Never share an OTP with anyone under any circumstance.'
      }
    ]
  },
  {
    id: 'sim-2',
    title: 'Scenario 2: The "Digital Arrest" Video Call',
    situation:
      'You receive a WhatsApp video call from an unknown number. A man in a police uniform sits in front of a CBI banner and says: "A parcel with drugs was caught with your Aadhaar. Stay on camera under Digital Arrest and transfer ₹75,000 for verification."',
    options: [
      {
        text: 'Stay on the video call and transfer ₹75,000 to prove my innocence.',
        isSafe: false,
        feedback: 'DANGEROUS! You would lose ₹75,000 to an extortion gang. There is NO such thing as "Digital Arrest" in Indian law.'
      },
      {
        text: 'Disconnect the call immediately, block the number, and report it on 1930 / cybercrime.gov.in.',
        isSafe: true,
        feedback: 'CORRECT! Law enforcement never conducts arrests or demands money over video calls.'
      },
      {
        text: 'Send them a photo of my Aadhaar and PAN card on WhatsApp to clear my name.',
        isSafe: false,
        feedback: 'UNSAFE! Sharing your Aadhaar/PAN gives scammers documents to commit identity theft in your name.'
      }
    ]
  },
  {
    id: 'sim-3',
    title: 'Scenario 3: Selling Furniture Online (QR Code Trap)',
    situation:
      'You list an old study table for ₹3,500 online. A buyer messages: "I will buy it right now! I am sending you a QR code—scan it and enter your UPI PIN to receive ₹3,500."',
    options: [
      {
        text: 'Scan the buyer’s QR code and enter my UPI PIN to get ₹3,500.',
        isSafe: false,
        feedback: 'DANGEROUS! Scanning a QR code and entering your PIN will DEDUCT ₹3,500 from your bank account.'
      },
      {
        text: 'Refuse to scan their QR code; tell them to scan MY QR code or pay via standard UPI ID without me entering a PIN.',
        isSafe: true,
        feedback: 'SPOT ON! You never scan a QR code or enter a UPI PIN to receive money.'
      }
    ]
  },
  {
    id: 'sim-4',
    title: 'Scenario 4: Work-From-Home Registration Fee',
    situation:
      'A Telegram recruiter offers you ₹25,000/month for part-time typing work, but asks you to pay ₹1,999 first for "laptop security & ID card registration".',
    options: [
      {
        text: 'Pay ₹1,999 via UPI so I don’t miss this job opportunity.',
        isSafe: false,
        feedback: 'DANGEROUS! Once you pay ₹1,999, they will demand ₹5,000 for "software activation" and disappear.'
      },
      {
        text: 'Decline and block the recruiter—genuine employers never charge registration fees.',
        isSafe: true,
        feedback: 'WELL DONE! Always verify job openings directly on the company’s official careers website.'
      }
    ]
  }
];

export const FAKE_PAYMENT_CASES = [
  {
    id: 'pay-1',
    title: 'Receipt A: Grocery Store Counter Payment',
    amount: '₹1,850.00',
    displayedStatus: 'Paid Successfully ✓',
    senderName: 'Vikram S.',
    upiRef: 'Not Shown / Blank',
    appAlertReceived: false,
    fontMismatch: true,
    isManipulated: true,
    clues: [
      'The 12-digit UPI Transaction Reference (UTR) number is missing.',
      'The amount font ("₹1,850.00") has a different size and alignment than the rest of the screen.',
      'Your own merchant UPI app / bank SMS shows ZERO credit received.'
    ],
    lesson: 'Never trust a screenshot on someone else’s phone. Always verify the credit inside your own official bank or UPI app.'
  },
  {
    id: 'pay-2',
    title: 'Receipt B: Verified Bank Credit Entry',
    amount: '₹600.00',
    displayedStatus: 'Credited to A/c **9104',
    senderName: 'Ananya R.',
    upiRef: 'UTR: 631845902311',
    appAlertReceived: true,
    fontMismatch: false,
    isManipulated: false,
    clues: [
      'Confirmed directly inside your own official banking app history (not just a forwarded image).',
      'Contains a valid 12-digit UTR number (631845902311).',
      'Your actual available bank balance increased by ₹600.00.'
    ],
    lesson: 'True verification comes only from your own bank statement, official UPI app transaction history, or verified bank SMS.'
  },
  {
    id: 'pay-3',
    title: 'Receipt C: WhatsApp Forwarded "Refund" Slip',
    amount: '₹12,000.00',
    displayedStatus: 'Transfer Initiated — Click Link to Accept',
    senderName: 'Support_Refund_Desk',
    upiRef: 'REF-000-WIN',
    appAlertReceived: false,
    fontMismatch: true,
    isManipulated: true,
    clues: [
      'Real UPI credits happen automatically—you never "click a link to accept" a bank transfer.',
      'Fake reference code ("REF-000-WIN") instead of a 12-digit numeric UTR.',
      'Sent as an image on WhatsApp with no corresponding bank balance increase.'
    ],
    lesson: 'UPI transfers do not require clicking external links to claim funds.'
  }
];

export const PRIVACY_CHECKLIST_ITEMS = [
  { key: 'strong_passwords', label: 'Use unique 12+ character passwords for email and banking apps', points: 15 },
  { key: 'enable_2fa', label: 'Enabled Two-Factor Authentication (2FA) on email, WhatsApp & social media', points: 15 },
  { key: 'no_otp_sharing', label: 'Never share OTPs, UPI PINs, or CVV numbers with any caller', points: 15 },
  { key: 'official_apps_only', label: 'Install apps only from Google Play Store / Apple App Store (no .apk files)', points: 10 },
  { key: 'social_privacy', label: 'Set Instagram/Facebook profiles and profile photos to Private / Contacts Only', points: 10 },
  { key: 'app_permissions', label: 'Reviewed and revoked unnecessary SMS/Accessibility permissions from apps', points: 10 },
  { key: 'os_updates', label: 'Keep smartphone OS, browser, and banking apps updated to the latest version', points: 10 },
  { key: 'avoid_public_wifi', label: 'Avoid using open public Wi-Fi for banking or UPI payments', points: 5 },
  { key: 'password_reuse', label: 'Avoid reusing the same password across multiple websites', points: 5 },
  { key: 'saved_1930', label: 'Saved National Cyber Helpline 1930 in phone contacts for emergencies', points: 5 }
];

export const MYTHS_VS_FACTS = [
  {
    myth: 'Myth: A website with HTTPS and a padlock icon is 100% safe and genuine.',
    fact: 'Fact: HTTPS only means traffic between your browser and the site is encrypted. Scammers easily get free HTTPS certificates for phishing sites.'
  },
  {
    myth: 'Myth: Entering your UPI PIN is required to receive cashback or OLX payments.',
    fact: 'Fact: Entering a UPI PIN ONLY deducts money from your bank account. Receiving money never requires a PIN.'
  },
  {
    myth: 'Myth: Police or CBI officers can arrest you over a WhatsApp or Skype video call.',
    fact: 'Fact: "Digital Arrest" is completely fake. Indian law enforcement never interrogates or collects money via video calls.'
  },
  {
    myth: 'Myth: Only elderly or non-technical people fall for cyber scams.',
    fact: 'Fact: Students and IT professionals frequently fall victim to fake job tasks, deepfakes, and urgency-based phishing when distracted.'
  }
];

export const SCAM_STORIES = [
  {
    title: 'Case Study 1: The Midnight Electricity Disconnection SMS',
    victimProfile: 'Retired School Teacher, Bengaluru',
    story:
      'At 8:45 PM, Mr. Rao received an SMS warning his power would be cut at 9:30 PM due to an unpaid bill. Panicked, he called the mobile number in the message. The fake officer asked him to install "QuickSupport" and pay ₹10 via net banking to update the bill. While Mr. Rao typed his password, the scammer watched his screen live and drained ₹1.4 lakh.',
    takeaway: 'Never call mobile numbers from urgent SMS alerts and never install screen-sharing apps.'
  },
  {
    title: 'Case Study 2: The YouTube Like Task Trap',
    victimProfile: '2nd-Year Engineering Student, Hyderabad',
    story:
      'A student joined a Telegram group offering ₹50 per liked video. After receiving ₹300 in her account, she trusted the group and deposited ₹15,000 for a "VIP Crypto Merchant Task". The fake dashboard showed ₹24,000 profit, but demanded another ₹40,000 "tax" to withdraw. She realized it was a trap and called 1930 immediately, freezing ₹11,000 in the mule account.',
    takeaway: 'Early small payouts are bait. Never pay deposits to earn work income, and dial 1930 immediately if scammed.'
  },
  {
    title: 'Case Study 3: Fake Payment Screenshot at a Pharmacy',
    victimProfile: 'Local Medical Store Owner, Mysuru',
    story:
      'A customer bought medicines worth ₹3,200, showed a green "Paid ₹3,200" screen on his phone, and hurried away saying he had a train to catch. Later that evening, the owner noticed no credit in his bank statement—the buyer had used a fake UPI receipt generator app.',
    takeaway: 'Always confirm payment on your own UPI app, bank SMS, or voice payment soundbox before handing over goods.'
  }
];