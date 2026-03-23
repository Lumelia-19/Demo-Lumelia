export const quotes = [
  {
    id: 'Q-88219',
    leadId: 1,
    clientName: 'Boulangerie Dupont',
    contact: 'Jean-Pierre Dupont',
    email: 'jp.dupont@boulangerie.fr',
    location: 'Lyon, FR',
    address: '24 Rue de la République, Lyon',
    status: 'pending',
    statusLabel: "Trié par l'IA",
    aiPredictedValue: 1450,
    total: 1450,
    requestSummary:
      "Maintenance climatisation pour la boutique à Lyon. Inspection complète de 3 unités plafonnières et remplacement des filtres.",
    lineItems: [
      { label: '3x Inspection unité AC', amount: 750 },
      { label: 'Remplacement jeu de filtres', amount: 350 },
      { label: "Main-d'œuvre (4 heures)", amount: 350 },
    ],
    serviceConditions: [
      'Garantie de 24 mois sur les pièces',
      'Élimination sur site des anciens filtres',
      'Rapport de certification numérique',
    ],
    aiAnalysis:
      "Client réactif. L'équipe de service de Lyon #4 est disponible jeudi pour cette intervention. Réservation recommandée immédiatement après approbation.",
    timeline: [
      {
        id: 1,
        type: 'received',
        icon: 'mail',
        label: 'Lead reçu',
        time: '09:12',
        isAgent: false,
        message:
          'Demande entrante capturée via le formulaire de contact public. Source : Site web.',
        tags: [],
      },
      {
        id: 2,
        type: 'agent',
        icon: 'smart_toy',
        label: "Réponse de l'agent IA",
        time: '09:15',
        isAgent: true,
        message:
          "Bonjour M. Dupont, merci de nous avoir contactés. Pour établir un devis précis pour votre boutique à Lyon, pourriez-vous confirmer le nombre total d'unités et si nos techniciens auront besoin d'accéder au toit ?",
        tags: ['Envoyé', 'Vérifié'],
      },
      {
        id: 3,
        type: 'reply',
        icon: 'chat_bubble',
        label: 'Réponse du lead reçue',
        time: '10:04',
        isAgent: false,
        message:
          "Oui, 3 unités en intérieur. Pas besoin d'accès au toit, elles sont montées au plafond dans la boutique. Veuillez envoyer le devis.",
        tags: [],
      },
      {
        id: 4,
        type: 'quote',
        icon: 'description',
        label: 'Devis généré',
        time: '10:06',
        isAgent: true,
        draftLabel: 'Brouillon #Q-88219',
        draftNote:
          "L'IA a généré le devis basé sur les tarifs standards de Lyon pour 3 unités de plafond.",
        tags: [],
      },
    ],
  },
];

export const getQuoteById = (id) => quotes.find((q) => q.id === id) ?? quotes[0];
