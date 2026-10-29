# Relatório — SEO lote 2 (29/10/2026)

## Ponto de partida
- Search Console: propriedade de domínio criada em 27–28/10; 19 impressões, posição média 23,4
  ("google ads para médicos", "adr marketing", "marketing ginecologia"). Sitemaps sitemap-index/sitemap-0 com 29 URLs.
- Bing Webmaster: site verificado (msvalidate), 1 URL descoberta.
- PageSpeed (home): celular 87 (TBT 420 ms, Speed Index 4,2 s, CSS bloqueando 440 ms); computador 100.
- O repositório estava atrás do site no ar (6 especialidades novas e ajustes de copy feitos fora do git).
  Este lote sincronizou o código com o site publicado antes de qualquer mudança.

## O que foi implementado
- Sincronização com o site no ar: 6 especialidades (dermatologia, cirurgia plástica, ortopedia, neurologia,
  psiquiatria, odontologia), copy dos heros, remoção de "gratuito/sem custo" em todo o site.
- 4 páginas comerciais por intenção: /trafego-pago-para-medicos/, /google-ads-para-medicos/,
  /meta-ads-para-medicos/, /marketing-para-clinicas/ (Service + FAQPage + Breadcrumb).
- Home: title "Agência de Marketing Médico para Clínicas e Médicos | ADR" (termo comercial de maior volume).
- Títulos e descriptions das 11 especialidades reescritos (≤ 60 / ≤ 155 caracteres); odontologia mira "marketing odontológico".
- Rodapé limpo (sem a lista de especialidades) + faixa compacta "Marketing médico por especialidade" acima do rodapé.
- Blog: 30 artigos novos + o artigo de regras do CFM publicado (42 no total), todos com capa (Unsplash),
  og:image e image no JSON-LD. Fotos ficam em public_html/assets/blog/ (ver manifest.json e scripts/fetch-blog-images.mjs).
- Performance: CSS inline (sem render-blocking), logo responsivo. Celular 87 → 93, Speed Index 4,2 s → 1,7 s.
- Botão de WhatsApp: a luz da borda agora gira sempre (antes só no hover), inclusive com "reduzir movimento".
- OG image própria (assets/og-adr.jpg), Organization.sameAs (Instagram), robots.txt com mais robôs de busca de IA,
  llms.txt, chave IndexNow, sitemap.xml (65 URLs) + sitemap-0.xml mantido, 301 de /niches/odonto/ para /marketing-para-dentistas/.
- Auditoria (npm run audit): sem erros; regra nova bloqueia "gratuito/grátis/sem custo".

## Indexação
- Google: sitemap.xml enviado (65 páginas lidas); indexação solicitada para home, tráfego pago, Google Ads,
  Meta Ads, marketing para clínicas, dentistas e blog.
- Bing: sitemap.xml enviado; 65 URLs enviadas pelo URL Submission; IndexNow notificado.

## Deploy
- Backup do public_html em /backup_public_html_2026-10-29 (raiz do gerenciador de arquivos).
- Arquivos do build enviados por cima (nada apagado no servidor). Branch deploy-dist guarda o último build enviado.

## Pendências recomendadas
1. Perfil da Empresa no Google com endereço real (a SERP de "agência de marketing médico" é local).
2. Revisão por profissional habilitado dos artigos de norma (publicidade médica, depoimentos, regras do CFM).
3. Cases verificáveis e LinkedIn/YouTube da ADR para sameAs.
4. Voltar ao Search Console em 7–14 dias: indexação, consultas e CTR por página.
