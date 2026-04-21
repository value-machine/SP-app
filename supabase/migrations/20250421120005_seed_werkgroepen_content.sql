-- Seed SP Utrecht werkgroepen (from former werkgroepenStaticData). Idempotent via fixed PKs / ON CONFLICT.

INSERT INTO public.organisatie_sections (id, slug, heading, preface, sort_order)
VALUES
  (
    'a1000000-0000-4000-8000-000000000001',
    'bestuur',
    'Bestuur',
    NULL,
    0
  ),
  (
    'a1000000-0000-4000-8000-000000000002',
    'kerngroep',
    'Kerngroep',
    NULL,
    1
  ),
  (
    'a1000000-0000-4000-8000-000000000003',
    'werkgroepen',
    'Organisatie en taken van de werkgroepen',
    $p$
Wat is een werkgroep?

Een werkgroep maakt vooruitgang op dat onderwerp, gedurende het hele jaar. De werkgroep draagt gezamelijke verantwoordelijkheid voor dat onderwerp. De voorzitter van de werkgroep is aanspreekpunt voor het bestuur.

Hieronder vind je de verschillende werkgroepen en verantwoordelijkheden die hierbij horen.
$p$,
    2
  ),
  (
    'a1000000-0000-4000-8000-000000000004',
    'tijdelijk',
    'Tijdelijke organisatie',
    NULL,
    3
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.people (id, full_name, email, phone, is_admin)
VALUES
  ('c3000000-0000-4000-8000-000000000001', 'Jaswinder Singh', NULL, NULL, false),
  ('c3000000-0000-4000-8000-000000000002', 'Nog te vullen', NULL, NULL, false),
  ('c3000000-0000-4000-8000-000000000003', 'Jeroen Rondeel', NULL, NULL, false),
  ('c3000000-0000-4000-8000-000000000004', 'Justin', NULL, NULL, false),
  ('c3000000-0000-4000-8000-000000000005', 'Tom', NULL, NULL, false),
  ('c3000000-0000-4000-8000-000000000006', 'Wimar', NULL, NULL, false),
  ('c3000000-0000-4000-8000-000000000007', 'Jef', NULL, NULL, false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.organisatie_groups (id, section_id, slug, title, description_md, icon_key, sort_order)
VALUES
  (
    'b2000000-0000-4000-8000-000000000001',
    'a1000000-0000-4000-8000-000000000001',
    'bestuur-afdeling',
    'Bestuur',
    $d$
Het bestuur houdt zich bezig met de organisatorische zaken van de afdeling. Het bestaat uit:

**Voorzitter:** De voorzitter staat aan het hoofd van de afdeling en is eindverantwoordelijk. De voorzitter zit vergaderingen van het bestuur en de kerngroepvergaderingen voor. Tevens gaat de voorzitter namens de afdeling naar de Partijraad, het regio-overleg en is het eerste aanspreekpunt voor algemene vragen.

**Organisatiesecretaris:** De organisatiesecretaris is verantwoordelijk voor het ledenbeheer en de communicatie met leden. De organisatiesecretaris geeft leiding aan de werkgroep Ledencommunicatie.

**Penningmeester:** De penningmeester is verantwoordelijk voor de financiën van de afdeling. De penningmeester stelt een begroting op in januari van het jaar en levert de jaarrekening in januari van het volgende jaar. Verder verzorgt de penningmeester betalingen van declaraties en bewaakt de uitgaven.
$d$,
    'bestuur',
    0
  ),
  (
    'b2000000-0000-4000-8000-000000000002',
    'a1000000-0000-4000-8000-000000000002',
    'kerngroep-overleg',
    'Kerngroep',
    $d$
De kerngroep bestaat uit de actieve leden van de SP Utrecht. Deze leden zetten zich in voor acties of schrijven zicht van hieruit in voor werkgroepen.
$d$,
    'kerngroep',
    0
  ),
  (
    'b2000000-0000-4000-8000-000000000003',
    'a1000000-0000-4000-8000-000000000003',
    'wg-externe-communicatie',
    'Werkgroep externe communicatie',
    $d$
De werkgroep communicatie is verantwoordelijk voor de communicatie van de SP Utrecht naar de buitenwereld. Tot de verantwoordelijkheid behoren het bijhouden van de sociale media, traditionele media en de website. De externe communicatie heeft de taak om sympathisanten te bereiken en te laten weten hoe de lokale SP zich inzet voor Utrecht en haar burgers. De voorzitter is contactpersoon.
$d$,
    'externeCommunicatie',
    0
  ),
  (
    'b2000000-0000-4000-8000-000000000004',
    'a1000000-0000-4000-8000-000000000003',
    'wg-ledencommunicatie',
    'Werkgroep Ledencommunicatie',
    $d$
De werkgroep Ledencommunicatie gaat over het contact naar leden toe. De eindverantwoordelijke, en tevens werkgroepvoorzitter, is de Organisatiesecretaris. Die heeft als enige toegang tot de ledenadministratie en verstuurt de mails.
$d$,
    'ledencommunicatie',
    1
  ),
  (
    'b2000000-0000-4000-8000-000000000005',
    'a1000000-0000-4000-8000-000000000003',
    'wg-samenkomen',
    'Werkgroep Samenkomen',
    $d$
De werkgroep Samenkomen heeft de verantwoordelijkheid om binding en mogelijk vriendschappen tussen de SP-leden te creëren en niet-leden te kunnen aanspreken. Daarnaast moeten er evenementen georganiseerd worden waar niet-leden op toegankelijke wijze kunnen aansluiten zodat zij op een laagdrempelige manier kennis kunnen maken met de SP.
$d$,
    'samenkomen',
    2
  ),
  (
    'b2000000-0000-4000-8000-000000000006',
    'a1000000-0000-4000-8000-000000000003',
    'wg-actie',
    'Werkgroep actie',
    $d$
Het bedenken van acties die op de actualiteit zijn gebaseerd en bijdragen aan het politiek activeren van burgers en de lokale overheid.
$d$,
    'actie',
    3
  ),
  (
    'b2000000-0000-4000-8000-000000000007',
    'a1000000-0000-4000-8000-000000000003',
    'wg-massalijn',
    'Werkgroep Massalijn',
    $d$
De werkgroep politieke monitoring houdt zich bezig met de ontwikkelingen in de lokale politiek in de gemeente en provincie Utrecht. Deze werkgroep is verantwoordelijk voor het bijhouden van deze ontwikkelingen zodat de lokale SP weet wat er speelt en daar een standpunt over kan innemen.
$d$,
    'massalijn',
    4
  ),
  (
    'b2000000-0000-4000-8000-000000000008',
    'a1000000-0000-4000-8000-000000000004',
    'campagnecommissie',
    'Campagnecommissie',
    $d$
Tijdelijke commissie voor campagnevoorbereiding en -uitvoering. Verdere invulling volgt.
$d$,
    'campagne',
    0
  ),
  (
    'b2000000-0000-4000-8000-000000000009',
    'a1000000-0000-4000-8000-000000000004',
    'programmacommissie',
    'Programmacommissie',
    $d$
Tijdelijke commissie voor programma-onderwerpen. Verdere invulling volgt.
$d$,
    'programma',
    1
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.group_memberships (id, group_id, person_id, role_label, note, sort_order)
VALUES
  (
    'd4000000-0000-4000-8000-000000000001',
    'b2000000-0000-4000-8000-000000000001',
    'c3000000-0000-4000-8000-000000000001',
    'Voorzitter',
    NULL,
    0
  ),
  (
    'd4000000-0000-4000-8000-000000000002',
    'b2000000-0000-4000-8000-000000000001',
    'c3000000-0000-4000-8000-000000000002',
    'Organisatiesecretaris',
    NULL,
    1
  ),
  (
    'd4000000-0000-4000-8000-000000000003',
    'b2000000-0000-4000-8000-000000000001',
    'c3000000-0000-4000-8000-000000000003',
    'Penningmeester',
    NULL,
    2
  ),
  (
    'd4000000-0000-4000-8000-000000000004',
    'b2000000-0000-4000-8000-000000000003',
    'c3000000-0000-4000-8000-000000000001',
    'Voorzitter',
    NULL,
    0
  ),
  (
    'd4000000-0000-4000-8000-000000000005',
    'b2000000-0000-4000-8000-000000000003',
    'c3000000-0000-4000-8000-000000000004',
    'Lid',
    NULL,
    1
  ),
  (
    'd4000000-0000-4000-8000-000000000006',
    'b2000000-0000-4000-8000-000000000003',
    'c3000000-0000-4000-8000-000000000005',
    'Lid',
    'website plaatsingen',
    2
  ),
  (
    'd4000000-0000-4000-8000-000000000007',
    'b2000000-0000-4000-8000-000000000004',
    'c3000000-0000-4000-8000-000000000006',
    'Voorzitter',
    'in overdracht',
    0
  ),
  (
    'd4000000-0000-4000-8000-000000000008',
    'b2000000-0000-4000-8000-000000000004',
    'c3000000-0000-4000-8000-000000000005',
    'Lid',
    NULL,
    1
  ),
  (
    'd4000000-0000-4000-8000-000000000009',
    'b2000000-0000-4000-8000-000000000005',
    'c3000000-0000-4000-8000-000000000003',
    'Voorzitter',
    NULL,
    0
  ),
  (
    'd4000000-0000-4000-8000-000000000010',
    'b2000000-0000-4000-8000-000000000005',
    'c3000000-0000-4000-8000-000000000004',
    'Lid',
    NULL,
    1
  ),
  (
    'd4000000-0000-4000-8000-000000000011',
    'b2000000-0000-4000-8000-000000000006',
    'c3000000-0000-4000-8000-000000000004',
    'Voorzitter',
    NULL,
    0
  ),
  (
    'd4000000-0000-4000-8000-000000000012',
    'b2000000-0000-4000-8000-000000000006',
    'c3000000-0000-4000-8000-000000000003',
    'Lid',
    NULL,
    1
  ),
  (
    'd4000000-0000-4000-8000-000000000013',
    'b2000000-0000-4000-8000-000000000006',
    'c3000000-0000-4000-8000-000000000001',
    'Lid',
    NULL,
    2
  ),
  (
    'd4000000-0000-4000-8000-000000000014',
    'b2000000-0000-4000-8000-000000000007',
    'c3000000-0000-4000-8000-000000000001',
    'Voorzitter',
    NULL,
    0
  ),
  (
    'd4000000-0000-4000-8000-000000000015',
    'b2000000-0000-4000-8000-000000000007',
    'c3000000-0000-4000-8000-000000000007',
    'Lid',
    'Nieuwegein alleen',
    1
  ),
  (
    'd4000000-0000-4000-8000-000000000016',
    'b2000000-0000-4000-8000-000000000007',
    'c3000000-0000-4000-8000-000000000005',
    'Lid',
    'alleen burgerparticipatie',
    2
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.responsibilities (id, group_id, title, description_md, sort_order)
VALUES
  (
    'e5000000-0000-4000-8000-000000000001',
    'b2000000-0000-4000-8000-000000000001',
    'Algemene Ledenvergadering voorbereiden',
    '',
    0
  ),
  (
    'e5000000-0000-4000-8000-000000000002',
    'b2000000-0000-4000-8000-000000000001',
    'Kerngroepoverleg voorbereiden',
    '',
    1
  ),
  (
    'e5000000-0000-4000-8000-000000000003',
    'b2000000-0000-4000-8000-000000000001',
    'Voorzitten van de verschillende werkgroepen',
    '',
    2
  ),
  (
    'e5000000-0000-4000-8000-000000000004',
    'b2000000-0000-4000-8000-000000000001',
    'Contact met SP Jongeren Utrecht onderhouden',
    '',
    3
  ),
  (
    'e5000000-0000-4000-8000-000000000005',
    'b2000000-0000-4000-8000-000000000001',
    'aanvullen',
    '',
    4
  ),
  (
    'e5000000-0000-4000-8000-000000000010',
    'b2000000-0000-4000-8000-000000000003',
    'Media — sociale media en evenementen',
    $d$
Het beheren van de sociale media (Instagram, TikTok, Facebook, eventueel andere) en het delen van lokale SP-evenementen.
$d$,
    0
  ),
  (
    'e5000000-0000-4000-8000-000000000011',
    'b2000000-0000-4000-8000-000000000003',
    'Media — ludieke posts',
    $d$
Het bedenken van ludieke en aansprekende posts.
$d$,
    1
  ),
  (
    'e5000000-0000-4000-8000-000000000012',
    'b2000000-0000-4000-8000-000000000003',
    'Media — visuele kwaliteit',
    $d$
Het verzorgen van de (audio)visuele kwaliteit van de posts zodat ze aansprekend zijn en binnen de huisstijl van de SP passen.
$d$,
    2
  ),
  (
    'e5000000-0000-4000-8000-000000000013',
    'b2000000-0000-4000-8000-000000000003',
    'Media — timing en bereik',
    $d$
Het op de juiste tijd posten voor het meest effectieve bereik.
$d$,
    3
  ),
  (
    'e5000000-0000-4000-8000-000000000014',
    'b2000000-0000-4000-8000-000000000003',
    'Media — promotie evenementen',
    $d$
Het promoten van politieke en gezellige evenementen van de SP zodat niet-leden eenvoudig en laagdrempelig in aanraking kunnen komen met de SP.
$d$,
    4
  ),
  (
    'e5000000-0000-4000-8000-000000000015',
    'b2000000-0000-4000-8000-000000000003',
    'Traditionele media — contactpersoon',
    $d$
Het fungeren als contactpersoon voor de reguliere media.
$d$,
    5
  ),
  (
    'e5000000-0000-4000-8000-000000000016',
    'b2000000-0000-4000-8000-000000000003',
    'Traditionele media — persberichten',
    $d$
Het schrijven van persberichten voor lokale en reguliere media; deze kunnen ook ter inspiratie dienen voor socialmediaposts.
$d$,
    6
  ),
  (
    'e5000000-0000-4000-8000-000000000017',
    'b2000000-0000-4000-8000-000000000003',
    'Traditionele media — website',
    $d$
Het actief bijhouden van de website waar bijeenkomsten, acties en relevante ontwikkelingen staan die van belang zijn voor leden en niet-leden.
$d$,
    7
  ),
  (
    'e5000000-0000-4000-8000-000000000020',
    'b2000000-0000-4000-8000-000000000004',
    'Nieuwe leden bellen',
    $d$
Bij het bellen van nieuwe leden worden ze uitgenodigd voor een nieuwe-ledendag en worden ze op weg geholpen binnen de SP (naar wat ze ambiëren).
$d$,
    0
  ),
  (
    'e5000000-0000-4000-8000-000000000021',
    'b2000000-0000-4000-8000-000000000004',
    'Nieuwsbrieven',
    $d$
Het schrijven van, bijvoegen bij de Tribune, en het mailen van nieuwsbrieven naar de leden — minimaal tegelijkertijd met de bezorging van de Tribune.
$d$,
    1
  ),
  (
    'e5000000-0000-4000-8000-000000000022',
    'b2000000-0000-4000-8000-000000000004',
    'Bellen voor activiteiten',
    $d$
Leden bellen om ze uit te nodigen voor scholing, folderen, flyeren of een andere activiteit. De werkgroep maakt een belscript; de Organisatiesecretaris maakt een bellijst; de werkgroep belt de desbetreffende leden binnen de afgesproken termijn.
$d$,
    2
  ),
  (
    'e5000000-0000-4000-8000-000000000023',
    'b2000000-0000-4000-8000-000000000004',
    'Tribune-distributie',
    $d$
De Tribune-distributie.
$d$,
    3
  ),
  (
    'e5000000-0000-4000-8000-000000000030',
    'b2000000-0000-4000-8000-000000000005',
    'Politiek café',
    $d$
Verantwoordelijk voor de organisatie van het Politiek café: een debatavond waarin leden (en niet-leden) met elkaar in gesprek kunnen over een relevant onderwerp. Hier mag inhoudelijk worden gedebatteerd over hoe we maatschappelijke thema’s op een socialistische manier kunnen uitdragen. Voor de evenementen zijn een locatie, tijd en bij voorkeur een politiek zwaargewicht uit de SP nodig.
$d$,
    0
  ),
  (
    'e5000000-0000-4000-8000-000000000031',
    'b2000000-0000-4000-8000-000000000005',
    'Overige politieke activiteiten',
    $d$
Overige politieke activiteiten, zoals scholingen en nieuwe-ledenbijeenkomsten (verder uit te werken via kerngroepactiviteiten).
$d$,
    1
  ),
  (
    'e5000000-0000-4000-8000-000000000032',
    'b2000000-0000-4000-8000-000000000005',
    'Toegankelijke uitjes',
    $d$
Het organiseren van toegankelijke uitjes: activiteiten waarbij leden elkaar op een nieuwe manier leren kennen; niet-leden kunnen welkom zijn.
$d$,
    2
  ),
  (
    'e5000000-0000-4000-8000-000000000040',
    'b2000000-0000-4000-8000-000000000006',
    'Acties bedenken',
    $d$
Het bedenken van acties die op de actualiteit zijn gebaseerd en bijdragen aan het politiek activeren van burgers en de lokale overheid.
$d$,
    0
  ),
  (
    'e5000000-0000-4000-8000-000000000041',
    'b2000000-0000-4000-8000-000000000006',
    'Acties organiseren',
    $d$
Het organiseren van acties door als contactpersoon in contact te staan met de leden van de actiegroep: verantwoordelijk voor datum, tijd en plaats van de actie; voor het contacteren van de media en het overhandigen van het persbericht.
$d$,
    1
  ),
  (
    'e5000000-0000-4000-8000-000000000042',
    'b2000000-0000-4000-8000-000000000006',
    'Fysieke attributen',
    $d$
Het maken van fysieke attributen die de actie ondersteunen, zoals borden, spandoeken of andere knutselwerken.
$d$,
    2
  ),
  (
    'e5000000-0000-4000-8000-000000000050',
    'b2000000-0000-4000-8000-000000000007',
    'Lokaal nieuws monitoren',
    $d$
Verantwoordelijk voor het monitoren van (lokaal) nieuws door te volgen wat er gebeurt op lokale nieuwswebsites zoals DUIC en RTV Utrecht. Deze monitoring kan eventueel worden samengevat in een overzicht voor het bestuur.
$d$,
    0
  ),
  (
    'e5000000-0000-4000-8000-000000000051',
    'b2000000-0000-4000-8000-000000000007',
    'Gemeenteraad monitoren',
    $d$
Verantwoordelijk voor het monitoren van lokale politieke ontwikkelingen door relevante ontwikkelingen in de gemeenteraad bij te houden: relevante moties, amendementen en besluitenlijsten. Dit kan eventueel in een gedeelde lijst voor een duidelijk totaaloverzicht.
$d$,
    1
  )
ON CONFLICT (id) DO NOTHING;
