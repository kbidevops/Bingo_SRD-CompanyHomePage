(function () {
  const STORAGE_KEY = "siteLanguage";
  const SUPPORTED = new Set(["ko", "en"]);
  const TEXT_ATTRS = ["aria-label", "title", "placeholder"];

  const RUNTIME_REPLACEMENTS = [
    ["통합 취약점 진단 솔루션", "Integrated Vulnerability Scan Solution"],
    ["CCE 진단", "CCE Scan"],
    ["CVE 진단", "CVE Scan"],
    ["BingoCVM 알아보기 →", "Explore BingoCVM ->"],
    ["회사 소개", "Company Overview"],
    [
      "BingoCVM 제로트러스트 통합 진단 아키텍처",
      "BingoCVM Zero Trust Integrated Scan Architecture",
    ],
    ["제어층", "Control Layer"],
    ["BingoCVM AI 엔진", "BingoCVM AI Engine"],
    ["제로 트러스트 정책 엔진", "Zero Trust Policy Engine"],
    ["STIG 가이드", "STIG Guide"],
    ["학습 AI", "Learning AI"],
    ["진단 명령 및 정책 적용", "Scan Commands & Policy Application"],
    [
      "분석층 | CCE + CVE 통합 모듈",
      "Analysis Layer | CCE + CVE Integrated Module",
    ],
    ["CCE 시스템취약스캔", "CCE System Vulnerabilities Scan"],
    ["CVE 소프트웨어취약스캔", "CVE Software Vulnerabilities Scan"],
    [
      "시스템 설정 오류, 컴플라이언스 미준수 진단",
      "Diagnoses system configuration errors and compliance non-conformities",
    ],
    [
      "글로벌 보안 약점, OS/SW 취약점 실시간 매핑",
      "Real-time mapping of global security weaknesses and OS/SW vulnerabilities",
    ],
    ["대상층 | 하이브리드 인프라", "Target Layer | Hybrid Infrastructure"],
    ["온프레미스", "On-Premises"],
    ["클라우드", "Cloud"],
    [
      "Legacy 서버 · 네트워크 · 데이터센터",
      "Legacy servers, networks, and data centers",
    ],
    [
      "AWS, Azure, GCP 등 가상화 환경",
      "AWS, Azure, GCP, and other virtualized environments",
    ],
    ["주요", "Major"],
    [("주요 효과", "Key Benefits")],
    ["보안 강화", "Enhanced Security"],
    ["비용 절감", "Cost Reduction"],
    ["컴플라이언스 달성", "Compliance Achievement"],
    ["자사 대표 솔루션", "Flagship Solution"],
    ["취약점진단 자동화 플랫폼", "Vulnerability Scan Automation Platform"],
    ["5단계 프로세스", "5-Step Process"],

    ["으로 자산 등록부터", " for end-to-end asset onboarding through"],
    [
      "진단·분석·조치·보고서까지 원스톱으로 제공합니다.",
      "Scan, analysis, remediation, and reporting in one workflow.",
    ],
    ["자산등록", "Register Assets"],
    ["취약점 진단", "Vulnerability Scan"],

    ["취약점 분석", "Vulnerability Analysis"],
    ["AI 분석", "AI Analysis"],
    ["취약점 조치", "Vulnerability Remediation"],
    ["AI 조치", "AI Remediation"],
    ["이행 점검", "Implementation Inspection"],
    ["비교 보고서 다운로드", "Download Comparison Report"],
    ["제품 상세보기 →", "View Product Details ->"],
    ["설정 취약점", "Configuration Vulnerabilities"],
    ["소프트웨어 버그", "Software Bug"],
    ["온프레미스 + 클라우드를", "On-premises + cloud assets"],
    ["하나의 플랫폼", "a single platform"],
    ["취약점을 통합 진단합니다.", "are assessed in an integrated way."],
    ["검증된 신뢰", "Proven Trust"],
    ["고객사", "Clients"],
    [
      "국가 주요 정보통신기반시설을 비롯해 공공기관, 국방, 연구기관, IT 기업 등 다양한 분야에서",
      "Trusted across national critical infrastructure, public sector, defense, research institutions, and IT enterprises for",
    ],
    ["20년 이상", "20+ years"],
    ["신뢰를 받아왔습니다.", "of proven experience."],
    ["정부기관", "Government Agencies"],
    ["연구기관·교육기관", "Research Institutions & Educational Organizations"],
    ["공공기관·지자체", "Public Institutions & Local Governments"],

    ["민간·IT 기업", "Private & IT Enterprises"],
    ["주요 레퍼런스", "Major References"],
    ["대통령실", "Office of the President"],
    ["구축 · 고도화", "Implementation & Advancement"],
    ["전국 경찰청", "National Police Agency (Nationwide)"],
    ["국방과학연구소", "Agency for Defense Development"],
    ["바이오망 구축", "Bio-Network Implementation"],
    ["CSAP 컨설팅", "CSAP Consulting"],
    ["BingoCVM 구축", "BingoCVM Implementation"],
    ["한국수자원공사", "K-water (Korea Water Resources Corp.)"],
    ["SK하이닉스", "SK Hynix"],
    ["인텔리전스 진단", "Intelligence Scan"],
    ["전체 고객사 보기", "View All Clients"],
    ["이전 슬라이드", "Previous slide"],
    ["다음 슬라이드", "Next slide"],
    ["슬라이드 1", "Slide 1"],
    ["슬라이드 2", "Slide 2"],
    ["슬라이드 3", "Slide 3"],
    [
      "2003년 설립 이래 20년 이상 대한민국 정보보안을 책임져온 전문 기업",
      "A specialized company that has taken full responsibility for South Korea's information security for over 20 years since its founding in 2003.",
    ],
    [
      "(주)케이비아이는 AI 빅데이터 분석 기반의 보안취약점 진단 기술로 기업 보안의 신뢰와 믿음을 만들었습니다.",
      "KBI Co., Ltd. has built trust and confidence in corporate security through AI Big Data Analysis-based Security Vulnerability Scan Technology.",
    ],
    [
      "국가주요기관, 공공, 국방, 연구·교육, IT 분야에 걸친 50개 이상 주요 고객사",
      "Over 50 major client organizations spanning national key institutions, public, defense, research & education, and IT sectors.",
    ],
    ["등급 인증", "Grade Certified"],
    ["솔루션", "Solutions"],
    [
      "BingoCVM GS 1등급 인증 취득 — 국내 최고 수준의 품질 보증",
      "BingoCVM acquired GS Certification Grade 1 — Guaranteed top-tier quality in Korea.",
    ],
    ["자사 대표 제품", "Flagship Product"],
    [
      "BingoCVM — 취약점진단 자동화 플랫폼",
      "BingoCVM - Automated Vulnerability Scan Platform",
    ],
    [
      "정보통신기반시설 및 클라우드 시스템 취약점진단 자동화",
      "Automation for vulnerability Scans across critical ICT infrastructure and cloud systems",
    ],
    [
      "를 제공하는 (주) 케이비아이의 대표 보안 솔루션입니다. 진단 / 평가 / 분류 / 조치 / 이력 / 보고서까지 원스톱으로 제공합니다.",
      "is KBI's flagship security solution, delivering one-stop diagnostics, evaluation, classification, remediation, history management, and reporting.",
    ],
    ["국내 컴플라이언스 규정 준수", "Compliance with Domestic Regulations"],
    [
      "KISA 취약점점검 가이드 기준에 따른 체계적인 점검으로 법적 요건을 충족합니다.",
      "Meets legal requirements through systematic checks aligned with KISA vulnerability guidelines.",
    ],
    ["ISMS-P · CSAP 인증 준수 관리", "ISMS-P and CSAP Compliance Management"],
    [
      "정보보호관리체계 인증과 클라우드 보안 인증 준수를 위한 체계적 지원을 제공합니다.",
      "Provides structured support for ISMS and cloud security certification compliance.",
    ],
    [
      "공공기관 사이버보안 실태평가 대응",
      "Support for Public Sector Cybersecurity Scans",
    ],
    [
      "정부·공공기관의 사이버보안 실태평가 요구사항에 맞춤 대응합니다.",
      "Tailored response to cybersecurity Scan requirements for government and public institutions.",
    ],
    [
      "자산 등록부터 진단·수집·분석·조치까지 전 과정을 자동화하여 담당자 업무시간을 대폭 단축합니다.",
      "Automates the full workflow from asset registration to diagnostics, collection, analysis, and remediation to significantly reduce operational workload.",
    ],
    ["온프레미스 + 클라우드 통합 진단", "Integrated On-Prem + Cloud Scan"],

    ["온프레미스/클라우드", "On-Prem/Cloud"],
    [
      "Unix/Linux · Windows · PC · Web · DBMS · Network · 가상화 · 클라우드 플랫폼의 취약점 항목을 자동 스케줄 진단합니다.",
      "Automatically runs scheduled vulnerability Scans for Unix/Linux, Windows, PC, Web, DBMS, Network, virtualization, and cloud platforms.",
    ],

    ["관련 솔루션", "Related Solutions"],
    [
      "시스템 취약점진단 자동화 (온프레미스 + 클라우드)",
      "System vulnerability Scan automation (On-Premise + Cloud)",
    ],
    [
      "정보시스템 장애 접수·처리 관리",
      "Information system incident receipt & processing management",
    ],
    [
      "정보화사업 산출물·진행단계 관리",
      "Information business deliverable & progress stage management",
    ],
    ["DBMS to PostgreSQL 마이그레이션", "DBMS to PostgreSQL Migration"],
    ["영업 문의", "Sales Contact"],
    [
      "BingoCVM 도입 상담, 기술 문의",
      "BingoCVM adoption and technical consultation",
    ],
    [
      "㈜케이비아이의 전문 컨설턴트가 신속하게 답변드리겠습니다.",
      "KBI Co., Ltd.'s professional consultants will respond quickly.",
    ],
    ["영업 대표 1", "Sales Contact 1"],
    ["영업 대표 2", "Sales Contact 2"],
    ["홈페이지", "Website"],
    ["주소", "Address"],
    [
      "대전광역시 서구 둔산대로117번길 44, 415호",
      "Room 415, 44 Dunsan-daero 117beon-gil, Seo-gu, Daejeon",
    ],
    ["연락처 안내", "Contact Information"],
    ["문의 채널", "Contact Channels"],
    ["전화, 팩스, 홈페이지", "Phone, fax, and website"],
    ["등 다양한 채널로 문의하실 수 있습니다.", "via multiple channels."],
    [
      "영업 담당자가 신속하게 안내해 드리겠습니다.",
      "Our sales team will guide you promptly.",
    ],
    ["영업·기술 상담 전화", "Sales and technical consultation"],
    ["영업 상담 전화", "Sales consultation"],
    ["회사 및 제품 정보 제공", "Company and product information"],
    ["운영 시간", "Business Hours"],
    ["점심", "Lunch"],
    ["월–금 운영", "Open Mon-Fri"],
    ["토·일·공휴일 휴무", "Closed on weekends and public holidays"],
    ["(주)케이비아이", "KBI Co., Ltd."],
    ["(주)케이비아이 찾아오시는 길", "Directions to KBI Co., Ltd."],
    ["설립 2003년", "Founded in 2003"],
    ["대전 서구", "Seo-gu, Daejeon"],
    ["카카오맵에서 보기 →", "View on Kakao Map ->"],
    ["자주 묻는 질문", "Frequently Asked Questions"],
    ["문의 전 확인해보세요", "Check Before You Contact Us"],
    [
      "영업 문의 전 자주 묻는 질문을 먼저 확인해 보세요.",
      "Please review these frequently asked questions before contacting sales.",
    ],
    [
      "추가 문의는 이메일(bingocvm@kbisys.com)로 주시면 빠르게 안내드립니다.",
      "For additional inquiries, email bingocvm@kbisys.com and we will respond quickly.",
    ],
    [
      "BingoCVM 무료 체험 또는 데모 시연이 가능한가요?",
      "Is a free trial or demo available for BingoCVM?",
    ],
    [
      "네, 가능합니다. 이메일로(bingocvm@kbisys.com)로 연락 주시면 온라인 데모 시연 일정을 협의해드립니다. 도입 환경에 맞는 맞춤형 시연을 제공하며, POC(기술검증) 진행도 요청하실 수 있습니다.",
      "Yes. Contact us at bingocvm@kbisys.com and we can arrange an online demo. We provide tailored demonstrations based on your environment and can also support POC validation.",
    ],
    [
      "조달청을 통한 구매는 어떻게 진행되나요?",
      "How do I purchase through the Korean Public Procurement Service?",
    ],
    ["조달청 디지털서비스몰", "Digital Service Mall"],
    [
      "에서 '케이비아이' 또는 'BingoCVM'으로 검색하여 구매하실 수 있습니다.",
      "Search for 'KBI' or 'BingoCVM' to purchase.",
    ],
    [
      "클라우드 환경(CSAP)에서도 사용 가능한가요?",
      "Can it be used in cloud environments (CSAP)?",
    ],
    [
      "BingoCVM은 온프레미스와 클라우드 환경 모두 지원합니다. 또한 CSAP(클라우드 보안인증) 심사 도구로도 활용할 수 있습니다.",
      "BingoCVM supports both on-premises and cloud environments, and can be used as a CSAP audit support tool.",
    ],
    [
      "K-RMF, K-STIG, K-SCAP 관련 국방 분야 지원도 가능한가요?",
      "Do you support defense-sector requirements such as K-RMF, K-STIG, and K-SCAP?",
    ],
    [
      "네. ㈜케이비아이는 국방과학연구소, 국방기술품질원(DTaQ)과 협력하여 K-RMF, K-STIG, K-SCAP 시험평가 도구를 개발했습니다. 국내 최초로 국방표준과 미국표준을 동시 적용한 도구를 개발·납품한 경험이 있습니다.",
      "Yes. KBI has developed K-RMF, K-STIG, and K-SCAP evaluation tools in collaboration with ADD and DTaQ, including first-in-country delivery aligned to both domestic and U.S. standards.",
    ],
    [
      "기술 교육 및 운영 지원도 제공하나요?",
      "Do you provide technical training and operational support?",
    ],
    [
      "㈜케이비아이는 도입 후 정보보안 기술 교육 및 실습 서비스를 별도 제공합니다. 제품 사용 교육은 물론, CCE/CVE 취약점 진단 방법론, 보안컨설팅 실무 등 고객 맞춤형 교육 프로그램을 운영합니다.",
      "After adoption, KBI offers dedicated cybersecurity training and practical workshops. Programs include product training, CCE/CVE methodology, and security consulting practices tailored to your team.",
    ],
    ["이 문서의 내용", "Contents"],
    ["01 문의 채널", "01 Contact Channels"],
    ["02 자주 묻는 질문", "02 Frequently Asked Questions"],
    ["소식 · 업데이트", "News · Updates"],
    [
      "㈜케이비아이의 최신 소식, 제품 업데이트, 영상 자료를 확인하세요.",
      "Check out KBI's latest news, product updates, and video materials.",
    ],
    ["전체", "All"],
    ["영상", "Video"],
    ["업데이트", "Update"],
    ["공지사항", "Announcement"],
    ["개 항목", "items"],
    ["BingoCVM 소개 영상", "BingoCVM Introduction Video"],
    [
      "브라우저가 비디오를 지원하지 않습니다.",
      "Your browser does not support video playback.",
    ],
    [
      "정보통신기반시설 및 클라우드 시스템 취약점진단 자동화 솔루션 BingoCVM을 영상으로 만나보세요. 온프레미스부터 클라우드까지 CCE + CVE 통합 진단 기능을 확인하실 수 있습니다.",
      "Watch BingoCVM, an automated vulnerability Scan solution for critical ICT infrastructure and cloud systems. See integrated CCE + CVE Scan capabilities from on-premises to cloud.",
    ],
    ["블로그에서 보기 →", "View on Blog ->"],
    ["소개", "Introduction"],
    [
      "주요정보통신기반시설 기술적 취약점 분석·평가 방법 상세가이드 업데이트",
      "Updated Technical Vulnerability Analysis & Scan Guide for Major Information Infrastructure",
    ],
    [
      "2025년 12월 24일 KISA의 주요정보통신기반시설 기술적 취약점 분석 및 평가 방법 상세 가이드가 업데이트되었습니다.",
      "On Dec 24, 2025, KISA updated the detailed guide for technical vulnerability analysis and Scan of major information infrastructure.",
    ],
    [
      "저희 BingoCVM은 새롭게 업데이트 된 KISA의 표준에 적합하게 진단하기 위해 연구 및 고도화를 진행하고 있습니다.",
      "BingoCVM is being continuously researched and enhanced to align with KISA's updated standards.",
    ],
    [
      "현재 BingoCVM은 주요 관공서 및 공공기관에 납품되어 많은 고객사에서 사용하고 있습니다. 상세한 내용은 추후 게시글에서 풀어 나가도록 하겠습니다.",
      "BingoCVM is currently deployed in major government and public institutions. More detailed updates will be shared in future posts.",
    ],
    ["감사합니다.", "Thank you."],
    [
      "출처: KISA 한국인터넷진흥원 › 지식플랫폼 › 법령·가이드라인 › 가이드라인 › 보안취약점 및 침해사고 대응",
      "Source: KISA Knowledge Platform > Laws & Guidelines > Security Vulnerabilities and Incident Response",
    ],
    ["더보기", "Read more"],
    ["접기", "Collapse"],
    [
      "K-RMF 보안통제항목 점검목적의 SW자동화점검도구 개발 2년 연속 수주",
      "Awarded 2 Consecutive Years for K-RMF Security Control SW Automated Inspection Tool Development",
    ],
    [
      "㈜케이비아이는 국방기술품질원에서 발주하는 K-RMF 보안통제항목 점검 목적의 SW자동화 점검 도구 개발 연구용역을 2025년·2026년 연이어 수주했습니다.",
      "KBI Co., Ltd. was awarded the DTaQ R&D contract for K-RMF security control SW automated inspection tools in both 2025 and 2026.",
    ],
    [
      "K-RMF를 위한 SW자동화 점검도구 개발 연구용역을 통한 기대효과는 다음과 같습니다.",
      "Expected outcomes of this K-RMF SW automated inspection R&D project include:",
    ],
    ["사이버 보안 공백 방어:", "Cybersecurity Gap Defense:"],
    [
      "기준선 적용만으로는 대응하기 어려운 기술적 방어 공백을 자동화 도구를 통해 식별 및 보완",
      "Identify and address technical defense gaps that baseline controls alone cannot fully cover.",
    ],
    ["획득 프로세스 연동:", "Acquisition Process Integration:"],
    [
      "무기체계 획득 및 전력화 단계에서 요구되는 복잡한 보안 인증 심사 절차를 체계적으로 지원",
      "Systematically support complex security certification procedures required in defense acquisition and deployment stages.",
    ],
    [
      "美 RMF 자동화 도구 분석 수용:",
      "Adoption Through U.S. RMF Tool Analysis:",
    ],
    [
      "미국의 RMF(Risk Management Framework) 보안 자동화 도구 사례를 분석하고 국내 국방 환경에 최적화된 도구 설계",
      "Analyze U.S. RMF security automation tool cases and design tools optimized for domestic defense environments.",
    ],
    ["KBi 현황", "KBI at a Glance"],
    ["태그", "Tags"],
    ["최근 게시글", "Recent Posts"],
    ["KISA 취약점 분석 가이드 업데이트", "KISA Vulnerability Guide Update"],
    ["공식 블로그", "Official Blog"],
    ["BingoCVM 블로그", "BingoCVM Blog"],
    ["도입 효과", "Benefits"],
    ["도입효과 및 핵심 기능", "Benefits and Core Capabilities"],
    [
      "BingoCVM은 독보적인 ATC 자동화 엔진과 유연한 관리 기능으로 최상의 보안 관리 효율성을 제공합니다.",
      "BingoCVM delivers top-tier security operation efficiency with its unique ATC automation engine and flexible management features.",
    ],
    [
      "시스템 취약점진단 관리의 쉬운 자동화",
      "Easy Automation of System Vulnerability Management",
    ],
    [
      "BingoCVM은 시스템 취약점진단을 자동화(스케줄 관리)하여 담당자의 업무시간을 단축시켜줍니다.",
      "BingoCVM automates system vulnerability checks with scheduling to reduce operator workload.",
    ],
    [
      "조치 관리를 통해서 누가 언제 조치를 어떻게 했고 조치 관련 증빙 자료를 업로드해서 관리할 수 있습니다.",
      "Remediation management tracks who did what and when, with supporting evidence upload and management.",
    ],
    [
      "초기 진단과 조치 이후 진단 내역을 비교하는 비교 보고서 다운로드가 가능합니다.",
      "Comparative reports are available to compare initial diagnostics with post-remediation results.",
    ],

    [
      "온프레미스 및 클라우드 시스템 취약점 진단",
      "On-Premises and Cloud Vulnerability Scan",
    ],
    [
      "온프레미스에서 클라우드 시스템까지 모두 하나의 플랫폼 BingoCVM에서 취약점진단이 가능합니다.",
      "From on-premises to cloud systems, vulnerability Scans are available in one BingoCVM platform.",
    ],
    [
      "진단 대상: Unix/Linux 서버, Windows 서버, PC, 웹, DBMS, Network, 가상화, 클라우드 플랫폼의 취약점 항목을 자동 스케줄 진단할 수 있습니다.",
      "Scan targets include Unix/Linux servers, Windows servers, PCs, web, DBMS, network, virtualization, and cloud platform vulnerabilities via automatic scheduled scans.",
    ],
    ["취약점 진단 프로세스", "Scan Process"],
    [
      "5단계 체계적 취약점 진단 프로세스",
      "Structured 5-Step Vulnerability Scan Process",
    ],
    [
      "BingoCVM의 취약점 진단 프로세스는 체계적이고 단계적인 접근으로 빠짐없는 취약점관리를 실현합니다.",
      "BingoCVM's process delivers comprehensive vulnerability management through a structured and phased approach.",
    ],
    [
      "취약점 진단 주요단계는 자산등록, 취약점진단, 취약점분석, 취약점조치, 이행점검으로 이루어집니다.",
      "The core steps are asset registration, vulnerability Scan, analysis, remediation, and verification.",
    ],
    [
      "모든 IT 자산을 Agent 또는 Non‑Agent 방식으로 식별하여 등록",
      "Identify and register all IT assets via agent or non-agent methods",
    ],
    [
      "CCE 진단 스크립트를 자동으로 배포·실행하고 결과 파일을 수집",
      "Automatically deploy and run CCE scripts, then collect result files",
    ],
    [
      "CVE 소프트웨어 취약점 기반 자산 자동 매핑으로 스캔 결과를 통합 수집 (2026년 적용)",
      "Collect integrated scan results via CVE software vulnerability-based automatic asset mapping (applied in 2026)",
    ],
    [
      "수집된 CCE 시스템취약점진단 결과를 분석하여 항목을 취약 / 양호 / 예외로 분류",
      "Analyze collected CCE system vulnerability check results and classify items as vulnerable / good / exception",
    ],
    [
      "CVE 소프트웨어 취약점 기반 AI 분석으로 취약점에 대한 정밀 분석 수행 (2026년 적용)",
      "Perform in-depth vulnerability analysis with CVE software vulnerability-based AI analysis (applied in 2026)",
    ],
    [
      "발견된 취약점에 대해 수동 또는 자동으로 조치 수행",
      "Apply manual or automated remediation for discovered vulnerabilities",
    ],
    [
      "AI 엔진을 활용한 조치 가이드를 제공 (2026년 적용)",
      "Provide AI-engine remediation guidance (applied in 2026)",
    ],
    [
      "조치 이력과 증적 자료를 체계적으로 저장",
      "Store remediation history and evidence systematically",
    ],
    [
      "조치 완료 후 재진단을 수행하여 이행 여부를 검증",
      "Re-assess after remediation to verify completion",
    ],
    [
      "최종 진단 보고서 및 비교 보고서 제공 (다운로드 가능)",
      "Provide final and comparative Scan reports (download available)",
    ],
    ["취약점 유형 소개", "Vulnerability Types"],
    ["CCE 취약점과 CVE 취약점", "CCE and CVE Vulnerabilities"],
    [
      "BingoCVM은 CCE(시스템취약 취약점)와 CVE(소프트웨어 취약점) 두 가지 유형을 통합 진단합니다.",
      "BingoCVM integrates two vulnerability types: CCE (system vulnerabilities) and CVE (software vulnerabilities).",
    ],
    [
      "설정 오류부터 알려진 버그까지, 하나의 플랫폼에서 모두 관리합니다.",
      "From configuration errors to known bugs, everything is managed in a single platform.",
    ],
    ["CCE 시스템취약 개요", "CCE System Vulnerability Overview"],
    ["KISA의 취약점 표준 체계", "KISA Vulnerability Standard Framework"],
    [
      "대한민국에서는 한국인터넷진흥원(KISA)이 주요 정보보호 취약점 기준을 관리·보급합니다. 다음과 같은 국내 표준 취약점 점검 기준을 제공합니다.",
      "In Korea, KISA manages and distributes major information security vulnerability criteria and provides domestic standard Scan baselines.",
    ],
    [
      "① 주요정보통신기반시설 기술적 취약점 분석·평가 기준",
      "1) Technical Vulnerability Analysis/Evaluation Standards for Major Information Infrastructure",
    ],
    ["전자정부, 공공기관 대상", "For e-government and public institutions"],
    [
      "서버/네트워크/DB/보안장비 점검 항목 제공",
      "Provides checks for servers, networks, DB, and security devices",
    ],
    [
      "항목 구조는 CCE 개념과 유사 (설정 기반 점검)",
      "Item structure is similar to CCE (configuration-based checks)",
    ],
    [
      "② 국가 정보보안 기본지침 / 전자정부 보안 가이드",
      "2) National Information Security Baseline / E-Government Security Guide",
    ],
    ["계정관리", "Account Management"],
    ["접근통제", "Access Control"],
    ["로그관리", "Log Management"],
    ["암호정책", "Password Policy"],
    ["CVE 소프트웨어취약 개요", "CVE Software Vulnerability Overview"],
    [
      "CVE는 소프트웨어나 하드웨어 제품에 존재하는 보안 취약점(버그)에 부여되는 고유 식별번호입니다.",
      "A unique identifier assigned to security vulnerabilities (bugs) in software or hardware products.",
    ],
    ["CVE 취약점의 주요 내용", "Core Aspects of CVE Vulnerabilities"],
    ["CVE 의미: 소프트웨어 결함", "Meaning: Software defects"],
    [
      "CVE 대상: 소프트웨어 제품 코드 취약점",
      "Target: Vulnerabilities in software product code",
    ],
    [
      "CVE 약점: 해커가 직접 공격 가능",
      "Risk: Directly exploitable by attackers",
    ],
    [
      "CVE 해결: 소프트웨어 취약점 점검 및 패치",
      "Mitigation: Vulnerability checks and patching",
    ],
    ["CVE의 특징", "Characteristics of CVE"],
    [
      "실제 공격 가능한 코드 취약점",
      "Code vulnerabilities exploitable in real attacks",
    ],
    ["형식: CVE-연도-번호", "Format: CVE-Year-ID"],
    ["예: CVE-2024-12345", "e.g., CVE-2024-12345"],
    ["CVSS 점수와 연계 (위험도 평가)", "Linked with CVSS scoring (risk Scan)"],
    ["CVE 예시", "CVE Examples"],
    [
      "Apache Log4j의 Log4Shell 원격 코드 실행 취약점",
      "Apache Log4j Log4Shell remote code execution vulnerability",
    ],
    [
      "Microsoft Windows SMB 취약점 (WannaCry 악용)",
      "Microsoft Windows SMB vulnerability (exploited by WannaCry)",
    ],
    ["시스템 구성", "System Architecture"],
    [
      "BingoCVM의 시스템은 Manager Server(App + Core)와 Device/Agent(Client License)로 구성됩니다. 온프레미스/클라우드 모두 자동진단 방식을 Agent + Non-Agent(기본) 모두 지원합니다.",
      "BingoCVM consists of Manager Server (App + Core) and Device/Agent (Client License). Both on-prem and cloud support automated diagnostics in agent and default non-agent modes.",
    ],
    ["프로세스 진행절차", "Process workflow"],
    ["설치", "Install"],
    ["Manager 구축", "Manager setup"],

    ["대상 호스트 등록", "Register target hosts"],
    ["진단 실행", "Run scan"],
    ["취약점 진단 명령", "Issue scan command"],
    ["수집(내부)", "Collect(Internal)"],

    ["On-Prem 데이터", "On-Prem data"],
    ["수집(외부)", "Collect (External)"],
    ["Cloud 데이터", "Cloud data"],
    ["분석", "Analyze"],
    ["리포트", "Report"],
    ["결과/조치 가이드", "Results/fix guide"],
    ["지원 플랫폼", "Supported Platforms"],
    [
      "BingoCVM은 KISA 취약점점검 가이드 기준으로 고객사의 다양한 시스템 환경에 맞춰 최적화된 진단 서비스를 제공합니다. 온프레미스부터 클라우드까지 폭넓은 지원 범위를 자랑합니다.",
      "BingoCVM supported platforms follow the KISA vulnerability scan guides, delivering scan optimized for each customer environment. Broad coverage from on-premise all the way to cloud.",
    ],
    ["OS & 가상화", "OS & Virtualization"],
    ["Cloud Platform:", "Cloud Platform:"],
    ["WEB/WAS & Network", "WEB/WAS & Network"],
    ["스위치/라우터", "switches/routers"],
    ["매뉴얼 진단 지원", "manual Scan supported"],
    ["주요 기능 및 특장점", "Key Features and Strengths"],
    ["기능 및 특장점", "Features and Strengths"],
    [
      "BingoCVM은 정보통신기반시설 및 클라우드 시스템 취약점진단 자동화를 제공합니다.",
      "BingoCVM provides automated vulnerability Scans for critical ICT infrastructure and cloud systems.",
    ],
    [
      "시스템 취약점 진단/평가/분류/조치/이력/보고서까지 편리한 서비스를 제공합니다.",
      "It offers convenient end-to-end services from Scan/evaluation/classification/remediation/history to reporting.",
    ],
    [
      "BingoCVM은 독보적인 ATC 자동화 엔진과 유연한 관리 기능으로 최상의 보안 관리 효율성을 제공합니다.",
      "BingoCVM maximizes security operations efficiency with a unique ATC automation engine and flexible controls.",
    ],
    [
      "자동/수동/스케줄 진단을 지원하며, 진단 결과 및 로그 분석, 조치/중점 이력까지 원스톱 관리가 가능합니다.",
      "Supports automatic/manual/scheduled diagnostics with one-stop management for results, log analysis, remediation, and key history.",
    ],
    [
      "자산별·그룹별 보고서 생성 및 진단 가이드/스크립트의 유연한 커스터마이징 기능을 제공합니다.",
      "Provides per-asset and per-group reporting plus flexible customization of guides and scripts.",
    ],
    [
      "ATC 자동화 엔진을 적용하여 자산 등록부터 진단, 수집, 분석까지 전 과정을 자동화합니다.",
      "Applies the ATC automation engine to automate the full flow from registration to diagnostics, collection, and analysis.",
    ],
    [
      "국내 최초로 Agent 및 Non-Agent 혼합 스케줄 진단을 지원하여 다양한 환경에 최적화된 진단이 가능합니다.",
      "Supports Korea's first mixed agent/non-agent scheduled diagnostics for optimized Scan across diverse environments.",
    ],
    [
      "On-Premise + Cloud 자산을 하나의 플랫폼에서 취약점 진단합니다.",
      "Assesses On-Premise + Cloud assets in one platform.",
    ],
    [
      "CCE + CVE 취약점을 하나의 플랫폼에서 진단합니다.",
      "Assesses CCE + CVE vulnerabilities in one platform.",
    ],
    [
      "Network Scanner 기능을 통해 IP, Port, Service 정보를 효율적으로 스캔합니다. 또한 Blacklist·Whitelist 정책 기반 탐지를 지원하여, 불필요하거나 비인가된 IP·Port를 주기적으로 점검하고 관리할 수 있습니다.",
      "Network Scanner efficiently scans IP, port, and service data. It also supports blacklist/whitelist policy-based detection for recurring checks and control of unnecessary or unauthorized IPs and ports.",
    ],
    ["01 연혁", "01 History"],
    ["02 협력기관", "02 Partners"],
    ["03 사업내용", "03 Services"],
    ["04 고객사", "04 Clients"],
    ["01 도입효과", "01 Benefits"],
    ["02 진단 프로세스", "02 Scan Process"],
    ["04 시스템 구성", "04 System Architecture"],
    ["05 지원 플랫폼", "05 Supported Platforms"],
    ["06 기능·특장점", "06 Features & Strengths"],
  ];

  const ORDERED_RUNTIME_REPLACEMENTS = [...RUNTIME_REPLACEMENTS].sort(
    (a, b) => String(b[0] || "").length - String(a[0] || "").length,
  );

  const DICT = {
    ko: {
      "common.skipToContent": "본문으로 건너뛰기",
      "nav.logoAria": "BingoCVM 홈",
      "nav.mainMenuAria": "주요 메뉴",
      "nav.home": "홈",
      "nav.product": "제품 소개",
      "nav.about": "회사 소개",
      "nav.news": "뉴스",
      "nav.contact": "영업문의",
      "nav.buyLabel": "조달청 디지털서비스몰 바로가기",
      "footer.platformSub": "취약점진단 자동화 플랫폼",
      "about.history.eyebrow": "주요 연혁",
      "about.history.title": "연혁 및 주요 실적",
      "about.history.desc":
        "㈜케이비아이는 AI 빅데이터 분석 기반의 보안취약점 진단 기술로 기업 보안의 신뢰와 믿음을 만들었습니다.",
      "about.history.tl1.title": "창업 · 핵심 기술 확보",
      "about.history.tl1.li1": "주식회사 케이비아이 설립 (2003)",
      "about.history.tl1.li2": "NSR 사이버테러대응 시스템 개발 참여",
      "about.history.tl1.li3": "NSR 제어망·스마트그리드 취약점 분석 개발 참여",
      "about.history.tl1.li4": "취약점 분석 핵심 기반 기술 확보",
      "about.history.tl2.title": "제품화 · 인증 획득",
      "about.history.tl2.li1": "기업부설연구소 설립",
      "about.history.tl2.li2": "BingoCVM 솔루션 출시",
      "about.history.tl2.li3": "GS 1등급 인증 획득",
      "about.history.tl2.li4": "국세청 취약점진단 시스템 구축",
      "about.history.tl3.title": "레퍼런스 확대",
      "about.history.tl3.li1": "한국수자원공사 인텔리전스 진단 시스템 개발",
      "about.history.tl3.li2": "조달청 쇼핑몰 등록",
      "about.history.tl3.li3": "국방과학연구소 BingoCVM 구축 및 고도화",
      "about.history.tl3.li4": "서비스 장애 예측 시스템 개발",
      "about.history.tl4.title": "범정부 · 클라우드 확산",
      "about.history.tl4.li1": "대통령실·보건복지부·기상청 구축",
      "about.history.tl4.li2": "한전원자력연료·ETRI 소진공 구축",
      "about.history.tl4.li3": "KAIT CSAP 클라우드 인증 심사도구 고도화",
      "about.history.tl4.li4": "안랩 클라우드 보안 컨설팅 참여",
      "about.history.tl5.title": "최신 성과 · 고도화",
      "about.history.tl5.li1": "KISTI 바이오망·수자원공사(OA/FA) 구축",
      "about.history.tl5.li2": "국방기술품질원 K-RMF 점검기법 고도화",
      "about.history.tl5.li3": "전국 경찰청 시스템 취약점 진단",
      "about.history.tl5.li4": "가비아 클라우드 CSAP 컨설팅",
      "about.history.era1.label": "Era 01",
      "about.history.era1.title": "창업 및 기술 기반 구축기",
      "about.history.era1.li1": "사이버테러대응시스템 개발 참여 (NSR)",
      "about.history.era1.li2": "한전 제어망 취약점 분석 기술 확보",
      "about.history.era1.li3": "스마트그리드 보안 연구 기반 마련",
      "about.history.era2.label": "Era 02",
      "about.history.era2.title": "제품 출시 및 레퍼런스 확대기",
      "about.history.era2.li1": "BingoCVM GS 1등급 인증 획득",
      "about.history.era2.li2": "국방과학연구소·국세청 납품",
      "about.history.era2.li3": "조달청 쇼핑몰 등록 완료",
      "about.history.era3.label": "Era 03",
      "about.history.era3.title": "클라우드·국방 표준화 선도기",
      "about.history.era3.li1": "CSAP 클라우드 보안 인증 심사 참여",
      "about.history.era3.li2": "K-RMF / K-STIG / K-SCAP 표준화",
      "about.history.era3.li3": "대통령실·전국 경찰청 납품",
      "about.partners.eyebrow": "협력 기관",
      "about.partners.title": "주요 R&D 분야 협력 기관",
      "about.partners.desc":
        "㈜케이비아이는 국내 주요 기관들과 활발히 연구 개발 관련 사업을 진행하고 있습니다. 핵심 보안 기술 연구부터 국방 및 공공 분야 표준화 작업까지 폭넓은 협력 네트워크를 구축했습니다.",
      "about.partners.left1.name": "국가보안기술연구소 (NSR)",
      "about.partners.left1.tag": "핵심 기술 협력",
      "about.partners.left1.li1":
        "사이버테러대응시스템, 한전제어망 및 스마트그리드 취약점 분석 등 국가 핵심 보안 기술 공동 연구 및 개발 참여",
      "about.partners.left2.name": "ETRI / KAIT",
      "about.partners.left2.tag": "ICT융합 연구",
      "about.partners.left2.li1":
        "K-RMF 자동화 도구 개발, CSAP 클라우드 보안인증 심사 도구 계약 및 연간 용역지원 수행",
      "about.partners.left2.li2": "가비아, 안랩, KT 클라우드 CSAP 수행",
      "about.partners.left2.li3": "카카오 클라우드 CSAP 협력",
      "about.partners.center.logoAlt": "KBI e-Security Consulting",
      "about.partners.center.sub": "e-Security<br />Consulting",
      "about.partners.right1.name": "국방과학연구소 / DTaQ",
      "about.partners.right1.tag": "기술 표준화",
      "about.partners.right1.li1":
        "K-RMF, K-STIG, K-SCAP 시험평가 도구 연구 및 국방 분야 보안통제항목 점검기법 고도화 협력",
      "about.partners.right1.li2":
        "국내 최초 국방표준과 미국표준 적용 개발 완료",
      "about.partners.right2.name": "주요 기관 및 대학 등",
      "about.partners.right2.tag": "산학연 협력",
      "about.partners.right2.li1":
        "KISTI, KAIST, 한국수자원공사, 한밭대학교, 항공우주연구원 등과 다양한 보안 취약점 진단 및 솔루션 구축 협력",
      "about.services.eyebrow": "핵심 사업",
      "about.services.title": "핵심 사업 영역",
      "about.services.desc":
        "보안 컨설팅부터 솔루션 개발 및 공급까지 보안의 전 과정을 제공합니다. 케이비아이는 고객 정보자산을 보호하기 위한 체계적인 서비스와 기술 역량을 보유하고 있습니다.",
      "about.services.card1.title": "01 | 보안 컨설팅",
      "about.services.card1.li1":
        "시스템 취약점 진단 용역 (온프레미스 + 클라우드 CSAP)",
      "about.services.card1.li2": "CCE / CVE / CWE 취약점 진단 용역",
      "about.services.card1.li3":
        "공공부문 사이버보안 실태평가 대응 취약점 진단 용역",
      "about.services.card1.li4": "최신 취약점 연구 및 진단 (예: BPFDoor 등)",
      "about.services.card2.title": "02 | 소프트웨어 개발",
      "about.services.card2.li1": "AI 빅데이터 분석 및 모니터링 솔루션",
      "about.services.card2.li2": "컴플라이언스 준수 시험·평가 자동화 도구",
      "about.services.card2.li3":
        "K-RMF, K-STIG, K-SCAP, CMMC 구현 시험·평가 도구",
      "about.services.card2.li4":
        "시스템 취약점 진단 도구 개발 (온프레미스, 클라우드, CVE)",
      "about.services.card2.li5": "AI, 양자, 블록체인 신기술 개발",
      "about.services.card3.title": "03 | 솔루션",
      "about.services.card3.li1":
        "<strong>BingoCVM:</strong> 시스템 취약점 진단 자동화 (온프레미스 + 클라우드)",
      "about.services.card3.li2":
        "<strong>BingoSRM:</strong> 정보시스템 사고 접수 및 처리 관리",
      "about.services.card3.li3":
        "<strong>BingoTasker:</strong> 정보화 사업 산출물 및 단계별 마일스톤 관리",
      "about.services.card3.li4":
        "<strong>BingoNaru:</strong> DBMS to PostgreSQL 마이그레이션",
      "about.clients.eyebrow": "주요 고객사",
      "about.clients.title": "신뢰받는 50개 이상 고객사",
      "about.clients.desc1":
        '<strong style="color: var(--ink)">BingoCVM</strong>은 국가 주요 정보통신기반시설부터 공공기관, 국방, 연구기관, 정부 부처까지 다양한 분야에서 신뢰받고 있습니다. 20년 이상 축적된 기술력으로 고객의 정보보안을 책임집니다.',
      "about.clients.desc2":
        "다양한 고객 Needs에 대응하기 위한 충실한 R&D 수행 ▶▶▶ 국가주요기관 / 연구·교육기관 / 공공기관·지자체 / 국방 / 민간·IT 기업",
      "about.clients.badgeSub": "취약점진단 자동화 플랫폼",
      "about.clients.cat1": "정부기관 (9)",
      "about.clients.cat2": "연구기관 · 교육기관 (16)",
      "about.clients.cat3": "공공기관 · 지자체 (19)",
      "about.clients.cat4": "국방 (3)",
      "about.clients.cat5": "민간 · IT 기업 (7)",
      "about.clients.g1": "대통령실",
      "about.clients.g2": "국세청",
      "about.clients.g3": "보건복지부",
      "about.clients.g4": "기상청",
      "about.clients.g5": "충청남도 경찰청",
      "about.clients.g6": "충청북도 경찰청",
      "about.clients.g7": "전라남도 경찰청",
      "about.clients.g8": "전라북도 경찰청",
      "about.clients.g9": "광주광역시 경찰청",
      "about.clients.r1": "중이온가속기연구소 (IRIS)",
      "about.clients.r2": "한국항공우주연구원",
      "about.clients.r3": "전자통신연구원 (ETRI)",
      "about.clients.r4": "한국한의학연구원",
      "about.clients.r5": "국립해양생물자원관",
      "about.clients.r6": "한국과학기술원 (KAIST)",
      "about.clients.r7": "기초과학연구원 (IBS)",
      "about.clients.r8": "한국지질자원연구원 (KIGAM)",
      "about.clients.r9": "한국조세재정연구원 (KIPF)",
      "about.clients.r10": "충남대학교",
      "about.clients.r11": "전남대학교",
      "about.clients.r12": "원광대학교",
      "about.clients.r13": "전주비전대학교",
      "about.clients.r14": "충청북도 교육연구정보원",
      "about.clients.r15": "충청북도 교육청",
      "about.clients.r16": "한국과학기술정보연구원 (KISTI)",
      "about.clients.p1": "한전원자력연료",
      "about.clients.p2": "한전KDN",
      "about.clients.p3": "소상공인시장진흥공단",
      "about.clients.p4": "여성과학기술인육성재단 (WISET)",
      "about.clients.p5": "한국소비자원",
      "about.clients.p6": "신용보증재단중앙회",
      "about.clients.p7": "한국산림복지진흥원",
      "about.clients.p8": "한국수자원공사",
      "about.clients.p9": "한국전기공사협회",
      "about.clients.p10": "한국지역정보개발원 (KLID)",
      "about.clients.p11": "코레일테크",
      "about.clients.p12": "청주시",
      "about.clients.p13": "충주시설관리공단",
      "about.clients.p14": "논산시",
      "about.clients.p15": "대전광역시",
      "about.clients.p16": "영동군",
      "about.clients.p17": "공주시",
      "about.clients.p18": "포항시",
      "about.clients.p19": "제주특별자치도",
      "about.clients.d1": "국방과학연구소 (ADD)",
      "about.clients.d2": "국방기술품질원 (DTaQ)",
      "about.clients.d3": "사이버작전사령부",
      "about.clients.it1": "KT Cloud",
      "about.clients.it2": "Gabia Cloud",
      "about.clients.it3": "AhnLab CloudMate",
      "about.clients.it4": "SK Hynix",
      "about.clients.it5": "DASAN",
      "about.clients.it6": "Catenoid",
      "about.clients.it7": "한국정보통신진흥협회 (KAIT)",
      "about.clients.stat1": "정부기관",
      "about.clients.stat2": "연구기관·교육기관",
      "about.clients.stat3": "공공기관·지자체",
      "about.clients.stat4": "국방",
      "about.clients.stat5": "민간·IT 기업",
      "news.featuredVideoDesc":
        "정보통신기반시설 및 클라우드 시스템 취약점진단 자동화 솔루션 BingoCVM을 Video으로 만나보세요. On-Premises부터 Cloud까지 CCE + CVE 통합 진단 기능을 확인하실 수 있습니다.",

      "home.slide3.desc":
        "국가 주요 정보통신기반시설을 비롯해 공공기관, 국방, 연구기관, IT 기업 등 다양한 분야에서 <strong>20년 이상</strong> 신뢰를 받아왔습니다.",

      "home.slide3.viewAll": "전체 고객사 보기",
      "home.bingo.desc":
        "<strong>정보통신기반시설 및 클라우드 시스템 취약점진단 자동화</strong>를 제공하는 (주) 케이비아이의 대표 보안 솔루션입니다. 진단 / 평가 / 분류 / 조치 / 이력 / 보고서까지 원스톱으로 제공합니다.",
      "home.bingo.feat1.title": "국내 컴플라이언스 규정 준수",
      "home.bingo.feat1.desc":
        "KISA 취약점점검 가이드 기준에 따른 체계적인 점검으로 법적 요건을 충족합니다.",
      "home.bingo.feat2.title": "ISMS-P · CSAP 인증 준수 관리",
      "home.bingo.feat2.desc":
        "정보보호관리체계 인증과 클라우드 보안 인증 준수를 위한 체계적 지원을 제공합니다.",
      "home.bingo.feat3.title": "공공기관 사이버보안 실태평가 대응",
      "home.bingo.feat3.desc":
        "정부·공공기관의 사이버보안 실태평가 요구사항에 맞춤 대응합니다.",

      "home.bingo.feat4.desc":
        "자산 등록부터 진단·수집·분석·조치까지 전 과정을 자동화하여 담당자 업무시간을 대폭 단축합니다.",
      "home.bingo.feat5.title": "온프레미스 + 클라우드 통합 진단",

      "home.bingo.sideDesc":
        "Unix/Linux · Windows · PC · Web · DBMS · Network · 가상화 · 클라우드 플랫폼의 취약점 항목을 자동 스케줄 진단합니다.",
      "home.bingo.sol1.desc": "제로트러스트 취약점진단 자동화",
      "home.strip1.label": "Years",
      "home.strip1.desc":
        "2003년 설립 이래 20년 이상 대한민국 정보보안을 책임져온 전문 기업",
      "home.strip2.label": "Clients",
      "home.strip2.desc":
        "국가주요기관, 공공, 국방, 연구·교육, IT 분야에 걸친 50개 이상 주요 고객사",
      "home.strip3.label": "등급 인증",
      "home.strip3.desc":
        "BingoCVM GS 1등급 인증 취득 — 국내 최고 수준의 품질 보증",
      "home.strip4.label": "솔루션",
      "home.strip4.desc": "BingoCVM · BingoSRM · BingoTasker · BingoNaru",
      "product.hero.desc":
        "<strong>정보통신기반시설 및 클라우드 시스템 취약점진단 자동화</strong>를 제공합니다.",
      "product.intro.eyebrow": "도입 효과",
      "product.intro.title": "도입효과 및 핵심 기능",

      "product.intro.effect1.title": "국내 컴플라이언스 규정 준수",
      "product.intro.effect1.desc":
        "KISA 취약점점검 가이드 기준에 따른 체계적인 점검으로 법적 요건을 충족합니다.",
      "product.intro.effect2.title": "ISMS-P, CSAP 인증 획득 및 준수 관리",
      "product.intro.effect2.desc":
        "정보보호관리체계 인증과 클라우드 보안 인증 준수를 위한 체계적 지원을 제공합니다.",
      "product.intro.effect3.title": "공공기관 사이버보안 실태평가 대응",
      "product.intro.effect3.desc":
        "정부·공공기관의 사이버보안 실태평가 요구사항에 맞춤 대응합니다.",
      "product.intro.effect4.title": "전사적 보안 수준 향상 신뢰성 확보",
      "product.intro.effect4.desc":
        "조직 전체 시스템의 보안 취약점을 체계적으로 관리하여 신뢰성을 높입니다.",
      "product.intro.card1.title": "시스템 취약점진단 관리의 쉬운 자동화",
      "product.intro.card1.li1":
        "BingoCVM은 시스템 취약점진단을 자동화(스케줄 관리)하여 담당자의 업무시간을 단축시켜줍니다.",
      "product.intro.card1.li2":
        "조치 관리를 통해서 누가 언제 조치를 어떻게 했고 조치 관련 증빙 자료를 업로드해서 관리할 수 있습니다.",
      "product.intro.card1.li3":
        "초기 진단과 조치 이후 진단 내역을 비교하는 비교 보고서 다운로드가 가능합니다.",

      "product.intro.card2.title": "온프레미스 및 클라우드 시스템 취약점 진단",
      "product.intro.card2.li1":
        "온프레미스에서 클라우드 시스템까지 모두 하나의 플랫폼 BingoCVM에서 취약점진단이 가능합니다.",
      "product.intro.card2.li2":
        "진단 대상: Unix/Linux 서버, Windows 서버, PC, 웹, DBMS, Network, 가상화, 클라우드 플랫폼의 취약점 항목을 자동 스케줄 진단할 수 있습니다.",
      "product.process.eyebrow": "취약점 진단 프로세스",
      "product.process.title": "5단계 체계적 취약점 진단 프로세스",
      "product.process.desc":
        "BingoCVM의 취약점 진단 프로세스는 체계적이고 단계적인 접근으로 빠짐없는 취약점관리를 실현합니다. 취약점 진단 주요단계는 자산등록, 취약점진단, 취약점분석, 취약점조치, 이행점검으로 이루어집니다.",
      "product.process.step1.name": "자산등록",
      "product.process.step1.li1":
        "모든 IT 자산을 Agent 또는 Non-Agent 방식으로 식별하여 등록",
      "product.process.step2.name": "취약점 진단",
      "product.process.step2.li1":
        "CCE 진단 스크립트를 자동으로 배포·실행하고 결과 파일을 수집",
      "product.process.step2.li2":
        "CVE 기반 자산 자동 매핑으로 스캔 결과를 통합 수집 (2026년 적용)",
      "product.process.step2.badge": "자동화",
      "product.process.step3.name": "취약점 분석",
      "product.process.step3.li1":
        "수집된 CCE 시스템취약점진단 결과를 분석하여 항목을 취약 / 양호 / 예외로 분류",
      "product.process.step3.li2":
        "CVE 소프트웨어 취약점 기반 AI 분석으로 취약점에 대한 정밀 분석 수행 (2026년 적용)",
      "product.process.step3.badge": "AI 분석",
      "product.process.step4.name": "취약점 조치",
      "product.process.step4.li1":
        "발견된 취약점에 대해 수동 또는 자동으로 조치 수행",
      "product.process.step4.li2":
        "AI 엔진을 활용한 조치 가이드를 제공 (2026년 적용)",
      "product.process.step4.li3": "조치 이력과 증적 자료를 체계적으로 저장",
      "product.process.step4.badge": "AI 조치",
      "product.process.step5.name": "이행 점검",
      "product.process.step5.li1":
        "조치 완료 후 재진단을 수행하여 이행 여부를 검증",
      "product.process.step5.li2":
        "최종 진단 보고서 및 비교 보고서 제공 (다운로드 가능)",
      "product.cceCve.eyebrow": "취약점 유형 소개",

      "product.cceCve.desc":
        "BingoCVM은 <strong>CCE(시스템 취약점)</strong>와 <strong>CVE(소프트웨어 취약점)</strong> 두 가지 유형을 통합 진단합니다. <br />설정 오류부터 알려진 버그까지, 하나의 플랫폼에서 모두 관리합니다.",
      "product.cceCve.left.badge": "Common Configuration Enumeration",
      "product.cceCve.left.title": "CCE 시스템취약점 개요",
      "product.cceCve.left.overview":
        "CCE는 시스템과 소프트웨어의 보안 설정 오류(Configuration Weakness)를 표준 식별번호로 관리하는 체계입니다.",
      "product.cceCve.left.kisaTitle": "KISA의 취약점 표준 체계",
      "product.cceCve.left.kisaDesc":
        "대한민국에서는 한국인터넷진흥원(KISA)이 주요 정보보호 취약점 기준을 관리·보급합니다. 다음과 같은 국내 표준 취약점 점검 기준을 제공합니다.",
      "product.cceCve.left.std1":
        "① 주요정보통신기반시설 기술적 취약점 분석·평가 기준",
      "product.cceCve.left.std1.li1": "전자정부, 공공기관 대상",
      "product.cceCve.left.std1.li2":
        "서버/네트워크/DB/보안장비 점검 항목 제공",
      "product.cceCve.left.std1.li3":
        "항목 구조는 CCE 개념과 유사 (설정 기반 점검)",
      "product.cceCve.left.std2":
        "② 국가 정보보안 기본지침 / 전자정부 보안 가이드",
      "product.cceCve.left.std2.li1": "계정관리",
      "product.cceCve.left.std2.li2": "접근통제",
      "product.cceCve.left.std2.li3": "로그관리",
      "product.cceCve.left.std2.li4": "암호정책",
      "product.cceCve.right.badge": "Common Vulnerabilities and Exposures",
      "product.cceCve.right.title": "CVE 소프트웨어취약점 개요",
      "product.cceCve.right.overview":
        "CVE는 소프트웨어나 하드웨어 제품에 존재하는 보안 취약점(버그)에 부여되는 고유 식별번호입니다.",
      "product.cceCve.right.keyDetails": "CVE 취약점의 주요 내용",
      "product.cceCve.right.key.li1":
        "<strong>CVE 의미</strong>: 소프트웨어 결함",
      "product.cceCve.right.key.li2":
        "<strong>CVE 대상</strong>: 소프트웨어 제품 코드 취약점",
      "product.cceCve.right.key.li3":
        "<strong>CVE 약점</strong>: 해커가 직접 공격 가능",
      "product.cceCve.right.key.li4":
        "<strong>CVE 해결</strong>: 소프트웨어 취약점 점검 및 패치",
      "product.cceCve.right.characteristics": "CVE의 특징",
      "product.cceCve.right.char.li1": "실제 공격 가능한 코드 취약점",
      "product.cceCve.right.char.li2":
        "<strong>형식</strong>: CVE-연도-번호<br />예: CVE-2024-12345",
      "product.cceCve.right.char.li3": "CVSS 점수와 연계 (위험도 평가)",
      "product.cceCve.right.examples": "CVE 예시",
      "product.cceCve.right.example1":
        "<code>CVE-2021-44228</code><br />Apache Log4j의 Log4Shell 원격 코드 실행 취약점",
      "product.cceCve.right.example2":
        "<code>CVE-2017-0144</code><br />Microsoft Windows SMB 취약점 (WannaCry 악용)",
      "product.architecture.desc":
        "BingoCVM의 시스템은 <strong>Manager Server(App + Core)</strong>와 <strong>Device/Agent(Client License)</strong>로 구성됩니다. 온프레미스/클라우드 모두 자동진단 방식을 Agent + Non-Agent(기본) 모두 지원합니다.",
      "product.architecture.imageSrc":
        "../../images/BingoCVMArchitectureKR.png",
      "product.platforms.desc":
        "BingoCVM은 KISA 취약점점검 가이드 기준으로 고객사의 다양한 시스템 환경에 맞춰 최적화된 진단 서비스를 제공합니다. 온프레미스부터 클라우드까지 폭넓은 지원 범위를 자랑합니다.",
      "product.features.eyebrow": "주요 기능 및 특장점",
      "product.features.title": "기능 및 특장점",
      "product.features.desc":
        "BingoCVM은 정보통신기반시설 및 클라우드 시스템 취약점진단 자동화를 제공합니다. 시스템 취약점 진단/평가/분류/조치/이력/보고서까지 편리한 서비스를 제공합니다.",

      "product.features.left.title": "기능",
      "product.features.left.li1":
        "자동/수동/스케줄 진단을 지원하며, 진단 결과 및 로그 분석, 조치/중점 이력까지 원스톱 관리가 가능합니다.",
      "product.features.left.li2":
        "자산별·그룹별 보고서 생성 및 진단 가이드/스크립트의 유연한 커스터마이징 기능을 제공합니다.",
      "product.features.right.title": "특장점",

      "product.features.right.li2":
        "국내 최초로 Agent 및 Non-Agent 혼합 스케줄 진단을 지원하여 다양한 환경에 최적화된 진단이 가능합니다.",
      "product.features.right.li3":
        "On-Premise + Cloud 자산을 하나의 플랫폼에서 취약점 진단합니다.",
      "product.features.right.li4":
        "CCE 시스템취약점, CVE 소프트웨어취약점을 하나의 플랫폼에서 진단합니다.",
      "product.features.right.li5":
        "Network Scanner 기능을 통해 IP, Port, Service 정보를 효율적으로 스캔합니다. 또한 Blacklist·Whitelist 정책 기반 탐지를 지원하여, 불필요하거나 비인가된 IP·Port를 주기적으로 점검하고 관리할 수 있습니다.",
      "contact.channels.eyebrow": "연락처 안내",
      "contact.channels.title": "문의 채널",
      "contact.channels.desc":
        "<strong>전화, 팩스, 홈페이지</strong> 등 다양한 채널로 문의하실 수 있습니다.<br />영업 담당자가 신속하게 안내해 드리겠습니다.",
      "contact.channels.card1.label": "영업 대표 1",
      "contact.channels.card1.sub": "영업·기술 상담 전화",
      "contact.channels.card2.label": "영업 대표 2",
      "contact.channels.card2.sub": "영업 상담 전화",
      "contact.channels.card3.label": "홈페이지",
      "contact.channels.card3.sub": "회사 및 제품 정보 제공",
      "contact.hours.text":
        "운영 시간 <span>평일 09:00 – 18:00 &nbsp;|&nbsp; 점심 12:00 – 13:00</span>",
      "contact.hours.pill1": "월–금 운영",
      "contact.hours.pill2": "토·일·공휴일 휴무",
      "contact.map.coords": "(주)케이비아이",
      "contact.map.title": "(주)케이비아이 찾아오시는 길",
      "contact.map.address": "대전광역시 서구 둔산대로117번길 44, 415호",
      "contact.map.meta1": "설립 2003년",
      "contact.map.meta2": "대전 서구",
      "contact.map.link": "카카오맵에서 보기 →",
      "contact.faq.eyebrow": "자주 묻는 질문",
      "contact.faq.title": "문의 전 확인해보세요",
      "contact.faq.desc":
        "영업 문의 전 자주 묻는 질문을 먼저 확인해 보세요.<br /><strong>추가 문의는 이메일(bingocvm@kbisys.com)</strong>로 주시면 빠르게 안내드립니다.",
      "contact.faq.q1": "BingoCVM 무료 체험 또는 데모 시연이 가능한가요?",
      "contact.faq.q2": "조달청을 통한 구매는 어떻게 진행되나요?",
      "contact.faq.q3": "클라우드 환경(CSAP)에서도 사용 가능한가요?",
      "contact.faq.q4":
        "K-RMF, K-STIG, K-SCAP 관련 국방 분야 지원도 가능한가요?",
      "contact.faq.q5": "기술 교육 및 운영 지원도 제공하나요?",
      "contact.faq.a1":
        "네, 가능합니다. 이메일(bingocvm@kbisys.com)로 연락 주시면 온라인 데모 시연 일정을 협의해드립니다. 도입 환경에 맞는 맞춤형 시연을 제공하며, POC(기술검증) 진행도 요청하실 수 있습니다.",
      "contact.faq.a2":
        '<strong>조달청 디지털서비스몰(<a href="https://digitalmall.g2b.go.kr/" target="_blank" rel="noopener">digitalmall.g2b.go.kr</a>)</strong>에서 \'케이비아이\' 또는 \'BingoCVM\'으로 검색하여 구매하실 수 있습니다.',
      "contact.faq.a3":
        "BingoCVM은 온프레미스와 클라우드 환경 모두 지원합니다. 또한 CSAP(클라우드 보안인증) 심사 도구로도 활용할 수 있습니다.",
      "contact.faq.a4":
        "네. ㈜케이비아이는 국방과학연구소, 국방기술품질원(DTaQ)과 협력하여 K-RMF, K-STIG, K-SCAP 시험평가 도구를 개발했습니다. 국내 최초로 국방표준과 미국표준을 동시 적용한 도구를 개발·납품한 경험이 있습니다.",
      "contact.faq.a5":
        "㈜케이비아이는 도입 후 정보보안 기술 교육 및 실습 서비스를 별도로 제공합니다. 제품 사용 교육은 물론, CCE/CVE 취약점 진단 방법론, 보안컨설팅 실무 등 고객 맞춤형 교육 프로그램을 운영합니다.",
      "news.kisaGuide.title":
        "주요정보통신기반시설 기술적 취약점 분석·평가 방법 상세가이드 업데이트",
      "news.kisaGuide.excerpt":
        "2025년 12월 24일 KISA의 주요정보통신기반시설 기술적 취약점 분석 및 평가 방법 상세 가이드가 업데이트되었습니다.",
      "news.kisaGuide.body1":
        "저희 BingoCVM 팀은 KISA의 새롭게 업데이트된 표준에 부합하는 정확한 진단을 위해 연구 및 시스템 고도화를 진행하고 있습니다.",
      "news.kisaGuide.body2":
        "현재 BingoCVM은 주요 관공서 및 공공기관에 납품되어 다수의 고객사에서 활발히 활용되고 있습니다. 상세한 내용은 추후 게시글에서 공유드리겠습니다.",
      "news.kisaGuide.body3": "감사합니다.",
      "news.kisaGuide.source":
        "출처: KISA(한국인터넷진흥원) › 지식플랫폼 › 법령·가이드라인 › 가이드라인 › 보안취약점 및 침해사고 대응",
      "news.krmf.title":
        "K-RMF 보안통제항목 점검목적의 SW자동화점검도구 개발 2년 연속 수주",
      "news.krmf.excerpt":
        "㈜케이비아이는 국방기술품질원에서 발주하는 K-RMF 보안통제항목 점검 목적의 SW자동화 점검 도구 개발 연구용역을 2025년·2026년 연이어 수주했습니다.",
      "news.krmf.body1":
        "K-RMF를 위한 SW자동화 점검도구 개발 연구용역을 통한 기대효과는 다음과 같습니다.",
      "news.krmf.body2":
        "<strong>사이버 보안 공백 방어:</strong><br />기준선 적용만으로는 대응하기 어려운 기술적 방어 공백을 자동화 도구를 통해 식별 및 보완",
      "news.krmf.body3":
        "<strong>획득 프로세스 연동:</strong><br />무기체계 획득 및 전력화 단계에서 요구되는 복잡한 보안 인증 심사 절차를 체계적으로 지원",
      "news.krmf.body4":
        "<strong>美 RMF 자동화 도구 분석 수용:</strong><br />미국의 RMF(Risk Management Framework) 보안 자동화 도구 사례를 분석하고 국내 국방 환경에 최적화된 도구 설계",
      "news.recentPosts.title": "최근 게시글",
      "news.recentPosts.post1": "K-RMF SW자동화점검도구 개발 2년 연속 수주",
      "news.recentPosts.post2": "BingoCVM 소개 영상",
      "news.recentPosts.post3": "KISA 취약점 분석 가이드 업데이트",
      "news.showMore": "더보기",
      "news.collapse": "접기",
      "news.itemsSuffix": "개 항목",
      "footer.sitemap": "사이트맵",
      "footer.contact": "문의",
      "footer.addressLabel": "주소",
      "footer.addressValue": "대전광역시 서구 둔산대로117번길 44, 415호",
      "footer.emailLabel": "이메일",
      "footer.salesLabel": "영업문의",
      "footer.copyright": "© 2026 케이비아이(주) All rights reserved.",
    },
    en: {
      "common.skipToContent": "Skip to content",
      "nav.logoAria": "BingoCVM Home",
      "nav.mainMenuAria": "Main menu",
      "nav.home": "Home",
      "nav.product": "Products",
      "nav.about": "About",
      "nav.news": "News",
      "nav.contact": "Contact Sales",
      "nav.buyLabel": "Digital Service Mall",
      "nav.toggleOpen": "Open menu",
      "nav.toggleClose": "Close menu",
      "lang.switchToEnglish": "Switch to English",
      "lang.switchToKorean": "Switch to Korean",
      "footer.platformSub": "Automated Vulnerability Scan Platform",
      "footer.sitemap": "Sitemap",
      "footer.contact": "Contact",
      "footer.addressLabel": "Address",
      "footer.addressValue":
        "Room 415, 44 Dunsan-daero 117beon-gil, Seo-gu, Daejeon, Republic of Korea",
      "footer.emailLabel": "Email",
      "footer.salesLabel": "Sales",
      "footer.copyright":
        "© 2026 KBI e-Security Consulting Co., Ltd. All rights reserved.",
      "about.hero.mainText":
        "<strong>KBI Co., Ltd.</strong> has built <strong>trust and confidence</strong> in corporate security through <strong>AI Big Data Analysis-based Security Vulnerability Scan Technology</strong>.",
      "about.history.eyebrow": "MAJOR HISTORY",
      "about.history.title": "Company History & Major Achievements",
      "about.history.desc":
        "KBI Co., Ltd. builds trust and confidence in corporate security through AI Big Data Analysis-based Security Vulnerability Scan Technology.",
      "about.history.tl1.title": "Founding·Core Technology",
      "about.history.tl1.li1": "Established KBI Co., Ltd. (2003)",
      "about.history.tl1.li2": "NSR cyber-terror response system development",
      "about.history.tl1.li3":
        "NSR smart-grid vulnerability analysis system development",
      "about.history.tl1.li4":
        "Secured core vulnerability scan & analysis technology",
      "about.history.tl2.title": "Productization·Certification",
      "about.history.tl2.li1": "Corporate R&D center established",
      "about.history.tl2.li2": "BingoCVM solution launched (2018)",
      "about.history.tl2.li3": "GS Grade 1 certification (2018)",
      "about.history.tl2.li4": "National Tax Service deployment",
      "about.history.tl3.title": "Expanding References",
      "about.history.tl3.li1":
        "K-water intelligent vulnerability scan tool project",
      "about.history.tl3.li2": "Registered on PPS e-procurement mall",
      "about.history.tl3.li3": "ADD vulnerability scan tool development",
      "about.history.tl3.li4":
        "KT satellite service & failure prediction system development",
      "about.history.tl4.title": "Gov-wide·Cloud Expansion",
      "about.history.tl4.li1":
        "BingoCVM Presidential Office·MOHW·KMA deployments",
      "about.history.tl4.li2": "BingoCVM KEPCO NF·ETRI deployments",
      "about.history.tl4.li3":
        "KAIT cloud certification audit tool developed & delivered",
      "about.history.tl4.li4":
        "AhnLab Cloud CSAP (Cloud Security Assurance Program)",
      "about.history.tl5.title": "Recent Milestones·Advancement",
      "about.history.tl5.li1": "System, software, network scan integrated",
      "about.history.tl5.li2": "DTaQ K-RMF-based SW scan tool development",
      "about.history.tl5.li3": "Nationwide police agency system scans",
      "about.history.tl5.li4":
        "AhnLab vulnerability scan technology partnership",
      "about.history.era1.label": "ERA 01",
      "about.history.era1.title": "Foundation & Technology Base Building",
      "about.history.era1.li1":
        "Participated in Cyber Terrorism Response System development (NSR)",
      "about.history.era1.li2":
        "Acquired KEPCO Control Network Vulnerability Analysis technology",
      "about.history.era1.li3":
        "Established Smart Grid Security research foundation",
      "about.history.era2.label": "ERA 02",
      "about.history.era2.title": "Product Launch & Reference Expansion Era",
      "about.history.era2.li1": "Acquired BingoCVM GS Grade 1 certification",
      "about.history.era2.li2":
        "Delivered to Agency for Defense Development & National Tax Service",
      "about.history.era2.li3":
        "Completed Public Procurement Service Online Mall registration",
      "about.history.era3.label": "ERA 03",
      "about.history.era3.title": "Cloud & Defense Standardization Leadership",
      "about.history.era3.li1":
        "Participated in CSAP Cloud security certification Scans",
      "about.history.era3.li2": "Standardized K-RMF / K-STIG / K-SCAP",
      "about.history.era3.li3":
        "Delivered to Office of the President & National Police Agency (Nationwide)",
      "about.partners.eyebrow": "Partner Organizations",
      "about.partners.title": "Major Partner Organizations in R&D",
      "about.partners.desc":
        "KBI Co., Ltd. actively conducts research and development projects in collaboration with major domestic institutions. We have established a broad collaborative network ranging from core security technology research to standardization initiatives in the defense and public sectors.",
      "about.partners.left1.name": "National Security Research Institute (NSR)",
      "about.partners.left1.tag": "Core Technology Cooperation",
      "about.partners.left1.li1":
        "Joint research and development on national core security technologies, including cyber terrorism response systems, KEPCO control networks, and smart grid vulnerability analysis.",
      "about.partners.left2.name": "ETRI / KAIT",
      "about.partners.left2.tag": "ICT Convergence Research",
      "about.partners.left2.li1":
        "Development of K-RMF automation tools, execution of CSAP cloud security certification Scan tool contracts, and annual technical support services.",
      "about.partners.left2.li2":
        "CSAP execution for Gabia, AhnLab, and KT Cloud.",
      "about.partners.left2.li3": "CSAP cooperation with Kakao Cloud.",
      "about.partners.center.logoAlt": "KBI e-Security Consulting",
      "about.partners.center.sub": "E-SECURITY<br />CONSULTING",
      "about.partners.right1.name":
        "Agency for Defense Development (ADD) / DTaQ",
      "about.partners.right1.tag": "Technical Standardization",
      "about.partners.right1.li1":
        "Research on K-RMF, K-STIG, and K-SCAP test evaluation tools, as well as collaboration on advancing inspection methodologies for defense security control items.",
      "about.partners.right1.li2":
        "Completed Korea's first development applying both domestic defense standards and US standards.",
      "about.partners.right2.name": "Major Institutions & Universities",
      "about.partners.right2.tag": "Industry-Academia-Research Cooperation",
      "about.partners.right2.li1":
        "Security vulnerability Scan and solution implementation collaboration with various organizations including KISTI, KAIST, Korea Water Resources Corporation (K-water), Hanbat National University, and Korea Aerospace Research Institute (KARI).",
      "about.services.eyebrow": "Core Business",
      "about.services.title": "Core Business Areas",
      "about.services.desc":
        "We provide the entire security process, from security consulting to solution development and supply. KBI Co., Ltd. possesses systematic services and technological capabilities to protect client information assets.",
      "about.services.card1.title": "01 | Security Consulting",
      "about.services.card1.li1":
        "System vulnerability Scan services (On-Premise + Cloud CSAP)",
      "about.services.card1.li2": "CCE / CVE / CWE vulnerability Scan services",
      "about.services.card1.li3":
        "Vulnerability Scan services for public sector cybersecurity evaluation compliance",
      "about.services.card1.li4":
        "Latest vulnerability research and Scan (e.g., BPFDoor, etc.)",
      "about.services.card2.title": "02 | Software Development",
      "about.services.card2.li1":
        "AI Big Data analysis and monitoring solutions",
      "about.services.card2.li2":
        "Compliance testing and evaluation automation tools",
      "about.services.card2.li3":
        "Test and evaluation tools implementing K-RMF, K-STIG, K-SCAP, and CMMC",
      "about.services.card2.li4":
        "System vulnerability Scan tool development (On-Premise, Cloud, CVE)",
      "about.services.card2.li5":
        "Emerging technology development in AI, Quantum, and Blockchain",
      "about.services.card3.title": "03 | Solutions",
      "about.services.card3.li1":
        "<strong>BingoCVM:</strong> System vulnerability Scan automation (On-Premise + Cloud)",
      "about.services.card3.li2":
        "<strong>BingoSRM:</strong> Information system incident receipt and handling management",
      "about.services.card3.li3":
        "<strong>BingoTasker:</strong> Information project deliverable and milestone management",
      "about.services.card3.li4":
        "<strong>BingoNaru:</strong> DBMS to PostgreSQL migration",
      "about.clients.eyebrow": "Key Clients",
      "about.clients.title": "Trusted by Over 50 Clients",
      "about.clients.desc1":
        "BingoCVM is trusted across various sectors, ranging from national critical information infrastructure to public agencies, defense, research institutes, and government offices. With over 20 years of accumulated technological expertise, we take full responsibility for securing customer information.",
      "about.clients.desc2":
        "Faithful R&D execution to meet diverse customer needs ▶▶▶ Government Agencies / Research & Educational Institutions / Public Enterprise & Local Government / Defense / Private & IT",
      "about.clients.badgeSub": "Vulnerability Scan Automation Platform",
      "about.clients.cat1": "Government Agencies (9)",
      "about.clients.cat2": "Research & Educational Institutions (16)",
      "about.clients.cat3": "Public Institutions & Local Governments (19)",
      "about.clients.cat4": "Defense (3)",
      "about.clients.cat5": "Private Sector & IT Companies (7)",
      "about.clients.g1": "Office of the President",
      "about.clients.g2": "National Tax Service",
      "about.clients.g3": "Ministry of Health and Welfare",
      "about.clients.g4": "Korea Meteorological Administration",
      "about.clients.g5": "Chungnam Provincial Police Agency",
      "about.clients.g6": "Chungbuk Provincial Police Agency",
      "about.clients.g7": "Jeonnam Provincial Police Agency",
      "about.clients.g8": "Jeonbuk Provincial Police Agency",
      "about.clients.g9": "Gwangju Metropolitan Police Agency",
      "about.clients.r1": "Rare Isotope Science Project (IRIS)",
      "about.clients.r2": "Korea Aerospace Research Institute (KARI)",
      "about.clients.r3":
        "Electronics and Telecommunications Research Institute (ETRI)",
      "about.clients.r4": "Korea Institute of Oriental Medicine (KIOM)",
      "about.clients.r5": "National Institute of Marine Biodiversity (MABIK)",
      "about.clients.r6":
        "Korea Advanced Institute of Science and Technology (KAIST)",
      "about.clients.r7": "Institute for Basic Science (IBS)",
      "about.clients.r8":
        "Korea Institute of Geoscience and Mineral Resources (KIGAM)",
      "about.clients.r9": "Korea Institute of Public Finance (KIPF)",
      "about.clients.r10": "Chungnam National University",
      "about.clients.r11": "Chonnam National University",
      "about.clients.r12": "Wonkwang University",
      "about.clients.r13": "Jeonju Vision University",
      "about.clients.r14":
        "Chungcheongbuk-do Education Research & Information Institute",
      "about.clients.r15": "Chungcheongbuk-do Office of Education",
      "about.clients.r16":
        "Korea Institute of Science and Technology Information (KISTI)",
      "about.clients.p1": "KEPCO Nuclear Fuel",
      "about.clients.p2": "KDN",
      "about.clients.p3": "Small Enterprise and Market Service (SEMAS)",
      "about.clients.p4":
        "Center for Women in Science, Engineering and Technology (WISET)",
      "about.clients.p5": "Korea Consumer Agency",
      "about.clients.p6": "National Credit Union Federation of Korea",
      "about.clients.p7": "Korea Forest Welfare Institute",
      "about.clients.p8": "Korea Water Resources Corporation (K-water)",
      "about.clients.p9": "Korea Electrical Contractors Association",
      "about.clients.p10":
        "Korea Local Information Research & Development Institute (KLID)",
      "about.clients.p11": "Korail Tech",
      "about.clients.p12": "Cheongju City",
      "about.clients.p13": "Chungju Facilities Management Corporation",
      "about.clients.p14": "Nonsan City",
      "about.clients.p15": "Daejeon Metropolitan City",
      "about.clients.p16": "Yeongdong County",
      "about.clients.p17": "Gongju City",
      "about.clients.p18": "Pohang City",
      "about.clients.p19": "Jeju Special Self-Governing Province",
      "about.clients.d1": "Agency for Defense Development (ADD)",
      "about.clients.d2": "Defense Agency for Technology and Quality (DTaQ)",
      "about.clients.d3": "Cyber Operations Command",
      "about.clients.it1": "KT Cloud",
      "about.clients.it2": "Gabia Cloud",
      "about.clients.it3": "AhnLab CloudMate",
      "about.clients.it4": "SK Hynix",
      "about.clients.it5": "DASAN",
      "about.clients.it6": "Catenoid",
      "about.clients.it7": "Korea Association for ICT Promotion (KAIT)",
      "about.clients.stat1": "Government Agencies",
      "about.clients.stat2": "Research & Educational Institutions",
      "about.clients.stat3": "Public Institutions & Local Governments",
      "about.clients.stat4": "Defense",
      "about.clients.stat5": "Private Sector & IT Companies",
      "news.featuredVideoDesc":
        "Watch the video introduction for BingoCVM, the automated vulnerability Scan solution for critical information infrastructure and cloud systems. You can check out its integrated CCE + CVE Scan features across on-premise and cloud environments",
      "home.slide2.desc":
        "Delivers a seamless one-stop experience from asset registration to Scan, analysis, remediation, and reporting using our proprietary <strong>ATC Automation Engine</strong>.",

      "home.slide3.desc":
        "Trusted for <strong>over 20 years</strong> across various sectors including critical national information infrastructure, public institutions, defense, research institutes, and IT companies.",
      "home.slide3.viewAll": "View All Clients",
      "home.bingo.desc":
        "KBI Co., Ltd.'s flagship security solution providing <strong>vulnerability Scan automation for critical information infrastructure and cloud systems</strong>. It delivers a one-stop workflow covering Scan, evaluation, classification, remediation, history tracking, and reporting.",
      "home.bingo.feat1.title": "Domestic Compliance Standards Compliance",
      "home.bingo.feat1.desc":
        "Meets legal requirements through systematic inspections based on KISA vulnerability Scan guidelines.",
      "home.bingo.feat2.title":
        "ISMS-P & CSAP Certification Compliance Management",
      "home.bingo.feat2.desc":
        "Provides structured support for maintaining Information Security Management System (ISMS) certification and Cloud Security Assurance Program (CSAP) compliance.",
      "home.bingo.feat3.title":
        "Response to Public Institution Cybersecurity Evaluations",
      "home.bingo.feat3.desc":
        "Addresses requirements for government and public sector cybersecurity Scan evaluations.",
      "home.bingo.feat4.title": "Proprietary ATC Automation Engine",
      "home.bingo.feat4.desc":
        "Automates the entire workflow from asset registration to Scan, collection, analysis, and remediation, significantly reducing administrative workload.",
      "home.bingo.feat5.title": "Integrated On-Premise + Cloud Scan",
      "home.bingo.feat5.desc":
        "Enables combined CCE + CVE vulnerability Scan for both on-premise and cloud assets within a single platform.",
      "home.bingo.sideDesc":
        "Automatically schedules and diagnoses vulnerability items across Unix/Linux, Windows, PC, Web, DBMS, Network, Virtualization, and Cloud platforms.",
      "home.bingo.sol1.desc": "Zero Trust vulnerability Scan automation",
      "home.strip1.label": "Years",
      "home.strip1.desc":
        "A specialized company that has taken full responsibility for South Korea's information security for over 20 years since its founding in 2003.",
      "home.strip2.label": "Clients",
      "home.strip2.desc":
        "Over 50 major client organizations spanning national key institutions, public, defense, research & education, and IT sectors.",
      "home.strip3.label": "Grade Certified",
      "home.strip3.desc":
        "BingoCVM acquired GS Certification Grade 1 - Guaranteed top-tier quality in Korea.",
      "home.strip4.label": "Solutions",
      "home.strip4.desc": "BingoCVM · BingoSRM · BingoTasker · BingoNaru",
      "product.hero.desc":
        "Provides <strong>vulnerability Scan automation for critical information infrastructure and cloud systems</strong>.",
      "product.intro.eyebrow": "Adoption Effects",
      "product.intro.title": "Adoption Effects & Key Features",

      "product.intro.effect1.title":
        "Domestic Compliance Guidelines Compliance",
      "product.intro.effect1.desc":
        "Meets legal requirements through systematic Scans based on KISA vulnerability Scan guidelines.",
      "product.intro.effect2.title":
        "ISMS-P & CSAP Certification Acquisition and Compliance Management",
      "product.intro.effect2.desc":
        "Provides structured support for acquiring and maintaining compliance with Information Security Management System (ISMS) and Cloud Security Assurance Program (CSAP) certifications.",
      "product.intro.effect3.title":
        "Response to Public Institution Cybersecurity Evaluation",
      "product.intro.effect3.desc":
        "Responds in accordance with cybersecurity evaluation requirements for government and public institutions.",
      "product.intro.effect4.title":
        "Enhanced Security Level and Reliability Across the Enterprise",
      "product.intro.effect4.desc":
        "Increases reliability by systematically managing security vulnerabilities across all organizational systems.",
      "product.intro.card1.title":
        "Easy Automation of System Vulnerability Scan Management",
      "product.intro.card1.li1":
        "BingoCVM automates system vulnerability Scans (schedule management) to reduce administrative workload.",
      "product.intro.card1.li2":
        "Through action/remediation management, you can track who took action, when, and how, as well as upload and manage supporting evidence.",
      "product.intro.card1.li3":
        "Allows downloading comparative reports that contrast initial Scans with post-remediation results.",

      "product.intro.card2.title":
        "On-Premise & Cloud System Vulnerability Scan",
      "product.intro.card2.li1":
        "Vulnerability Scan is possible across all systems, from on-premise to cloud, within a single platform (BingoCVM).",
      "product.intro.card2.li2":
        "Scan Targets: Automatically schedules and diagnoses vulnerability items across Unix/Linux servers, Windows servers, PCs, Web, DBMS, Network, Virtualization, and Cloud platforms.",
      "product.process.eyebrow": "Vulnerability Scan Process",
      "product.process.title": "5-Step Systematic Vulnerability Scan Process",
      "product.process.desc":
        "BingoCVM's vulnerability Scan process delivers thorough vulnerability management through a systematic, step-by-step approach. The main stages consist of Asset Registration, Vulnerability Scan, Vulnerability Analysis, Vulnerability Remediation, and Implementation Inspection.",
      "product.process.step1.name": "Asset Registration",
      "product.process.step1.li1":
        "Identifies and registers all IT assets using Agent or Non-Agent methods.",
      "product.process.step2.name": "Vulnerability Scan",
      "product.process.step2.li1":
        "Automatically deploys and executes CCE Scan scripts, then collects result files.",
      "product.process.step2.li2":
        "Consolidates scan results through CVE-based asset mapping (Applied in 2026).",
      "product.process.step2.badge": "[Automated]",
      "product.process.step3.name": "Vulnerability Analysis",
      "product.process.step3.li1":
        "Analyzes collected CCE system vulnerability check results to classify items into Vulnerable / Good / Exception.",
      "product.process.step3.li2":
        "Performs in-depth analysis on vulnerabilities using CVE software vulnerability-based AI analysis (Applied in 2026).",
      "product.process.step3.badge": "[AI Analysis]",
      "product.process.step4.name": "Vulnerability Remediation",
      "product.process.step4.li1":
        "Executes remediation manually or automatically for discovered vulnerabilities.",
      "product.process.step4.li2":
        "Provides remediation guides leveraging the AI engine (Applied in 2026).",
      "product.process.step4.li3":
        "Systematically saves remediation history and supporting evidence.",
      "product.process.step4.badge": "[AI Remediation]",
      "product.process.step5.name": "Implementation Inspection",
      "product.process.step5.li1":
        "Performs re-Scan after remediation to verify compliance.",
      "product.process.step5.li2":
        "Provides final Scan reports and comparison reports (Available for download).",
      "product.cceCve.eyebrow": "Vulnerability Types Overview",

      "product.cceCve.desc":
        "BingoCVM provides integrated Scan for both <strong>CCE (system vulnerabilities)</strong> and <strong>CVE (software vulnerabilities)</strong>. Manage everything from configuration errors to known bugs in a single platform.",
      "product.cceCve.left.badge": "Common Configuration Enumeration",
      "product.cceCve.left.title": "CCE System Vulnerability Overview",
      "product.cceCve.left.overview":
        "CCE is a system for managing security configuration errors (Configuration Weaknesses) in systems and software using standardized identification numbers.",
      "product.cceCve.left.kisaTitle":
        "KISA's Standard Vulnerability Framework",
      "product.cceCve.left.kisaDesc":
        "In South Korea, the Korea Internet & Security Agency (KISA) manages and distributes key cybersecurity vulnerability standards. It provides the following domestic standard vulnerability Scan guidelines:",
      "product.cceCve.left.std1":
        "① Technical Vulnerability Analysis & Evaluation Standards for Critical Information Infrastructure",
      "product.cceCve.left.std1.li1":
        "Targets e-government and public institutions",
      "product.cceCve.left.std1.li2":
        "Provides inspection items for servers, networks, databases, and security equipment",
      "product.cceCve.left.std1.li3":
        "Item structure is similar to the CCE concept (configuration-based inspection)",
      "product.cceCve.left.std2":
        "② National Information Security Basic Guidelines / E-Government Security Guide",
      "product.cceCve.left.std2.li1": "Account Management",
      "product.cceCve.left.std2.li2": "Access Control",
      "product.cceCve.left.std2.li3": "Log Management",
      "product.cceCve.left.std2.li4": "Encryption Policy",
      "product.cceCve.right.badge": "Common Vulnerabilities and Exposures",
      "product.cceCve.right.title": "CVE Software Vulnerability Overview",
      "product.cceCve.right.overview":
        "CVE is a unique identification number assigned to security vulnerabilities (bugs) present in software or hardware products.",
      "product.cceCve.right.keyDetails": "Key Details of CVE Vulnerabilities",
      "product.cceCve.right.key.li1":
        "<strong>CVE Meaning</strong>: Software defect",
      "product.cceCve.right.key.li2":
        "<strong>CVE Target</strong>: Software product code vulnerabilities",
      "product.cceCve.right.key.li3":
        "<strong>CVE Weakness</strong>: Can be directly exploited by hackers",
      "product.cceCve.right.key.li4":
        "<strong>CVE Solution</strong>: Software vulnerability check and patch",
      "product.cceCve.right.characteristics": "Characteristics of CVE",
      "product.cceCve.right.char.li1":
        "Vulnerabilities with code capable of actual attacks",
      "product.cceCve.right.char.li2":
        "<strong>Format</strong>: CVE-Year-Number<br />e.g., CVE-2024-12345",
      "product.cceCve.right.char.li3": "Linked with CVSS scores (risk Scan)",
      "product.cceCve.right.examples": "CVE Examples",
      "product.cceCve.right.example1":
        "<code>CVE-2021-44228</code>: Remote Code Execution vulnerability in Apache Log4j (Log4Shell)",
      "product.cceCve.right.example2":
        "<code>CVE-2017-0144</code>: Microsoft Windows SMB vulnerability (exploited by WannaCry)",
      "product.architecture.desc":
        "BingoCVM's system consists of a Manager License and Device Client Licenses. On-premise & cloud, Agent + Agentless (default) automated scan supported. (real-time and scheduled scans)",
      "product.architecture.imageSrc":
        "../../images/BingoCVMArchitectureEN.png",
      "product.platforms.desc":
        "BingoCVM supported platforms follow the KISA vulnerability scan guides, delivering scan optimized for each customer environment.<br />Broad coverage from on-premise all the way to cloud.",
      "product.features.eyebrow": "Key Features & Highlights",
      "product.features.title": "Features & Key Highlights",
      "product.features.desc":
        "BingoCVM provides vulnerability Scan automation for critical information infrastructure and cloud systems. It delivers convenient, one-stop services covering system vulnerability Scan, evaluation, classification, remediation, history tracking, and reporting.",

      "product.features.left.title": "Features",
      "product.features.left.li1":
        "Supports automatic, manual, and scheduled Scans, enabling seamless one-stop management from Scan results and log analysis to remediation and evidence history.",
      "product.features.left.li2":
        "Provides asset-specific and group-specific report generation, along with flexible customization of Scan guides and scripts.",
      "product.features.right.title": "Key Highlights",

      "product.features.right.li2":
        "Korea's first solution to support hybrid scheduled Scans combining Agent and Non-Agent modes, enabling optimized diagnosis across diverse environments.",
      "product.features.right.li3":
        "Assesses both On-Premise and Cloud assets within a single platform.",
      "product.features.right.li4":
        "Evaluates both CCE and CVE vulnerabilities within a single platform.",
      "product.features.right.li5":
        "Efficiently scans IP, port, and service information via Network Scanner capabilities. Additionally, it supports policy-based detection using Blacklist/Whitelist rules to periodically inspect and manage unnecessary or unauthorized IPs and ports.",
      "contact.channels.eyebrow": "Contact Information",
      "contact.channels.title": "Contact Channels",
      "contact.channels.desc":
        "<strong>Phone, fax, and website</strong> are available as contact channels.<br />Our sales team will guide you promptly.",
      "contact.channels.card1.label": "Sales Contact 1",
      "contact.channels.card1.sub": "Sales and technical consultation",
      "contact.channels.card2.label": "Sales Contact 2",
      "contact.channels.card2.sub": "Sales consultation",
      "contact.channels.card3.label": "Website",
      "contact.channels.card3.sub": "Company and product information",
      "contact.hours.text":
        "Business Hours <span>Weekdays 09:00 - 18:00 &nbsp;|&nbsp; Lunch 12:00 - 13:00</span>",
      "contact.hours.pill1": "Open Mon-Fri",
      "contact.hours.pill2": "Closed Sat, Sun, and holidays",
      "contact.map.coords": "KBI Co., Ltd.",
      "contact.map.title": "Directions to KBI Co., Ltd.",
      "contact.map.address":
        "Room 415, 44 Dunsan-daero 117beon-gil, Seo-gu, Daejeon",
      "contact.map.meta1": "Founded in 2003",
      "contact.map.meta2": "Seo-gu, Daejeon",
      "contact.map.link": "View on Kakao Map ->",
      "contact.faq.eyebrow": "Frequently Asked Questions",
      "contact.faq.title": "Check These Before Inquiring",
      "contact.faq.desc":
        "Please check these frequently asked questions prior to submitting sales inquiries.<br />For additional inquiries, email us at <strong>bingocvm@kbisys.com</strong> for prompt assistance.",
      "contact.faq.q1":
        "Is a free trial or demo demonstration available for BingoCVM?",
      "contact.faq.q2":
        "How does purchasing through the Public Procurement Service work?",
      "contact.faq.q3": "Can it also be used in cloud environments (CSAP)?",
      "contact.faq.q4":
        "Is defense sector support available regarding K-RMF, K-STIG, and K-SCAP?",
      "contact.faq.q5":
        "Do you also provide technical training and operational support?",
      "contact.faq.a1":
        "Yes, it is available. Please contact us via email (<strong>bingocvm@kbisys.com</strong>), and we will schedule an online demo demonstration. We provide customized demos tailored to your deployment environment, and you may also request a Proof of Concept (PoC).",
      "contact.faq.a2":
        'You can purchase it on the Public Procurement Service Digital Service Mall (<strong><a href="https://digitalmall.g2b.go.kr/" target="_blank" rel="noopener">digitalmall.g2b.go.kr</a></strong>) by searching for <strong>"케이비아이"</strong> (KBI) or <strong>"BingoCVM"</strong>.',
      "contact.faq.a3":
        "BingoCVM supports both on-premise and cloud environments. It can also be utilized as a CSAP (Cloud Security Assurance Program) Scan tool.",
      "contact.faq.a4":
        "Yes. KBI Co., Ltd. has developed test and evaluation tools for K-RMF, K-STIG, and K-SCAP in collaboration with the Agency for Defense Development (ADD) and the Defense Agency for Technology and Quality (DTaQ). We hold Korea's first track record of developing and delivering tools that simultaneously apply both domestic defense standards and US standards.",
      "contact.faq.a5":
        "KBI Co., Ltd. provides separate information security technical training and hands-on practice services following adoption. In addition to product usage training, we operate customized training programs for clients, including CCE/CVE vulnerability Scan methodologies and practical security consulting.",
      "news.kisaGuide.title":
        "Detailed Guide Update on Technical Vulnerability Analysis and Evaluation Methods for Critical Information Infrastructure",
      "news.kisaGuide.excerpt":
        "On December 24, 2025, KISA updated the detailed guide for analyzing and evaluating technical vulnerabilities in critical information infrastructure.",
      "news.kisaGuide.body1":
        "Our BingoCVM team is actively conducting research and system enhancements to ensure accurate Scans in compliance with KISA's newly updated standards.",
      "news.kisaGuide.body2":
        "Currently, BingoCVM has been delivered to major public and government agencies and is actively utilized by numerous clients. We will share further details in upcoming posts.",
      "news.kisaGuide.body3": "Thank you.",
      "news.kisaGuide.source":
        "Source: KISA (Korea Internet & Security Agency) > Knowledge Platform > Laws & Guidelines > Guidelines > Security Vulnerabilities & Incident Response",
      "news.krmf.title":
        "Awarded 2 Consecutive Years for K-RMF Security Control SW Automated Inspection Tool Development",
      "news.krmf.excerpt":
        "KBI was awarded the DTaQ R&D contract for K-RMF security control SW automated inspection tools in both 2025 and 2026.",
      "news.krmf.body1":
        "Expected outcomes of this K-RMF SW automated inspection R&D project include:",
      "news.krmf.body2":
        "<strong>Cybersecurity Gap Defense:</strong><br />Identify and address technical defense gaps that baseline controls alone cannot fully cover.",
      "news.krmf.body3":
        "<strong>Acquisition Process Integration:</strong><br />Systematically support complex security certification procedures required in defense acquisition and deployment stages.",
      "news.krmf.body4":
        "<strong>Adoption Through U.S. RMF Tool Analysis:</strong><br />Analyze U.S. RMF security automation tool cases and design tools optimized for domestic defense environments.",
      "news.recentPosts.title": "Recent Posts",
      "news.recentPosts.post1":
        "Awarded 2 Consecutive Years for K-RMF Security Control SW Automated Inspection Tool Development",
      "news.recentPosts.post2": "BingoCVM Introduction Video",
      "news.recentPosts.post3":
        "Detailed Guide Update on Technical Vulnerability Analysis and Evaluation Methods for Critical Information Infrastructure",
      "news.showMore": "Read more",
      "news.collapse": "Collapse",
      "news.itemsSuffix": "items",
    },
  };

  let currentLang = "ko";
  const trackedTextNodes = [];
  const trackedAttrNodes = [];
  const originalTextByNode = new WeakMap();
  const originalAttrsByNode = new WeakMap();

  function normalizeLang(lang) {
    return SUPPORTED.has(lang) ? lang : "ko";
  }

  function t(key, fallback) {
    return DICT[currentLang]?.[key] || DICT.ko[key] || fallback || key;
  }

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function createFlexibleRegex(phrase) {
    const normalized = String(phrase || "").trim();
    if (!normalized) return null;
    const pattern = normalized
      .split(/\s+/)
      .map((part) => escapeRegExp(part))
      .join("\\s+");
    return new RegExp(pattern, "g");
  }

  function translateRuntimeText(text) {
    if (!text || currentLang !== "en") return text;
    let next = text;
    ORDERED_RUNTIME_REPLACEMENTS.forEach(([ko, en]) => {
      const regex = createFlexibleRegex(ko);
      if (!regex) return;
      next = next.replace(regex, en);
    });
    return next;
  }

  function shouldTrackTextNode(node) {
    if (!node || !node.parentElement) return false;
    const tag = node.parentElement.tagName;
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") {
      return false;
    }
    if (!node.nodeValue || !node.nodeValue.trim()) return false;
    if (node.parentElement.hasAttribute("data-i18n")) return false;
    if (node.parentElement.hasAttribute("data-i18n-html")) return false;
    return true;
  }

  function shouldTrackAttr(el, attr) {
    if (!el) return false;
    if (attr === "aria-label" && el.hasAttribute("data-i18n-aria-label")) {
      return false;
    }
    if (attr === "title" && el.hasAttribute("data-i18n-title")) {
      return false;
    }
    if (attr === "placeholder" && el.hasAttribute("data-i18n-placeholder")) {
      return false;
    }
    return true;
  }

  function captureOriginalContent(root) {
    const scope = root || document;
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    let textNode = walker.nextNode();
    while (textNode) {
      if (shouldTrackTextNode(textNode) && !originalTextByNode.has(textNode)) {
        originalTextByNode.set(textNode, textNode.nodeValue);
        trackedTextNodes.push(textNode);
      }
      textNode = walker.nextNode();
    }

    scope.querySelectorAll("*").forEach((el) => {
      TEXT_ATTRS.forEach((attr) => {
        if (!el.hasAttribute(attr) || !shouldTrackAttr(el, attr)) return;
        const existing = originalAttrsByNode.get(el) || {};
        if (Object.prototype.hasOwnProperty.call(existing, attr)) return;
        existing[attr] = el.getAttribute(attr);
        originalAttrsByNode.set(el, existing);
        trackedAttrNodes.push({ el, attr });
      });
    });
  }

  function applyRuntimeTranslations() {
    trackedTextNodes.forEach((node) => {
      if (!node.isConnected) return;
      const original = originalTextByNode.get(node);
      if (typeof original !== "string") return;
      node.nodeValue =
        currentLang === "en" ? translateRuntimeText(original) : original;
    });

    trackedAttrNodes.forEach(({ el, attr }) => {
      if (!el.isConnected) return;
      const snapshot = originalAttrsByNode.get(el);
      const original = snapshot?.[attr];
      if (typeof original !== "string") return;
      const next =
        currentLang === "en" ? translateRuntimeText(original) : original;
      el.setAttribute(attr, next);
    });
  }

  function applyAttributeTranslations(root) {
    const attrMap = [
      ["data-i18n-aria-label", "aria-label"],
      ["data-i18n-title", "title"],
      ["data-i18n-placeholder", "placeholder"],
      ["data-i18n-alt", "alt"],
      ["data-i18n-src", "src"],
    ];

    attrMap.forEach(([dataAttr, targetAttr]) => {
      root.querySelectorAll("[" + dataAttr + "]").forEach((el) => {
        const key = el.getAttribute(dataAttr);
        if (!key) return;
        el.setAttribute(targetAttr, t(key));
      });
    });
  }

  function applyTranslations(root) {
    const scope = root || document;
    scope.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (!key) return;
      el.innerHTML = t(key);
    });
    scope.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      el.textContent = t(key);
    });
    applyAttributeTranslations(scope);
  }

  function updateLanguageToggle(root) {
    const scope = root || document;
    const nextLang = currentLang === "ko" ? "en" : "ko";
    const ariaKey =
      nextLang === "en" ? "lang.switchToEnglish" : "lang.switchToKorean";

    scope.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
      btn.textContent = nextLang.toUpperCase();
      btn.dataset.nextLang = nextLang;
      btn.setAttribute("aria-label", t(ariaKey));
      btn.setAttribute("title", t(ariaKey));
    });
  }

  function setLanguage(lang, options) {
    const opts = options || {};
    currentLang = normalizeLang(lang);
    document.documentElement.setAttribute("lang", currentLang);

    if (opts.persist !== false) {
      try {
        localStorage.setItem(STORAGE_KEY, currentLang);
      } catch (e) {
        // ignore storage failures
      }
    }

    applyTranslations(document);
    applyRuntimeTranslations();
    updateLanguageToggle(document);
    document.dispatchEvent(
      new CustomEvent("languageChanged", { detail: { lang: currentLang } }),
    );
  }

  function bindLanguageToggle(root) {
    const scope = root || document;
    scope.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
      if (btn.dataset.i18nBound === "true") return;
      btn.addEventListener("click", () => {
        const targetLang = btn.dataset.nextLang || "en";
        setLanguage(targetLang);
      });
      btn.dataset.i18nBound = "true";
    });
  }

  function detectInitialLang() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return normalizeLang(stored);
    } catch (e) {
      // ignore storage failures
    }
    // Default to Korean unless a user preference was explicitly saved.
    return "ko";
  }

  document.addEventListener("DOMContentLoaded", () => {
    captureOriginalContent(document.body || document);
    setLanguage(detectInitialLang(), { persist: false });
    bindLanguageToggle(document);
  });

  document.addEventListener("includesLoaded", () => {
    captureOriginalContent(document.body || document);
    applyTranslations(document);
    applyRuntimeTranslations();
    updateLanguageToggle(document);
    bindLanguageToggle(document);
  });

  window.siteI18n = {
    setLanguage,
    getLanguage: () => currentLang,
    t,
    applyTranslations: () => applyTranslations(document),
  };
})();
