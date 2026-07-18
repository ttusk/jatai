import { useState } from "react";
import { MelBee } from "@/components/brand/MelBee";
import { firstFlightSteps } from "./scenario";

export function FirstFlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completedThrough, setCompletedThrough] = useState(-1);
  const [isExecuted, setIsExecuted] = useState(false);
  const [isMelOpen, setIsMelOpen] = useState(false);

  const step = firstFlightSteps[activeIndex];
  const isLastStep = activeIndex === firstFlightSteps.length - 1;
  const progress = ((activeIndex + (isExecuted ? 1 : 0)) / firstFlightSteps.length) * 100;

  function runStep() {
    setIsExecuted(true);
    setCompletedThrough((current) => Math.max(current, activeIndex));
    setIsMelOpen(false);
  }

  function goToStep(index: number) {
    if (index > completedThrough + 1) return;
    setActiveIndex(index);
    setIsExecuted(index <= completedThrough);
    setIsMelOpen(false);
  }

  function advance() {
    if (isLastStep) {
      setActiveIndex(0);
      setCompletedThrough(-1);
      setIsExecuted(false);
      setIsMelOpen(false);
      return;
    }

    setActiveIndex((current) => current + 1);
    setIsExecuted(false);
    setIsMelOpen(false);
  }

  return (
    <div className="first-flight">
      <div className="first-flight__progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="first-flight__step-list" aria-label="Etapas do primeiro voo">
        {firstFlightSteps.map((item, index) => {
          const isAvailable = index <= completedThrough + 1;
          const isComplete = index <= completedThrough;
          return (
            <button
              type="button"
              key={item.id}
              className="first-flight__step"
              aria-current={index === activeIndex ? "step" : undefined}
              aria-label={`${index + 1}. ${item.title}${isComplete ? ", concluída" : ""}`}
              disabled={!isAvailable}
              onClick={() => goToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{item.eyebrow}</small>
            </button>
          );
        })}
      </div>

      <div className="first-flight__workspace">
        <article className="lesson-panel">
          <p className="lesson-panel__count">Etapa {activeIndex + 1} de {firstFlightSteps.length}</p>
          <p className="eyebrow">{step.eyebrow}</p>
          <h3>{step.title}</h3>
          <p className="lesson-panel__concept">{step.concept}</p>

          <div className="code-window">
            <div className="code-window__bar">
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <p>primeiro-voo.ts</p>
            </div>
            <pre><code>{step.code}</code></pre>
            {isExecuted ? (
              <div className="code-window__output" role="status" aria-live="polite">
                <p className="code-window__output-label">resposta simulada</p>
                {step.output.map((line) => <p key={line}>→ {line}</p>)}
              </div>
            ) : null}
          </div>

          <div className="lesson-panel__actions">
            {!isExecuted ? (
              <button type="button" className="button button--primary" onClick={runStep}>
                Executar etapa <span aria-hidden="true">→</span>
              </button>
            ) : (
              <button type="button" className="button button--primary" onClick={advance}>
                {isLastStep ? "Recomeçar voo" : "Próxima etapa"} <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
        </article>

        <aside className="mel-guide" aria-label="Orientação da Mel">
          <div className="mel-guide__header">
            <MelBee state={isMelOpen ? "explaining" : step.mel.state} size="md" />
            <div>
              <p className="eyebrow">Mel explica</p>
              <h3>Uma pista, não a resposta.</h3>
            </div>
          </div>

          <p className="mel-guide__intro">
            Termine a etapa e use a pergunta sugerida para entender o conceito por trás do código.
          </p>

          {isExecuted ? (
            <div className="mel-guide__conversation">
              <button
                type="button"
                className="mel-question"
                aria-expanded={isMelOpen}
                onClick={() => setIsMelOpen((current) => !current)}
              >
                {step.mel.question}
              </button>
              {isMelOpen ? <p className="mel-answer">{step.mel.explanation}</p> : null}
            </div>
          ) : (
            <p className="mel-guide__waiting">Execute a etapa para liberar a pergunta.</p>
          )}

          <p className="mel-guide__disclosure">Respostas roteirizadas para esta demonstração acadêmica.</p>
        </aside>
      </div>
    </div>
  );
}
