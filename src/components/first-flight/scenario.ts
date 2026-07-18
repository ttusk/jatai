export type MelState = "hovering" | "explaining" | "hint" | "error" | "flying";

export interface FirstFlightStep {
  id: "install" | "consent" | "account" | "payment" | "callback" | "review";
  eyebrow: string;
  title: string;
  concept: string;
  code: string;
  output: readonly string[];
  mel: {
    state: MelState;
    question: string;
    explanation: string;
  };
}

export const firstFlightSteps: readonly FirstFlightStep[] = [
  {
    id: "install",
    eyebrow: "Preparar",
    title: "Instale o SDK",
    concept:
      "Comece com um único pacote. Neste projeto acadêmico, tudo acontece localmente e sem credenciais reais.",
    code: "npm install @jatai/sdk",
    output: ["added 1 fictional package in 0.8s", "✓ ambiente simulado pronto"],
    mel: {
      state: "hovering",
      question: "Por que um único SDK?",
      explanation:
        "Um só pacote deixa você aprender o fluxo inteiro antes de separar contas, consentimento e pagamentos em serviços diferentes.",
    },
  },
  {
    id: "consent",
    eyebrow: "Autorizar",
    title: "Crie um consentimento",
    concept:
      "O consentimento registra quais dados o usuário permitiu acessar e por quanto tempo essa permissão vale.",
    code: "await jatai.auth.createConsent({ scopes: ['ACCOUNTS', 'PIX'] })",
    output: ["consentId: 'cns_7JATAI'", "status: 'AWAITING_AUTHORISATION'"],
    mel: {
      state: "explaining",
      question: "Consentimento é uma senha?",
      explanation:
        "Não. Ele descreve uma permissão limitada. A senha nunca passa pelo seu aplicativo e o consentimento pode expirar ou ser revogado.",
    },
  },
  {
    id: "account",
    eyebrow: "Consultar",
    title: "Leia uma conta sintética",
    concept:
      "Com o consentimento aprovado, o SDK devolve dados inventados que preservam a estrutura de uma integração financeira.",
    code: "await jatai.accounts.list({ consentId: 'cns_7JATAI' })",
    output: ["institution: 'Banco Escola'", "balance: 4280.50", "currency: 'BRL'"],
    mel: {
      state: "hint",
      question: "Esses dados pertencem a alguém?",
      explanation:
        "Não. Eles são sintéticos: parecem plausíveis para o exercício, mas não representam uma pessoa, conta ou instituição real.",
    },
  },
  {
    id: "payment",
    eyebrow: "Iniciar",
    title: "Simule um Pix",
    concept:
      "A iniciação cria uma intenção de pagamento. Nenhum dinheiro é movimentado nesta experiência.",
    code: "await jatai.payments.createPix({ amount: 18.90, key: 'mel@jatai.dev' })",
    output: ["paymentId: 'pix_FIRST_FLIGHT'", "status: 'PROCESSING'"],
    mel: {
      state: "explaining",
      question: "Por que o status não é concluído?",
      explanation:
        "Pagamentos podem terminar depois da resposta inicial. Seu sistema precisa acompanhar a mudança de estado sem bloquear a interface.",
    },
  },
  {
    id: "callback",
    eyebrow: "Acompanhar",
    title: "Receba o callback",
    concept:
      "O callback avisa seu aplicativo quando o processamento termina, mesmo que a requisição original já tenha acabado.",
    code: "jatai.payments.on('pix.completed', ({ paymentId }) => console.log(paymentId))",
    output: ["event: 'pix.completed'", "paymentId: 'pix_FIRST_FLIGHT'", "status: 'COMPLETED'"],
    mel: {
      state: "flying",
      question: "E se o callback chegar duas vezes?",
      explanation:
        "Uma integração robusta trata eventos repetidos sem duplicar efeitos. Esse cuidado é chamado de idempotência.",
    },
  },
  {
    id: "review",
    eyebrow: "Revisar",
    title: "Seu primeiro voo terminou",
    concept:
      "Você percorreu consentimento, dados sintéticos, iniciação de pagamento e comunicação assíncrona.",
    code: "jatai.firstFlight.complete()",
    output: ["✓ 6 etapas concluídas", "✓ 0 dados reais utilizados", "✓ 0 reais movimentados"],
    mel: {
      state: "flying",
      question: "O que eu aprendi?",
      explanation:
        "Você conectou as principais fronteiras de uma integração Open Finance e sabe por que cada uma existe. O produto é fictício; os conceitos são reais.",
    },
  },
] as const;
