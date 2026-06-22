import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from 'react-router-dom'; // Make sure this import exists

// Export this so Services.tsx can import it
export const contentData: any = {
  "consumer-tort": {
    titleEn: "Consumer Tort",
    titleNp: "उपभोक्ता अपराध",
    contentEn: `Consumer tort cases in Nepal are governed by the Consumer Protection Act, 2075. These cases arise when consumers suffer harm due to defective goods, misleading advertisements, unfair trade practices, or substandard services provided by businesses. The objective of this law is to protect consumers from exploitation and ensure fair market behavior.

The process begins when the consumer files a written complaint before the District Administration Office or District Court depending on jurisdiction. The complaint must include evidence such as receipts, invoices, warranty cards, photographs, contracts, and expert opinions where necessary.

Once the case is registered, authorities usually attempt mediation first to settle disputes quickly without long litigation. If mediation fails, the case proceeds to formal hearings.

The court then evaluates whether the business breached its duty of care and whether the consumer suffered measurable loss. Evidence plays a crucial role in determining liability.

If the court finds the defendant responsible, remedies may include compensation, refund, replacement of goods, or penalties. Repeat offenders may face stricter regulatory sanctions.

Consumer tort law strengthens accountability, protects buyers, and ensures fair commercial practices in Nepal's growing marketplace.`,
    contentNp: `नेपालमा उपभोक्ता अपराधका मुद्दाहरू उपभोक्ता संरक्षण ऐन, २०७५ द्वारा नियन्त्रित हुन्छन्। यी मुद्दाहरू तब उत्पन्न हुन्छन् जब उपभोक्ताहरू दोषपूर्ण वस्तु, भ्रामक विज्ञापन, अनुचित व्यापार अभ्यास, वा व्यवसायहरूद्वारा प्रदान गरिएको कमसल सेवाको कारणले क्षति पुग्छ। यस कानूनको उद्देश्य उपभोक्ताहरूलाई शोषणबाट जोगाउनु र निष्पक्ष बजार व्यवहार सुनिश्चित गर्नु हो।

प्रक्रिया सुरु हुन्छ जब उपभोक्ताले क्षेत्राधिकार अनुसार जिल्ला प्रशासन कार्यालय वा जिल्ला अदालतमा लिखित उजुरी दिन्छ। उजुरीमा रसिद, चालान, वारेन्टी कार्ड, फोटो, अनुबंध, र आवश्यक भएमा विज्ञको राय जस्ता प्रमाणहरू समावेश गर्नुपर्छ।

मुद्दा दर्ता भएपछि, अधिकारीहरूले सामान्यतया लामो मुद्दा बिना नै द्रुत समाधानको लागि मध्यस्थता प्रयास गर्छन्। यदि मध्यस्थता असफल भयो भने, मुद्दा औपचारिक सुनुवाइमा जान्छ।

अदालतले व्यवसायले हेरचाहको कर्तव्य उल्लङ्घन गरेको छ कि छैन र उपभोक्ताले मापनयोग्य क्षति व्यहोरेको छ कि छैन भनेर मूल्याङ्कन गर्छ। दायित्व निर्धारणमा प्रमाणले महत्त्वपूर्ण भूमिका खेल्छ।

यदि अदालतले प्रतिवादीलाई जिम्मेवार पाउँछ भने, क्षतिपूर्ति, रिफण्ड, वस्तुको प्रतिस्थापन, वा जरिवाना जस्ता उपायहरू हुन सक्छन्। पुनरावर्ती अपराधीहरूले कडा नियामक प्रतिबन्धहरूको सामना गर्न सक्छन्।

उपभोक्ता अपराध कानूनले जवाफदेहिता बढाउँछ, खरीददारहरूको रक्षा गर्छ, र नेपालको बढ्दो बजारमा निष्पक्ष व्यावसायिक अभ्यासहरू सुनिश्चित गर्दछ।`,
  },
  "medical-negligence": {
    titleEn: "Medical Negligence",
    titleNp: "चिकित्सीय लापरवाही",
    contentEn: `Medical negligence in Nepal occurs when healthcare professionals fail to provide the standard level of care expected in medical practice, resulting in harm, injury, or death of a patient.

Cases are filed in civil courts for compensation and may also be reported to the Nepal Medical Council for professional discipline. The legal system evaluates four key elements: duty of care, breach of duty, causation, and damages.

First, it must be established that a doctor-patient relationship existed. Second, it must be shown that the medical professional failed to meet accepted medical standards. Third, the breach must directly cause harm. Fourth, actual damages must be proven.

Evidence includes medical reports, hospital records, treatment history, and expert testimony from independent medical professionals.

If negligence is proven, compensation may include hospital expenses, future medical costs, loss of income, and pain and suffering. In serious cases involving gross negligence, criminal liability may also apply under the National Penal Code.

Medical negligence law ensures accountability while balancing professional discretion and patient safety in Nepal's healthcare system.`,
    contentNp: `नेपालमा चिकित्सीय लापरवाही तब हुन्छ जब स्वास्थ्यकर्मीहरूले चिकित्सा अभ्यासमा अपेक्षित हेरचाहको स्तर प्रदान गर्न असफल हुन्छन्, जसको परिणामस्वरूप बिरामीलाई हानि, चोट वा मृत्यु हुन्छ।

मुद्दा क्षतिपूर्तिको लागि दिवानी अदालतमा दायर गरिन्छ र व्यावसायिक अनुशासनको लागि नेपाल मेडिकल काउन्सिलमा पनि रिपोर्ट गर्न सकिन्छ। कानूनी प्रणालीले चार मुख्य तत्वहरूको मूल्याङ्कन गर्छ: हेरचाहको कर्तव्य, कर्तव्यको उल्लङ्घन, कारण, र क्षति।

पहिलो, डाक्टर-बिरामी सम्बन्ध अवस्थित थियो भन्ने स्थापित हुनुपर्छ। दोस्रो, चिकित्सा पेशेवरले स्वीकार्य चिकित्सा मापदण्डहरू पूरा गर्न असफल भएको देखाउनुपर्छ। तेस्रो, उल्लङ्घनले प्रत्यक्ष रूपमा हानि निम्त्याउनुपर्छ। चौथो, वास्तविक क्षति प्रमाणित हुनुपर्छ।

प्रमाणहरूमा मेडिकल रिपोर्ट, अस्पतालको रेकर्ड, उपचारको इतिहास, र स्वतन्त्र चिकित्सा पेशेवरहरूको विज्ञ गवाही समावेश छ।

यदि लापरवाही प्रमाणित भयो भने, क्षतिपूर्तिमा अस्पतालको खर्च, भविष्यको उपचार लागत, आयको हानि, र पीडा र पीडा समावेश हुन सक्छ। गम्भीर लापरवाहीको मामिलामा, राष्ट्रिय दण्ड संहिता अन्तर्गत आपराधिक दायित्व पनि लागू हुन सक्छ।

चिकित्सीय लापरवाही कानूनले नेपालको स्वास्थ्य सेवा प्रणालीमा व्यावसायिक विवेक र बिरामी सुरक्षालाई सन्तुलन गर्दै जवाफदेहिता सुनिश्चित गर्दछ।`,
  },
  "divorce-from-abroad": {
    titleEn: "Filing Divorce from Abroad",
    titleNp: "विदेशबाट सम्बन्ध विच्छेद दायर",
    contentEn: `Nepali citizens living abroad can file divorce cases in Nepal through a Power of Attorney authorizing a representative. The case is filed in the District Court under the National Civil Code, 2074.

The petition must state legal grounds such as mutual consent, cruelty, abandonment, or irreconcilable differences. Supporting documents include marriage certificates, communication records, and financial information.

The court first attempts mediation to encourage reconciliation. Nepalese law prioritizes preserving marriage where possible. If mediation fails, the case proceeds to formal hearings.

In mutual consent cases, divorce is faster after verification. In contested cases, the court examines evidence, hears witnesses, and evaluates legal grounds in detail.

Final judgment includes divorce decree, custody arrangements, property division, and maintenance orders if applicable.

This legal framework ensures access to justice for citizens abroad while maintaining fairness and due process under Nepalese family law.`,
    contentNp: `विदेशमा बसोबास गर्ने नेपाली नागरिकहरूले नेपालमा पावर अफ अटर्नी मार्फत सम्बन्ध विच्छेद मुद्दा दायर गर्न सक्छन्। मुलुकी दिवानी संहिता, २०७४ अन्तर्गत जिल्ला अदालतमा मुद्दा दायर गरिन्छ।

निवेदनमा आपसी सहमति, क्रूरता, परित्याग, वा मेलमिलाप नहुने भिन्नताहरू जस्ता कानूनी आधारहरू उल्लेख गर्नुपर्छ। सहायक कागजातहरूमा विवाह प्रमाणपत्र, सञ्चार रेकर्ड, र वित्तीय जानकारी समावेश छ।

अदालतले पहिले मेलमिलापको लागि मध्यस्थता प्रयास गर्दछ। नेपाली कानूनले सम्भव भएसम्म विवाह संरक्षणलाई प्राथमिकता दिन्छ। यदि मध्यस्थता असफल भयो भने, मुद्दा औपचारिक सुनुवाइमा जान्छ।

आपसी सहमतिको मुद्दामा, प्रमाणीकरण पछि सम्बन्ध विच्छेद छिटो हुन्छ। प्रतिस्पर्धात्मक मुद्दामा, अदालतले प्रमाणहरू जाँच्छ, साक्षीहरू सुन्छ, र कानूनी आधारहरूको विस्तृत रूपमा मूल्याङ्कन गर्छ।

अन्तिम निर्णयमा सम्बन्ध विच्छेदको आदेश, बाल हिरासतको व्यवस्था, सम्पत्ति विभाजन, र लागू भएमा भरणपोषण आदेश समावेश हुन्छ।

यो कानूनी ढाँचाले विदेशमा रहेका नागरिकहरूको लागि न्यायमा पहुँच सुनिश्चित गर्दछ जबकि नेपाली पारिवारिक कानून अन्तर्गत निष्पक्षता र उचित प्रक्रिया कायम राख्छ।`,
  },
  "land-disputes": {
    titleEn: "Land Disputes",
    titleNp: "जग्गा विवाद",
    contentEn: `Land disputes in Nepal are among the most common civil cases and involve ownership conflicts, inheritance issues, boundary disputes, encroachment, and fraudulent land transfers.

Cases are filed in District Courts and often involve coordination with land revenue offices. Courts rely heavily on documentary evidence such as land ownership certificates, cadastral maps, tax receipts, survey reports, and historical records.

The process usually begins with attempts at mediation or local settlement. If unresolved, the case proceeds to formal trial.

During trial, courts analyze documents, witness testimony, and government land records to determine rightful ownership.

Judgments may include confirmation of ownership, partition of inherited property, cancellation of fraudulent transfers, or eviction orders.

Land law in Nepal emphasizes accuracy of records, fairness in inheritance, and prevention of illegal encroachment or fraud. It plays a vital role in maintaining property rights and social stability.`,
    contentNp: `नेपालमा जग्गा विवाद सबैभन्दा सामान्य दिवानी मुद्दाहरू मध्ये एक हो र यसमा स्वामित्व द्वन्द्व, उत्तराधिकार मुद्दाहरू, सीमा विवादहरू, अतिक्रमण, र धोखाधडी जग्गा स्थानान्तरण समावेश छन्।

मुद्दा जिल्ला अदालतमा दायर गरिन्छ र प्रायः भूमि राजस्व कार्यालयहरूसँग समन्वय गर्नुपर्छ। अदालतहरूले जग्गा स्वामित्व प्रमाणपत्र, नक्सा, कर रसिद, सर्वेक्षण रिपोर्ट, र ऐतिहासिक रेकर्डहरू जस्ता दस्तावेजी प्रमाणहरूमा धेरै निर्भर हुन्छन्।

प्रक्रिया सामान्यतया मध्यस्थता वा स्थानीय समाधानको प्रयासबाट सुरु हुन्छ। यदि समाधान भएन भने, मुद्दा औपचारिक परीक्षणमा जान्छ।

परीक्षणको क्रममा, अदालतहरूले कानूनी स्वामित्व निर्धारण गर्न कागजातहरू, साक्षी गवाही, र सरकारी जग्गा रेकर्डहरूको विश्लेषण गर्दछन्।

निर्णयहरूमा स्वामित्वको पुष्टि, उत्तराधिकारको सम्पत्ति बाँडफाँड, धोखाधडी स्थानान्तरणको रद्द, वा बेदखल आदेश समावेश हुन सक्छ।

नेपालको जग्गा कानूनले रेकर्डको शुद्धता, उत्तराधिकारमा निष्पक्षता, र अवैध अतिक्रमण वा धोखाधडीको रोकथामलाई जोड दिन्छ। यसले सम्पत्ति अधिकार र सामाजिक स्थिरता कायम राख्न महत्त्वपूर्ण भूमिका खेल्छ।`,
  },
  "writ-petition": {
    titleEn: "Writ Petition",
    titleNp: "रिट निवेदन",
    contentEn: `A writ petition is a constitutional remedy available under Article 133 of the Constitution of Nepal. It is filed in the High Court or Supreme Court to challenge unlawful, arbitrary, or unconstitutional actions by government bodies or public authorities.

Types of writs include habeas corpus, mandamus, certiorari, prohibition, and quo warranto.

The process begins with filing a written petition showing violation of legal or fundamental rights. Courts first examine admissibility and urgency.

If accepted, the concerned authority is asked to respond. The court then conducts hearings where legality, constitutional validity, and procedural fairness are examined.

If violations are proven, courts issue binding orders to correct illegal actions, release unlawfully detained persons, or restore rights.

Writ jurisdiction is a powerful safeguard of democracy and ensures accountability of government institutions.`,
    contentNp: `रिट निवेदन नेपालको संविधानको धारा १३३ अन्तर्गत उपलब्ध एक संवैधानिक उपचार हो। यो सरकारी निकाय वा सार्वजनिक अधिकारीहरूको अवैध, मनमानी, वा असंवैधानिक कार्यहरूलाई चुनौती दिन उच्च अदालत वा सर्वोच्च अदालतमा दायर गरिन्छ।

रिटका प्रकारहरूमा बन्दी प्रत्यक्षीकरण, परमादेश, उत्प्रेषण, निषेधाज्ञा, र अधिकारको प्रश्न समावेश छ।

प्रक्रिया कानूनी वा मौलिक अधिकारको उल्लङ्घन देखाउने लिखित निवेदन दायर गरेर सुरु हुन्छ। अदालतहरूले पहिले स्वीकार्यता र तत्कालीनता जाँच गर्दछन्।

यदि स्वीकार भयो भने, सम्बन्धित अधिकारीलाई जवाफ दिन भनिन्छ। त्यसपछि अदालतले कानूनीता, संवैधानिक वैधता, र प्रक्रियागत निष्पक्षता जाँच गर्न सुनुवाइ गर्दछ।

यदि उल्लङ्घन प्रमाणित भयो भने, अदालतले अवैध कार्यहरू सच्याउन, गैरकानूनी रूपमा थुनिएका व्यक्तिहरूलाई रिहा गर्न, वा अधिकारहरू पुनर्स्थापित गर्न बाध्यकारी आदेशहरू जारी गर्दछ।

रिट क्षेत्राधिकार प्रजातन्त्रको एक शक्तिशाली सुरक्षा हो र सरकारी संस्थाहरूको जवाफदेहिता सुनिश्चित गर्दछ।`,
  },
  "public-interest-litigation": {
    titleEn: "Public Interest Litigation",
    titleNp: "सार्वजनिक सरोकारको मुद्दा",
    contentEn: `Public Interest Litigation (PIL) in Nepal allows individuals or organizations to approach courts for issues affecting society at large such as environmental protection, corruption, human rights violations, or public safety concerns.

The court first evaluates whether the issue has sufficient public importance. If accepted, the court may request reports, conduct hearings, or order investigations.

PIL proceedings are flexible compared to regular litigation, ensuring accessibility and efficiency.

Courts may issue directives to government agencies, order policy reforms, or require corrective administrative actions.

PIL plays an important role in judicial activism, ensuring accountability of public institutions and protection of collective rights in Nepal.`,
    contentNp: `नेपालमा सार्वजनिक सरोकारको मुद्दा (पीआईएल) ले व्यक्ति वा संस्थाहरूलाई वातावरण संरक्षण, भ्रष्टाचार, मानव अधिकार हनन, वा सार्वजनिक सुरक्षा चिन्ता जस्ता समग्र समाजलाई असर गर्ने मुद्दाहरूको लागि अदालत जान अनुमति दिन्छ।

अदालतले पहिले मुद्दाको सार्वजनिक महत्त्व पर्याप्त छ कि छैन मूल्याङ्कन गर्छ। यदि स्वीकार भयो भने, अदालतले रिपोर्ट माग गर्न, सुनुवाइ गर्न, वा छानबिनको आदेश दिन सक्छ।

पीआईएल कार्यवाही नियमित मुद्दाको तुलनामा लचिलो हुन्छ, जसले पहुँच र दक्षता सुनिश्चित गर्दछ।

अदालतले सरकारी निकायहरूलाई निर्देशन जारी गर्न, नीति सुधारको आदेश दिन, वा सुधारात्मक प्रशासनिक कार्यहरू आवश्यक पार्न सक्छ।

नेपालमा पीआईएलले न्यायिक सक्रियता, सार्वजनिक संस्थाहरूको जवाफदेहिता र सामूहिक अधिकारको संरक्षणमा महत्त्वपूर्ण भूमिका खेल्दछ।`,
  },
  "sexual-offences": {
    titleEn: "Sexual Offences",
    titleNp: "यौन अपराध",
    contentEn: `Sexual offence cases in Nepal include rape, sexual harassment, child abuse, and exploitation under the National Penal Code.

The process begins with filing a First Information Report (FIR) at the police station. Police then investigate, collect forensic evidence, record statements, and submit a charge sheet to court.

Courts prioritize victim confidentiality and sensitive handling of evidence.

The prosecution must prove guilt beyond reasonable doubt using medical reports, witness testimony, and forensic analysis.

Punishments include strict imprisonment and compensation to victims depending on severity.

The legal system aims to protect victims and ensure strict enforcement of criminal law.`,
    contentNp: `नेपालमा यौन अपराधका मुद्दाहरूमा राष्ट्रिय दण्ड संहिता अन्तर्गत बलात्कार, यौन उत्पीडन, बाल दुर्व्यवहार, र शोषण समावेश छ।

प्रक्रिया प्रहरी कार्यालयमा प्रथम सूचना रिपोर्ट (एफआईआर) दायर गरेर सुरु हुन्छ। प्रहरीले त्यसपछि अनुसन्धान गर्छ, फोरेन्सिक प्रमाण सङ्कलन गर्छ, बयान रेकर्ड गर्छ, र अदालतमा आरोपपत्र पेश गर्छ।

अदालतहरूले पीडितको गोपनीयता र प्रमाणको संवेदनशील हेरफेरलाई प्राथमिकता दिन्छन्।

अभियोजनले मेडिकल रिपोर्ट, साक्षी गवाही, र फोरेन्सिक विश्लेषणको प्रयोग गरी उचित शङ्का बिना अपराध सिद्ध गर्नुपर्छ।

सजायमा कठोर कारावास र पीडितलाई क्षतिपूर्ति समावेश छ, जो गम्भीरतामा निर्भर गर्दछ।

कानूनी प्रणालीले पीडितहरूको रक्षा गर्न र आपराधिक कानूनको कडाईको सुनिश्चित गर्न लक्ष्य राख्दछ।`,
  },
  "narcotics-cases": {
    titleEn: "Narcotics Cases",
    titleNp: "लागूऔषध मुद्दा",
    contentEn: `Narcotics cases in Nepal are governed by the Narcotic Drugs Control Act. These cases involve production, possession, trafficking, or distribution of illegal drugs.

Police conduct raids based on intelligence and seize drugs as evidence. Arrested persons are presented before court with forensic reports.

Courts evaluate quantity, intent, and involvement in trafficking networks.

Punishments include imprisonment, fines, and in some cases rehabilitation programs for users.

The objective is to reduce drug abuse and dismantle illegal trafficking networks in Nepal.`,
    contentNp: `नेपालमा लागूऔषध मुद्दाहरू लागूऔषध नियन्त्रण ऐन अन्तर्गत नियन्त्रित हुन्छन्। यी मुद्दाहरूमा अवैध लागूऔषधको उत्पादन, ओगटो, ओसारपसार, वा वितरण समावेश छ।

प्रहरीले सूचनाको आधारमा छापा मार्छ र प्रमाणको रूपमा लागूऔषध बरामद गर्छ। पक्राउ परेका व्यक्तिहरूलाई फोरेन्सिक रिपोर्टसहित अदालतमा पेश गरिन्छ।

अदालतले मात्रा, इरादा, र तस्करी सञ्जालमा संलग्नताको मूल्याङ्कन गर्छ।

सजायमा कारावास, जरिवाना, र कतिपय अवस्थामा प्रयोगकर्ताहरूको लागि पुनर्स्थापना कार्यक्रम समावेश छ।

उद्देश्य लागूऔषध दुर्व्यसन कम गर्नु र नेपालमा अवैध तस्करी सञ्जाल ध्वस्त पार्नु हो।`,
  },
  "immigration-law": {
    titleEn: "Immigration Law",
    titleNp: "अध्यागमन कानून",
    contentEn: `Immigration law in Nepal regulates entry, stay, and exit of foreign nationals under the Immigration Act.

Violations include visa overstay, illegal entry, and forged documents.

Immigration authorities may detain or deport offenders.

Courts review administrative actions to ensure due process and fairness.

Penalties include fines, deportation, and entry bans depending on severity.

The system balances national security with human rights obligations.`,
    contentNp: `नेपालको अध्यागमन कानूनले अध्यागमन ऐन अन्तर्गत विदेशी नागरिकहरूको प्रवेश, बसाइ, र बहिर्गमनलाई नियमन गर्दछ।

उल्लङ्घनहरूमा भिसा ओभरस्टे, अवैध प्रवेश, र नक्कली कागजातहरू समावेश छन्।

अध्यागमन अधिकारीहरूले अपराधीहरूलाई हिरासतमा राख्न वा निर्वासन गर्न सक्छन्।

अदालतहरूले उचित प्रक्रिया र निष्पक्षता सुनिश्चित गर्न प्रशासनिक कार्यहरूको समीक्षा गर्दछन्।

जरिवाना, निर्वासन, र गम्भीरतामा निर्भर गर्दै प्रवेश प्रतिबन्धहरू सजायमा समावेश छन्।

प्रणालीले राष्ट्रिय सुरक्षा र मानव अधिकार दायित्वहरूलाई सन्तुलन गर्दछ।`,
  },
  "contract-disputes": {
    titleEn: "Contractual Disputes",
    titleNp: "अनुबंधिक विवाद",
    contentEn: `Contractual disputes in Nepal arise when one or more parties fail to fulfill obligations under a legally binding agreement. These disputes are governed by the National Civil Code and contract law principles such as offer, acceptance, consideration, and lawful intent.

Cases are generally filed in District Courts. The court first examines whether a valid contract exists. This includes checking written agreements, emails, invoices, payment records, and conduct of the parties.

The next step is determining whether a breach occurred. A breach may include non-performance, delayed performance, or partial fulfillment of contractual duties.

Courts usually encourage settlement or negotiation before proceeding to full trial. If unresolved, the case proceeds to evidentiary hearings.

The court then determines damages caused by the breach. Remedies may include compensation, specific performance (forcing contract completion), or cancellation of contract with restitution.

Contract law in Nepal ensures fairness in commercial relationships and protects parties from financial loss due to breach of agreements.`,
    contentNp: `नेपालमा अनुबंधिक विवाद तब उत्पन्न हुन्छ जब एक वा धेरै पक्षहरूले कानूनी रूपमा बाध्यकारी सम्झौता अन्तर्गत दायित्वहरू पूरा गर्न असफल हुन्छन्। यी विवादहरू राष्ट्रिय दिवानी संहिता र अनुबंध कानून सिद्धान्तहरू जस्तै प्रस्ताव, स्वीकृति, प्रतिफल, र वैध उद्देश्यद्वारा नियन्त्रित हुन्छन्।

मुद्दा सामान्यतया जिल्ला अदालतमा दायर गरिन्छ। अदालतले पहिले वैध अनुबंध अवस्थित छ कि छैन जाँच गर्छ। यसमा लिखित सम्झौताहरू, इमेलहरू, चालानहरू, भुक्तानी रेकर्डहरू, र पक्षहरूको व्यवहार जाँच गर्नु समावेश छ।

अर्को चरण उल्लङ्घन भएको छ कि छैन निर्धारण गर्नु हो। उल्लङ्घनमा गैर-प्रदर्शन, ढिलो प्रदर्शन, वा अनुबंधिक कर्तव्यहरूको आंशिक पूर्ति समावेश हुन सक्छ।

अदालतहरू सामान्यतया पूर्ण परीक्षणमा जानु अघि समाधान वा वार्तालाई प्रोत्साहन गर्दछन्। यदि समाधान भएन भने, मुद्दा साक्ष्य सुनुवाइमा जान्छ।

त्यसपछि अदालतले उल्लङ्घनले गर्दा भएको क्षति निर्धारण गर्दछ। उपायहरूमा क्षतिपूर्ति, विशिष्ट कार्यान्वयन (अनुबंध पूरा गर्न बाध्य पार्ने), वा प्रतिस्थापनसहित अनुबंध रद्द समावेश हुन सक्छ।

नेपालको अनुबंध कानूनले व्यावसायिक सम्बन्धहरूमा निष्पक्षता सुनिश्चित गर्दछ र सम्झौताको उल्लङ्घनको कारणले वित्तीय हानिबाट पक्षहरूको रक्षा गर्दछ।`,
  },
  "class-action": {
    titleEn: "Class Action Cases",
    titleNp: "वर्गीय मुद्दा",
    contentEn: `Class action cases involve multiple individuals with similar legal claims against a common defendant. Although not fully formalized in Nepal like in some jurisdictions, collective litigation is increasingly recognized in consumer, labor, and public harm cases.

Such cases are usually filed when large groups suffer identical harm, such as defective products, workplace violations, or mass accidents.

Courts may allow consolidation of cases for efficiency and consistency in judgment. Evidence is evaluated collectively, though individual damages may vary.

The legal process includes filing representative petitions, submitting group evidence, and hearing consolidated arguments.

Courts may award group compensation or issue systemic corrective orders against the defendant.

Class action principles improve access to justice by reducing litigation costs and ensuring uniform treatment of affected individuals.`,
    contentNp: `वर्गीय मुद्दा केसहरूमा सामान्य प्रतिवादी विरुद्ध समान कानूनी दाबीहरू भएका धेरै व्यक्तिहरू समावेश हुन्छन्। यद्यपि नेपालमा केही क्षेत्राधिकारहरू जस्तै पूर्ण रूपमा औपचारिक छैन, सामूहिक मुद्दा उपभोक्ता, श्रम, र सार्वजनिक हानिका मुद्दाहरूमा बढ्दो रूपमा मान्यता प्राप्त छ।

त्यस्ता मुद्दाहरू सामान्यतया दायर गरिन्छ जब ठूला समूहहरूले समान हानि भोग्छन्, जस्तै दोषपूर्ण उत्पादनहरू, कार्यस्थल उल्लङ्घन, वा सामूहिक दुर्घटनाहरू।

अदालतहरूले दक्षता र निर्णयमा एकरूपताको लागि मुद्दाहरूको समेकन अनुमति दिन सक्छन्। प्रमाण सामूहिक रूपमा मूल्याङ्कन गरिन्छ, यद्यपि व्यक्तिगत क्षति भिन्न हुन सक्छ।

कानूनी प्रक्रियामा प्रतिनिधि निवेदन दायर गर्नु, समूह प्रमाण पेश गर्नु, र समेकित तर्कहरू सुन्नु समावेश छ।

अदालतले समूह क्षतिपूर्ति प्रदान गर्न सक्छ वा प्रतिवादी विरुद्ध प्रणालीगत सुधारात्मक आदेशहरू जारी गर्न सक्छ।

वर्गीय मुद्दाका सिद्धान्तहरूले मुद्दा लागत घटाएर र प्रभावित व्यक्तिहरूको एकसमान उपचार सुनिश्चित गरेर न्यायमा पहुँच सुधार गर्दछन्।`,
  },
  "personal-injury": {
    titleEn: "Personal Injury Law",
    titleNp: "व्यक्तिगत चोट कानून",
    contentEn: `Personal injury law in Nepal deals with compensation for physical or psychological harm caused by accidents, negligence, or unsafe conditions.

Common cases include road accidents, workplace injuries, and public space injuries.

Cases are filed in civil courts where liability is established based on negligence. Courts examine whether the defendant owed a duty of care and whether that duty was breached.

Evidence includes medical reports, accident reports, witness statements, and expert analysis.

If liability is proven, compensation may include medical expenses, rehabilitation costs, loss of income, and damages for pain and suffering.

The goal of personal injury law is to restore victims financially and ensure accountability for negligent behavior.`,
    contentNp: `नेपालमा व्यक्तिगत चोट कानूनले दुर्घटना, लापरवाही, वा असुरक्षित अवस्थाको कारणले हुने शारीरिक वा मानसिक हानिको क्षतिपूर्तिसँग सम्बन्धित छ।

सामान्य मुद्दाहरूमा सडक दुर्घटना, कार्यस्थल चोट, र सार्वजनिक स्थान चोटहरू समावेश छन्।

मुद्दा दिवानी अदालतमा दायर गरिन्छ जहाँ लापरवाहीको आधारमा दायित्व स्थापित हुन्छ। अदालतले प्रतिवादीले हेरचाहको कर्तव्य रहेको थियो कि थिएन र त्यो कर्तव्य उल्लङ्घन भएको थियो कि थिएन जाँच गर्दछ।

प्रमाणहरूमा मेडिकल रिपोर्ट, दुर्घटना रिपोर्ट, साक्षीहरूको बयान, र विज्ञ विश्लेषण समावेश छ।

यदि दायित्व प्रमाणित भयो भने, क्षतिपूर्तिमा अस्पताल खर्च, पुनर्स्थापना लागत, आयको हानि, र पीडा र पीडाको क्षति समावेश हुन सक्छ।

व्यक्तिगत चोट कानूनको उद्देश्य पीडितहरूलाई आर्थिक रूपमा पुनर्स्थापित गर्नु र लापरवाह व्यवहारको लागि जवाफदेहिता सुनिश्चित गर्नु हो।`,
  },
  "homicide": {
    titleEn: "Homicide",
    titleNp: "हत्या",
    contentEn: `Homicide cases in Nepal involve unlawful killing of a person and are governed by the National Penal Code.

These cases are among the most serious criminal offences and are investigated intensively by police using forensic science, autopsy reports, witness statements, and crime scene analysis.

The court distinguishes between intentional murder, manslaughter, and accidental death based on intent, circumstances, and evidence.

The prosecution must prove guilt beyond reasonable doubt.

Sentencing depends on severity, intent, and aggravating factors, ranging from long-term imprisonment to life imprisonment.

The justice system ensures both punishment of offenders and protection of public safety.`,
    contentNp: `नेपालमा हत्या मुद्दाहरूले व्यक्तिको अवैध हत्यालाई समेट्छ र राष्ट्रिय दण्ड संहिता अन्तर्गत नियन्त्रित छन्।

यी मुद्दाहरू सबैभन्दा गम्भीर आपराधिक अपराधहरू मध्येका हुन् र प्रहरीद्वारा फोरेन्सिक विज्ञान, पोस्टमार्टम रिपोर्ट, साक्षीहरूको बयान, र अपराध स्थलको विश्लेषणको प्रयोग गरी गहन अनुसन्धान गरिन्छ।

अदालतले जानाजानी हत्या, मानव वध, र आकस्मिक मृत्यु बीच इरादा, परिस्थिति, र प्रमाणको आधारमा भिन्नता पत्ता लगाउँछ।

अभियोजनले उचित शङ्का बिना अपराध सिद्ध गर्नुपर्छ।

सजाय गम्भीरता, इरादा, र गम्भीरता बढाउने कारकहरूमा निर्भर हुन्छ, दीर्घकालीन कारावासदेखि जन्मकैदसम्म।

न्याय प्रणालीले अपराधीहरूको सजाय र सार्वजनिक सुरक्षाको संरक्षण दुवै सुनिश्चित गर्दछ।`,
  },
  "theft-burglary": {
    titleEn: "Theft and Burglary",
    titleNp: "चोरी र सिन्धु पार गरी चोरी",
    contentEn: `Theft and burglary cases involve unlawful taking of property with intent to deprive the owner.

Theft is typically non-violent, while burglary involves breaking into property or premises unlawfully.

Police investigate using CCTV footage, forensic evidence, and witness testimony.

Courts examine intent, value of stolen property, and criminal history of the accused.

Punishments vary depending on severity and repeat offenses, including fines and imprisonment.

The legal system aims to protect property rights and deter criminal activity.`,
    contentNp: `चोरी र सिन्धु पार गरी चोरी मुद्दाहरूमा मालिकलाई वञ्चित गर्ने उद्देश्यले सम्पत्तिको अवैध लैजाने समावेश छ।

चोरी सामान्यतया अहिंसात्मक हुन्छ, जबकि सिन्धु पार गरी चोरीमा सम्पत्ति वा परिसरमा अवैध रूपमा छिर्नु समावेश छ।

प्रहरीले सीसीटीभी फुटेज, फोरेन्सिक प्रमाण, र साक्षी गवाहीको प्रयोग गरी अनुसन्धान गर्छ।

अदालतले अभियुक्तको इरादा, चोरी गरिएको सम्पत्तिको मूल्य, र आपराधिक इतिहासको जाँच गर्छ।

सजाय गम्भीरता र पुनरावृत्ति अपराधमा निर्भर गर्दै भिन्न हुन्छ, जसमा जरिवाना र कारावास समावेश छ।

कानूनी प्रणालीले सम्पत्ति अधिकारको रक्षा गर्न र आपराधिक गतिविधिलाई रोक्न लक्ष्य राख्दछ।`,
  },
  "cyber-crime": {
    titleEn: "Cyber Crime Cases",
    titleNp: "साइबर अपराध मुद्दा",
    contentEn: `Cyber crime cases in Nepal are governed by the Electronic Transactions Act and include hacking, online fraud, identity theft, cyberbullying, and data breaches.

Investigation involves digital forensics, IP tracking, device analysis, and recovery of electronic evidence.

Police collect data logs, device history, and online communication records.

Courts evaluate intent, digital evidence integrity, and financial or reputational harm caused.

Punishment may include fines, imprisonment, and compensation.

Cyber law ensures protection of individuals and institutions in the digital environment and strengthens cybersecurity enforcement.`,
    contentNp: `नेपालमा साइबर अपराध मुद्दाहरू इलेक्ट्रोनिक कारोबार ऐन अन्तर्गत नियन्त्रित हुन्छन् र यसमा ह्याकिङ, अनलाइन ठगी, पहिचान चोरी, साइबर धम्की, र डाटा चोरी समावेश छ।

अनुसन्धानमा डिजिटल फोरेन्सिक्स, आईपी ट्र्याकिङ, उपकरण विश्लेषण, र इलेक्ट्रोनिक प्रमाणको पुन:प्राप्ति समावेश छ।

प्रहरीले डाटा लगहरू, उपकरण इतिहास, र अनलाइन सञ्चार रेकर्डहरू सङ्कलन गर्दछ।

अदालतले इरादा, डिजिटल प्रमाण अखण्डता, र भएको आर्थिक वा प्रतिष्ठित हानिको मूल्याङ्कन गर्दछ।

सजायमा जरिवाना, कारावास, र क्षतिपूर्ति समावेश हुन सक्छ।

साइबर कानूनले डिजिटल वातावरणमा व्यक्ति र संस्थाहरूको संरक्षण सुनिश्चित गर्दछ र साइबर सुरक्षा कार्यान्वयनलाई बलियो बनाउँदछ।`,
  },
  "defamation": {
    titleEn: "Defamation and Abuse",
    titleNp: "मानहानि र दुर्व्यवहार",
    contentEn: `Defamation in Nepal occurs when false statements are published or spoken that harm a person's reputation.

Cases may be civil or criminal depending on severity.

Courts examine whether the statement was published, whether it was false, and whether it caused reputational damage.

Evidence includes media publications, social media posts, witness statements, and communication records.

Remedies include compensation, correction orders, or criminal penalties.

Defamation law protects individual dignity and ensures responsible expression in society.`,
    contentNp: `नेपालमा मानहानि तब हुन्छ जब झूटा भनाइहरू प्रकाशित वा बोलिन्छन् जसले व्यक्तिको प्रतिष्ठालाई हानि पुर्याउँछ।

मुद्दा गम्भीरताको आधारमा दिवानी वा आपराधिक हुन सक्छ।

अदालतले भनाइ प्रकाशित भएको थियो कि थिएन, त्यो झूटो थियो कि थिएन, र यसले प्रतिष्ठित क्षति पुर्यायो कि पुर्याएन भनेर जाँच गर्छ।

प्रमाणहरूमा मिडिया प्रकाशनहरू, सामाजिक सञ्जाल पोस्टहरू, साक्षी बयानहरू, र सञ्चार रेकर्डहरू समावेश छन्।

उपायहरूमा क्षतिपूर्ति, सच्याउने आदेश, वा आपराधिक सजाय समावेश छ।

मानहानि कानूनले व्यक्तिगत गरिमाको रक्षा गर्दछ र समाजमा जिम्मेवार अभिव्यक्ति सुनिश्चित गर्दछ।`,
  },
  "ip-law": {
    titleEn: "IP Law",
    titleNp: "बौद्धिक सम्पत्ति कानून",
    contentEn: `Intellectual Property (IP) law in Nepal protects creative and commercial rights such as trademarks, copyrights, patents, and industrial designs.

Infringement occurs when protected works are used without authorization.

Cases are filed in courts or IP offices depending on nature of dispute.

Evidence includes registration documents, ownership records, and proof of infringement.

Courts may issue injunctions, seize counterfeit goods, or award compensation.

IP law encourages innovation, protects creators, and supports economic development.`,
    contentNp: `नेपालमा बौद्धिक सम्पत्ति कानूनले ट्रेडमार्क, प्रतिलिपि अधिकार, पेटेन्ट, र औद्योगिक डिजाइन जस्ता सिर्जनात्मक र व्यावसायिक अधिकारहरूको संरक्षण गर्दछ।

उल्लङ्घन तब हुन्छ जब संरक्षित कार्यहरू अनाधिकृत रूपमा प्रयोग गरिन्छ।

मुद्दा विवादको प्रकृतिको आधारमा अदालत वा बौद्धिक सम्पत्ति कार्यालयमा दायर गरिन्छ।

प्रमाणहरूमा दर्ता कागजातहरू, स्वामित्व रेकर्डहरू, र उल्लङ्घनको प्रमाण समावेश छ।

अदालतले निषेधाज्ञा जारी गर्न, नकली वस्तु जफत गर्न, वा क्षतिपूर्ति प्रदान गर्न सक्छ।

बौद्धिक सम्पत्ति कानूनले नवाचारलाई प्रोत्साहित गर्दछ, सिर्जनाकर्ताहरूको रक्षा गर्दछ, र आर्थिक विकासलाई समर्थन गर्दछ।`,
  },
  "labor-law": {
    titleEn: "Labor Law",
    titleNp: "श्रम कानून",
    contentEn: `Labor law in Nepal governs employer-employee relations under the Labor Act, 2074.

It covers wages, contracts, working conditions, workplace safety, and dispute resolution mechanisms.

Disputes may be handled through labor offices or courts depending on severity.

Evidence includes employment contracts, salary records, attendance logs, and witness statements.

Courts may order reinstatement, compensation, or penalties for unfair labor practices.

Labor law ensures protection of workers' rights and fair employment practices.`,
    contentNp: `नेपालको श्रम कानूनले श्रम ऐन, २०७४ अन्तर्गत रोजगारदाता-कर्मचारी सम्बन्धलाई नियमन गर्दछ।

यसले ज्याला, अनुबंध, काम गर्ने अवस्था, कार्यस्थल सुरक्षा, र विवाद समाधान संयन्त्रहरू समेट्छ।

विवादहरू गम्भीरताको आधारमा श्रम कार्यालय वा अदालत मार्फत हेरिन सक्छन्।

प्रमाणहरूमा रोजगार अनुबंध, तलब रेकर्डहरू, उपस्थिति लगहरू, र साक्षी बयानहरू समावेश छन्।

अदालतले अनुचित श्रम अभ्यासहरूको लागि पुनर्स्थापना, क्षतिपूर्ति, वा जरिवानाको आदेश दिन सक्छ।

श्रम कानूनले कामदारको अधिकारको संरक्षण र निष्पक्ष रोजगार अभ्यासहरू सुनिश्चित गर्दछ।`,
  },
  "refugee-law": {
    titleEn: "Refugee Law",
    titleNp: "शरणार्थी कानून",
    contentEn: `Refugee law in Nepal deals with protection of displaced persons and asylum seekers.

Although Nepal is not a signatory to the 1951 Refugee Convention, it follows humanitarian principles and international practices.

Authorities assess identity, risk of persecution, and protection needs of individuals seeking asylum.

International organizations may assist in monitoring and support.

Courts may intervene in detention or deportation cases to ensure human rights compliance.

Refugee law balances national sovereignty with humanitarian responsibility and protection of vulnerable individuals.`,
    contentNp: `नेपालको शरणार्थी कानूनले विस्थापित व्यक्ति र शरण खोज्नेहरूको संरक्षणसँग सम्बन्धित छ।

यद्यपि नेपाल १९५१ शरणार्थी सम्मेलनको हस्ताक्षरकर्ता छैन, यसले मानवीय सिद्धान्तहरू र अन्तर्राष्ट्रिय अभ्यासहरू पालना गर्दछ।

अधिकारीहरूले शरण खोज्ने व्यक्तिहरूको पहिचान, उत्पीडनको जोखिम, र संरक्षण आवश्यकताहरूको मूल्याङ्कन गर्छन्।

अन्तर्राष्ट्रिय संस्थाहरूले अनुगमन र सहयोगमा सहायता गर्न सक्छन्।

अदालतहरूले मानव अधिकार अनुपालन सुनिश्चित गर्न हिरासत वा निर्वासन मुद्दाहरूमा हस्तक्षेप गर्न सक्छ।

शरणार्थी कानूनले राष्ट्रिय सम्प्रभुतालाई मानवीय जिम्मेवारी र कमजोर व्यक्तिहरूको संरक्षणसँग सन्तुलन गर्दछ।`,
  },
  // Add any missing services here following the same pattern (e.g., if you have "family-law", "criminal-defense", etc.)
  // For now, I've included the ones you listed.
};

