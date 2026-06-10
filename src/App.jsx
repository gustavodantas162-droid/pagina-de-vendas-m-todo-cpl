import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Check,
  Crown,
  EyeOff,
  Lock,
  MessageCircle,
  Mic,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  Volume2,
  X
} from "lucide-react";

const CHECKOUT_URL = "https://kiwify.app/odPvP7h";
const VIDEO_PROGRESS_KEY = "metodo-cpl-video-progress-v2";
const VIDEO_ENDED_KEY = "metodo-cpl-video-ended-v2";

function getVisualProgress(currentTime, duration) {
  if (!duration || duration <= 0) return 0;
  if (currentTime <= 15) return Math.min(50, (currentTime / 15) * 50);

  const remainingDuration = Math.max(duration - 15, 1);
  const remainingTime = Math.max(currentTime - 15, 0);
  return Math.min(100, 50 + (remainingTime / remainingDuration) * 50);
}

const painCards = [
  {
    title: "Você entrega resultado, mas continua invisível.",
    icon: MessageCircle
  },
  {
    title: "Reuniões passam e sua voz não muda decisões.",
    icon: Trophy
  },
  {
    title: "Você sabe o que dizer, mas trava quando precisa se posicionar.",
    icon: EyeOff
  },
  {
    title: "Pessoas menos preparadas aparecem mais porque comunicam melhor.",
    icon: Users
  }
];

const audienceCards = [
  {
    title: "Empresários e sócios",
    text: "Para quem precisa apresentar ideias, liderar conversas e transmitir valor sem depender de improviso."
  },
  {
    title: "Executivos e líderes",
    text: "Para quem fala em reuniões, conduz equipes e precisa gerar confiança quando a pressão aumenta."
  },
  {
    title: "Profissionais técnicos",
    text: "Para quem é competente, mas sente que sua entrega não é percebida com a força que deveria."
  },
  {
    title: "Quem trava ao falar",
    text: "Para quem quer organizar melhor a mensagem e se posicionar com mais clareza nos momentos decisivos."
  }
];

const pillars = [
  {
    title: "Clareza",
    text: "Transformar ideias confusas em mensagens simples, diretas e difíceis de ignorar.",
    icon: Brain
  },
  {
    title: "Presença",
    text: "Transmitir segurança pela fala, ritmo, postura e intenção.",
    icon: Mic
  },
  {
    title: "Liderança",
    text: "Ocupar espaço nas conversas que definem respeito, influência e oportunidade.",
    icon: Crown
  }
];

const beforeItems = ["Boa entrega, pouca percepção", "Reuniões sem impacto", "Fala insegura", "Reconhecimento abaixo do valor real"];
const afterItems = ["Mensagem clara", "Postura mais segura", "Autoridade percebida", "Influência em conversas decisivas", "Mais respeito profissional"];

const courseStats = [
  { value: "+20", label: "aulas práticas" },
  { value: "5", label: "módulos" },
  { value: "+10", label: "bônus gratuitos" }
];

const courseModules = [
  "Clareza de Posicionamento",
  "Voz de Autoridade",
  "Presença Executiva",
  "Narrativa de Liderança",
  "Comunicação de Impacto"
];

const applicationCards = [
  {
    title: "Reuniões e apresentações",
    text: "Entre nas conversas sabendo o que defender, como organizar a mensagem e como conduzir sua fala com mais presença.",
    icon: MessageCircle
  },
  {
    title: "Conversas difíceis",
    text: "Use o método para se posicionar com clareza quando existe pressão, objeção, cobrança ou decisão importante.",
    icon: Target
  },
  {
    title: "Liderança e influência",
    text: "Comunique valor para equipes, clientes, sócios e pares sem parecer inseguro, confuso ou pequeno demais para o que entrega.",
    icon: Users
  }
];

const offerIncludes = [
  "Mais de 20 aulas práticas do Método C.P.L.",
  "5 módulos: Clareza, Voz, Presença, Narrativa e Impacto.",
  "+10 bônus 100% gratuitos com materiais e PDFs de apoio.",
  "Plano prático para aplicar o método no trabalho real.",
  "Garantia de 7 dias."
];

const faqItems = [
  {
    question: "Para quem é o Método C.P.L.?",
    answer:
      "Para empresários, executivos, líderes e profissionais competentes que precisam ser percebidos com mais autoridade, clareza e presença."
  },
  {
    question: "Funciona para líderes?",
    answer:
      "Sim. O método foi pensado para conversas de decisão: reuniões, alinhamentos, posicionamento, liderança de equipe e influência profissional."
  },
  {
    question: "Funciona para quem trava ao falar?",
    answer:
      "Sim. O foco é ajudar você a organizar a mensagem antes de falar e ganhar mais segurança quando precisa se posicionar."
  },
  {
    question: "Quanto tempo tenho acesso?",
    answer:
      "As condições de acesso são apresentadas no checkout e na área de compra antes da confirmação final."
  },
  {
    question: "Como funciona a garantia?",
    answer:
      "A compra conta com garantia de 7 dias. As instruções de solicitação ficam disponíveis pela plataforma de pagamento."
  },
  {
    question: "O que eu recebo ao entrar?",
    answer:
      "Você recebe mais de 20 aulas práticas divididas em 5 módulos, materiais de apoio em PDF, +10 bônus 100% gratuitos e um plano para aplicar o método no trabalho real."
  },
  {
    question: "Preciso ter experiência?",
    answer:
      "Não. O Método C.P.L. foi pensado para profissionais que querem se posicionar melhor, independentemente do nível atual de comunicação."
  }
];

