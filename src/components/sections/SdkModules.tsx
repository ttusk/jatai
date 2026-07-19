import { Fragment } from "react";

type SdkModule = {
  namespace: string;
  purpose: string;
  method: string;
};

const moduleGroups: Array<{ label: string; modules: SdkModule[] }> = [
  {
    label: "Fluxo principal",
    modules: [
      {
        namespace: "jatai.auth",
        purpose: "Cria e renova consentimentos",
        method: "auth.createConsent()",
      },
      {
        namespace: "jatai.accounts",
        purpose: "Consulta contas e saldos sintéticos",
        method: "accounts.list()",
      },
      {
        namespace: "jatai.payments",
        purpose: "Simula Pix e recebe callbacks",
        method: "payments.createPix()",
      },
    ],
  },
  {
    label: "Ferramentas do sandbox",
    modules: [
      {
        namespace: "jatai.data",
        purpose: "Gera cenários com dados sintéticos",
        method: "data.generate()",
      },
      {
        namespace: "jatai.telemetry",
        purpose: "Injeta latência e falhas controladas",
        method: "telemetry.inject()",
      },
    ],
  },
];

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

        <div data-sdk-table className="mt-14">
          <table className="w-full border-collapse text-left">
            <thead className="hidden md:table-header-group">
              <tr className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink/35">
                <th className="w-[26%] px-4 py-4 font-normal">Módulo</th>
                <th className="w-[40%] px-4 py-4 font-normal">Serve para</th>
                <th className="px-4 py-4 font-normal">Primeira chamada</th>
              </tr>
            </thead>

            {moduleGroups.map((group) => (
              <Fragment key={group.label}>
                <tbody>
                  <tr>
                    <th
                      colSpan={3}
                      className="bg-honey/[0.06] px-4 py-3 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-honey-dark"
                    >
                      {group.label}
                    </th>
                  </tr>
                  {group.modules.map((module) => {
                    return (
                      <tr
                        key={module.namespace}
                        data-sdk-row
                        className="grid transition-colors hover:bg-honey/[0.035] md:table-row"
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
                      </tr>
                    );
                  })}
                </tbody>
              </Fragment>
            ))}
          </table>
        </div>

      </div>
    </section>
  );
}