// --- The component itself ---

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const current = slug ? contentData[slug] : null;

  if (!current) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <button
          onClick={() => navigate("/services")}
          className="bg-law-gold hover:bg-law-gold/90 text-royal-blue font-semibold px-6 py-3 rounded-lg transition"
        >
          {language === "en" ? "Back to Services" : "सेवाहरूमा फर्कनुहोस्"}
        </button>
      </div>
    );
  }

  const title = language === "en" ? current.titleEn : current.titleNp;
  const content = language === "en" ? current.contentEn : current.contentNp;

  return (
    <>
      <Helmet>
        <title>{title} | Bhasya Legal</title>
        <meta name="description" content={content.substring(0, 160)} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            onClick={() => navigate("/services")}
            className="mb-8 inline-flex items-center text-law-gold hover:text-royal-blue dark:hover:text-law-gold/80 transition"
          >
            ← {language === "en" ? "Back to all services" : "सबै सेवाहरूमा फर्कनुहोस्"}
          </button>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-royal-blue dark:text-white mb-6">
            {title}
          </h1>

          <div className="w-20 h-1 bg-law-gold mb-8"></div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {content.split('\n\n').map((paragraph: string, idx: number) => (
              <p key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
  <Link
    to="/contact"
    className="bg-law-gold hover:bg-law-gold/90 text-royal-blue font-semibold px-8 py-3 rounded-lg transition inline-block"
  >
    {language === "en" ? "Schedule a Consultation" : "परामर्शको लागि सम्पर्क गर्नुहोस्"}
  </Link>
</div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetail;