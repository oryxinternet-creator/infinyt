
(function () {
  /* ===== WhatsApp — número da Infinyt ===== */
  var WHATSAPP = "5561991853932"; 

  document.querySelectorAll(".wa-link").forEach(function (el) {
    var msg = el.getAttribute("data-msg") || "Olá! Quero saber mais sobre a Infinyt Net.";
    el.setAttribute("href", "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  /* ===== Theme toggle ===== */
  var root = document.documentElement, tBtn = document.getElementById("themeBtn");
  function isDark() {
    return root.getAttribute("data-theme") === "dark" ||
      (!root.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }
  function setIcon() {
    document.getElementById("themeIcon").innerHTML = isDark()
      ? '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>'
      : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  }
  try { var saved = localStorage.getItem("infinyt-theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
  setIcon();
  tBtn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("infinyt-theme", next); } catch (e) {}
    setIcon();
  });

  /* ===== Dropdown (click / touch) ===== */
  var dropItem = document.getElementById("dropPlanos");
  if (dropItem) {
    var trig = dropItem.querySelector(".drop-trigger");
    trig.addEventListener("click", function (e) {
      e.preventDefault();
      var isOpen = dropItem.classList.toggle("open");
      trig.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!dropItem.contains(e.target)) { dropItem.classList.remove("open"); trig.setAttribute("aria-expanded", "false"); }
    });
    dropItem.querySelectorAll(".dropdown a").forEach(function (a) {
      a.addEventListener("click", function () { dropItem.classList.remove("open"); trig.setAttribute("aria-expanded", "false"); });
    });
  }

  /* ===== Mobile menu ===== */
  var navToggle = document.getElementById("navToggle"), mobileMenu = document.getElementById("mobileMenu");
  function closeMobile() {
    mobileMenu.classList.remove("open"); navToggle.setAttribute("aria-expanded", "false");
    document.getElementById("navToggleIcon").innerHTML = '<path d="M3 6h18M3 12h18M3 18h18"/>';
  }
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.getElementById("navToggleIcon").innerHTML = isOpen ? '<path d="M18 6 6 18M6 6l12 12"/>' : '<path d="M3 6h18M3 12h18M3 18h18"/>';
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMobile); });
    window.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMobile(); });
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ===== Equalizer bars ===== */
  var bars = document.getElementById("bars");
  if (bars) {
    for (var i = 0; i < 30; i++) {
      var b = document.createElement("i");
      b.style.animationDelay = (Math.random() * 1.4).toFixed(2) + "s";
      if (reduce) { b.style.animation = "none"; b.style.transform = "scaleY(" + (0.4 + Math.random() * 0.6).toFixed(2) + ")"; }
      bars.appendChild(b);
    }
  }

  /* ===== Speed count-up ===== */
  var sn = document.getElementById("speedNum");
  if (sn && !reduce) {
    var target = 700, dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      sn.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ===== Scroll reveal ===== */
  if (reduce || !("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  }
})();

/* ===== Consulta de cobertura ===== */
(function(){
  var COV = {
    "DF - Brasília / Regiões Administrativas": ["Plano Piloto","Águas Claras","Taguatinga","Ceilândia","Guará","Gama","Sobradinho","Vicente Pires","Samambaia","Núcleo Bandeirante"],
    "GO - Goiás (Entorno)": ["Luziânia","Valparaíso de Goiás","Novo Gama","Cidade Ocidental","Águas Lindas de Goiás","Formosa"]
  };
  var est=document.getElementById("covEstado"), cid=document.getElementById("covCidade"), btn=document.getElementById("covBtn");
  if(!est||!cid||!btn) return;
  function fill(){
    cid.innerHTML='<option value="">Selecione a cidade</option>';
    (COV[est.value]||[]).forEach(function(c){var o=document.createElement("option");o.value=c;o.textContent=c;cid.appendChild(o);});
    cid.disabled = !est.value;
  }
  est.addEventListener("change", fill); fill();
  btn.addEventListener("click", function(){
    var msg="Olá! Quero saber se a Infinyt atende no meu endereço";
    if(est.value){ msg += " em " + (cid.value ? cid.value+" - " : "") + est.value; }
    msg += ".";
    if (window.infinytLead) return window.infinytLead(msg);
    window.open("https://wa.me/5561991853932?text="+encodeURIComponent(msg), "_blank");
  });
})();

/* ===== Planos, faixa e pop-up: vêm do Painel (aba Site). Se não responder, fica o que está escrito na página ===== */
(function () {
  var SITE_APIS = ["https://n8n-infinytnet.dfnet.net.br/webhook/site-dados"];
  var WHATSAPP = "5561991853932";
  if (!window.fetch) return;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function marca(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); }
  function lido(chave) { try { return localStorage.getItem(chave); } catch (e) { return null; } }
  function guarda(chave, v) { try { localStorage.setItem(chave, v); } catch (e) {} }
  function ehLink(s) { return /^https?:\/\//i.test(s || ""); }
  // destino: link abre o endereço; texto abre o WhatsApp com essa mensagem (passando pelo pop-up de contato)
  function botao(classe, texto, destino) {
    if (ehLink(destino)) return '<a class="btn ' + classe + '" href="' + esc(destino) + '" target="_blank" rel="noopener">' + esc(texto) + "</a>";
    var msg = destino || "Olá! Vim pelo site da Infinyt e quero saber da novidade.";
    return '<a class="btn ' + classe + ' wa-link" href="https://wa.me/' + WHATSAPP + "?text=" + encodeURIComponent(msg) +
      '" target="_blank" rel="noopener" data-msg="' + esc(msg) + '">' + esc(texto) + "</a>";
  }

  var CHK = '<span class="chk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span> ';
  function cartao(p, grupo) {
    var destaque = !!p.destaque;
    var classe = destaque ? "btn-green" : grupo === "dedicado" ? "btn-navy" : "btn-outline-green";
    var preco = String(p.preco || "");
    return '<div class="plan' + (destaque ? " featured" : "") + ' reveal in">' +
      (destaque ? '<span class="badge">' + esc(p.destaque) + "</span>" : "") +
      '<div class="plan-head"><span class="plan-name">' + esc(p.nome) + '</span><div class="plan-speed">' + esc(p.velocidade) +
      " <span>" + esc(p.unidade) + "</span></div>" + (p.etiqueta ? '<div class="plan-tag">' + esc(p.etiqueta) + "</div>" : "") + "</div>" +
      '<div class="plan-body"><ul class="plan-feats">' + (p.itens || []).map(function (i) { return "<li>" + CHK + esc(i) + "</li>"; }).join("") + "</ul>" +
      '<div class="plan-price"><span class="lab">' + esc(p.rotulo) + '</span><div class="amt"' + (/^R\$/.test(preco) ? "" : ' style="font-size:1.5rem"') + ">" +
      esc(preco) + (p.sufixo ? " <small>" + esc(p.sufixo) + "</small>" : "") + "</div></div>" +
      botao(classe, p.botao || "Contratar", p.mensagem || "Olá! Tenho interesse no plano " + p.nome + " da Infinyt.") +
      "</div></div>";
  }
  function planos(porGrupo) {
    document.querySelectorAll(".plans[data-grupo]").forEach(function (box) {
      var grupo = box.getAttribute("data-grupo"), lista = porGrupo[grupo];
      if (!lista) return; // grupo que não está na planilha fica como está na página
      box.querySelectorAll(".plan:not(.plan-custom)").forEach(function (el) { el.parentNode.removeChild(el); });
      var html = lista.map(function (p) { return cartao(p, grupo); }).join("");
      var extra = box.querySelector(".plan-custom");
      if (extra) extra.insertAdjacentHTML("beforebegin", html); else box.insertAdjacentHTML("beforeend", html);
    });
  }

  function faixa(f) {
    if (!f || !f.texto) return;
    var chave = "infinyt-faixa-" + marca(f.texto + "|" + f.destino);
    if (lido("infinyt-faixa-fechada") === chave) return;
    var acao = "";
    if (f.destino) acao = ehLink(f.destino)
      ? ' <a href="' + esc(f.destino) + '" target="_blank" rel="noopener">Saiba mais →</a>'
      : ' <a href="#" class="wa-link" data-msg="' + esc(f.destino) + '">Chamar no WhatsApp →</a>';
    var div = document.createElement("div");
    div.className = "faixa-aviso";
    div.innerHTML = '<div class="faixa-in"><span>' + esc(f.texto) + "</span>" + acao + "</div>" +
      '<button type="button" class="faixa-fechar" aria-label="Fechar aviso">×</button>';
    document.body.insertBefore(div, document.body.firstChild);
    div.querySelector(".faixa-fechar").addEventListener("click", function () { div.parentNode.removeChild(div); guarda("infinyt-faixa-fechada", chave); });
  }

  function popup(p) {
    if (!p) return;
    var chave = "infinyt-novidade-" + marca([p.titulo, p.texto, p.imagem, p.destino].join("|"));
    if (lido("infinyt-novidade-vista") === chave) return; // cada visitante vê uma vez (de novo só se a novidade mudar)
    var fundo = document.createElement("div");
    fundo.className = "lead-fundo novidade";
    fundo.hidden = true;
    fundo.innerHTML = '<div class="lead-box" role="dialog" aria-modal="true" aria-labelledby="novidadeTitulo">' +
      '<button type="button" class="lead-fechar" aria-label="Fechar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>' +
      (p.imagem && /^https:\/\//i.test(p.imagem) ? '<div class="novidade-img" style="--img:url(&quot;' + esc(p.imagem) + '&quot;)"><img src="' + esc(p.imagem) + '" alt=""></div>' : "") +
      '<div class="lead-topo"><span class="lead-eyebrow">Novidade Infinyt</span><h2 id="novidadeTitulo">' + esc(p.titulo || "Novidade") + "</h2></div>" +
      '<div class="novidade-corpo">' + (p.texto ? "<p>" + esc(p.texto) + "</p>" : "") +
      botao("btn-green", p.botao || (ehLink(p.destino) ? "Saiba mais" : "Falar no WhatsApp"), p.destino) + "</div></div>";
    document.body.appendChild(fundo);
    function fechar() {
      fundo.hidden = true;
      // o botão do WhatsApp abre o pop-up de contato por cima: aí a página continua travada
      if (!document.querySelector(".lead-fundo:not([hidden])")) document.documentElement.classList.remove("lead-aberto");
      guarda("infinyt-novidade-vista", chave);
    }
    fundo.querySelector(".lead-fechar").addEventListener("click", fechar);
    fundo.addEventListener("click", function (e) { if (e.target === fundo) fechar(); });
    fundo.querySelector(".novidade-corpo .btn").addEventListener("click", fechar);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !fundo.hidden) fechar(); });
    // espera a pessoa ver a página; não abre por cima do pop-up de contato
    setTimeout(function () {
      if (document.documentElement.classList.contains("lead-aberto")) return;
      fundo.hidden = false;
      document.documentElement.classList.add("lead-aberto");
    }, 2500);
  }

  // tenta cada endereço (até 4 s cada); o primeiro que devolver os dados vale
  function busca(i) {
    if (i >= SITE_APIS.length) return Promise.resolve(null);
    var ctrl = window.AbortController ? new AbortController() : null;
    var limite = setTimeout(function () { if (ctrl) ctrl.abort(); }, 4000);
    return fetch(SITE_APIS[i], ctrl ? { signal: ctrl.signal } : {})
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; })
      .then(function (d) { clearTimeout(limite); return d && d.ok ? d : busca(i + 1); });
  }
  busca(0).then(function (d) {
    if (!d) return;
    planos(d.planos || {});
    faixa(d.faixa);
    popup(d.popup);
  });
})();

