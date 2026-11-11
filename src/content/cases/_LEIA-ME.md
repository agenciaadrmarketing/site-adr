# Cases

Um arquivo `<slug>.json` por case. O modelo comentado está em `docs/modelo-case.json`.

Um case só vira página quando:
- `status` = "publicada";
- `autorizacao.assinada` = true (autorização por escrito do médico, com data);
- todo indicador tem `evidencia` (relatório, planilha, print autorizado).

Ao publicar: adicionar `/cases/` e `/cases/<slug>/` em `src/data/pages.json` como "publicada".
Números só de negócio (contatos, agendamentos, tempo de resposta), nunca de pacientes ou tratamentos.
