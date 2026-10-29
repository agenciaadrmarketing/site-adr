# Gera docs/seo-palavras-chave.json juntando palavras-chave, SERP, concorrentes e o mapa do site.
import json, re, glob, os
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
base = json.load(open(f'{R}/docs/seo-palavras-chave.json'))
serp = json.load(open(f'{R}/docs/pesquisa/serp-2026-10-29.json'))
conc = json.load(open(f'{R}/docs/pesquisa/concorrentes.json'))
extra = [
 ("mkt médico",1300,"Média","5,74–21,44","comercial/informacional","/marketing-medico/"),
 ("marketing em saúde",140,"Média","3,33–11,03","informacional","/marketing-medico/"),
 ("marketing para saúde",140,"Média","3,33–11,03","informacional","/marketing-medico/"),
 ("marketing na saúde",140,"Média","3,33–11,03","informacional","/marketing-medico/"),
 ("marketing para profissionais da saúde",20,"Média","4,24–15,24","informacional","/marketing-medico/"),
 ("agencia de marketing odontologico",40,"Média",None,"comercial","/marketing-para-dentistas/"),
 ("agencia de marketing para dentistas",20,"Alta",None,"comercial","/marketing-para-dentistas/"),
 ("marketing digital na odontologia",30,"Média",None,"informacional","/blog/marketing-para-clinica-odontologica/"),
 ("marketing para consultorios",20,"Alta","9,44–31,41","comercial","/blog/marketing-para-consultorio-medico/"),
 ("instagram para médicos",20,"Média","3,38–23,15","informacional","/blog/instagram-para-medicos/"),
 ("doctoralia é pago",40,"Baixa","1,83–10,82","informacional","/blog/doctoralia-vale-a-pena/"),
 ("especialista em google meu negócio",140,"Média","4,29–16,46","informacional","/blog/google-meu-negocio-para-medicos/"),
 ("estratégias de marketing médico",None,None,None,"informacional","/blog/estrategias-de-marketing-medico/"),
 ("médico pode divulgar o valor da consulta",None,None,None,"informacional","/blog/medico-pode-divulgar-valor-da-consulta/"),
]
known = {k['palavra'] for k in base['palavras_chave']}
for k,v,c,b,i,p in extra:
    if k not in known:
        base['palavras_chave'].append({"palavra":k,"volume_mensal_br":v,"concorrencia_ads":c,"lance_topo_pagina_brl":b,"intencao":i,"pagina_alvo":p})
# perguntas: SERP (PAA) + concorrentes -> página do site que responde
def onde(q):
    ql=q.lower()
    regras=[("valor da consulta","/blog/medico-pode-divulgar-valor-da-consulta/"),("antes e depois","/blog/depoimentos-de-pacientes-na-publicidade-medica/"),("instagram","/blog/o-que-medico-pode-postar-no-instagram/"),
     ("google ou instagram","/blog/google-ads-ou-meta-ads-para-medicos/"),("google ads","/google-ads-para-medicos/"),("tráfego","/trafego-pago-para-medicos/"),("meta","/meta-ads-para-medicos/"),
     ("odontol","/marketing-para-dentistas/"),("dentista","/marketing-para-dentistas/"),("cro","/marketing-para-dentistas/"),("captar","/blog/captacao-de-pacientes/"),("captação","/blog/captacao-de-pacientes/"),
     ("particular","/blog/como-atrair-pacientes-particulares/"),("atrair","/blog/como-atrair-pacientes-particulares/"),("secretária","/blog/secretaria-de-consultorio-medico/"),
     ("site","/blog/site-para-medicos/"),("seo","/blog/seo-local-para-clinicas/"),("custa","/blog/quanto-custa-agencia-de-marketing-medico/"),("investir","/blog/quanto-investir-em-marketing-medico/"),
     ("pagamento","/servicos/"),("multa","/"),("fidelid","/"),("contrat","/blog/como-escolher-agencia-de-marketing-medico/"),("agência","/blog/como-escolher-agencia-de-marketing-medico/"),
     ("estratégia","/blog/estrategias-de-marketing-medico/"),("como começar","/blog/estrategias-de-marketing-medico/"),("como fazer","/blog/estrategias-de-marketing-medico/"),
     ("norma","/marketing-medico/"),("permitido","/blog/publicidade-medica-o-que-pode-e-o-que-nao-pode/"),("propaganda","/blog/publicidade-medica-o-que-pode-e-o-que-nao-pode/"),
     ("cfm","/blog/regras-de-publicidade-medica-cfm/"),("garantia","/"),("resultados","/"),("marketing médico","/marketing-medico/")]
    for k,p in regras:
        if k in ql: return p
    return None
perg={}
for termo,d in serp['consultas'].items():
    for q in d.get('paa',[]): perg.setdefault(q,{"origem":set(),"pagina":onde(q)})["origem"].add("Google: as pessoas também perguntam ("+termo+")")
for c in conc['concorrentes']:
    for p in c['paginas']:
        for q in p.get('perguntas_faq',[]):
            perg.setdefault(q,{"origem":set(),"pagina":onde(q)})["origem"].add("FAQ de concorrente ("+c['dominio']+")")
irrelev=re.compile(r'salário|profiss|formado|plantão|cartão de todos|psicólog|prompts|regra dos 3|paciente\?|ser mais paciente|palavras que vendem|frase para atrair|evoluir|WE |WTA3|Agência do Médico|landing page grátis|não vou pagar|Fator R|contabilidade|contador|SUS|artigo 117|lei diz|profissionais fazem parte',re.I)
base['perguntas']=[{"pergunta":q,"origem":sorted(v["origem"]),"respondida_em":v["pagina"]} for q,v in perg.items() if not irrelev.search(q)]
base['serp']=serp
base['concorrentes']={"arquivo":"docs/pesquisa/concorrentes.json","dominios":[c['dominio'] for c in conc['concorrentes']],"padroes":conc.get('padroes_gerais',{})}
# mapa das páginas do site (title, description, h1, perguntas do FAQ)
from html.parser import HTMLParser
pages=[]
for f in sorted(glob.glob(f'{R}/dist/**/index.html',recursive=True)):
    h=open(f,encoding='utf8').read()
    path='/'+os.path.relpath(os.path.dirname(f),f'{R}/dist').replace('.','').strip('/')+'/'
    path=path.replace('//','/')
    if 'noindex' in h[:3000]: continue
    t=re.search(r'<title>(.*?)</title>',h); d=re.search(r'name="description" content="(.*?)"',h); h1=re.search(r'<h1[^>]*>(.*?)</h1>',h,re.S)
    qs=re.findall(r'"@type":"Question","name":"(.*?)"',h)
    clean=lambda x: re.sub(r'<[^>]+>','',x).replace('&amp;','&').strip() if x else None
    pages.append({"url":path,"title":clean(t.group(1)) if t else None,"description":d.group(1) if d else None,"h1":clean(h1.group(1)) if h1 else None,"faq":qs})
base['paginas_do_site']=pages
base['observacoes']=base.get('observacoes',[])+["Este arquivo é um mapa de trabalho: o Google não o lê. O que conta é o que foi aplicado nas páginas (títulos, seções, FAQ e dados estruturados) — veja 'paginas_do_site'.","No Bing, 'marketing médico' é dominado por sites em espanhol: o idioma pt-BR declarado em todas as páginas ajuda a separar o público."]
base['gerado_em']='2026-10-29'
json.dump(base,open(f'{R}/docs/seo-palavras-chave.json','w'),ensure_ascii=False,indent=2)
print(len(base['palavras_chave']),'palavras;',len(base['perguntas']),'perguntas;',len(pages),'páginas')
