import {
  CONTACT_PLACEHOLDER,
  type OrganisatieLid,
  type WerkgroepenStaticData,
} from "@/features/werkgroepen/types/werkgroepen.types";

const p = (): string => CONTACT_PLACEHOLDER;

const lid = (name: string, roleLabel: string, note?: string): OrganisatieLid => ({
  name,
  email: p(),
  phone: p(),
  roleLabel,
  ...(note ? { note } : {}),
});

const buildBestuurSection = (): WerkgroepenStaticData["sections"][number] => ({
  id: "bestuur",
  heading: "Bestuur",
  groups: [
    {
      id: "bestuur-afdeling",
      title: "Bestuur",
      iconKey: "bestuur",
      description: [
        "Het bestuur houdt zich bezig met de organisatorische zaken van de afdeling. Het bestaat uit:",
        "",
        "Voorzitter: De voorzitter staat aan het hoofd van de afdeling en is eindverantwoordelijk. De voorzitter zit vergaderingen van het bestuur en de kerngroepvergaderingen voor. Tevens gaat de voorzitter namens de afdeling naar de Partijraad, het regio-overleg en is het eerste aanspreekpunt voor algemene vragen.",
        "",
        "Organisatiesecretaris: De organisatiesecretaris is verantwoordelijk voor het ledenbeheer en de communicatie met leden. De organisatiesecretaris geeft leiding aan de werkgroep Ledencommunicatie.",
        "",
        "Penningmeester: De penningmeester is verantwoordelijk voor de financiën van de afdeling. De penningmeester stelt een begroting op in januari van het jaar en levert de jaarrekening in januari van het volgende jaar. Verder verzorgt de penningmeester betalingen van declaraties en bewaakt de uitgaven.",
      ].join("\n"),
      members: [
        lid("Jaswinder Singh", "Voorzitter"),
        lid("Nog te vullen", "Organisatiesecretaris"),
        lid("Jeroen Rondeel", "Penningmeester"),
      ],
      extraBulletPoints: [
        "Algemene Ledenvergadering voorbereiden",
        "Kerngroepoverleg voorbereiden",
        "Voorzitten van de verschillende werkgroepen",
        "Contact met SP Jongeren Utrecht onderhouden",
        "aanvullen",
      ],
    },
  ],
});

const buildKerngroepSection = (): WerkgroepenStaticData["sections"][number] => ({
  id: "kerngroep",
  heading: "Kerngroep",
  groups: [
    {
      id: "kerngroep-overleg",
      title: "Kerngroep",
      iconKey: "kerngroep",
      description: [
        "De kerngroep bestaat uit de actieve leden van de SP Utrecht. Deze leden zetten zich in voor acties of schrijven zicht van hieruit in voor werkgroepen.",
      ].join("\n"),
      members: [],
    },
  ],
});