/* ===== Pop-up de contato: guarda nome e WhatsApp antes de abrir o WhatsApp ===== */
(function () {
  var WHATSAPP = "5561991853932";
  // Endereço do fluxo do n8n que recebe os leads. Vazio = só abre o WhatsApp.
  var LEAD_WEBHOOK = "";
  // Botões que NÃO abrem o pop-up (suporte de quem já é cliente)
  function ehSuporte(el) {
    return el.classList.contains("wa-float") || el.classList.contains("wa-direto") || !!el.closest("footer");
  }

  var html =
    '<div class="lead-fundo" id="leadFundo" hidden>' +
      '<div class="lead-box" role="dialog" aria-modal="true" aria-labelledby="leadTitulo">' +
        '<button type="button" class="lead-fechar" id="leadFechar" aria-label="Fechar">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>' +
        '<div class="lead-topo">' +
          '<span class="lead-eyebrow">Fale com a Infinyt</span>' +
          '<h2 id="leadTitulo">Quase lá!</h2>' +
          '<p>Deixe seu nome e WhatsApp. Se a conversa cair, a gente te chama.</p>' +
          '<div class="lead-interesse" id="leadInteresse" hidden></div>' +
        '</div>' +
        '<form class="lead-form" id="leadForm" novalidate>' +
          '<label for="leadNome">Seu nome</label>' +
          '<input id="leadNome" name="nome" autocomplete="name" placeholder="Como podemos te chamar?" required>' +
          '<label for="leadFone">Seu WhatsApp</label>' +
          '<input id="leadFone" name="whatsapp" inputmode="tel" autocomplete="tel" placeholder="(61) 99999-9999" required>' +
          '<input class="lead-isca" name="empresa" tabindex="-1" autocomplete="off" aria-hidden="true">' +
          '<p class="lead-erro" id="leadErro" role="alert"></p>' +
          '<button type="submit" class="btn btn-green lead-enviar">' +
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .3-3.4-.7-2.9-1.2-4.7-4.2-4.9-4.4-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.3.3-.3.6-.4.8-.4h.6c.2 0 .5 0 .7.5l.9 2.1c.1.2.1.4 0 .6l-.4.6c-.2.2-.4.4-.2.7.2.4.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.6 1.6.3.2.5.1.7-.1l.9-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.4.1.2.1.9-.1 1.5Z"/></svg>' +
            ' Continuar no WhatsApp</button>' +
          '<button type="button" class="lead-pular" id="leadPular">Prefiro ir direto ao WhatsApp</button>' +
          '<p class="lead-lgpd">Usamos seus dados só para falar com você sobre a Infinyt. Nada de spam.</p>' +
        '</form>' +
      '</div>' +
    '</div>';
  document.body.insertAdjacentHTML("beforeend", html);

  var fundo = document.getElementById("leadFundo"), form = document.getElementById("leadForm");
  var nome = document.getElementById("leadNome"), fone = document.getElementById("leadFone");
  var erro = document.getElementById("leadErro"), interesse = document.getElementById("leadInteresse");
  var msgAtual = "", ultimoFoco = null;

  try {
    var salvo = JSON.parse(localStorage.getItem("infinyt-lead") || "{}");
    if (salvo.nome) nome.value = salvo.nome;
    if (salvo.whatsapp) fone.value = salvo.whatsapp;
  } catch (e) {}

  fone.addEventListener("input", function () {
    var d = fone.value.replace(/\D/g, "").slice(0, 11), t = d;
    if (d.length > 2) t = "(" + d.slice(0, 2) + ") " + d.slice(2);
    if (d.length > 6) t = "(" + d.slice(0, 2) + ") " + d.slice(2, d.length - 4) + "-" + d.slice(-4);
    fone.value = t;
  });

  // "Olá! Quero contratar o plano 700 Mega Premium + Disney+ da Infinyt." -> "700 Mega Premium + Disney+"
  function assunto(msg) {
    var m = msg.match(/(?:plano|Plano)\s+(.+?)\s+da Infinyt/) || msg.match(/(?:proposta|orçamento) de (.+?) (?:com a|da) Infinyt/) ||
            msg.match(/(Starlink Mini por \d+ dias)/);
    return m ? m[1] : "";
  }

  function abrir(msg) {
    msgAtual = msg;
    var a = assunto(msg);
    interesse.hidden = !a;
    interesse.textContent = a ? "Você escolheu: " + a : "";
    erro.textContent = "";
    ultimoFoco = document.activeElement;
    fundo.hidden = false;
    document.documentElement.classList.add("lead-aberto");
    setTimeout(function () { (nome.value ? fone : nome).focus(); }, 30);
  }
  function fechar() {
    fundo.hidden = true;
    document.documentElement.classList.remove("lead-aberto");
    if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
  }
  function irParaWhatsApp(texto) {
    window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto), "_blank", "noopener");
    fechar();
  }

  window.infinytLead = abrir;

  document.addEventListener("click", function (e) {
    var el = e.target.closest && e.target.closest(".wa-link");
    if (!el || ehSuporte(el)) return;
    e.preventDefault();
    abrir(el.getAttribute("data-msg") || "Olá! Quero saber mais sobre a Infinyt Net.");
  }, true);

  document.getElementById("leadFechar").addEventListener("click", fechar);
  fundo.addEventListener("click", function (e) { if (e.target === fundo) fechar(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !fundo.hidden) fechar(); });
  document.getElementById("leadPular").addEventListener("click", function () { irParaWhatsApp(msgAtual); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var n = nome.value.trim(), w = fone.value.replace(/\D/g, "");
    if (n.length < 2) { erro.textContent = "Digite seu nome."; nome.focus(); return; }
    if (w.length < 10) { erro.textContent = "Digite seu WhatsApp com DDD."; fone.focus(); return; }
    try { localStorage.setItem("infinyt-lead", JSON.stringify({ nome: n, whatsapp: fone.value })); } catch (e2) {}

    if (LEAD_WEBHOOK && !form.empresa.value && navigator.sendBeacon) {
      var dados = new URLSearchParams({
        nome: n, whatsapp: w, interesse: assunto(msgAtual) || msgAtual,
        pagina: location.pathname, origem: document.referrer || "direto"
      });
      navigator.sendBeacon(LEAD_WEBHOOK, dados);
    }
    irParaWhatsApp("Olá! Sou " + n + ". " + msgAtual.replace(/^Olá!\s*/, ""));
  });
})();
