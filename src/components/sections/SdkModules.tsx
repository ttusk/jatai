import { Fragment } from "react";

type SdkModule = {
  id: string;
  namespace: string;
  purpose: string;
  method: string;
  call: string;
  response: string;
};

const moduleGroups: Array<{ label: string; modules: SdkModule[] }> = [
  {
    label: "Fluxo principal",
    modules: [
      {
        id: "auth",
        namespace: "jatai.auth",
        purpose: "Cria e renova consentimentos",
        method: "auth.createConsent()",
        call: 'await jatai.auth.createConsent({\n  scopes: ["ACCOUNTS", "PIX"]\n})',
        response: '{\n  consentId: "cns_demo",\n  status: "AWAITING_AUTHORISATION"\n}',
      },
      {
        id: "accounts",
        namespace: "jatai.accounts",
        purpose: "Consulta contas e saldos sintéticos",
        method: "accounts.list()",
        call: 'await jatai.accounts.list({\n  consentId: "cns_demo"\n})',
        response: '{\n  accounts: [{ id: "acc_demo", type: "CHECKING" }]\n}',
      },
      {
        id: "payments",
        namespace: "jatai.payments",
        purpose: "Simula Pix e recebe callbacks",
        method: "payments.createPix()",
        call: "await jatai.payments.createPix({\n  amount: 18.90\n})",
        response: '{\n  paymentId: "pix_demo",\n  status: "PENDING"\n}',
      },
    ],
  },
  {
    label: "Ferramentas do sandbox",
    modules: [
      {
        id: "data",
        namespace: "jatai.data",
        purpose: "Gera cenários com dados sintéticos",
        method: "data.generate()",
        call: 'await jatai.data.generate({\n  preset: "student"\n})',
        response: '{\n  datasetId: "data_demo",\n  accounts: 1\n}',
      },
      {
        id: "telemetry",
        namespace: "jatai.telemetry",
        purpose: "Injeta latência e falhas controladas",
        method: "telemetry.inject()",
        call: "jatai.telemetry.inject({\n  latency: 800\n})",
        response: '{\n  latency: 800,\n  nextRequest: "delayed"\n}',
      },
    ],
  },
];

function TerminalIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current">
      <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="1.5" />
      <path d="m7 9 2.5 2L7 13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 14h4" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CodePreview({ module }: { module: SdkModule }) {
  return (
    <div
      id={`sdk-preview-${module.id}`}
      role="tooltip"
      className="invisible absolute right-0 top-full z-20 mt-3 w-[min(22rem,calc(100vw-3rem))] rounded-2xl border border-white bg-white p-5 text-left opacity-0 shadow-[0_18px_48px_rgba(23,20,15,0.12)] transition-[opacity,visibility] group-hover/preview:visible group-hover/preview:opacity-100 group-focus-within/preview:visible group-focus-within/preview:opacity-100 md:right-full md:top-1/2 md:mr-3 md:mt-0 md:-translate-y-1/2"
    >
      <div className="flex gap-3 font-mono text-xs leading-6 text-ink/85 sm:text-[0.8125rem]">
        <span className="select-none text-honey-dark">$</span>
        <pre className="min-w-0 whitespace-pre-wrap break-words font-mono">{module.call}</pre>
      </div>
      <pre className="mt-4 whitespace-pre-wrap border-t border-line pt-4 font-mono text-xs leading-6 text-ink/55 sm:text-[0.8125rem]">
        {module.response}
      </pre>
    </div>
  );
}

export function SdkModules() {
  return (
    <section id="sdk" className="scroll-mt-24 border-t border-line py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink/40">API</p>
          <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-ink sm:text-5xl">
            O SDK, módulo por módulo.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-ink/55">
            Consentimento, contas, Pix e ferramentas para controlar o sandbox.
          </p>
        </div>

        <div className="mt-14 border-y border-line">
          <table className="w-full border-collapse text-left">
            <thead className="hidden md:table-header-group">
              <tr className="border-b border-line font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink/35">
                <th className="w-[26%] px-4 py-4 font-normal">Módulo</th>
                <th className="w-[36%] px-4 py-4 font-normal">Serve para</th>
                <th className="px-4 py-4 font-normal">Primeira chamada</th>
                <th className="w-14 px-4 py-4 text-right font-normal">Exemplo</th>
              </tr>
            </thead>

            {moduleGroups.map((group) => (
              <Fragment key={group.label}>
                <tbody>
                  <tr>
                    <th
                      colSpan={4}
                      className="border-b border-line bg-honey/[0.06] px-4 py-3 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-honey-dark"
                    >
                      {group.label}
                    </th>
                  </tr>
                  {group.modules.map((module) => {
                    return (
                      <tr
                        key={module.id}
                        className="grid grid-cols-[1fr_auto] border-b border-line transition-colors last:border-b-0 hover:bg-honey/[0.035] md:table-row"
                      >
                        <td className="px-4 pb-1 pt-6 align-middle md:py-7">
                          <code className="font-mono text-sm font-medium text-ink">
                            {module.namespace}
                          </code>
                        </td>
                        <td className="col-start-1 px-4 py-1 text-sm leading-6 text-ink/55 md:py-7">
                          {module.purpose}
                        </td>
                        <td className="col-start-1 px-4 pb-6 pt-1 align-middle md:py-7">
                          <code className="font-mono text-xs text-ink/45">{module.method}</code>
                        </td>
                        <td className="relative col-start-2 row-span-3 row-start-1 px-4 py-6 text-right align-middle md:table-cell md:py-7">
                          <div className="group/preview relative inline-flex">
                            <button
                              type="button"
                              aria-label={`Ver exemplo de ${module.namespace}`}
                              aria-describedby={`sdk-preview-${module.id}`}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink/35 transition-colors hover:bg-honey/15 hover:text-honey-dark focus-visible:bg-honey/15 focus-visible:text-honey-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey-dark"
                            >
                              <TerminalIcon />
                            </button>
                            <CodePreview module={module} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Fragment>
            ))}
          </table>
        </div>

        <a
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-honey-dark decoration-2 underline-offset-4 transition-colors hover:text-honey-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-honey-dark"
          href="#playground"
        >
          Rever no playground <span aria-hidden="true">↑</span>
        </a>
      </div>
    </section>
  );
}
