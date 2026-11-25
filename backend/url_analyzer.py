import re
from urllib.parse import urlparse

SUSPICIOUS_TLDS = {
    ".xyz", ".top", ".club", ".online", ".site", ".win", ".bid",
    ".loan", ".click", ".link", ".tk", ".ml", ".ga", ".cf", ".gq",
    ".buzz", ".work", ".support", ".vip", ".icu"
}

BRAND_KEYWORDS = [
    "sbi", "hdfc", "icici", "axis", "paytm", "phonepe", "gpay",
    "googlepay", "bhim", "upi", "irctc", "uidai", "aadhaar",
    "incometax", "epfo", "amazon", "flipkart", "whatsapp", "rbi"
]

URL_SHORTENERS = {
    "bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd",
    "buff.ly", "rb.gy", "cutt.ly", "shorturl.at"
}


def analyze_url_heuristics(raw_url: str) -> dict:
    """
    Perform static lexical analysis on a URL string.
    NEVER fetches, connects to, or opens the URL.
    """
    cleaned = (raw_url or "").strip()
    if not cleaned:
        raise ValueError("Please enter a URL to inspect.")

    if len(cleaned) > 2048:
        raise ValueError("URL is unusually long (exceeds 2048 characters).")

    if " " in cleaned:
        raise ValueError("Invalid URL format: URLs cannot contain spaces.")

    has_explicit_scheme = bool(re.match(r"^[a-zA-Z][a-zA-Z0-9+.-]*://", cleaned))
    parse_target = cleaned if has_explicit_scheme else f"http://{cleaned}"
    parsed = urlparse(parse_target)

    hostname = (parsed.hostname or "").lower()
    if not hostname or "." not in hostname:
        raise ValueError("Please enter a valid domain or URL (e.g., https://example.com).")

    indicators = []
    risk_score = 0

    # 1. Check HTTP vs HTTPS
    if has_explicit_scheme and parsed.scheme.lower() == "http":
        risk_score += 2
        indicators.append({
            "title": "Unencrypted HTTP Protocol",
            "detail": "The link uses 'http://' instead of 'https://'. Data sent on HTTP is not encrypted in transit."
        })
    elif not has_explicit_scheme:
        indicators.append({
            "title": "Missing Protocol Scheme",
            "detail": "No 'https://' prefix was provided. Always verify whether the official site uses HTTPS."
        })

    # 2. IP address instead of domain name
    if re.match(r"^\d{1,3}(\.\d{1,3}){3}$", hostname):
        risk_score += 4
        indicators.append({
            "title": "Raw IP Address Used as Host",
            "detail": "Legitimate banks, government portals, and payment apps use official domain names—never raw IP addresses."
        })

    # 3. '@' symbol credential/redirect trick
    if "@" in cleaned:
        risk_score += 4
        indicators.append({
            "title": "Deceptive '@' Symbol in URL",
            "detail": "Browsers ignore everything before '@' and take you to the domain after '@', a classic phishing trick."
        })

    # 4. URL Shorteners hiding final destination
    if hostname in URL_SHORTENERS:
        risk_score += 2
        indicators.append({
            "title": "Shortened URL Hides Destination",
            "detail": f"'{hostname}' masks the real target website. Attackers use short links in SMS/WhatsApp scams."
        })

    # 5. Excessive subdomains
    parts = hostname.split(".")
    if len(parts) >= 4:
        risk_score += 2
        indicators.append({
            "title": "Multiple Nested Subdomains",
            "detail": f"The host '{hostname}' has {len(parts)} domain levels, often used to disguise a fake root domain."
        })

    # 6. Suspicious TLDs
    for tld in SUSPICIOUS_TLDS:
        if hostname.endswith(tld):
            risk_score += 2
            indicators.append({
                "title": f"High-Abuse Domain Extension ({tld})",
                "detail": f"The extension '{tld}' is frequently abused for disposable phishing and lottery sites."
            })
            break

    # 7. Brand impersonation / typosquatting patterns
    registered_domain = ".".join(parts[-2:]) if len(parts) >= 2 else hostname
    for brand in BRAND_KEYWORDS:
        if brand in hostname:
            # Flag if brand appears with extra hyphens/numbers or outside official .gov.in / .org.in / primary domain
            if "-" in registered_domain or re.search(rf"{brand}\d+|\d+{brand}", registered_domain):
                risk_score += 3
                indicators.append({
                    "title": f"Possible Brand Impersonation ('{brand.upper()}')",
                    "detail": f"Contains '{brand}' combined with hyphens or digits ('{registered_domain}'), common in lookalike scam domains."
                })
                break
            elif len(parts) >= 3 and brand in ".".join(parts[:-2]):
                risk_score += 3
                indicators.append({
                    "title": f"Brand Name Placed in Subdomain ('{brand.upper()}')",
                    "detail": f"'{brand}' appears in the subdomain rather than the actual root domain ('{registered_domain}')."
                })
                break

    # 8. Urgency/lure keywords in path or query
    full_path = f"{parsed.path} {parsed.query}".lower()
    lure_words = ["kyc", "verify", "reward", "lottery", "refund", "blocked", "urgent", "cashback", "win", "update-pan"]
    matched_lures = [w for w in lure_words if w in full_path or w in hostname]
    if matched_lures:
        risk_score += 2
        indicators.append({
            "title": "Urgency / Lure Keywords Detected",
            "detail": f"Found common scam trigger words in link: {', '.join(matched_lures)}."
        })

    # 9. Punycode / IDN homograph check
    if "xn--" in hostname:
        risk_score += 3
        indicators.append({
            "title": "Punycode / Lookalike Character Encoding",
            "detail": "The domain uses 'xn--' encoding, which can mimic standard letters using foreign Unicode characters."
        })

    if risk_score >= 4:
        risk_level = "High Risk"
    elif risk_score >= 2:
        risk_level = "Potentially Suspicious"
    else:
        risk_level = "No obvious warning signs detected"

    return {
        "submitted_url": cleaned,
        "parsed_host": hostname,
        "risk_level": risk_level,
        "risk_score": risk_score,
        "indicators": indicators,
        "precautions": [
            "Never enter UPI PIN, OTP, net-banking passwords, or Aadhaar details on links received via SMS or WhatsApp.",
            "Note that HTTPS (the padlock icon) only encrypts traffic—phishing websites can also have HTTPS.",
            "Absence of heuristic warning signs does NOT guarantee a website is safe. Always type official URLs manually."
        ],
        "disclaimer": "Educational Heuristic Assessment Only: CyberShield does not open submitted URLs or guarantee website safety."
    }