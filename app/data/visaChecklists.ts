// app/data/visaChecklists.ts

export interface RequirementItem {
  document: string;
  description: string;
  communityTip?: string;
  priority: 'High' | 'Medium' | 'Optional';
}

export interface ChecklistSection {
  sectionTitle: string;
  sectionDescription?: string;
  items: RequirementItem[];
}

export interface VisaSubclass {
  id: string;
  name: string;
  description: string;
  sections: ChecklistSection[];
}

export interface CountryChecklist {
  countryName: string;
  flag: string;
  subclasses: VisaSubclass[];
}

export const VISA_CHECKLISTS_DATA: Record<string, CountryChecklist> = {
  australia: {
    countryName: 'Australia',
    flag: '🇦🇺',
    subclasses: [
      {
        id: '309',
        name: 'Partner Visa (Subclass 309 / 100)',
        description: 'Provisional and Permanent Partner visa for offshore applicants.',
        sections: [
          {
            sectionTitle: 'Pillar 1: Financial Aspects',
            sectionDescription: 'Evidence that your relationship is financially interdependent and active.',
            items: [
              {
                document: 'Joint Bank Accounts',
                description: 'Statements showing regular use for household expenses, shopping, and bills over time.',
                communityTip: 'Do not just open an account and leave it empty. Regular transactions speak louder than a large balance.',
                priority: 'High',
              },
              {
                document: 'Financial Transfers',
                description: 'Bank receipts or mobile banking history showing mutual financial support or sharing of costs.',
                communityTip: 'Highlight transfers with clear remarks like "Rent", "Groceries", or "Gift".',
                priority: 'High',
              },
              {
                document: 'Joint Large Purchases',
                description: 'Assets, vehicles, investments, or major electronic items bought together.',
                priority: 'Medium',
              },
            ],
          },
          {
            sectionTitle: 'Pillar 2: Nature of the Household',
            sectionDescription: 'Evidence showing how you organize your living arrangements and share responsibilities.',
            items: [
              {
                document: 'Joint Lease or Tenancy Agreements',
                description: 'Current and past rental agreements showing both names as co-tenants.',
                priority: 'High',
              },
              {
                document: 'Mailing History to the Same Address',
                description: 'Official correspondence (utility bills, bank letters, internet bills) showing both names at the same physical address.',
                communityTip: 'Collect letters from the same months across a timeline to prove continuous cohabitation.',
                priority: 'High',
              },
              {
                document: 'Statutory Declaration on Household Duties',
                description: 'A brief breakdown statement describing how cooking, cleaning, and utility payments are distributed.',
                priority: 'Medium',
              },
            ],
          },
          {
            sectionTitle: 'Pillar 3: Social Context Aspects',
            sectionDescription: 'Evidence showing that your friends, family, and the wider community recognize you as a couple.',
            items: [
              {
                document: 'Form 888 Statutory Declarations',
                description: 'Statements completed by Australian citizens or permanent residents who know you well.',
                communityTip: 'Immigration typically requires at least 2, but submitting 3-4 distinct ones from friends/family adds excellent weight.',
                priority: 'High',
              },
              {
                document: 'Travel Logs & Joint Bookings',
                description: 'Flight tickets, hotel receipts, and itineraries showing vacations or trips taken together.',
                priority: 'High',
              },
              {
                document: 'Social Media & Event Visuals',
                description: 'Photos with family members, at weddings, or social outings with friends over a wide timeline (Use the VisaDoc Photo Collage Tool!).',
                priority: 'Medium',
              },
            ],
          },
          {
            sectionTitle: 'Pillar 4: Nature of Commitment',
            sectionDescription: 'Evidence of a long-term, mutually exclusive relationship and plans for the future.',
            items: [
              {
                document: 'Will or Life Insurance Policies',
                description: 'Documents naming each other as superannuation, insurance, or legal estate beneficiaries.',
                priority: 'High',
              },
              {
                document: 'Communication Logs During Separation',
                description: 'Call logs, chat histories (WhatsApp/Viber export samples) showing constant interaction during long-distance intervals.',
                communityTip: 'Do not upload 1000 pages of text. Select 1-2 pages per month of separation showing call frequencies and chat logs.',
                priority: 'High',
              },
              {
                document: 'Future Plans Declaration',
                description: 'Detailed statement outlining your future intent together (e.g., house buying, family planning).',
                priority: 'Medium',
              },
            ],
          },
        ],
      },
      {
        id: '600',
        name: 'Visitor Visa (Subclass 600)',
        description: 'Tourist stream visa for short stays, family visits, or business trips.',
        sections: [
          {
            sectionTitle: 'Core Eligibility Requirements',
            items: [
              {
                document: 'Proof of Funds',
                description: 'Personal bank statements showing stable balance history for the last 3-6 months.',
                communityTip: 'Sudden huge deposits right before applying raise instant red flags.',
                priority: 'High',
              },
              {
                document: 'Ties to Home Country',
                description: 'Employment letter, pay slips, property valuations, or family registration certificates.',
                communityTip: 'Crucial element. Prove why you absolutely must return home after your trip.',
                priority: 'High',
              },
            ],
          },
        ],
      },
    ],
  },
};