const buildWerkgroepenSection = (): WerkgroepenStaticData["sections"][number] => ({
  id: "werkgroepen",
  heading: "Organisatie en taken van de werkgroepen",
  preface: [
    "Wat is een werkgroep?",
    "",
    "Een werkgroep maakt vooruitgang op dat onderwerp, gedurende het hele jaar. De werkgroep draagt gezamelijke verantwoordelijkheid voor dat onderwerp. De voorzitter van de werkgroep is aanspreekpunt voor het bestuur.",
    "",
    "Hieronder vind je de verschillende werkgroepen en verantwoordelijkheden die hierbij horen.",
  ].join("\n"),
  groups: [
    {
      id: "wg-externe-communicatie",
      title: "Werkgroep externe communicatie",
      iconKey: "externeCommunicatie",
      description: [
        "De werkgroep communicatie is verantwoordelijk voor de communicatie van de SP Utrecht naar de buitenwereld. Tot de verantwoordelijkheid behoren het bijhouden van de sociale media, traditionele media en de website. De externe communicatie heeft de taak om sympathisanten te bereiken en te laten weten hoe de lokale SP zich inzet voor Utrecht en haar burgers. De voorzitter is contactpersoon.",
        "",
        "Media",
        "Het beheren van de sociale media (Instagram, TikTok, Facebook, eventueel andere) en het delen van lokale SP-evenementen.",
        "Het bedenken van ludieke en aansprekende posts.",
        "Het verzorgen van de (audio)visuele kwaliteit van de posts zodat ze aansprekend zijn en binnen de huisstijl van de SP passen.",
        "Het op de juiste tijd posten voor het meest effectieve bereik.",
        "Het promoten van politieke en gezellige evenementen van de SP zodat niet-leden eenvoudig en laagdrempelig in aanraking kunnen komen met de SP.",
        "",
        "Traditionele media",
        "Het fungeren als contactpersoon voor de reguliere media.",
        "Het schrijven van persberichten voor lokale en reguliere media; deze kunnen ook ter inspiratie dienen voor socialmediaposts.",
        "Het actief bijhouden van de website waar bijeenkomsten, acties en relevante ontwikkelingen staan die van belang zijn voor leden en niet-leden.",
      ].join("\n"),
      members: [
        lid("Jaswinder", "Voorzitter"),
        lid("Justin", "Lid"),
        lid("Tom", "Lid", "website plaatsingen"),
      ],
    },
    {
      id: "wg-ledencommunicatie",
      title: "Werkgroep Ledencommunicatie",
      iconKey: "ledencommunicatie",
      description: [
        "De werkgroep Ledencommunicatie gaat over het contact naar leden toe. De eindverantwoordelijke, en tevens werkgroepvoorzitter, is de Organisatiesecretaris. Die heeft als enige toegang tot de ledenadministratie en verstuurt de mails.",
        "",
        "Nieuwe leden bellen: bij het bellen van nieuwe leden worden ze uitgenodigd voor een nieuwe-ledendag en worden ze op weg geholpen binnen de SP (naar wat ze ambiëren).",
        "Nieuwsbrieven: het schrijven van, bijvoegen bij de Tribune, en het mailen van nieuwsbrieven naar de leden — minimaal tegelijkertijd met de bezorging van de Tribune.",
        "Bellen: leden bellen om ze uit te nodigen voor scholing, folderen, flyeren of een andere activiteit. De werkgroep maakt een belscript; de Organisatiesecretaris maakt een bellijst; de werkgroep belt de desbetreffende leden binnen de afgesproken termijn.",
        "De Tribune-distributie.",
      ].join("\n"),
      members: [lid("Wimar", "Voorzitter", "in overdracht"), lid("Tom", "Lid")],
    },
    {
      id: "wg-samenkomen",
      title: "Werkgroep Samenkomen",
      iconKey: "samenkomen",
      description: [
        "De werkgroep Samenkomen heeft de verantwoordelijkheid om binding en mogelijk vriendschappen tussen de SP-leden te creëren en niet-leden te kunnen aanspreken. Daarnaast moeten er evenementen georganiseerd worden waar niet-leden op toegankelijke wijze kunnen aansluiten zodat zij op een laagdrempelige manier kennis kunnen maken met de SP.",
        "",
        "Verantwoordelijk voor de organisatie van het Politiek café: een debatavond waarin leden (en niet-leden) met elkaar in gesprek kunnen over een relevant onderwerp. Hier mag inhoudelijk worden gedebatteerd over hoe we maatschappelijke thema’s op een socialistische manier kunnen uitdragen. Voor de evenementen zijn een locatie, tijd en bij voorkeur een politiek zwaargewicht uit de SP nodig.",
        "Overige politieke activiteiten, zoals scholingen en nieuwe-ledenbijeenkomsten (verder uit te werken via kerngroepactiviteiten).",
        "Het organiseren van toegankelijke uitjes: activiteiten waarbij leden elkaar op een nieuwe manier leren kennen; niet-leden kunnen welkom zijn.",
      ].join("\n"),
      members: [lid("Jeroen", "Voorzitter"), lid("Justin", "Lid")],
    },
    {
      id: "wg-actie",
      title: "Werkgroep actie",
      iconKey: "actie",
      description: [
        "Het bedenken van acties die op de actualiteit zijn gebaseerd en bijdragen aan het politiek activeren van burgers en de lokale overheid.",
        "Het organiseren van acties door als contactpersoon in contact te staan met de leden van de actiegroep: verantwoordelijk voor datum, tijd en plaats van de actie; voor het contacteren van de media en het overhandigen van het persbericht.",
        "Het maken van fysieke attributen die de actie ondersteunen, zoals borden, spandoeken of andere knutselwerken.",
      ].join("\n"),
      members: [lid("Justin", "Voorzitter"), lid("Jeroen", "Lid"), lid("Jaswinder", "Lid")],
    },
    {
      id: "wg-massalijn",
      title: "Werkgroep Massalijn",
      iconKey: "massalijn",
      description: [
        "De werkgroep politieke monitoring houdt zich bezig met de ontwikkelingen in de lokale politiek in de gemeente en provincie Utrecht. Deze werkgroep is verantwoordelijk voor het bijhouden van deze ontwikkelingen zodat de lokale SP weet wat er speelt en daar een standpunt over kan innemen.",
        "",
        "Verantwoordelijk voor het monitoren van (lokaal) nieuws door te volgen wat er gebeurt op lokale nieuwswebsites zoals DUIC en RTV Utrecht. Deze monitoring kan eventueel worden samengevat in een overzicht voor het bestuur.",
        "Verantwoordelijk voor het monitoren van lokale politieke ontwikkelingen door relevante ontwikkelingen in de gemeenteraad bij te houden: relevante moties, amendementen en besluitenlijsten. Dit kan eventueel in een gedeelde lijst voor een duidelijk totaaloverzicht.",
      ].join("\n"),
      members: [
        lid("Jaswinder", "Voorzitter"),
        lid("Jef", "Lid", "Nieuwegein alleen"),
        lid("Tom", "Lid", "alleen burgerparticipatie"),
      ],
    },
  ],
});

const buildTijdelijkSection = (): WerkgroepenStaticData["sections"][number] => ({
  id: "tijdelijk",
  heading: "Tijdelijke organisatie",
  groups: [
    {
      id: "campagnecommissie",
      title: "Campagnecommissie",
      iconKey: "campagne",
      description:
        "Tijdelijke commissie voor campagnevoorbereiding en -uitvoering. Verdere invulling volgt.",
      members: [],
    },
    {
      id: "programmacommissie",
      title: "Programmacommissie",
      iconKey: "programma",
      description: "Tijdelijke commissie voor programma-onderwerpen. Verdere invulling volgt.",
      members: [],
    },
  ],
});

export const getWerkgroepenStaticData = (): WerkgroepenStaticData => ({
  sections: [
    buildBestuurSection(),
    buildKerngroepSection(),
    buildWerkgroepenSection(),
    buildTijdelijkSection(),
  ],
});