function Cta({ children, className = "" }) {
  return (
    <motion.a
      className={`cta ${className}`}
      href={CHECKOUT_URL}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      rel="noreferrer"
    >
      <span>{children}</span>
      <ArrowUpRight size={18} aria-hidden="true" />
    </motion.a>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function HeroVideoPlayer() {
  const videoRef = useRef(null);
  const savedTimeRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const playFrom = (startTime = 0) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(startTime, 0);
    video.muted = false;
    video.volume = 1;
    setShowResume(false);
    setHasEnded(false);
    window.localStorage.removeItem(VIDEO_ENDED_KEY);

    video
      .play()
      .then(() => setNeedsInteraction(false))
      .catch(() => {
        video.muted = true;
        video.play().catch(() => {});
        setNeedsInteraction(true);
      });
  };

  const unlockSound = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;
    video
      .play()
      .then(() => setNeedsInteraction(false))
      .catch(() => {
        video.muted = true;
        video.play().catch(() => {});
        setNeedsInteraction(true);
      });
  };

  const keepPlaying = () => {
    const video = videoRef.current;
    if (!video || video.ended || showResume || hasEnded) return;

    video.play().catch(() => {});
  };

  const continueVideo = () => {
    playFrom(savedTimeRef.current);
  };

  const restartVideo = () => {
    savedTimeRef.current = 0;
    window.localStorage.removeItem(VIDEO_PROGRESS_KEY);
    playFrom(0);
  };

  useEffect(() => {
    const savedTime = Number(window.localStorage.getItem(VIDEO_PROGRESS_KEY) || 0);
    const ended = window.localStorage.getItem(VIDEO_ENDED_KEY) === "true";
    savedTimeRef.current = ended ? 0 : savedTime;

    if (ended) {
      setHasEnded(true);
      setProgress(100);
      return;
    }

    if (savedTime > 3) {
      playFrom(savedTime);
      return;
    }

    playFrom(0);
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextProgress = getVisualProgress(video.currentTime, video.duration);
    setProgress(nextProgress);

    if (video.currentTime > 1 && !video.ended) {
      window.localStorage.setItem(VIDEO_PROGRESS_KEY, String(video.currentTime));
      window.localStorage.removeItem(VIDEO_ENDED_KEY);
    }
  };

  const handleEnded = () => {
    setHasEnded(true);
    setNeedsInteraction(false);
    setShowResume(false);
    setProgress(100);
    window.localStorage.setItem(VIDEO_ENDED_KEY, "true");
    window.localStorage.removeItem(VIDEO_PROGRESS_KEY);
  };

  return (
    <Reveal className="video-wrap" delay={0.08}>
      <div className="video-player">
        <div className="video-media">
          <video
            ref={videoRef}
            className="video-video"
            autoPlay
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            playsInline
            preload="auto"
            poster="/assets/matheus-hero.jpg"
            tabIndex={-1}
            onContextMenu={(event) => event.preventDefault()}
            onCanPlay={() => {
              const video = videoRef.current;
              if (video && video.paused && !showResume && !hasEnded) {
                playFrom(video.currentTime);
              }
            }}
            onEnded={handleEnded}
            onPause={keepPlaying}
            onTimeUpdate={handleTimeUpdate}
          >
            <source src="/assets/apresentacao-matheus.mp4" type="video/mp4" />
            Seu navegador não suporta a reprodução deste vídeo.
          </video>

          {showResume && (
            <div className="video-gate">
              <div className="video-gate-card">
                <span>Você parou no meio do vídeo</span>
                <h3>Quer continuar de onde parou?</h3>
                <div className="video-gate-actions">
                  <button type="button" onClick={continueVideo}>
                    Continuar de onde parei
                  </button>
                  <button type="button" onClick={restartVideo}>
                    Ver do início
                  </button>
                </div>
              </div>
            </div>
          )}

          {needsInteraction && !showResume && !hasEnded && (
            <div className="video-gate compact">
              <button className="video-sound-button" type="button" onClick={unlockSound}>
                <Volume2 size={18} aria-hidden="true" />
                <span>O vídeo já começou. Ativar som</span>
              </button>
            </div>
          )}

          {hasEnded && (
            <div className="video-gate">
              <div className="video-gate-card">
                <span>Vídeo concluído</span>
                <h3>Quer assistir novamente?</h3>
                <div className="video-gate-actions single">
                  <button type="button" onClick={restartVideo}>
                    Ver novamente
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="video-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <div className="video-footer" aria-hidden="true">
          <span>• APRESENTAÇÃO</span>
          <span>MATHEUS FAGUNDES</span>
        </div>
      </div>
    </Reveal>
  );
}

function App() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".gsap-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 42 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%"
            }
          }
        );
      });

      gsap.to(".hero-photo img", {
        yPercent: 7,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-shell",
          start: "top top",
          end: "bottom top",
          scrub: 0.8
        }
      });
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div className="site-shell">
      <header className="nav">
        <a className="brand" href={CHECKOUT_URL}>
          • MÉTODO C.P.L.
        </a>
        <a className="nav-cta" href={CHECKOUT_URL}>
          ACESSAR MÉTODO
        </a>
      </header>

      <main>
        <section className="hero-shell">
          <div className="hero-grid">
            <div className="hero-copy">
              <motion.p
                className="hero-method"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
              >
                MÉTODO C.P.L.
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.72, delay: 0.14 }}
              >
                Pare de travar quando importa.
              </motion.h1>
              <motion.p
                className="hero-subtitle"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.72, delay: 0.2 }}
              >
                <span>Comunicação não é talento. É método.</span> Veja como destravar sua fala em
                entrevistas, reuniões e conversas decisivas.
              </motion.p>
            </div>

            <HeroVideoPlayer />

            <motion.div
              className="hero-conversion"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.32 }}
            >
              <motion.a
                className="hero-cta"
                href={CHECKOUT_URL}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                rel="noreferrer"
              >
                <span>QUERO DESTRAVAR MINHA COMUNICAÇÃO</span>
                <ArrowRight size={16} aria-hidden="true" />
              </motion.a>
              <motion.div
                className="hero-indicators"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.72, delay: 0.42 }}
              >
                <span>◆ R$297</span>
                <span>◆ ACESSO IMEDIATO</span>
                <span>◆ GARANTIA DE 7 DIAS</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="section pain-section">
          <Reveal className="section-heading">
            <p className="eyebrow">O CUSTO DA COMUNICAÇÃO FRACA</p>
            <h2>Se você não comunica valor, pessoas menos preparadas ocupam o seu espaço.</h2>
          </Reveal>
          <div className="pain-grid">
            {painCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Reveal className="pain-card gsap-reveal" key={card.title} delay={index * 0.04}>
                  <Icon size={24} aria-hidden="true" />
                  <h3>{card.title}</h3>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="diagnosis-section">
          <div className="diagnosis-inner">
            <Reveal className="diagnosis-copy">
              <p className="eyebrow">DIAGNÓSTICO</p>
              <h2>
                Competência silenciosa não vira autoridade.
              </h2>
              <p>
                Você pode ser excelente tecnicamente. Mas se não consegue explicar seu valor com
                clareza, presença e liderança, sua autoridade fica menor do que sua entrega e sua
                fala perde força nos momentos que importam.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section transformation-section">
          <Reveal className="section-heading compact">
            <p className="eyebrow">TRANSFORMAÇÃO</p>
            <h2>De profissional competente a referência percebida.</h2>
          </Reveal>
          <div className="transformation-grid">
            <Reveal className="state-panel before">
              <span className="panel-label">ANTES</span>
              {beforeItems.map((item) => (
                <div className="state-row" key={item}>
                  <X size={17} aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </Reveal>
            <Reveal className="state-panel after" delay={0.08}>
              <span className="panel-label">DEPOIS</span>
              {afterItems.map((item) => (
                <div className="state-row" key={item}>
                  <Check size={17} aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="method-section" id="metodo">
          <div className="section">
            <Reveal className="section-heading">
              <p className="eyebrow">MÉTODO C.P.L.</p>
              <h2>Um método direto para comunicar valor em situações reais.</h2>
            </Reveal>
            <div className="pillar-grid">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <Reveal className="pillar-card gsap-reveal" key={pillar.title} delay={index * 0.06}>
                    <div className="card-icon">
                      <Icon size={25} aria-hidden="true" />
                    </div>
                    <span>0{index + 1}</span>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.text}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="expert-showcase-section">
          <div className="expert-showcase-grid">
            <Reveal className="expert-visual">
              <img
                className="expert-main-photo"
                src="/assets/matheus-meeting.jpg"
                alt="Matheus Fagundes em reunião profissional"
              />
              <img
                className="expert-inset-photo"
                src="/assets/matheus-hero.jpg"
                alt="Matheus Fagundes conduzindo uma conversa estratégica"
              />
            </Reveal>

            <Reveal className="expert-copy">
              <p className="eyebrow">◆ QUEM VAI TE ENSINAR</p>
              <h2>Matheus Fagundes</h2>
              <h3>Comunicação que gera resultado.</h3>
              <div className="expert-rule" aria-hidden="true" />
              <p>
                Matheus trabalha com comunicação profissional, preparando empresários, executivos e
                líderes a se posicionarem com clareza, presença e liderança em ambientes corporativos
                exigentes.
              </p>
              <p>
                Sua abordagem melhora a forma como profissionais são percebidos no trabalho,
                fortalecendo reconhecimento, autoridade e oportunidades dentro de suas empresas.
              </p>
              <p>
                O Método C.P.L. é a destilação do que ele aplica em mentorias e treinamentos voltados
                para profissionais que querem comunicar melhor o próprio valor.
              </p>
              <div className="expert-stats">
                <div>
                  <strong>C</strong>
                  <span>CLAREZA</span>
                </div>
                <div>
                  <strong>P</strong>
                  <span>PRESENÇA</span>
                </div>
                <div>
                  <strong>L</strong>
                  <span>LIDERANÇA</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section audience-section">
          <Reveal className="section-heading">
            <p className="eyebrow">PARA QUEM É</p>
            <h2>O Método C.P.L. é para quem precisa ser levado a sério quando fala.</h2>
          </Reveal>
          <div className="audience-grid">
            {audienceCards.map((card, index) => (
              <Reveal className="audience-card" key={card.title} delay={index * 0.04}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section deliverables-section">
          <Reveal className="section-heading">
            <p className="eyebrow">O QUE VOCÊ RECEBE</p>
            <h2>Um treinamento completo para destravar sua comunicação profissional.</h2>
          </Reveal>
          <div className="course-overview">
            <Reveal className="course-main-card">
              <p className="eyebrow">ESTRUTURA COMPLETA</p>
              <h3>Mais de 20 aulas práticas divididas em 5 módulos.</h3>
              <p>
                Você entra em um método direto para organizar ideias, transmitir autoridade, falar com
                presença e se posicionar melhor em reuniões, apresentações, entrevistas e conversas de
                decisão.
              </p>
              <div className="course-stats">
                {courseStats.map((item) => (
                  <div key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="course-bonus-card" delay={0.08}>
              <Sparkles size={24} aria-hidden="true" />
              <h3>+10 bônus 100% gratuitos</h3>
              <p>
                Além das aulas, você recebe materiais de apoio em PDF, checklists e mapas práticos para
                aplicar o C.P.L. no trabalho real sem depender de improviso.
              </p>
            </Reveal>
          </div>

          <div className="module-grid">
            {courseModules.map((module, index) => (
              <Reveal className="module-card" key={module} delay={index * 0.04}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{module}</h3>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="human-section">
          <div className="human-image">
            <img src="/assets/matheus-human.jpg" alt="Matheus em momento humano no restaurante" />
          </div>
          <Reveal className="human-copy">
            <p className="eyebrow">POR TRÁS DO CNPJ</p>
            <h2>Comunicação também é conexão.</h2>
            <p>
              Antes de qualquer cargo, reunião ou negociação, existe uma pessoa tentando ser entendida
              com precisão. O Método C.P.L. nasce dessa leitura: presença profissional começa no jeito
              como você faz o outro perceber seu valor.
            </p>
          </Reveal>
        </section>

        <section className="section application-section">
          <Reveal className="section-heading compact">
            <p className="eyebrow">APLICAÇÃO REAL</p>
            <h2>Onde você vai usar o método.</h2>
          </Reveal>
          <div className="proof-grid">
            {applicationCards.map((item) => {
              const Icon = item.icon;
              return (
              <Reveal className="proof-card" key={item.title}>
                <Icon size={18} aria-hidden="true" />
                <p>{item.text}</p>
                <span>{item.title}</span>
              </Reveal>
              );
            })}
          </div>
        </section>

        <section className="authority-section">
          <div className="authority-media">
            <img src="/assets/matheus-authority.jpg" alt="Matheus Fagundes de braços cruzados" />
          </div>
          <Reveal className="authority-copy">
            <p className="eyebrow">NÃO É PARA TODO MUNDO</p>
            <h2>Não compre se você quer continuar se escondendo.</h2>
            <h3>O Método C.P.L. é para quem quer se posicionar de verdade.</h3>
            <p>
              Este método não é sobre falar bonito para impressionar. É sobre comunicar com intenção,
              organizar o pensamento, sustentar presença e fazer as pessoas perceberem o valor que você
              já entrega.
            </p>
            <div className="authority-points">
              <span>Quer se posicionar</span>
              <span>Quer ser ouvido</span>
              <span>Quer liderar conversas</span>
              <span>Quer comunicar valor</span>
            </div>
          </Reveal>
        </section>

        <section className="offer-section">
          <Reveal className="offer-card">
            <div className="offer-top">
              <span>ACESSO AO MÉTODO</span>
              <ShieldCheck size={22} aria-hidden="true" />
            </div>
            <p className="old-price">De R$497</p>
            <p className="offer-label">Por apenas</p>
            <h2>R$297</h2>
            <p className="installments">Pagamento único. Parcelamento disponível no checkout.</p>
            <div className="offer-includes">
              <h3>Ao garantir sua vaga, você recebe:</h3>
              <ul>
                {offerIncludes.map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="offer-trust">
              <span>
                <ShieldCheck size={17} aria-hidden="true" />
                Garantia de 7 dias
              </span>
              <span>
                <Lock size={17} aria-hidden="true" />
                Compra segura
              </span>
              <span>
                <Sparkles size={17} aria-hidden="true" />
                Acesso imediato
              </span>
            </div>
            <Cta>QUERO ENTRAR NO MÉTODO C.P.L.</Cta>
          </Reveal>
        </section>

        <section className="section faq-section">
          <Reveal className="section-heading compact">
            <p className="eyebrow">FAQ</p>
            <h2>Perguntas frequentes</h2>
          </Reveal>
          <div className="faq-list">
            {faqItems.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="final-cta-section">
          <Reveal className="final-cta-inner">
            <Target size={35} aria-hidden="true" />
            <h2>
              Pare de deixar sua competência ser percebida pela metade.
              <span> Entre no Método C.P.L.</span>
            </h2>
            <Cta>QUERO ACESSAR O MÉTODO C.P.L.</Cta>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <span>MÉTODO C.P.L.</span>
        <span>Clareza • Presença • Liderança</span>
      </footer>
    </div>
  );
}

export default App;
