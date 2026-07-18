export interface ShowcaseStep {
  id: "install" | "consent" | "accounts" | "payment" | "callback" | "review";
  label: string;
  command: string;
  output: readonly string[];
  mel?: string;
}

export const showcaseSteps: readonly ShowcaseStep[] = [
  {
    id: "install",
    label: "Instalação",
    command: "npm install @jatai/sdk",
    output: ["added @jatai/sdk", "sandbox: ready"],
  },
  {
    id: "consent",
    label: "Consentimento",
    command: "await jatai.auth.createConsent({ scopes: ['ACCOUNTS', 'PIX'] })",
    output: ["consentId: 'cns_demo'", "expiresIn: 3600"],
    mel: "O acesso expira. Renove o consentimento, não a senha do usuário.",
  },
  {
    id: "accounts",
    label: "Contas",
    command: "await jatai.accounts.list({ consentId: 'cns_demo' })",
    output: ["account: 'Conta de teste'", "balance: 4280.50 BRL"],
  },
  {
    id: "payment",
    label: "Pix",
    command: "await jatai.payments.createPix({ amount: 18.90 })",
    output: ["paymentId: 'pix_demo'", "status: 'PENDING'"],
    mel: "O Pix termina depois. A resposta inicial pode ficar pendente.",
  },
  {
    id: "callback",
    label: "Callback",
    command: "jatai.payments.on('pix.completed', handlePayment)",
    output: ["event: 'pix.completed'", "status: 'COMPLETED'"],
    mel: "O evento pode repetir. Mantenha o callback idempotente.",
  },
  {
    id: "review",
    label: "Revisão",
    command: "jatai.session.summary()",
    output: ["consent: valid", "payment: completed", "realDataUsed: false"],
  },
] as const;
